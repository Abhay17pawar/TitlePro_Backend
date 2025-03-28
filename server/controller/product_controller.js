

const { ReasonPhrases, StatusCodes } = require("http-status-codes")
const ProductRepository = require("../repositories/product_respository")
const ProductService = require("../services/product_service")
const errorResponse = require("../utils/error_response")
const TransactionRepository = require("../repositories/transaction_repository")

const productService = new ProductService(new ProductRepository(), new TransactionRepository())
async function createProduct(req, res) {
    try{
        console.log("controller called...", req.body)
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


        res.status(StatusCodes.OK).send({
            success:true,
            error:{},
            message: (!newProduct.length) ? "No Products Available..." : "Product Fetch successfully...",
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
    console.log("contorller called...", req.query)
    console.log("query is:-", req.query.product_name)
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
        const newProduct = await productService.deleteProduct(req.params.id);

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
        const newProduct = await productService.updateProduct(req.params.id, req.body);

        res.status(StatusCodes.CREATED).send({
            success:true,
            error:{},
            message: " Product Update successfully...",
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
    getProductWithQuery,
}