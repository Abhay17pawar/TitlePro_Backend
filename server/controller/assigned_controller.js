const { StatusCodes } = require("http-status-codes");
const AssignedRepository = require("../repositories/assigned_repository");
const AssignedService = require("../services/assigned_service");
const errorResponse = require("../utils/error_response");


const assignedService = new AssignedService(new AssignedRepository())


async function createAssigned(req, res) {
    try{
        let data = await assignedService.createAssigned(req.body)
        data = {id:data.id, product:data.assigned_name};
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


module.exports = {
    createAssigned,
}