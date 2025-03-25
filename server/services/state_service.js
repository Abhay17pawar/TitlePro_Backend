const BadRequest = require("../errors/badd_request");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");


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
            console.log("Service layer creating state error....", error);
            throw error;
        }
    }
    async getStates () {
        try{
            const response = await this.respository.getStates();
            return response;
        }
        catch(error){
            console.log("Service layer getting all states error....", error);
            throw error;
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
            console.log("Service layer getting single state error....", error);
            throw new InternalServerError();
        }
    }







}


module.exports = StateService;