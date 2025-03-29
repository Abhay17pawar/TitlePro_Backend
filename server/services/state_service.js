const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const Sequelize = require("sequelize");
const ConflictError = require("../errors/conflict_error");
const BadRequest = require("../errors/badd_request");
class StateService {
    constructor(respository){
        this.respository = respository;
    }

    async createState (stateDetails) {
        try{
            const {state_name} = stateDetails;
            const response = await this.respository.createState(state_name);
            return response;
        }
        catch(error){
            console.error('Error inside Service layer during createState...', error);
            if(error instanceof Sequelize.UniqueConstraintError){
                throw new ConflictError(error.errors[0].message|| "Duplicate entry for product")
            }
            if(error.name === "ConflictError"){
                throw error;
            }
            throw new InternalServerError();
        }
    }
    async getStates () {
        try{
            const response = await this.respository.getStates();
            return response;
        }
        catch(error){
            console.error('Error inside Service layer during getStates...', error);
            throw new InternalServerError();
        }
    }

    async getAllStates () {
        try{
            const response = await this.respository.getAllStates();
            return response;
        }
        catch(error){
            console.error('Error inside Service layer during getAllStates...', error);
            throw new InternalServerError();
        }
    }


    async getState (id) {
        try{

            const response = await this.respository.getState(id);
            if(!response){
                throw new NotFoundError("State", "id", id)
            }
            return response;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.error('Error inside Service layer during getState...', error);
            throw new InternalServerError();
        }
    }

    
    async deleteState (id) {
        try{

            const response = await this.respository.deleteState(id);
            if(!response){
                throw new NotFoundError("State", "id", id)
            }
            return response;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.error('Error inside Service layer during deleteState...', error);
            throw new InternalServerError();
        }
    }
    async restoreDeleteState (stateDetails) {
        try{
            const {state_name} = stateDetails;
            const response = await this.respository.restoreDeleteState(state_name);
            console.log("response of :-", response)
            // if(!response){
            //     throw new NotFoundError("State", "id", id)
            // }
            if(response === 0){
                throw new BadRequest("Please Provide a valid state_name", true)
            }
            return response;
        }
        catch(error){
            if(error.name === "BadRequest"){
                throw error;
            }
            console.error('Error inside Service layer during restoreDeleteState...', error);
            throw new InternalServerError();
        }
    }



    async updateState (id, updatedData) {
        try{

            const response = await this.respository.updateState(id, updatedData.state_name);
            if(response[0] == 0){
                
                throw new NotFoundError("State", "id", id)
            }
            return response;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.error('Error inside Service layer during updateState...', error);
            throw new InternalServerError();
        }
    }







}


module.exports = StateService;