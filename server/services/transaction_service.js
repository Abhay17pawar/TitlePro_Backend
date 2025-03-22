

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
}


module.exports = TransactionService;


