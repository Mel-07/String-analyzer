import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utilities/errorHandler";
function errorMiddleware(err:ErrorHandler, req:Request, res:Response, next:NextFunction) {
 err.statusCode = err.statusCode || 500;
 err.status = err.status || "error";

 if(process.env.NODE_DEV === "development"){
    console.log(err);
     res.status(err.statusCode).json({
       status: err.status,
       message: err.message,
       error:err,
       stack:err.stack
     });
 }

  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error:err,
    stack:err.stack
  });
 
}

export default errorMiddleware;