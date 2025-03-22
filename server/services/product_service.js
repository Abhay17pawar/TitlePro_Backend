// const InternalServerError = require("../errors/inernal_server_error");

const InternalServerError = require("../errors/internal_server_error");
const NotFoundError = require("../errors/not_found_error");

// const NotFoundError = require("../errors/not_found_error");
class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    async createProduct(productDetails) {
        try{
            const {product_name} = productDetails;
            // console.log("service layer called..", product_name, productDetails)
            let newProduct = await this.repository.createProduct(product_name);
            return newProduct;
        }
        catch(error){
            console.log("Product Service layer....", error)
            // throw new InternalServerError()
        }

    }
    
    async getProducts() {
        try{
            const data = await this.repository.getProducts();
            return data;
        }
        catch(error){
            console.log("Product Service layer....", error)
            // throw new InternalServerError()
        }

    }
    
    async getProductsIncludedDeleted() {
        try{
            const data = await this.repository.getProductsIncludedDeleted()
            // console.log("Product service.. data is", data)
            // if(!data){
            //     throw new NotFoundError("Product", "id", id)
            // }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Product Service layer....", error)
            // throw new InternalServerError()
        }

    }

    async getProduct(id) {
        try{
            const data = await this.repository.getProduct(id)
            console.log("Product service.. data is", data)
            // if(!data){
            //     throw new NotFoundError("Product", "id", id)
            // }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Product Service layer....", error)
            // throw new InternalServerError()
        }

    }


    async deleteProduct(id) {
        try{
            const data = await this.repository.deleteProduct(id)
            console.log("Product service.. data is", data)
            if(!data){
                throw new NotFoundError("Product", "id", id)
            }
            return data;
        }
        catch(error){
            if(error.name === "NotFoundError"){
                throw error;
            }
            console.log("Product Service layer....", error)
            throw new InternalServerError()
        }
    }

    async updateProduct(id, updatedata) {
        const {product_name} = updatedata;
        try{
            let data = await this.repository.updateProduct(id, product_name);
            return data;
        }
        catch(error){
            console.log("Category Service layer....", error)
            // throw new InternalServerError()
        }

    }

}


module.exports = ProductService;