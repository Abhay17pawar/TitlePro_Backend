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





}


module.exports = CountyRepository;