const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")


function createDataSourceValidator(req, res, next) {

    if(!req.body.source_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("source_name")))
    }



    // If Everything is Good then call next()
    next()
}



function updateDataSourceValidator(req, res, next){
    if(!req.body.source_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("source_name")))
    }



    // If Everything is Good then call next()
    next()
}


module.exports = {
    createDataSourceValidator,
    updateDataSourceValidator,
}