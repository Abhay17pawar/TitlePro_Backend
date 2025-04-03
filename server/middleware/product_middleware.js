const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")


function createProductValidator(req, res, next) {

    if(!req.body.product_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("product_name")))
    }
    next()
}



function updateProductValidator(req, res, next){
    if(!req.body.product_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("product_name")))
    }
    next()
}


module.exports = {
    createProductValidator,
    updateProductValidator,
}