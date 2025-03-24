

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
            console.log("State Service error....", error)
        }
    }
}


module.exports = StateService;