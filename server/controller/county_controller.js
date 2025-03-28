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
        return res.status(error.statusCode).send(errorResponse(error.reason, error))

    }
}


async function getCounties(req, res) {
    try{
        const data = await countySevice.getCounties();
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: (!data.length) ? "Data is empty..." : "Counties get Successfully... ",
            data: data,
        })

    }
    catch(error) {
        console.log("County Controller layer geting all counties error...", error)
        return res.status(error.statusCode).send(errorResponse(error.reason, error))

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
async function getCountiesWithStateId(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:->(${id}) format`, true);
        }
        const data = await countySevice.getCountiesWithStateId(id);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Counties get Successfully... " + ReasonPhrases.OK,
            data: data,
        })

    }
    catch(error) {
        console.log("County Controller layer geting one county error..", error)
        return res.status(error.statusCode).send(errorResponse(error.reason, error));

    }
}
async function deleteCounty(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:->(${id}) format`, true);
        }
        const data = await countySevice.deleteCounty(id);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "County Delete Successfully... " + ReasonPhrases.OK,
            data: data,
        })

    }
    catch(error) {
        console.log("County Controller layer Deleting one county error..", error)
        return res.status(error.statusCode).send(errorResponse(error.reason, error));

    }
}
async function updateCounty(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:->(${id}) format`, true);
        }
        const data = await countySevice.updateCounty(id, req.body);
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "County Update Successfully... ",
            data: data,
        })

    }
    catch(error) {
        console.log("Error inside County Controller layer  updateCounty...", error)
        return res.status(error.statusCode).send(errorResponse(error.reason, error));

    }
}


module.exports = {
    createCounty,
    getCounties,
    getCounty,
    deleteCounty,
    getCountiesWithStateId,
    updateCounty,
}