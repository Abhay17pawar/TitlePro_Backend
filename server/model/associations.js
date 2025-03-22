const Product = require("./product");
const Transaction = require("./transaction");


Product.hasMany(Transaction, { foreignKey: 'productId'});
Transaction.belongsTo(Product, {foreignKey: 'productId'});


module.exports = {
    Product, Transaction,
}