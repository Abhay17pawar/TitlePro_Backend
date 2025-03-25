const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const CountyRepository = require("../repositories/county_respository");
const CountyService = require("../services/county_service");
const errorResponse = require("../utils/error_response");
const StateRepository = require("../repositories/state_respository");
const BadRequest = require("../errors/badd_request");


const countySevice = new CountyService(new CountyRepository(), new StateRepository());




async function createCounty(req, res) {
    try{
        const data = await countySevice.createCounty(req.body)

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "New County Created... " + ReasonPhrases.CREATED,
            data: data,
        })
    }
    catch(error) {
        console.log("County Controller layer creating county error..", error)
        if(error.name === "NotFoundError"){
           return res.status(error.statusCode).send(errorResponse(error.reason, error))
        }
        return res.status(StatusCodes.CONFLICT).send(errorResponse(error.errors[0].message))

    }
}


async function getCounties(req, res) {
    try{
        const data = await countySevice.getCounties();
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "All County get Successfully... " + ReasonPhrases.OK,
            data: data,
        })

    }
    catch(error) {
        console.log("County Controller layer geting all counties error..", error)

    }
}

async function getCounty(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:->(${id}) format`, true);
        }
        const data = await countySevice.getCounty(id);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "County get Successfully... " + ReasonPhrases.OK,
            data: data,
        })

    }
    catch(error) {
        console.log("County Controller layer geting one county error..", error)
        return res.status(error.statusCode).send(errorResponse(error.reason, error));

    }
}


module.exports = {
    createCounty,
    getCounties,
    getCounty,
}