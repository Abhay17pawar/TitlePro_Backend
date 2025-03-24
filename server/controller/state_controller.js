const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const StateRepository = require("../repositories/state_respository");
const StateService = require("../services/state_service");


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
        console.log("Product Controller layer..", error)
        // res.status(error.statusCode).send(errorResponse(error.reason, error))
        // res.send({errorMessage:error})
    }
}


module.exports = {
    createState,
}