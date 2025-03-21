const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class NotFoundError extends Error {
    constructor(resourceName, property, propertyValue){
        const finalMessage = `The Resource: ${resourceName} with ${property} : ${propertyValue} Not Found.`
        super(finalMessage);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.name = "NotFoundError";
        this.reason = ReasonPhrases.NOT_FOUND;
        this.errorMessage = finalMessage;
    }
}

module.exports = NotFoundError;