

const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")

function createStateValidator(req, res, next) {

    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }
    next()
}
function updateStateValidator(req, res, next) {

    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }
    next()
}
function restoreStateValidator(req, res, next) {

    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }
    next()
}






module.exports = {
    createStateValidator,
    updateStateValidator,
    restoreStateValidator,
    
}