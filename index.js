const express = require("express");
require("dotenv").config();
const pool = require("./server/config/database");
const userRouter = require("./server/router/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./server/config/db_config");
const { PORT, DB_FORCE, DB_ALTER } = require("./server/config/server_config");

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.text()) // for validating the text data
app.use(bodyParser.urlencoded({extended:true})) // for validating the data incoming through body

const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://resonant-sunflower-57a3dc.netlify.app",
        "http://localhost:5173"
      ];
  
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // If the origin is in the list, allow it, or allow no origin for requests without one (like from Postman or server-to-server)
        callback(null, true);
      } else {
        // Reject the request if the origin is not allowed
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET, POST, PUT, DELETE, OPTIONS',  // Specify allowed methods, including OPTIONS for preflight requests
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',  // Allowed headers
    credentials: true,  // Allow sending cookies or authentication headers
  };
  
  // Use the CORS middleware with the options
   app.use(cors(corsOptions));  

// Database Connection Test
pool.connect()
    .then(() => console.log("✅ PostgreSQL Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

// Routes
app.use("", userRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    if(DB_FORCE === true){
      console.log("db force true called..")
      await db.sync({force: true});
    }
    else if (DB_ALTER === true){
        await db.sync({alter:true})
    }
    else{
        await db.sync()
        console.log("Db connected with sequelize...")
    }
});
