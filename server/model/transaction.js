const pool = require("../config/database");

// Function to create the Transaction table
const createTransactionsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        transaction_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      );
    `;
  await pool.query(query);
  console.log("✅ Transaction table created successfully!");
};

createTransactionsTable();

const TransactionSummary = {
  // Get an order summary by order_number from order_entries
  // Create a new transaction
  createTransaction: async ({ transaction_name }) => {
    // const client = await pool.connect(); // Get a database client from the pool

    try {
    //   await client.query("BEGIN"); // Start transaction

      const query = `
              INSERT INTO transactions (transaction_name)
              VALUES ($1) RETURNING *;
            `;

      const values = [transaction_name];
      const result = await pool.query(query, values); // Execute the query

      return result.rows[0]; // Return the inserted row
    } 
    catch (error) {
      await client.query("ROLLBACK"); // Rollback if an error occurs
      console.error("Transaction failed:", error);
      throw error; // Rethrow the error for handling
    } 
    // finally {
    //   client.release(); // Release the database client back to the pool
    // }
  },
};

module.exports = TransactionSummary;
