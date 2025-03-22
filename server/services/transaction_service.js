const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");


class TransactionService {
    constructor(repository){
        this.repository = repository;
    }

    async createTransaction(data){
        try{
            const {transaction_name, product_name, productId} = data;
            const newTransaction = await this.repository.createTransaction(transaction_name, product_name, productId);
            return newTransaction;
        }
        catch(error){
            console.log("Transaction Service layer error...", error);
        }
    }
    async getTransactionWithProductId(productId){
        try{
            const newTransaction = await this.repository.getTransactionWithProductId(productId);
            return newTransaction;
        }
        catch(error){
            console.log("Transaction Service layer error...", error);
        }
    }
    async deleteTransaction(id){
        try{
            const data = await this.repository.deleteTransaction(id);
            if(!data){
                throw new NotFoundError("Category", "id", id)
            }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Transaction Service layer error...", error);
            throw new InternalServerError()
        }
    }
}


module.exports = TransactionService;


