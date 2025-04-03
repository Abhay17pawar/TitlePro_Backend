

const ConflictError = require("../errors/conflict_error");
const Assigned = require("../model/assigned_when")
class AssignedRepository {



    async  createAssigned(assigned_name) {
        try {
            // Check if the product exists (including soft-deleted ones)
            const existingProduct = await Assigned.findOne({
                where: { assigned_name },
                paranoid: false // Include soft-deleted records
            });
            if (existingProduct) {
                // If it's soft-deleted, restore it
                if (existingProduct.deletedAt) {
                    await existingProduct.restore();
                    return existingProduct; 
                } 
                
            }

            const activeProduct = await Assigned.findOne({
                where: { assigned_name },
                paranoid: true // Only active records
            });

            if (activeProduct) {
                throw new ConflictError("Duplicate entry is not allowed...");
            }
    
            // If not found, create a new product
            const newProduct = await Assigned.create({ assigned_name });
            return newProduct;
        } catch (error) {
            console.error("Error in createAssigned:", error);
            if(error.name === "ConflictError" || error.name === "SequelizeValidationError"){
                throw error;
            }
        }
    }
    
    async getAssigneds () {
        try{
            const response = await Assigned.findAll();
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getAssigneds...", error)
            throw error;
        }

    }

    async getAssigned (id) {
        try{
            const response = Assigned.findByPk(id);
            console.log("response from db single category:", response)
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getAssigned...", error)
            throw error;
        }

    }




    async deleteAssigned (id) {
        try{
            const responose = await Assigned.destroy({
                where:{
                    id:id,
                }
            })
            return responose;
        }
        catch(error){
            console.log("Error Inside Product Respository during deleteAssigned...", error)
            throw error;
        }

    }

    async updateAssigned(id, assigned_name) {
        try{
            const response = await Assigned.update({
                assigned_name,
            }, {
                where:{
                    id:id
                }
            })
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during updateAssigned...", error)
            throw error;
        }

    }



}


module.exports = AssignedRepository;