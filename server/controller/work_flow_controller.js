const WorkFlowRepository = require("../repositories/work_flow_respository");
const WorkFlowService = require("../services/work_flow_service");
const errorResponse = require("../utils/error_response");

const workFlowService = new WorkFlowService(new WorkFlowRepository())



async function createWorkFlow(req, res) {
    try{
        let data = await workFlowService.createWorkFlow(req.body)
        data = {id:data.id, work_name:data.work_name};
        res.send({
        // res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Work Created Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside createWorkFlow Controller during createWorkFlow...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}


module.exports = {
    createWorkFlow,
}