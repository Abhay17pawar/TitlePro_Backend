const { ReasonPhrases, StatusCodes } = require("http-status-codes");

class BadRequest extends Error {
    constructor(message){
        const finalMessage = `${message} is missing from request Body.`
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "BadRequest";
        this.reason = ReasonPhrases.BAD_REQUEST;
        this.errorMessage = finalMessage;
    }
}

module.exports = BadRequest;