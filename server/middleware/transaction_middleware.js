


const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")

function createTransactionValidator(req, res, next) {

    if(!req.body.product_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("product_name")))
    }
    if(!req.body.transaction_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("transaction_name")))
    }
    if(!req.body.productId) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("productId")))
    }
    next()
}


function updateTransactionValidator(req, res, next){

    if(!req.body.transaction_name) {
       return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("transaction_name")))
    }
    next()
}



module.exports = {
    createTransactionValidator,
    updateTransactionValidator,
}