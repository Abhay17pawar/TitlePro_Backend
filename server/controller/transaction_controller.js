const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const TransactionRepository = require("../repositories/transaction_repository");
const TransactionService = require("../services/transaction_service");
const BadRequest = require("../errors/badd_request");
const errorResponse = require("../utils/error_response");



const transactionService = new TransactionService(new TransactionRepository());

async function createTransaction(req, res) {
    try{
        await Transaction.sync({ force: false }); // Creates the table if it doesn't exist

        const data = await transactionService.createTransaction(req.body)
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


async function deleteTransaction(req, res) {
    try{
        const data = await transactionService.deleteTransaction(req.params.id)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Delete Successfully.. " + ReasonPhrases.OK,
            data: data,
        })
    }
    catch(error){
        console.log("Transaction controller layer error...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))

    }

}
async function updateTransaction(req, res) {
    try{
        const data = await transactionService.updateTransaction(req.params.id, req.body)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Update Successfully.. " + ReasonPhrases.OK,
            data: data,
        })
    }
    catch(error){
        console.log("Transaction controller layer error...", error)
        console.log("Transaction controller layer status code is...", error.statusCode)
        console.log("Transaction controller layer reason is...", error.reason)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }

}

module.exports = {
    createTransaction,
    getTransactionWithProductId,
    deleteTransaction,
    updateTransaction,
}