// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import MenuItems from "../components/MenuItems/MenuItems";
// import { useOrders } from "../context/OrdersContext";

// // Images
// import PohaImg from "../assets/images/Poha.jpeg";
// import BhakkerImg from "../assets/images/Bhakker.jpeg";
// import ChilliPaneer from "../assets/images/Chilli-Paneer.jpeg";
// import Coffee from "../assets/images/Coffee.jpeg";
// import MixVeg from "../assets/images/Mix-Veg.jpeg";
// import MuttonCurry from "../assets/images/Mutton-Curry.jpeg";
// import PalakPaneer from "../assets/images/Palak-paneer.jpeg";
// import ChickenCurry from "../assets/images/Chikken-Curry.jpeg";
// import CrispyVeg from "../assets/images/Crispy-Veg.jpeg";
// import Idli from "../assets/images/Idli.jpeg";
// import Jhunka from "../assets/images/Jhunka.jpeg";
// import PaneerButterMasala from "../assets/images/Paneer-Butter-Masala.jpeg";
// import ButterRoti from "../assets/images/Roti.jpeg";
// import Tea from "../assets/images/Tea.jpeg";

// const Orders = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cart, setCart, confirmOrder } = useOrders();

//   const [orderData, setOrderData] = useState({
//     guestName: "",
//     tableNumber: "",
//     items: [],
//   });

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const categories = [
//     "All",
//     "Hot & Tea",
//     "Chinese",
//     "Main course VEG",
//     "Main course NON VEG",
//     "Snacks",
//     "Paneer",
//     "Roti",
//   ];

//   const menuItems = [
//     { id: 1, name: "Tea", price: 15, img: Tea, category: "Hot & Tea" },
//     { id: 2, name: "Chilli Paneer", price: 220, img: ChilliPaneer, category: "Chinese" },
//     { id: 3, name: "Paneer Butter Masala", price: 250, img: PaneerButterMasala, category: "Paneer" },
//     { id: 4, name: "Mix Veg", price: 150, img: MixVeg, category: "Main course VEG" },
//     { id: 5, name: "Chicken Curry", price: 260, img: ChickenCurry, category: "Main course NON VEG" },
//     { id: 6, name: "Poha", price: 40, img: PohaImg, category: "Snacks" },
//     { id: 7, name: "Butter Roti", price: 25, img: ButterRoti, category: "Roti"},
//     { id: 8, name: "Coffee", price: 25, img: Coffee, category: "Hot & Tea" },
//     { id: 9, name: "Crispy Veg", price: 200, img: CrispyVeg, category: "Chinese" },
//     { id: 10, name: "Palak Paneer", price: 230, img: PalakPaneer, category: "Paneer" },
//     { id: 11, name: "Jhunka", price: 150, img: Jhunka, category: "Main course VEG" },
//     { id: 12, name: "Mutton Curry", price: 300, img: MuttonCurry, category: "Main course NON VEG" },
//     { id: 13, name: "Idli", price: 60, img: Idli, category: "Snacks" },
//     { id: 14, name: "Bhakker", price: 40, img: BhakkerImg, category: "Roti" },
//   ];

//   // Prefill guest & table if coming from "Add More"
//   useEffect(() => {
//     if (location.state?.addMoreFor) {
//       setOrderData({
//         guestName: location.state.addMoreFor.guestName,
//         tableNumber: location.state.addMoreFor.tableNumber,
//         items: [],
//       });
//     }
//   }, [location.state]);

//   // Handle adding items to cart
//   const handleAddToCart = (selectedItems) => {
//     if (!orderData.guestName || !orderData.tableNumber) {
//       alert("Please enter guest name and table number first.");
//       return;
//     }

//     const tableKey = `Table-${orderData.tableNumber}`;

//     const updatedTable = {
//       guestName: orderData.guestName,
//       tableNumber: orderData.tableNumber,
//       items: [
//         ...(cart[tableKey]?.items || []),
//         ...selectedItems,
//       ],
//     };

//     // Update context cart
//     setCart({ ...cart, [tableKey]: updatedTable });

//     // Confirm order for kitchen view
//     confirmOrder(tableKey, updatedTable);

//     // Reset inputs if not in "Add More" mode
//     if (!location.state?.addMoreFor) {
//       setOrderData({ guestName: "", tableNumber: "", items: [] });
//     }
//   };

//   // Calculate overall total
//   const totalAmount = Object.values(cart).reduce((sum, table) => {
//     return sum + table.items.reduce((s, item) => s + (item.total || item.price * (item.quantity || 1)), 0);
//   }, 0);

//   return (
//     <div className="container my-4" style={{ maxWidth: "1000px" }}>
//       <div className="card shadow p-4 mb-4">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h2 className="mb-0">Take Orders</h2>
//           <button
//             className="btn btn-success"
//             onClick={() => navigate("/cart", { state: { cart, totalAmount } })}
//           >
//             View Cart ({totalAmount} ₹)
//           </button>
//         </div>

//         {/* Guest & Table */}
//         <div className="row mb-3">
//           <div className="col">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Guest Name"
//               value={orderData.guestName}
//               onChange={(e) => setOrderData({ ...orderData, guestName: e.target.value })}
//             />
//           </div>
//           <div className="col">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Table No."
//               value={orderData.tableNumber}
//               onChange={(e) => setOrderData({ ...orderData, tableNumber: e.target.value })}
//             />
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="mb-3">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               className={`btn me-2 mb-2 ${selectedCategory === cat ? "btn-primary" : "btn-outline-primary"}`}
//               onClick={() => setSelectedCategory(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Items */}
//         <MenuItems
//           menuItems={menuItems}
//           selectedCategory={selectedCategory}
//           onAddToCart={handleAddToCart}
//         />
//       </div>
//     </div>
//   );
// };

// export default Orders;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useOrders } from "../context/OrdersContext";

// const Orders = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const { confirmedOrders } = useOrders(); // fetch live orders from context

//   // Convert confirmedOrders object to array
//   const ordersArray = Object.values(confirmedOrders || {}).map((order, idx) => ({
//     id: order.tableNumber + "-" + idx,
//     name: order.guestName,
//     table: order.tableNumber,
//     items: order.items,
//     notes: order.notes,
//     dateTime: order.dateTime,
//     amount:
//       order.items.reduce(
//         (sum, item) => sum + (item.total || item.price * (item.quantity || 1)),
//         0
//       ) +
//       (order.notes?.reduce((sum, note) => {
//         const extras = {
//           "Extra Cheese": 50,
//           "Extra Salt": 10,
//           "Extra Butter": 30,
//           "Extra Onion": 20,
//           "Extra Roti": 25,
//         };
//         const extraPrice = extras[note.text] || 0;
//         return sum + extraPrice * note.qty;
//       }, 0) || 0),
//     paymentMode: order.paymentMethod || "UPI",
//     steward: order.steward || "—",
//   }));

//   // Filter orders by selected date
//   const filteredOrders = selectedDate
//     ? ordersArray.filter(
//       (order) =>
//         new Date(order.dateTime).toLocaleDateString("en-CA") === selectedDate
//     )
//     : [];

//   // Calculate total amount for that day
//   const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Orders Summary</h2>

//       {/* Date Picker */}
//       <div className="mb-3 w-25">
//         <label className="form-label fw-bold">Select Date</label>
//         <input
//           type="date"
//           className="form-control"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div>

//       {/* Orders Table */}
//       {selectedDate && (
//         <>
//           <h5 className="mb-3">
//             Showing orders for: <span className="text-primary">{selectedDate}</span>
//           </h5>
//           <table className="table table-bordered shadow-sm">
//             <thead className="table-success">
//               <tr>
//                 <th>Customer Name</th>
//                 <th>Table</th>
//                 <th>Received By</th>
//                 <th>Payment Mode</th>
//                 <th>Amount (₹)</th>
//                 <th>Date & Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <tr key={order.id}>
//                     <td>{order.name}</td>
//                     <td>{order.table}</td>
//                     <td>{order.steward}</td>
//                     <td>{order.paymentMode}</td>
//                     <td>₹ {order.amount.toLocaleString()}</td>
//                     <td>{new Date(order.dateTime).toLocaleString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No orders found for this date.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Total Amount */}
//           {filteredOrders.length > 0 && (
//             <div className="alert alert-info mt-3">
//               <strong>Total Amount: ₹ {totalAmount.toLocaleString()}</strong>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Orders;








import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const extrasList = [
  { text: "Extra Cheese", price: 50 },
  { text: "Extra Salt", price: 10 },
  { text: "Extra Butter", price: 30 },
  { text: "Extra Onion", price: 20 },
  { text: "Extra Roti", price: 25 },
];

const Orders = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);

  // Fetch all completed orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/orders/completed");
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by selected date
  const filteredOrders = selectedDate
    ? orders.filter(
      (order) =>
        new Date(order.dateTime).toLocaleDateString("en-CA") === selectedDate
    )
    : [];

  // Calculate total for selected date
  const totalAmount = filteredOrders.reduce((sum, order) => {
    const itemsTotal = order.items.reduce(
      (s, item) => s + (item.total || item.price * (item.quantity || 1)),
      0
    );

    const notesTotal = (order.notes || []).reduce((s, note) => {
      const extra = extrasList.find((e) => e.text === note.text);
      return s + (extra ? extra.price * note.qty : 0);
    }, 0);

    return sum + itemsTotal + notesTotal;
  }, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders Summary</h2>

      {/* Date Picker */}
      <div className="mb-3 w-25">
        <label className="form-label fw-bold">Select Date</label>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      {selectedDate && (
        <>
          <h5 className="mb-3">
            Showing orders for:{" "}
            <span className="text-primary">{selectedDate}</span>
          </h5>

          <table className="table table-bordered shadow-sm">
            <thead className="table-success">
              <tr>
                <th>Customer Name</th>
                <th>Table</th>
                <th>Contact</th>
                <th>Payment Mode</th>
                <th>Amount (₹)</th>
                <th>Date & Time</th>
                <th>Received By</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const itemsTotal = order.items.reduce(
                    (s, item) => s + (item.total || item.price * (item.quantity || 1)),
                    0
                  );

                  const notesTotal = (order.notes || []).reduce((s, note) => {
                    const extra = extrasList.find((e) => e.text === note.text);
                    return s + (extra ? extra.price * note.qty : 0);
                  }, 0);

                  const amount = itemsTotal + notesTotal;

                  return (
                    <tr key={order.id}>
                      <td>{order.guestName}</td>
                      <td>{order.tableNumber}</td>
                      <td>{order.contact}</td>
                      <td>{order.paymentMethod || "UPI"}</td>
                      <td>₹ {amount.toLocaleString()}</td>
                      <td>{new Date(order.dateTime).toLocaleString()}</td>
                      <td>{order.steward || "—"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No orders found for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {filteredOrders.length > 0 && (
            <div className="alert alert-info mt-3">
              <strong>Total Amount: ₹ {totalAmount.toLocaleString()}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
