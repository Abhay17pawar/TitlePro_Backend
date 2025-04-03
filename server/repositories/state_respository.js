const State = require("../model/state")
const ConflictError = require("../errors/conflict_error")


class StateRepository {

    async  createState(state_name) {
        try {
            // Check if the product exists (including soft-deleted ones)
            const existingProduct = await State.findOne({
                where: { state_name },
                paranoid: false // Include soft-deleted records
            });
            if (existingProduct) {
                // If it's soft-deleted, restore it
                if (existingProduct.deletedAt) {
                    await existingProduct.restore();
                    return existingProduct; // Return the restored product
                } 
                throw new ConflictError("Duplicate entry is not allowed...");
                // console.log("erro is:-", error)
            }
    
            // If not found, create a new product
            const newProduct = await State.create({ state_name });
            return newProduct;
        } catch (error) {
            console.error("Error in createOrRestoreProduct:", error);
            if(error.name === "ConflictError"){
                throw error;
            }
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
    async getAllStates() {
        try{
            const response = await State.findAll({paranoid:false});
            return response;
        }
        catch(error) {
            console.error('Error inside Respository layer during getAllStates...', error);
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