const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")


function createCountyValidator(req, res, next) {

    if(!req.body.county_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("county_name")))
    }
    if(!req.body.state_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("state_name")))
    }
    if(!req.body.stateId) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("stateId")))
    }


    // If Everything is Good then call next()
    next()
}

function updateCountyValidator(req, res, next) {

    if(!req.body.county_name) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("county_name")))
    }



    // If Everything is Good then call next()
    next()
}


module.exports = {
    createCountyValidator,
    updateCountyValidator,
}