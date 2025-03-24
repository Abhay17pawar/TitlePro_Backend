const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const StateRepository = require("../repositories/state_respository");
const StateService = require("../services/state_service");
const errorResponse = require("../utils/error_response");


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
        console.log("State Controller layer..", error)
        res.status(StatusCodes.CONFLICT).send(errorResponse(error.errors[0].message))

        // res.send({errorMessage:error})
        // res.send(error.errors[0].message)
    }
}


module.exports = {
    createState,
}