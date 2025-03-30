const ConflictError = require("../errors/conflict_error");
const CustomError = require("../errors/custom_error");
const InternalServerError = require("../errors/internal_server_error");
const Sequelize = require("sequelize");



class DataSourceService {
    constructor(repository) {
        this.repository = repository;
    }

    async createDataSource(sourceDetails) {
        try{
            const {source_name} = sourceDetails;
            let newProduct = await this.repository.createDataSource(source_name);
            return newProduct;
        }
        catch(error){
            console.log("Error Inside Product Service during createProduct...", error)
            if(error instanceof Sequelize.UniqueConstraintError){
                throw new ConflictError(error.errors[0].message|| "Duplicate entry for product")
            }
            if(error.name === "ConflictError"){
                throw error;
            }
            if(error.name === "SequelizeValidationError"){
                console.log("error is:", error)
                let reason = error.errors[0].value;
                let errorReason = (reason.length < 3) ? "contains atleast 3 characters." : reason;
                throw new CustomError(`Source name (${errorReason}) is invalid...`,)

            }
            
            throw new InternalServerError()
        }

    }



    async getDataSources(){
        try{
            const response = await this.repository.getDataSources();
            return response;
        }
        catch(error) {
            console.log("Error Inside Product Service during getDataSources...", error)
            throw error;

        }
    }



}



module.exports = DataSourceService;