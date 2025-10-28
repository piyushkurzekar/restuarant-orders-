// import React, { useState } from "react";
// import Card from "../components/Card/Card";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaFlask, FaBroom, FaWind } from 'react-icons/fa';
// // import InventoryTable from "../components/InventoryTable/InventoryTable";
// // import { supabase } from "../supabaseClient";

// const stockInventory = [
//   {
//     item: "Bed Sheets ",
//     supplier: "Luxury Linens Co.",
//     stock: "12 / 20 sets",
//     category: "Amenities",
//     percentage: 60,
//     status: "In Stock",
//     location: "Storage Room",
//     updated: "1/8/2024",
//     price: 1500,
//   },
//   {
//     item: "Cleaning Supplies",
//     supplier: "Cleaning Supplies Inc.",
//     category: "Maintenance",
//     stock: "80 / 200 kits",
//     percentage: 40,
//     status: "Low Stock",
//     location: "Storage Room",
//     updated: "1/8/2024",
//     price: 1100,
//   },
//   {
//     item: "Pillow Cover",
//     supplier: "Luxury Linens Co.",
//     category: "Maintenance",
//     stock: "10 / 20 kits",
//     percentage: 50,
//     status: "In Stock",
//     location: "Storage Room",
//     updated: "19/8/2024",
//     price: 5800,
//   },
//   {
//     item: "Fruits",
//     supplier: "BlinkIt.co",
//     category: "Groceries",
//     stock: "10 / 20 kits",
//     percentage: 50,
//     status: "In Stock",
//     location: "Storage Room",
//     updated: "1/8/2024",
//     price: 6900,
//   },

// ];

// const Stocks = () => {

//   const [formData, setFormData] = useState({
//     item: '',
//     villa: '',
//     category: '',
//     unit: '',
//     current_stock: '',
//     min_stock: '',
//     max_stock: '',
//     new_stock: '',
//     stock_type: '',
//     location: '',
//     staff_member: '',
//     price: '',
//     status: ''
//   })

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const { data, error } = await supabase.from('stocks').insert([formData])

//     if (error) {
//       console.error(error)
//       alert('Error inserting stock')
//     } else {
//       alert('Stock added successfully!')
//       setFormData({
//         item: '',
//         villa: '',
//         category: '',
//         unit: '',
//         current_stock: '',
//         min_stock: '',
//         max_stock: '',
//         new_stock: '',
//         stock_type: '',
//         location: '',
//         staff_member: '',
//         price: '',
//         status: ''
//       })
//     }
//   }


//   const [showLowStockModal, setShowLowStockModal] = useState(false);

//   //    const lowStockItems = inventoryData.filter(
//   //   (item) => item.status === "Low Stock"
//   // );

//   const [isNewStock, setIsNewStock] = useState(false);

//   const [showModal, setShowModal] = useState(false);

//   const [activeCategory, setActiveCategory] = useState("All items");

//   const categories = [
//     {
//       // id: "All items", label: "All Items", content: <InventoryTable
//       //   tableTitle="Maintenance Stock"
//       //   tableDescription="Check and update maintenance-related items"
//       //   inventoryData={stockInventory}
//       //   categories={["Maintenance", "Amenities"]}
//       // />
//     },
//     { id: "furniture", label: "Furniture", content: "This is the Furniture section content." },
//     { id: "groceries", label: "Groceries", content: "This is the Groceries section content." },
//     { id: "maintenance", label: "Maintenance", content: "This is the Maintenance section content." },
//     { id: "amenities", label: "Amenities", content: "This is the Amenities section content." },
//   ];

//   const lowStockItems = [
//     {
//       id: 3,
//       name: 'Air Conditioning Filters',
//       quantity: 6,
//       min: 10,
//       icon: <FaWind className="me-2 text-danger" />,
//     },
//     {
//       id: 2,
//       name: 'Cleaning Supplies',
//       quantity: 4,
//       min: 8,
//       icon: <FaBroom className="me-2 text-danger" />,
//     },
//     {
//       id: 1,
//       name: 'Liquid items',
//       quantity: 3,
//       min: 5,
//       icon: <FaFlask className="me-2 text-danger" />,
//     },


//   ];


//   const overlayStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 9999,
//   };

//   const modalStyle = {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     width: "500px",
//     maxHeight: "90vh",
//     overflowY: "auto",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "5px",
//     marginTop: "2px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   };

//   return (

//     <div className="overviewContainer container">


//       {/* Top header  */}
//       {/* <div className="d-flex justify-content-between align-items-center">

//         <h5 className="fw-bolder mb-0">Stock</h5>

//         <div className="d-flex align-items-center">
//           <div
//             className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2"
//             style={{ width: '32px', height: '32px', fontSize: '14px' }}
//           >
//             VM
//           </div>
//           <span className="fw-semibold text-muted">Villa Manager</span>
//         </div>
//       </div> */}

//       {/* Underline */}
//       {/* <hr className="mt-3 mb-0" /> */}



//       <div className="d-flex justify-content-between align-items-center">
//         <div className="mt-2">
//           <h4 className="fw-bold mb-0">Stock Management</h4>
//           <p className="text-muted mb-4">
//             Track villa supplies and inventory levels
//           </p></div>
//         <button
//           className="bg-success text-white px-3 py-2 rounded"
//           onClick={() => setShowModal(true)}
//         >
//           + Add Item
//         </button>
//       </div>

//       {/* card section */}

//       {/* <div className="row g-3 justify-content-center ">
//         <Card
//           cardTitle={"Total Villas"}
//           cardSubtitle={"10"}

//         />

//         <Card
//           cardTitle={"Low Stocks Alerts"}
//           cardSubtitle={15}
//           onClick={() => setShowLowStockModal(true)}
//         />



//         <Card
//           cardTitle={"Expenses"}
//           cardSubtitle={"Rs.12,584"}

//         />
//         <Card
//           cardTitle={"Category"}
//           cardSubtitle={"10"}

//         />
//       </div> */}



//       {/* Modal low stock*/}
//       {showLowStockModal && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Low Stock Items</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowLowStockModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {/* === Your Low Stock List === */}
//                 <div className="border rounded p-3 bg-light mt-2">
//                   <h5 className="text-danger fw-semibold mb-1">
//                     Low Stock Alerts
//                   </h5>
//                   <p className="text-muted mb-3">
//                     Items that need immediate attention
//                   </p>

//                   {lowStockItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="d-flex justify-content-between align-items-center bg-white border rounded p-3 mb-2 shadow-sm"
//                     >
//                       <div className="d-flex align-items-center">
//                         {item.icon && <div className="me-2">{item.icon}</div>}
//                         <div>
//                           <div className="fw-semibold">{item.name}</div>
//                           <small className="text-muted">
//                             {item.quantity} remaining (min: {item.min})
//                           </small>
//                         </div>
//                       </div>
//                       <button className="btn btn-danger btn-sm">Reorder</button>
//                     </div>
//                   ))}
//                 </div>
//                 {/* === End Low Stock List === */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}




//       {/* category*/}

//       <div className="container my-4">

//         <div className="d-flex justify-content-between align-items-center">
//           <h5 className="fw-bold mb-3">Categories</h5>

//           {/* Villas dropdown */}
//           <div className="dropdown">
//             <button
//               className="btn btn-success dropdown-toggle p-10"
//               type="button"
//               style={{ width: "140px", fontSize: "1.30rem", padding: "2px 16px", width: "110px" }}
//               id="villasDropdown"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               Villas
//             </button>
//             <ul className="dropdown-menu" aria-labelledby="villasDropdown">
//               <li><a className="dropdown-item" href="#">Villa 1 </a></li>
//               <li><a className="dropdown-item" href="#">Villa 2</a></li>
//               <li><a className="dropdown-item" href="#">Villa 3</a></li>
//               <li><a className="dropdown-item" href="#">Villa 4</a></li>
//               <li><a className="dropdown-item" href="#">Villa 5</a></li>
//               <li><a className="dropdown-item" href="#">Villa 6</a></li>
//               <li><a className="dropdown-item" href="#">Villa 7</a></li>
//               <li><a className="dropdown-item" href="#">Villa 8</a></li>
//               <li><a className="dropdown-item" href="#">Villa 9</a></li>
//               <li><a className="dropdown-item" href="#">Villa 10</a></li>
//             </ul>
//           </div>
//         </div>


//         {/* Row of category buttons */}
//         <div className="d-flex flex-wrap gap-2 mb-3">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               className="btn p-1"
//               style={{
//                 lineHeight: 1,
//                 display: "inline-block",
//                 backgroundColor: activeCategory === cat.id ? "#706b6bff" : "#F8F8F8", // active black, others light gray
//                 color: activeCategory === cat.id ? "#fff" : "#000",
//                 border: "1px solid #8b8080ff",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//               onClick={() => setActiveCategory(cat.id)}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Display content of active category */}

//         <div>

//           <div className="p-3 border rounded">
//             {categories.find((cat) => cat.id === activeCategory)?.content}
//           </div>
//         </div>

//       </div>




//       {/* Modal  add item table*/}
//       {showModal && (
//         <div style={overlayStyle}>
//           <div style={modalStyle}>
//             <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
//               Add New Stock Item
//             </h3>
//             <p>Enter the details for the new inventory item.</p>

//             {/* ⚡️ Add state */}
//             {/* isNewStock = false ho to Current Stock dikhega, true ho to New Stock dikhega */}
//             {/*
//          const [isNewStock, setIsNewStock] = useState(false);
//       */}
//             <form onSubmit={handleSubmit} >
//               <div>
//                 <label>Item Name</label>
//                 <input type="text"
//                   name="itemName"
//                   value={formData.itemName}
//                   onChange={handleChange}
//                   placeholder="Enter item name"
//                   style={inputStyle} />
//               </div>

//               <div style={{
//                 marginTop: "8px"
//               }}>
//                 <label>Villa</label>
//                 <select
//                   name="villa"
//                   value={formData.villa}
//                   onChange={handleChange}
//                   style={inputStyle}>
//                   <option>Select Villa</option>
//                   <option>Villa 1</option>
//                   <option>Villa 2</option>
//                   <option>Villa 3</option>
//                   <option>Villa 4</option>
//                   <option>Villa 5</option>
//                   <option>Villa 6</option>
//                   <option>Villa 7</option>
//                   <option>Villa 8</option>
//                   <option>Villa 9</option>
//                   <option>Villa 10</option>
//                 </select>
//               </div>

//               <div style={{ marginTop: "8px" }}>
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   style={inputStyle}>
//                   <option>Select category</option>
//                   <option>Furniture</option>
//                   <option>Groceries</option>
//                   <option>Maintenance</option>
//                   <option>Amenities</option>
//                 </select>
//               </div>

//               <div style={{ marginTop: "8px" }}>
//                 <label>Unit</label>
//                 <input
//                   name="unit"
//                   value={formData.unit}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="e.g., pieces, bottles, sets"
//                   style={inputStyle}
//                 />
//               </div>

//               {/* Radio buttons for current/new stock */}
//               <div style={{ marginTop: "12px", display: "flex", gap: "20px" }}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="stockType"
//                     checked={!isNewStock}
//                     onChange={() => setIsNewStock(false)}
//                   />{" "}
//                   Regular Stock
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="stockType"
//                     checked={isNewStock}
//                     onChange={() => setIsNewStock(true)}
//                   />{" "}
//                   New Stock
//                 </label>
//               </div>

//               {/* Stock Inputs */}
//               {!isNewStock ? (
//                 // Current stock inputs
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr 1fr",
//                     gap: "8px",
//                     marginTop: "8px",
//                   }}
//                 >
//                   <div>
//                     <label>Current Stock</label>
//                     <input type="number"
//                       name="currentStock"
//                       value={formData.currentStock}
//                       onChange={handleChange}
//                       style={inputStyle} />
//                   </div>
//                   <div>
//                     <label>Min Stock</label>
//                     <input type="number"
//                       name="minStock"
//                       value={formData.minStock}
//                       onChange={handleChange}
//                       style={inputStyle} />
//                   </div>
//                   <div>
//                     <label>Max Stock</label>
//                     <input type="number"
//                       name="maxStock"
//                       value={formData.maxStock}
//                       onChange={handleChange}
//                       style={inputStyle} />
//                   </div>
//                 </div>
//               ) : (
//                 // New stock input
//                 <div style={{ marginTop: "8px" }}>
//                   <label>New Stock Quantity</label>
//                   <input
//                     type="number"
//                     name="newStockQty"
//                     value={formData.newStockQty}
//                     onChange={handleChange}
//                     placeholder="Enter new stock quantity"
//                     style={inputStyle}
//                   />
//                 </div>
//               )}

//               <div style={{ marginTop: "8px" }}>
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   placeholder="Enter storage location"
//                   style={inputStyle}
//                 />
//               </div>

//               <div style={{ marginTop: "8px" }}>
//                 <label>Staff Member</label>
//                 <input
//                   type="text"
//                   name="staffMember"
//                   value={formData.staffMember}
//                   onChange={handleChange}
//                   placeholder="Enter name"
//                   style={inputStyle}
//                 />
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   gap: "8px",
//                   marginTop: "15px",
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   style={{
//                     padding: "6px 12px",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                     background: "#fff",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: "6px 12px",
//                     borderRadius: "4px",
//                     background: "green",
//                     color: "#fff",
//                     border: "none",
//                   }}
//                 >
//                   Add Item
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Stocks

import React from 'react'

const Stocks = () => {
  return (
    <div>Stocks</div>
  )
}

export default Stocks