// import express from "express";
// import cors from "cors";
// import staffRoutes from "./routes/staffRoutes.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/staff", staffRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Backend running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import staffRoutes from "./routes/staffRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // import orders routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/staff", staffRoutes);          // Staff module
app.use("/api/orders", orderRoutes);     // Orders module

// Test route
app.get("/", (req, res) => {
    res.send("✅ Backend running (Staff + Orders)");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
