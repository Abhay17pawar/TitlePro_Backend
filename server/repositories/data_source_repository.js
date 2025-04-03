
const ConflictError = require("../errors/conflict_error");
const InternalServerError = require("../errors/internal_server_error");
const DataSource = require("../model/data_source");
class DataSourceRepository {



    async  createDataSource(source_name) {
        try {
            // Check if the product exists (including soft-deleted ones)
            const existingProduct = await DataSource.findOne({
                where: { source_name },
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
            const activeProduct = await DataSource.findOne({
                where: { source_name },
                paranoid: true // Only active records
            });

            if (activeProduct) {
                throw new ConflictError("Duplicate entry is not allowed...");
            }
    
            // If not found, create a new product
            const newProduct = await DataSource.create({ source_name });
            console.log("new item created is:-", newProduct)
            return newProduct;
        } catch (error) {
            console.error("Error in Respository during createDataSource:", error);
            if(error.name === "ConflictError" || error.name === "SequelizeValidationError"){
                throw error;
            }
        }
    }
    
    async getDataSources () {
        try{
            const response = await DataSource.findAll();
            return response;
        }
        catch(error){
            console.log("Error Inside DataSource Respository during getProducts...", error)
            throw new InternalServerError();
        }

    }


    async getProduct (id) {
        try{
            const response = DataSource.findByPk(id);
            console.log("response from db single category:", response)
            return response;
        }
        catch(error){
            console.log("Error Inside DataSource Respository during getProduct...", error)
            throw error;
        }

    }




    async deleteDataSource (id) {
        try{
            const responose = await DataSource.destroy({
                where:{
                    id:id,
                }
            })
            return responose;
        }
        catch(error){
            console.log("Error Inside DataSource Respository during deleteProduct...", error)
            throw new InternalServerError();
        }

    }

    async updateDataSource(id, source_name) {
        try{
            const response = await DataSource.update({
                source_name,
            }, {
                where:{
                    id:id
                }
            })
            return response;
        }
        catch(error){
            console.log("Error Inside DataSource Respository during updateProduct...", error)
            throw error;
        }

    }



}


module.exports = DataSourceRepository;