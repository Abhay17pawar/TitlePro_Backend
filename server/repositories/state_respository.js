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
              } 
              else {
                console.error('Respository layer Error creating state:', error);
                throw error; // Re-throw other errors
              }
        }
    }

    async getStates() {
        try{
            const response = await State.findAll();
            return response;
        }
        catch(error) {
            console.log("Respository Layer Error geting all state..", error);
            throw error;
        }
    }


    async getState(id) {
        try{
            
            const response = await State.findByPk(id);
            return response
        }
        catch(error) {
            console.log("Respository Layer Error geting one state..", error);
            throw error;
        }
    }


    async deleteState(id) {
        try{
            
            const response = await State.destroy({
                where:{
                    id:id,
                }
            });
            return response
        }
        catch(error) {
            console.log("Respository Layer Error deleting one state..", error);
            throw error;
        }
    }










}


module.exports = StateRepository;