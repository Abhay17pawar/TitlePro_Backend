
const County = require("../model/county");

class CountyRepository {

    async createCounty (county_name, state_name, stateId){

        try {
            // Check if the county exists (including soft-deleted ones)
            const existingProduct = await County.findOne({
                where: { county_name },
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
    
            // If not found, create a new County
            const newProduct = await County.create({ county_name, state_name, stateId });
            return newProduct;
        } catch (error) {
            console.error("Error in createCounty:", error);
            if(error.name === "ConflictError"){
                throw error;
            }
        }
    }



    async getCounties() {
        try{
            const response = await County.findAll();
            return response;
        }
        catch(error){
            console.log("Error inside County Repository layer during createCounty...", error)
            throw error; 
              
        }
    }

    async getCounty(id) {
        try{
            const response = await County.findByPk(id);
            return response;
        }
        catch(error){
            console.log("Error inside County Repository layer during createCounty...", error)
            throw error;
              
        }
    }



    async getCountiesWithStateId(stateId) {
        try{
            const response = await County.findAll({
                where:{
                    stateId
                }
            })
            return response;
        }
        catch(error){
            console.log("Error inside County Repository layer during createCounty...", error)
            throw error;
              
        }
    }

    async deleteCounty(id) {
        try{
            const response = await County.destroy({
                where:{
                    id:id,
                }
            });
            console.log("response of deletcounty", response)
            return response;
        }
        catch(error){
            console.log("Error inside County Repository layer during createCounty...", error)
            throw error;
              
        }

    }
    async updateCounty(id, county_name) {
        try{
            const response = await County.update({county_name}, {
                where:{
                    id:id,
                }
            });
            console.log("response of deletcounty", response)
            return response;
        }
        catch(error){
            console.log("Error inside County Repository layer during updateCounty...", error)
            throw error;
              
        }
    }





}


module.exports = CountyRepository;