const Sequelize = require("sequelize");
const db = require("../config/db_config");

const State = db.define("state", {
    state_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
    }
}, {
    timestamps: true,    // Enables createdAt & updatedAt
    paranoid: true       // Enables deletedAt for soft delete
  })


module.exports = State;