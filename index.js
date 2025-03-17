const express = require("express");
require("dotenv").config();
const pool = require("./server/config/database"); 
const userRouter = require("./server/router/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// Database Connection Test
pool.connect()
    .then(() => console.log("✅ PostgreSQL Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

// Routes
app.use("/api/v1", userRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
});


// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
