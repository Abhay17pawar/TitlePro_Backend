
const Sequelize  = require("sequelize")
const db = require("../config/db_config");
const Product = require("./product");


const Transaction = db.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  transaction_name:{
    type: Sequelize.STRING,    
    allowNull: false,
    // unique:true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
        model: Product, // Foreign key reference
        key: "id",
    }
}
}, {
  indexes: [
      {
          unique: true,  // Ensures uniqueness
          fields: ['transaction_name', 'product_name'] // Prevents duplicate product for same transaction
      }
  ],
  timestamps: true,    // Enables createdAt & updatedAt
  paranoid: true       // Enables deletedAt for soft delete
})


module.exports = Transaction;

