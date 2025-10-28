// import React from "react";
// import { useOrders } from "../context/OrdersContext";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart, setCart, confirmOrder } = useOrders();
//   const navigate = useNavigate();

//   // Complete Order: remove table and go to invoice
//   const handleCompleteOrder = (tableKey) => {
//     const tableOrder = cart[tableKey];
//     if (!tableOrder) return;

//     const updatedCart = { ...cart };
//     delete updatedCart[tableKey];
//     setCart(updatedCart);

//     navigate("/invoice", { state: { tableOrder } });
//   };

//   // Add More: navigate back to Orders page with prefilled data
//   const handleAddMore = (tableOrder) => {
//     navigate("/orders", { state: { addMoreFor: tableOrder } });
//   };

//   // Confirm Order: mark as confirmed and redirect to Kitchen
//   const handleConfirmOrder = (tableKey) => {
//     const tableOrder = cart[tableKey];
//     if (!tableOrder) return;

//     // Mark as confirmed in context
//     confirmOrder(tableKey, tableOrder);

//     // Redirect to Kitchen page
//     navigate("/kitchen");
//   };

//   const tableTotal = (items) =>
//     items.reduce((sum, item) => sum + (item.total || item.price * (item.quantity || 1)), 0);

//   return (
//     <div className="container my-4 w-50">
//       <h2>Cart</h2>
//       {Object.keys(cart).length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         Object.entries(cart).map(([tableKey, order]) => (
//           <div key={tableKey} className="card shadow p-3 mb-4">
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <h5>
//                 Guest: {order.guestName} | Table: {order.tableNumber}
//               </h5>
//               <span>Total: {tableTotal(order.items)} ₹</span>
//             </div>

//             <ul>
//               {order.items.map((item, idx) => (
//                 <li key={idx}>
//                   {item.name} x {item.quantity || 1} - ₹{item.total || item.price * (item.quantity || 1)}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-2 d-flex gap-2">
//               {/* Confirm Order */}
//               <button
//                 className="btn btn-primary"
//                 onClick={() => handleConfirmOrder(tableKey)}
//               >
//                 Confirm Order
//               </button>

//               {/* Add More */}
//               <button
//                 className="btn btn-warning"
//                 onClick={() => handleAddMore(order)}
//               >
//                 Add More
//               </button>

//               {/* Complete Order */}
//               <button
//                 className="btn btn-success"
//                 onClick={() => handleCompleteOrder(tableKey)}
//               >
//                 Complete Order
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;
// import React, { useState } from "react";
// import { useOrders } from "../context/OrdersContext";
// import { useNavigate } from "react-router-dom";

// // Predefined extras
// const extrasList = [
//   { text: "Extra Cheese", price: 50 },
//   { text: "Extra Salt", price: 10 },
//   { text: "Extra Butter", price: 30 },
//   { text: "Extra Onion", price: 20 },
//   { text: "Extra Roti", price: 25 },
// ];

// const Cart = () => {
//   const { cart, confirmOrder, removeFromCart } = useOrders();
//   const navigate = useNavigate();

//   // Notes per table
//   const [tableNotes, setTableNotes] = useState({});

//   const tableTotal = (items, notes) => {
//     const itemsTotal = items.reduce(
//       (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
//       0
//     );
//     const notesTotal = notes?.reduce((sum, note) => {
//       const extra = extrasList.find((e) => e.text === note.text);
//       return sum + (extra ? extra.price * note.qty : 0);
//     }, 0) || 0;
//     return itemsTotal + notesTotal;
//   };

//   const handleNoteChange = (tableKey, index, field, value) => {
//     setTableNotes((prev) => {
//       const notes = prev[tableKey] || [{ text: "", qty: 1 }];
//       const updated = [...notes];
//       updated[index][field] = field === "qty" ? parseInt(value, 10) || 1 : value;
//       return { ...prev, [tableKey]: updated };
//     });
//   };

//   const handleAddNote = (tableKey) => {
//     setTableNotes((prev) => {
//       const notes = prev[tableKey] || [{ text: "", qty: 1 }];
//       return { ...prev, [tableKey]: [...notes, { text: "", qty: 1 }] };
//     });
//   };

//   const handleRemoveNote = (tableKey, index) => {
//     setTableNotes((prev) => {
//       const notes = prev[tableKey] || [];
//       return { ...prev, [tableKey]: notes.filter((_, i) => i !== index) };
//     });
//   };

//   const handleCompleteOrder = (tableKey) => {
//     const tableOrder = cart[tableKey];
//     if (!tableOrder) return;
//     const notes = tableNotes[tableKey] || [];
//     const orderWithNotes = { ...tableOrder, notes };
//     removeFromCart(tableOrder.tableNumber, tableOrder.dateTime, new Date());
//     navigate("/invoice", { state: { tableOrder: orderWithNotes } });
//   };

//   const handleAddMore = (tableOrder) => {
//     navigate("/takeorders", { state: { addMoreFor: tableOrder } });
//   };

//   const handleConfirmOrder = (tableKey) => {
//     const tableOrder = cart[tableKey];
//     if (!tableOrder) return;
//     const notes = tableNotes[tableKey] || [];
//     const orderWithNotes = { ...tableOrder, notes };
//     confirmOrder(tableOrder.tableNumber, orderWithNotes);
//     navigate("/kitchen", { state: { tableOrder: orderWithNotes } });
//   };

//   const tableKeys = Object.keys(cart);

//   return (
//     <div className="container my-4 w-50 ms-0">
//       <h2>Cart</h2>

//       {tableKeys.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         tableKeys.map((tableKey) => {
//           const order = cart[tableKey];
//           const notes = tableNotes[tableKey] || [{ text: "", qty: 1 }];
//           return (
//             <div key={tableKey} className="card shadow p-3 mb-4">
//               <h5>
//                 Guest: {order.guestName} | Table: {order.tableNumber} | Date & Time:{" "}
//                 {order.dateTime
//                   ? new Date(order.dateTime).toLocaleString()
//                   : new Date().toLocaleString()}
//               </h5>

//               <ul>
//                 {order.items.map((item, idx) => (
//                   <li key={idx}>
//                     {item.name} x {item.quantity || 1} - ₹
//                     {item.total || item.price * (item.quantity || 1)}
//                   </li>
//                 ))}

//                 {notes.map((note, idx) => {
//                   if (!note.text) return null;
//                   const extra = extrasList.find((e) => e.text === note.text);
//                   return (
//                     <li key={`note-${idx}`} style={{ color: "blue" }}>
//                       {note.text} x {note.qty} - ₹ {extra ? extra.price * note.qty : 0}
//                     </li>
//                   );
//                 })}
//               </ul>

//               {/* Notes Section */}
//               <div className="mt-3">
//                 <h6>Add Special Notes (Optional)</h6>
//                 {notes.map((note, index) => (
//                   <div key={index} className="d-flex align-items-center mb-2 gap-2">
//                     <select
//                       className="form-control"
//                       value={note.text}
//                       onChange={(e) => handleNoteChange(tableKey, index, "text", e.target.value)}
//                     >
//                       <option value="">Select Extra</option>
//                       {extrasList.map((extra, idx) => (
//                         <option key={idx} value={extra.text}>
//                           {extra.text} (₹{extra.price})
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="Qty"
//                       style={{ width: "80px" }}
//                       min="1"
//                       value={note.qty}
//                       onChange={(e) => handleNoteChange(tableKey, index, "qty", e.target.value)}
//                     />
//                     <button className="btn btn-danger" onClick={() => handleRemoveNote(tableKey, index)}>
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//                 <button className="btn btn-outline-primary mt-2" onClick={() => handleAddNote(tableKey)}>
//                   + Add Extra
//                 </button>
//               </div>
//             </div>
//           );
//         })
//       )}

//       {/* Action Buttons outside all cards */}
//       {tableKeys.length > 0 && (
//         <div className="c-flex gap-4 mt-7 " style={{ marginLeft: "650px", marginTop: "-250px" }}>
//           {tableKeys.map((tableKey) => (
//             <React.Fragment key={tableKey}>
//               <button className="btn btn-primary" style={{ marginBottom: "20px", width: "200px" }} onClick={() => handleConfirmOrder(tableKey)}>
//                 Confirm Order
//               </button>
//               <button className="btn btn-warning" style={{ marginBottom: "20px", width: "200px" }} onClick={() => handleAddMore(cart[tableKey])}>
//                 Add More
//               </button>
//               <button className="btn btn-success" style={{ marginBottom: "20px", width: "200px" }} onClick={() => handleCompleteOrder(tableKey)}>
//                 Complete Order
//               </button>
//             </React.Fragment>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const extrasList = [
  { text: "Extra Cheese", price: 50 },
  { text: "Extra Salt", price: 10 },
  { text: "Extra Butter", price: 30 },
  { text: "Extra Onion", price: 20 },
  { text: "Extra Roti", price: 25 },
];

const Cart = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tableNotes, setTableNotes] = useState({});

  const fetchCartOrders = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/orders/cart");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchCartOrders();
  }, []);

  const handleNoteChange = (orderId, index, field, value) => {
    setTableNotes((prev) => {
      const notes = prev[orderId] || [{ text: "", qty: 1 }];
      const updated = [...notes];
      updated[index][field] = field === "qty" ? parseInt(value, 10) || 1 : value;
      return { ...prev, [orderId]: updated };
    });
  };

  const handleAddNote = (orderId) => {
    setTableNotes((prev) => {
      const notes = prev[orderId] || [{ text: "", qty: 1 }];
      return { ...prev, [orderId]: [...notes, { text: "", qty: 1 }] };
    });
  };

  const handleRemoveNote = (orderId, index) => {
    setTableNotes((prev) => {
      const notes = prev[orderId] || [];
      return { ...prev, [orderId]: notes.filter((_, i) => i !== index) };
    });
  };

  const handleConfirmOrder = async (order) => {
    const notes = tableNotes[order.id] || [];
    try {
      const res = await fetch(`http://localhost:4000/api/orders/confirm/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error("Failed to confirm order");
      alert("Order sent to Kitchen!");
      fetchCartOrders();
    } catch (err) {
      console.error(err);
      alert("Error confirming order");
    }
  };

  const handleCompleteOrder = async (order) => {
    try {
      const res = await fetch(`http://localhost:4000/api/orders/complete/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to complete order");
      alert("Order completed!");
      fetchCartOrders();
      navigate(`/invoice/${order.id}`);
    } catch (err) {
      console.error(err);
      alert("Error completing order");
    }
  };

  const handleAddMore = (order) => {
    navigate("/takeorders", { state: { addMoreFor: order } });
  };

  return (
    <div className="container my-3">
      <h2>Cart</h2>
      {orders.length === 0 && <p>No pending or confirmed orders.</p>}

      {orders.map((order) => {
        const notes = tableNotes[order.id] || [{ text: "", qty: 1 }];
        return (
          <div key={order.id} className="card shadow p-3 mb-3 border">
            <h5>
              Guest: {order.guestName} | Table: {order.tableNumber} | Contact: {order.contact} | Date:{" "}
              {new Date(order.dateTime).toLocaleString()} | Status: {order.status}
            </h5>
            <ul>
              {order.items?.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.quantity || 1} - ₹{item.total || item.price * (item.quantity || 1)}
                </li>
              ))}
              {notes.map((note, idx) => {
                if (!note.text) return null;
                const extra = extrasList.find((e) => e.text === note.text);
                return (
                  <li key={idx} style={{ color: "blue" }}>
                    {note.text} x {note.qty} - ₹{extra ? extra.price * note.qty : 0}
                  </li>
                );
              })}
            </ul>

           <div className="mt-2">
  <h6>Add Special Notes / Extras</h6>
  {notes.map((note, idx) => (
    <div key={idx} className="d-flex gap-2 align-items-center mb-2">
      <select
        className="form-control"
        value={note.text}
        onChange={(e) => handleNoteChange(order.id, idx, "text", e.target.value)}
      >
        <option value="">Select Extra</option>
        {extrasList.map((extra, i) => (
          <option key={i} value={extra.text}>
            {extra.text} (₹{extra.price})
          </option>
        ))}
      </select>
      <input
        type="number"
        className="form-control"
        placeholder="Qty"
        min="1"
        style={{ width: "80px" }}
        value={note.qty}
        onChange={(e) => handleNoteChange(order.id, idx, "qty", e.target.value)}
      />
      <button className="btn btn-danger" onClick={() => handleRemoveNote(order.id, idx)}>
        ✕
      </button>
    </div>
  ))}
  <button className="btn btn-outline-primary btn-sm" onClick={() => handleAddNote(order.id)}>
    + Add Extra
  </button>
</div>


            <div className="mt-3 d-flex gap-2">
              {order.status === "Pending" && (
                <button className="btn btn-primary" onClick={() => handleConfirmOrder(order)}>
                  Confirm Order
                </button>
              )}
              <button className="btn btn-warning" onClick={() => handleAddMore(order)}>
                Add More
              </button>
              {order.status !== "Completed" && (
                <button className="btn btn-success" onClick={() => handleCompleteOrder(order)}>
                  Complete Order
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
