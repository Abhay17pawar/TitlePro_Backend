


const ConflictError = require("../errors/conflict_error");
const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");
const WorkFlow = require("../model/work_flow")

class WorkFlowRepository {



    async  createWorkFlow(work_name) {
        try {
            // Check if the product exists (including soft-deleted ones)
            const existingProduct = await WorkFlow.findOne({
                where: { work_name },
                paranoid: false // Include soft-deleted records
            });
            if (existingProduct) {
                // If it's soft-deleted, restore it
                if (existingProduct.deletedAt) {
                    await existingProduct.restore();
                    return existingProduct; // Return the restored product
                } 
            }
            // Check if it's an active record (not soft-deleted)
            const activeProduct = await WorkFlow.findOne({
                where: { work_name },
                paranoid: true // Only active records
            });

            if (activeProduct) {
                throw new ConflictError("Duplicate entry is not allowed...");
            }
    
            // If not found, create a new product
            const newProduct = await WorkFlow.create({ work_name });
            console.log("new item created is:-", newProduct)
            return newProduct;
        } catch (error) {
            console.error("Error in Respository during createWorkFlow:", error);
            if(error.name === "ConflictError" || error.name === "SequelizeValidationError"){
                throw error;
            }
        }
    }
    
    async getWorkFlows () {
        try{
            const response = await WorkFlow.findAll();
            return response;
        }
        catch(error){
            console.log("Error Inside WorkFlowRepository Respository during getWorkFlows...", error)
            throw new InternalServerError();
        }

    }

    async getWorkFlow (id) {
        try{
            const response = WorkFlow.findByPk(id);
            console.log("response from db single category:", response)
            return response;
        }
        catch(error){
            console.log("Error Inside WorkFlowRepository Respository during getWorkFlow...", error)
            throw error;
        }

    }


    async deleteWorkFlow (id) {
        try{
            const responose = await WorkFlow.destroy({
                where:{
                    id:id,
                }
            })
            return responose;
        }
        catch(error){
            console.log("Error Inside WorkFlowRepository Respository during deleteWorkFlow...", error)
            throw new InternalServerError();
        }

    }


    async updateWorkFlow(id, work_name) {
        try {
            // Find the record, including soft-deleted ones
            const existingWorkFlow = await WorkFlow.findOne({
                where: { id },
                paranoid: false // Include soft-deleted records
            });
    
            if (!existingWorkFlow) {
                throw new NotFoundError("Workflow", "id", id);
            }
    
            // Restore if it was soft-deleted
            if (existingWorkFlow.deletedAt) {
                await existingWorkFlow.restore();
            }
    
            // Update the work_name
            await existingWorkFlow.update({ work_name });
    
            return existingWorkFlow;
        } catch (error) {
            console.log("Error Inside WorkFlowRepository Respository during updateWorkFlow...", error)
            throw error;
        }
    }
    


}


module.exports = WorkFlowRepository;