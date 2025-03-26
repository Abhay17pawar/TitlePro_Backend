const Sequelize = require("sequelize");
const db = require("../config/db_config");

const Product = db.define("product", {
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
    }
}, {
    timestamps: true,    // Enables createdAt & updatedAt
    paranoid: true       // Enables deletedAt for soft delete
  })


module.exports = Product;

