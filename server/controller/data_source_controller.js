const { StatusCodes } = require("http-status-codes");
const DataSourceRepository = require("../repositories/data_source_repository");
const DataSourceService = require("../services/data_source_service");
const errorResponse = require("../utils/error_response");
const BadRequest = require("../errors/badd_request");


const dataSourceService = new DataSourceService( new DataSourceRepository);



async function createDataSource(req, res) {
    try{
        let newProduct = await dataSourceService.createDataSource(req.body)

        newProduct = {id:newProduct.id, source_name:newProduct.source_name};
        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message:  "Source Created Successfully ",
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
            return {id:data.id, source_name:data.source_name};
        })
        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: (!newProduct.length) ? "Data is not available..." : "Source Fetch Successfully ",
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
async function updateDataSource(req, res) {
    try{
        const id = req.params.id;
        if (!id || isNaN(id)) {
            throw new BadRequest(`Invalid ID:-> (${id})`, true);
        }
        let newProduct = await dataSourceService.updateDataSource(id, req.body)

        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Source Update Successfully ",
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Data Source Controller during updateDataSource...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}



module.exports = {
    createDataSource,
    getDataSources,
    deleteDataSource,
    updateDataSource,
}