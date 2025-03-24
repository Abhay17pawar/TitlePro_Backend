
const Sequelize  = require("sequelize")
const db = require("../config/db_config");
const Product = require("./product");


const Transaction = db.define("transaction", {
  transaction_name:{
    type: Sequelize.STRING,
    autoIncrement: true, 
    primaryKey: true,    
    allowNull: false,
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
  timestamps: true,    // Enables createdAt & updatedAt
  paranoid: true       // Enables deletedAt for soft delete
})


module.exports = Transaction;