const Sequelize = require('sequelize');
const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME } = require('./server_config');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect:'postgres', 
});


module.exports = sequelize;