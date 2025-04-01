
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")


function createAssignedValidator(req, res, next) {

    if(!req.body.assigned_name) {
        return res.send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("assigned_name")))
        // return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("assigned_name")))
    }



    next()
}



function updateAssignedValidator(req, res, next){
    if(!req.body.assigned_name) {
        return res.send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("assigned_name")))
        // return res.status(StatusCodes.BAD_REQUEST).send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("assigned_name")))
    }



    next()
}


module.exports = {
    createAssignedValidator,
    updateAssignedValidator,
}