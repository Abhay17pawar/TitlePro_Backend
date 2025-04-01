const BadRequest = require("../errors/badd_request");
const WorkFlowRepository = require("../repositories/work_flow_respository");
const WorkFlowService = require("../services/work_flow_service");
const errorResponse = require("../utils/error_response");

const workFlowService = new WorkFlowService(new WorkFlowRepository())



async function createWorkFlow(req, res) {
    try{
        let data = await workFlowService.createWorkFlow(req.body)
        
        function formatDate(dateStr) {
            const date = new Date(dateStr);

            const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
            });
    
        // Adjust format to match "MM/DD/YYYY HH:mm"
            const formatted = formattedDate.replace(",", "");
            return formatted;
        }
        data = {id:data.id, work_name:data.work_name, CratedBy:data.createdBy, CreatedOn:formatDate(data.createdAt), LastModifyOn:formatDate(data.updatedAt)};

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


async function getWorkFlows(req, res) {
    try{
        let data = await workFlowService.getWorkFlows()
        // data = {id:data.id, work_name:data.work_name};

        function formatDate(dateStr) {
            const date = new Date(dateStr);

            const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
            });
    
        // Adjust format to match "MM/DD/YYYY HH:mm"
            const formatted = formattedDate.replace(",", "");
            return formatted;
        }


        data = data.map((item) => {
            return {id:item.id, work_name:item.work_name, CratedBy:item.createdBy, CreatedOn:formatDate(item.createdAt), LastModifyOn:formatDate(item.updatedAt)}
        })
        res.send({
        // res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Work Fetch Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside getWorkFlows Controller during getWorkFlows...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}


async function getWorkFlow(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let data = await workFlowService.getWorkFlow(id)
        
        function formatDate(dateStr) {
            const date = new Date(dateStr);

            const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour format
            });
    
        // Adjust format to match "MM/DD/YYYY HH:mm"
            const formatted = formattedDate.replace(",", "");
            return formatted;
        }
        data = {id:data.id, work_name:data.work_name, CratedBy:data.createdBy, CreatedOn:formatDate(data.createdAt), LastModifyOn:formatDate(data.updatedAt)};
        res.send({
        // res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Work fetch Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside getWorkFlow Controller during getWorkFlow...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function deleteWorkFlow(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        await workFlowService.deleteWorkFlow(id)
        
        res.send({
        // res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Work Delete Successfully ",
            data: {},
        })
    }
    catch(error) {
        console.log("Error Inside deleteWorkFlow Controller during deleteWorkFlow...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function updateWorkFlow(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        await workFlowService.updateWorkFlow(id, req.body)
        
        res.send({
        // res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Work Update Successfully ",
            data: {},
        })
    }
    catch(error) {
        console.log("Error Inside deleteWorkFlow Controller during deleteWorkFlow...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

module.exports = {
    createWorkFlow,
    getWorkFlows,
    getWorkFlow,
    deleteWorkFlow,
    updateWorkFlow,
}