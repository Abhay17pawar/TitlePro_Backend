

const {  ReasonPhrases } = require("http-status-codes")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")


function createWorkFlowValidator(req, res, next) {

    if(!req.body.work_name) {
        return res.send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("work_name")))
    }
    next()
}



function updateWorkFlowValidator(req, res, next){
    if(!req.body.work_name) {
        return res.send(errorResponse(ReasonPhrases.BAD_REQUEST, new BadRequest("work_name")))
    }
    next()
}


module.exports = {
    createWorkFlowValidator,
    updateWorkFlowValidator,
}