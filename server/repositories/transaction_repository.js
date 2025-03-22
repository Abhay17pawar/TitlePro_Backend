const Transaction = require("../model/transaction");
class TransactionRepository {
    async createTransaction(transaction_name, product_name, productId) {

        try{
            const response = await Transaction.create({
                transaction_name, product_name, productId
            })
            console.log("response of creat transaction", response);
            return response;
        }
        catch(error) {
            console.log("Transaction Repository error...", error)
            throw error;
        }

    }
}


module.exports = TransactionRepository;