
// const BadRequest = require("../errors/badd_request");
const ConflictError = require("../errors/conflict_error");
const CustomError = require("../errors/custom_error");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const Sequelize = require("sequelize");

class AssignedService {
    constructor(repository) {
        this.repository = repository;
    }
    async createAssigned(productDetails) {
        try{
            const {assigned_name} = productDetails;
            let newProduct = await this.repository.createAssigned(assigned_name);
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
    
    async getAssigneds() {
        try{
            const data = await this.repository.getAssigneds();
            return data;
        }
        catch(error){
            console.log("Error Inside AssignedService Service during getAssigneds...", error)
            throw new InternalServerError()
        }

    }
    


    async getAssigned(id) {
        try{
            const data = await this.repository.getAssigned(id)
            if(!data){
                throw new NotFoundError("Assigned", "id", id)
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




    async deleteAssigned(id) {
        try{
            const data = await this.repository.deleteAssigned(id)
            if(!data){
                throw new NotFoundError("Assigned", "id", id)
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

    async updateAssigned(id, updatedata) {
        const {assigned_name} = updatedata;
        try{
            let data = await this.repository.updateAssigned(id, assigned_name);
            if(data[0] == 0){
                throw new NotFoundError("Assigned", "id", id)
            }
            return data;
        }
        catch(error){
            console.log("AssignedService Service layer....", error);
            if(error.name === "NotFoundError"){
                throw error;
            }
            throw new InternalServerError()
        }

    }

}


module.exports = AssignedService;