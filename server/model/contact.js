const pool = require("../config/database");

// Function to create the Contacts table
const createContactsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      phone VARCHAR(250) NOT NULL,
      email VARCHAR(250) UNIQUE NOT NULL,
      type VARCHAR(250) NOT NULL,
      address TEXT,
      state_name VARCHAR(150),
      county_name VARCHAR(150),
      status VARCHAR(120) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL
    );
  `;
  await pool.query(query);
  console.log("✅ Contacts table created successfully");
};

// Run the function to create the table
// createContactsTable();

const Contact = {
  // Create a new contact   
  create: async (user_id, { name, phone, email, type, address, state_name , county_name, status,  }) => {
    try {
      // Check if the email or phone already exists in the database
      const checkQuery = `
        SELECT 1 FROM contacts 
        WHERE email = $1 OR phone = $2
        LIMIT 1;
      `;
      const checkValues = [email, phone];
      const checkResult = await pool.query(checkQuery, checkValues);
  
      if (checkResult.rows.length > 0) {
        // If email or phone already exists, throw an error
        throw new Error("Email or phone number already exists.");
      }
  
      // Proceed with the insert if no duplicate is found
      const query = `
        INSERT INTO contacts (name, phone, email, type, address, state_name, county_name, status, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;
      const values = [name, phone, email, type, address, state_name, county_name, status, user_id];
      const result = await pool.query(query, values);
  
      return result.rows[0];  // Return the newly created contact
    } catch (error) {
      console.error("Error creating contact:", error.message);
      throw error;  // Re-throw the error so it can be caught by your controller
    }
  },  

  // Get all contacts
  findAll: async () => {
    const query = `SELECT * FROM contacts WHERE deleted_at IS NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },
  
  // Get all deleted contacts
  findDeleted : async () => {
    const query = `SELECT * FROM contacts WHERE deleted_at IS NOT NULL;`;
    const result = await pool.query(query);
    return result.rows;
  },



findById: async (id) => {
  try {
    const query = `SELECT type, state_name, county_name FROM contacts WHERE id = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      console.log("No contact found with ID:", id);
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    console.error("Database error in findById:", error);
    throw error;
  }
},




update: async (id, { name, email, phone, type, address, state_name, county_name, status }) => {
  // First check if contact exists
  const checkQuery = 'SELECT id FROM contacts WHERE id = $1 AND deleted_at IS NULL';
  const checkResult = await pool.query(checkQuery, [id]);
  
  if (checkResult.rows.length === 0) {
    throw new Error('Contact not found');
  }

  // If contact exists, proceed with update
  const updateQuery = `
    UPDATE contacts 
    SET name = $1, email = $2, phone = $3, type = $4, address = $5, state_name = $6, county_name = $7, status = $8, updated_at = NOW()
    WHERE id = $9 AND deleted_at IS NULL 
    RETURNING *;
  `;
  const values = [name, email, phone, type, address, state_name, county_name, status, id];
  const result = await pool.query(updateQuery, values);
  
  return result.rows[0];
},



  softDelete: async (id) => {
    try {
      const query = `
        DELETE FROM contacts 
        WHERE id = $1 
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error soft deleting contact:", error.message);
      throw error;
    }
  },

};  

module.exports = Contact;
