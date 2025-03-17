const express = require("express");
require("dotenv").config();
const pool = require("./server/config/database"); 
const userRouter = require("./server/router/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = ['https://luxury-valkyrie-6356f7.netlify.app'];

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: function (origin, callback) {
      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);  // Allow the request
      } else {
        callback(new Error('Not allowed by CORS'));  // Reject the request
      }
    },
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, // If you need to send cookies or authentication headers
  };
  
  // Use the CORS middleware with the options
  app.use(cors(corsOptions));
  
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
