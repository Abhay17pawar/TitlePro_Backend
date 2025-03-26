const { ReasonPhrases, StatusCodes } = require("http-status-codes");

class ConflictError extends Error {
    constructor(message){
        const finalMessage = `${message}`
        super(message);
        this.statusCode = StatusCodes.CONFLICT;
        this.name = "ConflictError";
        this.reason = ReasonPhrases.CONFLICT;
        this.errorMessage = finalMessage;
    }
}

module.exports = ConflictError;