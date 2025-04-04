
const ConflictError = require("../errors/conflict_error");
const CustomError = require("../errors/custom_error");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const Sequelize = require("sequelize");

class WorkFlowService {

    constructor(repository) {
        this.repository = repository;
    }
    async createWorkFlow(productDetails) {
        try{
            const {work_name} = productDetails;
            let newProduct = await this.repository.createWorkFlow(work_name);
            return newProduct;
        }
        catch(error){
            console.log("Error Inside AssignedService Service during createProduct...", error)
            if(error instanceof Sequelize.UniqueConstraintError){
                throw new ConflictError(error.errors[0].message|| "Duplicate entry for product")
            }
            if(error.name === "ConflictError"){
                throw error;
            }
            if(error.name === "SequelizeValidationError"){
                console.log("error is:", error)
                let reason = error.errors[0].value;
                throw new CustomError(`Product name (${reason}) is invalid...`,)
            }
            
            throw new InternalServerError()
        }

    }
    
    async getWorkFlows() {
        try{
            const data = await this.repository.getWorkFlows();
            return data;
        }
        catch(error){
            console.log("Error Inside AssignedService Service during getWorkFlows...", error)
            throw new InternalServerError()
        }

    }
    


    async getWorkFlow(id) {
        try{
            const data = await this.repository.getWorkFlow(id)
            if(!data){
                throw new NotFoundError("Wrok Flow", "id", id)
            }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Error Inside Product Service during getProduct...", error)
            throw new InternalServerError()
        }

    }




    async deleteWorkFlow(id) {
        try{
            const data = await this.repository.deleteWorkFlow(id)
            if(!data){
                throw new NotFoundError("Work Flow", "id", id)
            }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Error Inside AssignedService Service during deleteProduct...", error)
            throw new InternalServerError()
        }
    }

    async updateWorkFlow(id, updatedata) {
        const {work_name} = updatedata;
        try{
            let data = await this.repository.updateWorkFlow(id, work_name);
            if(data[0] == 0){
                throw new NotFoundError("Work Flow", "id", id)
            }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            throw new InternalServerError()
        }

    }

}


module.exports = WorkFlowService;