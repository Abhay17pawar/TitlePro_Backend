const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const StateRepository = require("../repositories/state_respository");
const StateService = require("../services/state_service");
const errorResponse = require("../utils/error_response");
const BadRequest = require("../errors/badd_request");


const stateService = new StateService(new StateRepository());


async function createState(req, res) {
    try{
        const newState = await stateService.createState(req.body)

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "New State Created... " + ReasonPhrases.CREATED,
            data: newState,
        })
    }
    catch(error) {
        console.error('Error inside Controller layer during createState...', error);
        res.status(StatusCodes.CONFLICT).send(errorResponse(error.reason, error))

    }
}



async function getStates (req, res) {
    try{
        const data = await stateService.getStates();
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "All states fetch successfully...",
            data: data
        })
    }
    catch(error) {
        console.error('Error inside Controller layer during getStates...', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse(error.reason, error));
    }
}


async function getState (req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> ${id}`, true);
        }
        const data = await stateService.getState(req.params.id);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "State fetch successfully...",
            data: data
        })
    }
    catch(error) {
        console.error('Error inside Controller layer during getState...', error);
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

async function deleteState (req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest("Invalid state ID format", true);
        }
        const data = await stateService.deleteState(req.params.id);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "State delete successfully...",
            data: data
        })
    }
    catch(error) {
        console.error('Error inside Controller layer during deleteState...', error);
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function updateState (req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest("Invalid state ID format", true);
        }
        const data = await stateService.updateState(req.params.id, req.body);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "State Update successfully...",
            data: data
        })
    }
    catch(error) {
        console.error('Error inside Controller layer during updateState...', error);
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}


module.exports = {
    createState,
    getStates,
    getState,
    deleteState,
    updateState,
}