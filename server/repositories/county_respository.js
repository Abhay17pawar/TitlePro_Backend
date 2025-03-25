
const County = require("../model/county");

class CountyRepository {

    async createCounty (county_name, state_name, stateId){
        try{
            const response = await County.create({
                county_name, state_name, stateId
            });
            return response;
        }
        catch(error){
            console.log("County Repository Create County Error....", error)

            throw error; // Re-throw other errors
              
        }
    }



    async getCounties() {
        try{
            const response = await County.findAll();
            return response;
        }
        catch(error){
            console.log("County Repository Get All County Error....", error)
            throw error; 
              
        }
    }

    async getCounty(id) {
        try{
            const response = await County.findByPk(id);

            return response;
        }
        catch(error){
            console.log("County Repository Get County Error....", error)
            throw error;
              
        }
    }





}


module.exports = CountyRepository;