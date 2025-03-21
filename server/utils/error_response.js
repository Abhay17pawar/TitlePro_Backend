
function errorResponse(errorMessage, errorObj) {
    return {
        success:false,
        data:{},
        message:errorMessage,
        error:errorObj
    }
}

module.exports = errorResponse;