const { StatusCodes } = require("http-status-codes");
const AssignedRepository = require("../repositories/assigned_repository");
const AssignedService = require("../services/assigned_service");
const errorResponse = require("../utils/error_response");
const BadRequest = require("../errors/badd_request");


const assignedService = new AssignedService(new AssignedRepository())


async function createAssigned(req, res) {
    try{
        let data = await assignedService.createAssigned(req.body)
        data = {id:data.id, assigned_name:data.assigned_name};
        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Assigned Created Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside createAssigned Controller during createProduct...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}


async function getAssigneds(req, res) {
    try{
        let data = await assignedService.getAssigneds();
        data = data.map((item) => {
            return {id:item.id, assigned_name:item.assigned_name};
        })
        // data = {id:data.id, product:data.assigned_name};
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Assigned Fetch Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside createAssigned Controller during getAssigneds...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

async function getAssigned(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let data = await assignedService.getAssigned(id);
        // data = data.map((item) => {
        //     return {id:item.id, assigned_name:item.assigned_name};
        // })
        data = {id:data.id, product:data.assigned_name};
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Assigned Fetch Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside getAssigned Controller during getAssigneds...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function deleteAssigned(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let data = await assignedService.deleteAssigned(id);
        data = {id:data.id, product:data.assigned_name};
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Assigned Delete Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside deleteAssigned Controller during deleteAssigned...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function updateAssigned(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let data = await assignedService.updateAssigned(id, req.body);
        data = {id:data.id, product:data.assigned_name};
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Assigned Update Successfully ",
            data: data,
        })
    }
    catch(error) {
        console.log("Error Inside updateAssigned Controller during updateAssigned...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}


module.exports = {
    createAssigned,
    getAssigneds,
    getAssigned,
    deleteAssigned,
    updateAssigned,
}