const ErrorHandler = require('../utils/errorHandler');
module.exports = (err,req,res,next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name === "CastError"){
        const message = `Resource not found: ${err.path}`
        err = new ErrorHandler(message,400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token is expired, Try again";
        err = new ErrorHandler(message,400);
    }
     
    res.status(err.statuscode).json({
        success:false,
        error:err.message
    })
}