const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class InternalServerError extends Error {
    constructor(){
        const errorMessage = `Something went wrong! Please try again later...`
        super(errorMessage);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        this.name = "InternalServerError";
        this.reason = ReasonPhrases.INTERNAL_SERVER_ERROR;
        this.errorMessage = errorMessage;
    }
}

module.exports = InternalServerError;