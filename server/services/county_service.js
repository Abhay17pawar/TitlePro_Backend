const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");



class CountyService {

  constructor(respository, stateRepository) {
    this.respository = respository;
    this.stateRepository = stateRepository;
  }

  async createCounty(countyDetails) {
    try {
      const { county_name, state_name, stateId } = countyDetails;
      const stateResponse = await this.stateRepository.getState(stateId);
      if(!stateResponse){
        throw new NotFoundError("State", "id", stateId)
      }
      const response = await this.respository.createCounty(
        county_name,
        state_name,
        stateId
      );
      return response;
    } catch (error) {
      console.log("Service layer creating County error....", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        throw error;
      }
      if(error.name === "NotFoundError"){
        throw error;
      }
      throw InternalServerError();
    }
  }


  async getCounties () {
    try{
        const response = this.respository.getCounties();
        return response;
    }
    catch(error){
        console.log("Service layer Get all County error....", error);
        throw error;

    }
  }
  async getCounty (id) {
    try{
        const response = await this.respository.getCounty(id);
        if(!response){
            throw new NotFoundError("County", "id", id)
        }
        return response;
    }
    catch(error){
        console.log("Service layer Get One County error....", error);
        if(error.name === "NotFoundError"){
            throw error;
        }
        throw new InternalServerError(); 

    }
  }

  async deleteCounty (id) {
    try{
        const response = await this.respository.deleteCounty(id);
        if(!response){
            throw new NotFoundError("County", "id", id)
        }
        return response;
    }
    catch(error){
        console.log("Service layer Delete One County error....", error);
        if(error.name === "NotFoundError"){
            throw error;
        }
        throw new InternalServerError(); 

    }
  }




}

module.exports = CountyService;
