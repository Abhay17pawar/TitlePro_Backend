const BadRequest = require("../errors/badd_request");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");


class TransactionService {
    constructor(repository, productRepository){
        this.repository = repository;
        this.productRepository = productRepository;
    }

    async createTransaction(data){
        try{
            const {transaction_name, product_name, productId} = data;
            // await this.getTransaction(productId)
            const response = await this.productRepository.getProduct(productId)
            console.log("data is:-", response);
            if(!response){
                throw new NotFoundError("Product", "id", productId)
            }
            const newTransaction = await this.repository.createTransaction(transaction_name, product_name, productId);
            return newTransaction;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Transaction Service layer error...", error);
            throw new InternalServerError()
        }
    }

    async getTransactions() {
        try{
            const response = await this.repository.getTransactions();
            return response;
        }
        catch(error){
            console.log("Transaction Service layer error...", error);
        }
    }
    async getTransaction(id) {
        try{
            const response = await this.repository.getTransaction(id);
            if(!response){
                throw new NotFoundError("Transaction", "id", id)
            }
            return response;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Transaction Service layer error...", error);
            throw new InternalServerError()
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
                throw new NotFoundError("Transaction", "id", id)
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
    async updateTransaction(id, updatedData){
        try{
            const data = await this.repository.updateTransaction(id, updatedData.transaction_name);
            console.log("receive data from updating..", data)
            if(data[0] == 0){
                throw new NotFoundError("Transaction", "id", id)
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


