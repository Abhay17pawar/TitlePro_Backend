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
            console.error('Error inside Respository layer during createState...', error);
            throw error;
        }
    }

    async getStates() {
        try{
            const response = await State.findAll();
            return response;
        }
        catch(error) {
            console.error('Error inside Respository layer during getStates...', error);
            throw error;
        }
    }


    async getState(id) {
        try{
            
            const response = await State.findByPk(id);
            return response
        }
        catch(error) {
            console.error('Error inside Respository layer during getState...', error);
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
            console.error('Error inside Respository layer during deleteState...', error);
            throw error;
        }
    }

    async updateState(id, state_name) {
        try{
            
            const response = await State.update({
                state_name,
            }, {
                where:{
                    id:id,
                }
            });
            return response
        }
        catch(error) {
            console.error('Error inside Respository layer during updateState...', error);
            throw error;
        }
    }










}


module.exports = StateRepository;