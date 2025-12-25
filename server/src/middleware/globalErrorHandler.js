const response = require("../helper/response");
const ErrorHandler = require("../helper/errorHandler");

function errorHandler(err, req, res, next) {
console.log("Global error handler invoked");

    if (err instanceof ErrorHandler) {
        return response.error(res, {
            code: err.statusCode,
            message: err.message
        });
    }
    
    console.error(err); 
    return response.serverError(res, err.message);
}

module.exports = errorHandler;