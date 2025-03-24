

const { ReasonPhrases, StatusCodes } = require("http-status-codes")
const ProductRepository = require("../repositories/product_respository")
const ProductService = require("../services/product_service")
const errorResponse = require("../utils/error_response")

const productService = new ProductService(new ProductRepository())
async function createProduct(req, res) {
    try{
        console.log("controller called...", req.body)
        const newProduct = await productService.createProduct(req.body)
        console.log("newProduct is", newProduct)

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Product " + ReasonPhrases.CREATED,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        // res.status(error.statusCode).send(errorResponse(error.reason, error))
        res.send({errorMessage:error})
    }
}
async function getProducts(req, res) {
    try{
        const newProduct = await productService.getProducts()

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Product Fetch successfully!" + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        // res.status(error.statusCode).send(errorResponse(error.reason, error))
        res.send({errorMessage:error})
    }
}
async function getProductsIncludedDeleted(req, res) {
    try{
        const newProduct = await productService.getProductsIncludedDeleted()

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Product Fetch successfully!" + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        // res.status(error.statusCode).send(errorResponse(error.reason, error))
        res.send({errorMessage:error})
    }
}


async function getProduct(req, res) {
    try{
        const newProduct = await productService.getProduct(req.params.id);

        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Product Fetch successfully! " + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function deleteProduct(req, res) {
    try{
        const newProduct = await productService.deleteProduct(req.params.id);

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Delete Product successfully!" + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

async function updateProduct(req, res) {
    try{
        const newProduct = await productService.updateProduct(req.params.id, req.body);

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: " Product Update successfully!" + ReasonPhrases.OK,
            data: newProduct,
        }) 
    }
    catch(error) {
        console.log("Product Controller layer..", error)
        // res.status(error.statusCode).send(errorResponse(error.reason, error))
        res.send({errorMessage:error})
    }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getProductsIncludedDeleted,
    updateProduct,
    getProduct,
}