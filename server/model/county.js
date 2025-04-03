const db = require("../config/db_config");

const Sequelize = require("sequelize");


const County = db.define("county", {

    county_name:{
        type: Sequelize.STRING,    
        allowNull: false,
      },
      state_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "states", // Foreign key reference
            key: "id",
        }
    }
}, {
    indexes: [
      {
          unique: true,  
          fields: ['county_name', 'state_name'] // Prevents duplicate state for same county
      }
  ],
    timestamps: true,
    paranoid: true       // Enables deletedAt for soft delete
  })


module.exports = County;