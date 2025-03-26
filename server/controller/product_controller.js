

const { ReasonPhrases, StatusCodes } = require("http-status-codes")
const ProductRepository = require("../repositories/product_respository")
const ProductService = require("../services/product_service")
const errorResponse = require("../utils/error_response")
const BadRequest = require("../errors/badd_request")

const productService = new ProductService(new ProductRepository())
async function createProduct(req, res) {
    try{
        const newProduct = await productService.createProduct(req.body)

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Product Successfully " + ReasonPhrases.CREATED,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Product Controller during createProduct...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
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
        console.log("Error Inside Product Controller during getProducts...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
        // res.send({errorMessage:error})
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
        console.log("Error Inside Product Controller during getProductsIncludedDeleted...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
        // res.send({errorMessage:error})
    }
}


async function getProduct(req, res) {
    try{
        let id = req.params.id;
        if(!id || isNaN(id)){
            throw new BadRequest(`Invalid ID:-> (${id})`, true)
        }
        const newProduct = await productService.getProduct(req.params.id);

        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Product Fetch successfully! " + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Product Controller during getProduct...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

async function getProductWithQuery(req, res) {

    try{
        const newProduct = await productService.getProductWithQuery(req.query);

        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: "Product Fetch successfully! " + ReasonPhrases.OK,
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Product Controller during getProductWithQuery...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}
async function deleteProduct(req, res) {
    try{
        let id = req.params.id;
        if(!id || isNaN(id)){
            throw new BadRequest(`Invalid ID:-> (${id})`, true)
        }
        const newProduct = await productService.deleteProduct(id);

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: "Delete Product successfully...",
            data: newProduct,
        })
    }
    catch(error) {
        console.log("Error Inside Product Controller during deleteProduct...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

async function updateProduct(req, res) {
    try{
        let id = req.params.id;
        if(!id || isNaN(id)){
            throw new BadRequest(`Invalid ID:-> (${id})`, true)
        }
        const newProduct = await productService.updateProduct(id, req.body);

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: " Product Update successfully...",
            data: newProduct,
        }) 
    }
    catch(error) {
        console.log("Error Inside Product Controller during updateProduct...", error)
        res.status(error.statusCode).send(errorResponse(error.reason, error))
    }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getProductsIncludedDeleted,
    updateProduct,
    getProduct,
    getProductWithQuery,
}