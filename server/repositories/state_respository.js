const State = require("../model/state")

class StateRepository {

    async createState(state_name){
        try{
            const response = await State.create({
                state_name
            });
            return response;
        }
        catch(error){
            console.log("State Repository....", error)
            // throw error;
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw error;
              } else {
                console.error('Error creating state:', error);
                throw error; // Re-throw other errors
              }
        }
    }
}


module.exports = StateRepository;