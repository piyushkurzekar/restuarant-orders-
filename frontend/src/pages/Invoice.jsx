// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Invoice = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { tableOrder } = location.state || {};

//   if (!tableOrder) {
//     return (
//       <div className="container my-4">
//         <p>No order data found.</p>
//         <button className="btn btn-primary" onClick={() => navigate("/takeorders")}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const totalAmount = tableOrder.items.reduce(
//     (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
//     0
//   );

//   return (
//     <div className="container my-4">
//       <h2>Invoice</h2>
//       <p>
//         <strong>Guest:</strong> {tableOrder.guestName} <br />
//         <strong>Table:</strong> {tableOrder.tableNumber}
//       </p>

//       <ul>
//         {tableOrder.items.map((item, idx) => (
//           <li key={idx}>
//             {item.name} x {item.quantity || 1} - ₹{item.total || item.price * (item.quantity || 1)}
//           </li>
//         ))}
//       </ul>

//       <h4>Total: {totalAmount} ₹</h4>

//       <button className="btn btn-primary mt-3" onClick={() => navigate("/takeorders")}>
//         Back to Take Orders
//       </button>
//     </div>
//   );
// };

// export default Invoice;



// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Invoice = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { tableOrder } = location.state || {};

//   if (!tableOrder) {
//     return (
//       <div className="container my-4">
//         <p>No order data found.</p>
//         <button className="btn btn-primary" onClick={() => navigate("/takeorders")}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const totalAmount = tableOrder.items.reduce(
//     (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
//     0
//   );

//   return (
//     <div className="container my-4">
//       <h2>Invoice</h2>
//       <p>
//         <strong>Guest:</strong> {tableOrder.guestName} <br />
//         <strong>Table:</strong> {tableOrder.tableNumber} <br />
//         <strong>Date:</strong> {tableOrder.date}
//       </p>

//       <ul>
//         {tableOrder.items.map((item, idx) => (
//           <li key={idx}>
//             {item.name} x {item.quantity || 1} - ₹
//             {item.total || item.price * (item.quantity || 1)}
//           </li>
//         ))}
//       </ul>

//       <h4>Total: {totalAmount} ₹</h4>

//       <button className="btn btn-primary mt-3" onClick={() => navigate("/takeorders")}>
//         Back to Take Orders
//       </button>
//     </div>
//   );
// };

// export default Invoice;
// import React, { useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { FaDownload } from "react-icons/fa";

// // Predefined extras matching Cart page
// const extrasList = [
//   { text: "Extra Cheese", price: 50 },
//   { text: "Extra Salt", price: 10 },
//   { text: "Extra Butter", price: 30 },
//   { text: "Extra Onion", price: 20 },
//   { text: "Extra Roti", price: 25 },
// ];

// const Invoice = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const invoiceRef = useRef();

//   const { tableOrder } = location.state || {};

//   if (!tableOrder) {
//     return (
//       <div className="container my-4">
//         <p className="text-danger">⚠️ No order data found.</p>
//         <button className="btn btn-primary" onClick={() => navigate("/takeorders")}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Calculate totals
//   const itemsTotal = tableOrder.items.reduce(
//     (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
//     0
//   );

//   const notes = tableOrder.notes || [];
//   const notesTotal = notes.reduce((sum, note) => {
//     const extra = extrasList.find((e) => e.text === note.text);
//     return sum + (extra ? extra.price * note.qty : 0);
//   }, 0);

//   const finalTotal = itemsTotal + notesTotal;

//   const handleDownload = async () => {
//     const element = invoiceRef.current;
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     const dateTimeForPDF = tableOrder.dateTime || tableOrder.date || new Date();
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(
//       `Invoice_Table${tableOrder.tableNumber}_${new Date(dateTimeForPDF).toLocaleString()}.pdf`
//     );
//   };

//   return (
//     <div
//       className="container my-2 p-4 border rounded shadow bg-white position-relative ms-0"
//       style={{
//         overflow: "hidden",
//         backgroundImage: "url('https://www.transparenttextures.com/patterns/leaf.png')",
//         backgroundRepeat: "repeat",
//         backgroundSize: "200px 200px",
//       }}
//       ref={invoiceRef}
//     >
//       {/* Watermark */}
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%) rotate(-30deg)",
//           fontSize: "5rem",
//           color: "rgba(0,0,0,0.07)",
//           fontWeight: "700",
//           textTransform: "uppercase",
//           whiteSpace: "nowrap",
//           pointerEvents: "none",
//           userSelect: "none",
//           zIndex: 0,
//         }}
//       >
//         SHIVAAM FARMS & RESORTS
//       </div>

//       <div style={{ position: "relative", zIndex: 1 }}>
//         {/* Header */}
//         <div className="row mb-4">
//           <div className="col-md-6">
//             <h2 className="fw-bold text-success">SHIVAAM FARMS & RESORTS</h2>
//             <p className="mb-0">01, AB, Green Planet , Omkar Nagar</p>
//             <p className="mb-0">📞 +91 7387750307</p>
//             <p className="mb-0">📧 shivaamfarmsandresorts@gmail.com</p>
//           </div>
//           <div className="col-md-6 text-end">
//             <h4 className="fw-bold">INVOICE</h4>
//             <p className="mb-0">
//               <strong>Invoice To:</strong> {tableOrder.guestName}
//             </p>
//             <p className="mb-0">
//               <strong>Table:</strong> {tableOrder.tableNumber}
//             </p>
//             <p className="mb-0">
//               <strong>Date:</strong>{" "}
//               {new Date(
//                 tableOrder.dateTime && !isNaN(new Date(tableOrder.dateTime))
//                   ? tableOrder.dateTime
//                   : new Date()
//               ).toLocaleString()}

//             </p>
//           </div>
//         </div>

//         {/* Items Table */}
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead className="table-success">
//               <tr>
//                 <th>Description</th>
//                 <th className="text-center">Rate (₹)</th>
//                 <th className="text-center">Qty</th>
//                 <th className="text-end">Subtotal (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Regular Items */}
//               {tableOrder.items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{item.name}</td>
//                   <td className="text-center">{item.price}</td>
//                   <td className="text-center">{item.quantity || 1}</td>
//                   <td className="text-end">{item.total || item.price * (item.quantity || 1)}</td>
//                 </tr>
//               ))}

//               {/* Special Notes / Extras */}
//               {notes.map((note, idx) => {
//                 const extra = extrasList.find((e) => e.text === note.text);
//                 if (!extra) return null;
//                 return (
//                   <tr key={`note-${idx}`} className="table-info">
//                     <td>{note.text} (Extra)</td>
//                     <td className="text-center">{extra.price}</td>
//                     <td className="text-center">{note.qty}</td>
//                     <td className="text-end">{extra.price * note.qty}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <th colSpan="3" className="text-end">
//                   Total Amount
//                 </th>
//                 <th className="text-end text-success">₹ {finalTotal}</th>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Payment Info */}
//         <div className="mt-4">
//           <h6 className="fw-bold">Payment Method:</h6>
//           <p>{tableOrder.paymentMethod || "Online Transfer / UPI"}</p>
//         </div>

//         {/* Terms */}
//         <div className="mt-3">
//           <h6 className="fw-bold">Terms & Conditions:</h6>
//           <p>
//             For security, we need 5 members’ Aadhar card & at the time of check out it will be returned.
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-4">
//           <h5 className="fw-bold text-success">THANK YOU!</h5>
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-end gap-2 mt-3">
//           <button className="btn btn-success" onClick={handleDownload}>
//             <FaDownload className="me-2" /> Download
//           </button>
//           <button className="btn btn-primary" onClick={() => navigate("/takeorders")}>
//             Back to Take Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShare } from "react-icons/fa";

const extrasList = [
  { text: "Extra Cheese", price: 50 },
  { text: "Extra Salt", price: 10 },
  { text: "Extra Butter", price: 30 },
  { text: "Extra Onion", price: 20 },
  { text: "Extra Roti", price: 25 },
];

const Invoice = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Fetch order error:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="container my-4">
        <p className="text-danger">⚠️ No order data found.</p>
        <button className="btn btn-primary" onClick={() => navigate("/takeorders")}>
          Go Back
        </button>
      </div>
    );
  }

  // Calculate totals
  const itemsTotal = order.items?.reduce(
    (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
    0
  ) || 0;

  const notes = Array.isArray(order.notes) ? order.notes : [];
  const notesTotal = notes.reduce((sum, note) => {
    const extra = extrasList.find((e) => e.text === note.text);
    return sum + (extra ? extra.price * note.qty : 0);
  }, 0);

  const finalTotal = itemsTotal + notesTotal;

 // Share via WhatsApp
const handleShareWhatsApp = async () => {
  if (!order.contact) {
    alert("❌ No contact number available!");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Generate invoice PDF via backend
    const res = await fetch(
      `http://localhost:4000/api/orders/send-invoice/${order.id}`,
      { method: "POST" }
    );
    const data = await res.json();

    if (!data.publicUrl) {
      alert("❌ Failed to generate invoice PDF.");
      return;
    }

    // 2️⃣ Format phone number
    const phone = order.contact?.toString().trim() || "";
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    // 3️⃣ Format invoice message nicely
    const message = `
🧾 *INVOICE DETAILS*
━━━━━━━━━━━━━━━━━━━
🏷️ *Invoice ID:* ${order.id}
📅 *Date:* ${new Date(order.date || Date.now()).toLocaleDateString("en-IN")}
💰 *Total Amount:* ₹${order.total || "0"}

📎 *Download Invoice (PDF):* ${data.publicUrl}

📍 *Thank you for visiting Shivaam Farms & Resorts!*
━━━━━━━━━━━━━━━━━━━
    `.trim();

    // 4️⃣ Open WhatsApp with formatted message
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  } catch (err) {
    console.error("Share error:", err);
    alert("❌ Something went wrong while sharing invoice.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container my-2 p-4 border rounded shadow bg-white position-relative">
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-30deg)",
          fontSize: "5rem",
          color: "rgba(0,0,0,0.07)",
          fontWeight: "700",
          textTransform: "uppercase",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        SHIVAAM FARMS & RESORTS
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h2 className="fw-bold text-success">SHIVAAM FARMS & RESORTS</h2>
            <p className="mb-0">01, AB, Green Planet, Omkar Nagar</p>
            <p className="mb-0">📞 +91 7387750307</p>
            <p className="mb-0">📧 shivaamfarmsandresorts@gmail.com</p>
          </div>
          <div className="col-md-6 text-end">
            <h4 className="fw-bold">INVOICE</h4>
            <p className="mb-0"><strong>Invoice To:</strong> {order.guestName}</p>
            <p className="mb-0"><strong>Table:</strong> {order.tableNumber}</p>
            <p className="mb-0"><strong>Contact:</strong> {order.contact}</p>
            <p className="mb-0"><strong>Date:</strong> {new Date(order.dateTime).toLocaleString()}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Description</th>
                <th className="text-center">Rate (₹)</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">{item.quantity || 1}</td>
                  <td className="text-end">{item.total || item.price * (item.quantity || 1)}</td>
                </tr>
              ))}

              {notes.map((note, idx) => {
                const extra = extrasList.find((e) => e.text === note.text);
                if (!extra) return null;
                return (
                  <tr key={`note-${idx}`} className="table-info">
                    <td>{note.text} (Extra)</td>
                    <td className="text-center">{extra.price}</td>
                    <td className="text-center">{note.qty}</td>
                    <td className="text-end">{extra.price * note.qty}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">Total Amount</th>
                <th className="text-end text-success">₹ {finalTotal}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-success" onClick={handleShareWhatsApp} disabled={loading}>
            <FaShare className="me-2" />
            {loading ? "Generating PDF..." : "Share via WhatsApp"}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/takeorders")}>
            Back to Take Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
