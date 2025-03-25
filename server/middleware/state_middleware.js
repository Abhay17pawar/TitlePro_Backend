

const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")

function createStateValidator(req, res, next) {

    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }


    // If Everything is Good then call next()
    next()
}
function updateStateValidator(req, res, next) {

    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }


    // If Everything is Good then call next()
    next()
}






module.exports = {
    createStateValidator,
    updateStateValidator,
    
}