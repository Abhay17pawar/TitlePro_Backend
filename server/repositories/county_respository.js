
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
            console.log("Error inside County Repository layer during createCounty...", error)
            throw error;
              
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





}


module.exports = CountyRepository;