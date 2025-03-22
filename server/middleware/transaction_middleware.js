
// const {StatusCodes, ReasonPhrases} = require("http-status-codes");
// const errorResponse = require("../utils/error_response");

const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")

// const BadRequest = require("../errors/bad_request_error");
function createTransactionValidator(req, res, next) {

    if(!req.body.product_name) {
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("product_name")))
    }
    if(!req.body.transaction_name) {
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("transaction_name")))
    }
    if(!req.body.productId) {
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("productId")))
    }


    // If Everything is Good then call next()
    next()
}

module.exports = {
    createTransactionValidator,
}