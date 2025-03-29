
const Sequelize = require("sequelize");
const db = require("../config/db_config");

const DataSource = db.define("data_source", {
    source_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate: {
            notEmpty: { msg: "Source name cannot be empty" },
            len: { args: [3, 20], msg: "Source name must be between 3 and 20 characters" },
            is: {
                args: /^[A-Za-z/]+$/,
                msg: "Source name can only contain letters and '/'"
            }
        }
    }
}, {
    timestamps: true,    // Enables createdAt & updatedAt
    paranoid: true       // Enables deletedAt for soft delete
});

module.exports = DataSource;
