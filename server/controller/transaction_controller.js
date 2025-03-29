const { StatusCodes } = require("http-status-codes");
const TransactionRepository = require("../repositories/transaction_repository");
const TransactionService = require("../services/transaction_service");
const BadRequest = require("../errors/badd_request");
const errorResponse = require("../utils/error_response");
const ProductRepository = require("../repositories/product_respository");



const transactionService = new TransactionService(new TransactionRepository(), new ProductRepository());

async function createTransaction(req, res) {
    try{
        const data = await transactionService.createTransaction(req.body)
        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Transaction Created... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during createTransaction...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))

    }

}
async function getTransactions(req, res) {
    try{
        const data = await transactionService.getTransactions()
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message:(!data.length) ? "No Transactions Available..." :  "Transaction Fetch Successfully... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during getTransactions...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))


    }

}
async function getTransaction(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID :-> (${id}) `, true);
        }
        const data = await transactionService.getTransaction(id)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Fetch Successfully... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during getTransaction...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))

    }

}
async function getTransactionWithProductId(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID :-> (${id}) `, true);
        }
        const data = await transactionService.getTransactionWithProductId(req.params.id)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Fetch Successfully... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during getTransactionWithProductId...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))

    }

}


async function deleteTransaction(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID :-> (${id}) `, true);
        }
        const data = await transactionService.deleteTransaction(req.params.id)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Delete Successfully... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during deleteTransaction...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))

    }

}
async function updateTransaction(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID :-> (${id}) `, true);
        }
        const data = await transactionService.updateTransaction(id, req.body)
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Transaction Update Successfully... ",
            data: data,
        })
    }
    catch(error){
        console.log("Error Inside Transaction Controller during getTransactionWithProductId...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }

}

module.exports = {
    createTransaction,
    getTransactionWithProductId,
    deleteTransaction,
    updateTransaction,
    getTransactions,
    getTransaction,
}