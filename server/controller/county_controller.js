const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const CountyRepository = require("../repositories/county_respository");
const CountyService = require("../services/county_service");
const errorResponse = require("../utils/error_response");
const StateRepository = require("../repositories/state_respository");


const countySevice = new CountyService(new CountyRepository(), new StateRepository());




async function createCounty(req, res) {
    try{
        const newState = await countySevice.createCounty(req.body)

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "New County Created... " + ReasonPhrases.CREATED,
            data: newState,
        })
    }
    catch(error) {
        console.log("County Controller layer..", error)
        if(error.name === "NotFoundError"){
           return res.status(error.statusCode).send(errorResponse(error.reason, error))
        }
        return res.status(StatusCodes.CONFLICT).send(errorResponse(error.errors[0].message))

    }
}


module.exports = {
    createCounty,
}