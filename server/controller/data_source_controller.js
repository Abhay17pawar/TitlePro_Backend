const { StatusCodes } = require("http-status-codes");
const DataSourceRepository = require("../repositories/data_source_repository");
const DataSourceService = require("../services/data_source_service");
const errorResponse = require("../utils/error_response");
const BadRequest = require("../errors/badd_request");


const dataSourceService = new DataSourceService( new DataSourceRepository);



async function createDataSource(req, res) {
    try{
        let newProduct = await dataSourceService.createDataSource(req.body)

        newProduct = {id:newProduct.id, sourceName:newProduct.source_name};
        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Source Created Successfully ",
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Data Source Controller during createDataSource...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function getDataSources(req, res) {
    try{
        let newProduct = await dataSourceService.getDataSources()
        newProduct = newProduct.map((data) => {
            return {id:data.id, sourceName:data.source_name};
        })
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Source Fetch Successfully ",
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Data Source Controller during getDataSources...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function deleteDataSource(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let newProduct = await dataSourceService.deleteDataSource(id)
        // newProduct = newProduct.map((data) => {
        //     return {id:data.id, sourceName:data.source_name};
        // })
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Source Delete Successfully ",
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Data Source Controller during deleteDataSource...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}



module.exports = {
    createDataSource,
    getDataSources,
    deleteDataSource,
}