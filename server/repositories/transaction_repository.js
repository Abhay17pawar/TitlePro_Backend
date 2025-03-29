const InternalServerError = require("../errors/internal_server_error");
const ConflictError = require("../errors/conflict_error");
const Transaction = require("../model/transaction");
class TransactionRepository {
    async createTransaction(transaction_name, product_name, productId) {

        try {
            // Check if the transaction exists (including soft-deleted ones)
            const existingProduct = await Transaction.findOne({
                where: { transaction_name },
                paranoid: false // Include soft-deleted records
            });
            if (existingProduct) {
                // If it's soft-deleted, restore it
                if (existingProduct.deletedAt) {
                    await existingProduct.restore();
                    return existingProduct; // Return the restored product
                } 
                throw new ConflictError("Duplicate entry is not allowed...");
            }
    
            // If not found, create a new transaction
            const newProduct = await Transaction.create({ transaction_name, product_name, productId });
            return newProduct;
        } catch (error) {
            console.error("Error in create Transaction:-> ", error);
            if(error.name === "ConflictError"){
                throw error;
            }
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

    async updateTransactionWithProductName(id, product_name){
        try{
            const response = await Transaction.update({
                product_name,
            }, {
                where:{
                    productId:id,
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