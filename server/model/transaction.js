
const Sequelize  = require("sequelize")
const db = require("../config/db_config")


const Transaction = db.define("transaction", {
  transaction_name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,    // Enables createdAt & updatedAt
  paranoid: true       // Enables deletedAt for soft delete
})


module.exports = Transaction;