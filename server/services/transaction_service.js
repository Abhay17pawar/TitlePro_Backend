const ConflictError = require("../errors/conflict_error");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const Sequelize = require("sequelize");


class TransactionService {
    constructor(repository, productRepository){
        this.repository = repository;
        this.productRepository = productRepository;
    }

    async createTransaction(data){
        try{
            const {transaction_name, product_name, productId} = data;
            const response = await this.productRepository.getProduct(productId)
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
            if(error instanceof Sequelize.UniqueConstraintError){
                throw new ConflictError(error.errors[0].message|| "Duplicate entry for product")
            }
            console.log("Error Inside Transaction Service during createTransaction...", error)
            throw new InternalServerError()
        }
    }

    async getTransactions() {
        try{
            const response = await this.repository.getTransactions();
            return response;
        }
        catch(error){
            console.log("Error Inside Transaction Service during getTransactions...", error)
            throw new InternalServerError()
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
            console.log("Error Inside Transaction Service during getTransaction...", error)
            throw new InternalServerError()
        }
    }

    async getTransactionWithProductId(productId){
        try{
            const newTransaction = await this.repository.getTransactionWithProductId(productId);
            return newTransaction;
        }
        catch(error){
            console.log("Error Inside Transaction Service during getTransactionWithProductId...", error)
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
            console.log("Error Inside Transaction Service during deleteTransaction...", error)
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
            console.log("Error Inside Transaction Service during updateTransaction...", error)
            throw new InternalServerError()
        }
    }
}


module.exports = TransactionService;


