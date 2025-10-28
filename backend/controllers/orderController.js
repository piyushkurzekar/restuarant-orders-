import { supabase } from "../config/supabaseClient.js";
import puppeteer from "puppeteer";
import { generateInvoiceHTML } from "../templates/generateInvoiceHTML.js";

// -------------------- ORDERS --------------------

export const placeOrder = async (req, res) => {
  try {
    const { guestName, contact, tableNumber, dateTime, items, total } = req.body;

    // Check if existing order is already pending for the same table & guest
    const { data: existingOrders, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("tableNumber", tableNumber)
      .eq("status", "Pending");

    if (fetchError) throw fetchError;

    if (existingOrders && existingOrders.length > 0) {
      // 🟢 Update existing order instead of creating new one
      const existingOrder = existingOrders[0];

      // Parse old items
      let oldItems = [];
      try {
        oldItems = Array.isArray(existingOrder.items)
          ? existingOrder.items
          : JSON.parse(existingOrder.items || "[]");
      } catch {
        oldItems = [];
      }

      // 🧩 Merge items without duplicating
      const mergedItems = [...oldItems];

      items.forEach((newItem) => {
        const existingIndex = mergedItems.findIndex(
          (i) => i.name === newItem.name
        );

        if (existingIndex !== -1) {
          // If same item already exists, just increase quantity
          mergedItems[existingIndex].qty += newItem.qty;
          mergedItems[existingIndex].subtotal += newItem.subtotal;
        } else {
          mergedItems.push(newItem);
        }
      });

      // Recalculate total
      const updatedTotal = mergedItems.reduce((sum, i) => sum + i.subtotal, 0);

      // Update the existing order
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          items: mergedItems,
          total: updatedTotal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingOrder.id);

      if (updateError) throw updateError;

      return res.status(200).json({
        message: "Order updated successfully",
        type: "update",
      });
    } else {
      // 🆕 Create new order
      const { data, error } = await supabase.from("orders").insert([
        {
          guestName,
          contact,
          tableNumber,
          dateTime,
          items,
          total,
          status: "Pending",
        },
      ]);

      if (error) throw error;

      return res.status(201).json({
        message: "Order placed successfully",
        type: "new",
        data,
      });
    }
  } catch (err) {
    console.error("placeOrder error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get pending orders
export const getPendingOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "Pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("getPendingOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get cart orders
export const getCartOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .in("status", ["Pending", "Confirmed"])
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("getCartOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Confirm order
export const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const { data, error } = await supabase
      .from("orders")
      .update({ status: "Confirmed", notes })
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json({ message: "Order sent to Kitchen", data });
  } catch (err) {
    console.error("confirmOrder error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get kitchen orders
export const getKitchenOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .in("status", ["Confirmed", "Completed"])
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("getKitchenOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Complete an order
export const completeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("orders")
      .update({ status: "Completed" })
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json({ message: "Order completed successfully", data });
  } catch (err) {
    console.error("completeOrder error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get completed orders
export const getCompletedOrders = async (req, res) => {
  try {
    const { date } = req.query;
    let query = supabase.from("orders").select("*").eq("status", "Completed");
    if (date) query = query.eq("dateTime", date);

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("getCompletedOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(404).json({ error: "Order not found" });
  }
};

// -------------------- SEND INVOICE (Puppeteer + Supabase) --------------------

export const sendInvoiceToWhatsApp = async (req, res) => {
  const { orderId } = req.params;

  try {
    // 1️⃣ Fetch order data
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order)
      return res.status(404).json({ error: "Order not found" });

    // 2️⃣ Safe JSON Parse helper
    const safeJSONParse = (data, fallback = []) => {
      try {
        if (!data) return fallback;
        return JSON.parse(data);
      } catch {
        return fallback;
      }
    };

    // 3️⃣ Prepare full order object
    const fullOrder = {
      ...order,
      items: Array.isArray(order.items)
        ? order.items
        : safeJSONParse(order.items, []),
      notes: safeJSONParse(order.notes, []),
      finalTotal: order.total || 0,
    };

    // 4️⃣ Generate invoice HTML using your template file
    const invoiceHTML = generateInvoiceHTML(fullOrder);

    // 5️⃣ Generate PDF via Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // for server safety
    });
    const page = await browser.newPage();
    await page.setContent(invoiceHTML, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px" },
    });
    await browser.close();

    // 6️⃣ Upload PDF to Supabase Storage
    const fileName = `invoice_${orderId}_${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("invoices")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError)
      return res.status(500).json({ error: uploadError.message });

    // 7️⃣ Get public URL of uploaded PDF
    const { data: publicData } = supabase.storage
      .from("invoices")
      .getPublicUrl(fileName);

    console.log("✅ Invoice generated:", publicData.publicUrl);

    // 8️⃣ Send the link as response
    res.json({ publicUrl: publicData.publicUrl });
  } catch (err) {
    console.error("❌ sendInvoiceToWhatsApp error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
