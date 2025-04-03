const Sequelize = require("sequelize");
const db = require("../config/db_config");

const Product = db.define("product", {
    product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate:{
            len:[3, 20],
            is: /^[A-Za-z/ ]+$/i, // Allows only letters and '/'
        },
    }
}, {
    timestamps: true,    // Enables createdAt & updatedAt
    paranoid: true       // Enables deletedAt for soft delete
  })


module.exports = Product;

