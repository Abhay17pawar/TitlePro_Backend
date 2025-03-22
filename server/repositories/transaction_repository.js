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

    async getTransactionWithProductId(productId) {
        try{
            const response = await Transaction.findAll({
                where: { productId }, // Filter by p_id
                attributes: ["transaction_name"], // Select only t_name field
            });
            console.log("response of creat transaction", response);
            return response;
        }
        catch(error) {
            console.log("Transaction Repository error...", error)
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
            console.log("Transaction Repository error...", error)
            throw error;
        }
    }
}


module.exports = TransactionRepository;