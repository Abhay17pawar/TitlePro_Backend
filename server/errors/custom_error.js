const { ReasonPhrases, StatusCodes } = require("http-status-codes");

class CustomError extends Error {
    constructor(message){
        const finalMessage = `${message}`
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "CustomError";
        this.reason = ReasonPhrases.BAD_REQUEST;
        this.errorMessage = finalMessage;
    }
}

module.exports = CustomError;