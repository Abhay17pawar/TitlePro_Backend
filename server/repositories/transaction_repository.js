const InternalServerError = require("../errors/internal_server_error");
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
            console.log("Error Inside Transaction Respository during createTransaction...", error)
            throw error;
        }

    }


    async getTransactions() {
        try{
            const response = await Transaction.findAll();
            return response;
        }
        catch(error) {
            console.log("Error Inside Transaction Respository during getTransactions...", error)
            throw error;
        }
    }
    async getTransaction(id) {
        try{
            const response = await Transaction.findByPk(id);
            return response;
        }
        catch(error) {
            console.log("Error Inside Transaction Respository during getTransaction...", error)
            throw new InternalServerError();
        }
    }

    async getTransactionWithProductId(productId) {
        try{
            const response = await Transaction.findAll({
                where: { productId }, 
                attributes: ["transaction_name"], 
            });
            return response;
        }
        catch(error) {
            console.log("Error Inside Transaction Respository during getTransactionWithProductId...", error)
            throw error;
        }
    }


    async deleteTransaction(id){
        try{
            const response = await Transaction.destroy({
                where:{
                    id:id,
                }
            });
            return response;
        }
        catch(error) {
            console.log("Error Inside Transaction Respository during deleteTransaction...", error)
            throw error;
        }
    }


    async updateTransaction(id, transaction_name){
        try{
            const response = await Transaction.update({
                transaction_name,
            }, {
                where:{
                    id:id,
                }
            });
            return response;
        }
        catch(error) {
            console.log("Error Inside Transaction Respository during updateTransaction...", error)
            throw error;
        }
    }
}

module.exports = TransactionRepository;