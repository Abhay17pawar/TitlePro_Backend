const Sequelize = require('sequelize');
const { DB_USER, DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME } = require('./server_config');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Enable SSL for remote database
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
    // pool: {
    //   max: 10,
    //   min: 0,
    //   acquire: 30000, // Increase connection acquire timeout (30 seconds)
    //   idle: 10000, // Increase idle timeout (10 seconds)
    // },
  });
  

module.exports = sequelize;