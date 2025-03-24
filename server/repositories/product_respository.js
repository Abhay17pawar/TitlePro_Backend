
const Product = require("../model/product");
const {Op} = require("sequelize")
class ProductRepository {

    async createProduct (product_name){

        try{
            const response = await Product.create({
                product_name,
            });
            return response;
        }
        catch(error){
            console.log("Product Respository...", error)
            throw error;
        }

    }
    async getProducts () {
        try{
            const response = await Product.findAll();
            return response;
        }
        catch(error){
            console.log("Product Respository...", error)
            throw error;
        }

    }
    async getProductsIncludedDeleted () {
        try{
            const response = await Product.findAll({paranoid:false});
            return response;
        }
        catch(error){
            console.log("Product Respository...", error)
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
            console.log("Product Respository...", error)
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
            console.log("Product Respository...", error)
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
            console.log("Product Respository...", error)
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
        }
        catch(error){
            console.log("Product Respository...", error)
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
            console.log("Category Service layer....", error)
            throw new InternalServerError()
        }

    }

}


module.exports = ProductRepository;