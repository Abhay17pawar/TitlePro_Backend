

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
            console.log("Service layer creating state error....", error);
            throw error;
        }
    }







}


module.exports = StateService;