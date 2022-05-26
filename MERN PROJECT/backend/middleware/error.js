const ErrorHandler = require("../utils/errorhander");


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //wrong Mongodb Id error or cast error

    if(err.name === "CastError"){
        message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong JWT error
    
    if(err.name === "JsonwebTokenError"){
        message = `Json web token is Invalid, try again`;
        err = new ErrorHandler(message, 400);
    }


    //JWT expire error

    if(err.name === "TokenExpiredError"){
        message = `Json web token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};