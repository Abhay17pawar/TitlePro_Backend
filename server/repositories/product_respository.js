
const ConflictError = require("../errors/conflict_error");
const Product = require("../model/product");
const {Op} = require("sequelize")
class ProductRepository {

    // async createProduct (product_name){

    //     try{
    //         const response = await Product.create({
    //             product_name,
    //         });
    //         return response;
    //     }
    //     catch(error){
    //         console.log("Error Inside Product Respository during createProduct...", error)
    //         throw error;
            
    //     }

    // }


    async  createProduct(product_name) {
        try {
            // Check if the product exists (including soft-deleted ones)
            const existingProduct = await Product.findOne({
                where: { product_name },
                paranoid: false // Include soft-deleted records
            });
            // console.log("Existing Product...", existingProduct)
            // console.log("Existing deletedAt...", existingProduct.deletedAt)
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
            const newProduct = await Product.create({ product_name });
            return newProduct;
        } catch (error) {
            console.error("Error in createOrRestoreProduct:", error);
            if(error.name === "ConflictError"){
                throw error;
            }
        }
    }
    
    async getProducts () {
        try{
            const response = await Product.findAll();
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getProducts...", error)
            throw error;
        }

    }
    async getProductsIncludedDeleted () {
        try{
            const response = await Product.findAll({paranoid:false});
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getProductsIncludedDeleted...", error)
            throw error;
        }

    }
    async getProduct (id) {
        try{
            const response = Product.findByPk(id);
            console.log("response from db single category:", response)
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getProduct...", error)
            throw error;
        }

    }
    async getProductWithQuery (product_name) {
        try{
            console.log("product name with repository...", product_name);
            const response = Product.findAll({
                where: {
                    product_name: {
                        [Op.like]: `%${product_name}%` // Case-insensitive search
                    }
                }
            });
            console.log("response from db single category:", response)
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during getProductWithQuery...", error)
            throw error;
        }

    }



    async deleteProduct (id) {
        try{
            const responose = await Product.destroy({
                where:{
                    id:id,
                }
            })
            return responose;
        }
        catch(error){
            console.log("Error Inside Product Respository during deleteProduct...", error)
            throw error;
        }

    }

    async updateProduct(id, product_name) {
        try{
            const response = await Product.update({
                product_name,
            }, {
                where:{
                    id:id
                }
            })
            return response;
        }
        catch(error){
            console.log("Error Inside Product Respository during updateProduct...", error)
            throw error;
        }

    }

    async getProductsForCategory(id) {
        try{
            const data = await Product.findAll({
                where: { 
                    categoryId: id
                },
            });
            return data;
        }
        catch(error){
            console.log("Error Inside Product Respository during getProductsForCategory...", error)
            throw new InternalServerError()
        }

    }

}


module.exports = ProductRepository;