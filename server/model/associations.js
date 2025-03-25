const County = require("./county");
const Product = require("./product");
const State = require("./state");
const Transaction = require("./transaction");


Product.hasMany(Transaction, { foreignKey: 'productId'});
Transaction.belongsTo(Product, {foreignKey: 'productId'});


State.hasMany(County, { foreignKey: 'stateId'});
County.belongsTo(State, {foreignKey: 'stateId'});


module.exports = {
    Product, Transaction,
    State, County,
}