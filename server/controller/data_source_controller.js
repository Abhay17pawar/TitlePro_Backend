const { StatusCodes } = require("http-status-codes");
const DataSourceRepository = require("../repositories/data_source_repository");
const DataSourceService = require("../services/data_source_service");
const errorResponse = require("../utils/error_response");


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



module.exports = {
    createDataSource,
}