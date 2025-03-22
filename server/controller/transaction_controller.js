const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const TransactionRepository = require("../repositories/transaction_repository");
const TransactionService = require("../services/transaction_service");



const transactionService = new TransactionService(new TransactionRepository());

async function createTransaction(req, res) {
    try{
        const data = await transactionService.createTransaction(req.body, req.params.id)
        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Transaction Created" + ReasonPhrases.OK,
            data: data,
        })
    }
    catch(error){
        console.log("Transaction controller layer error...", error)
    }

}
async function getTransactionWithProductId(req, res) {
    try{
        const data = await transactionService.getTransactionWithProductId(req.params.id)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Fetch Successfully.. " + ReasonPhrases.OK,
            data: data,
        })
    }
    catch(error){
        console.log("Transaction controller layer error...", error)
    }

}

module.exports = {
    createTransaction,
    getTransactionWithProductId,
}