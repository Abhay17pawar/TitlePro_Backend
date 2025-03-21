const { Pool } = require("pg");
require("dotenv").config();

// Create a pool instance with proper configurations
const pool = new Pool({
  user: process.env.DB_USER, 
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT, 
  // ssl: {
  //   rejectUnauthorized: false, // This is required for Render PostgreSQL
  // },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1); // Exit if database connection fails
  });

module.exports = pool;
