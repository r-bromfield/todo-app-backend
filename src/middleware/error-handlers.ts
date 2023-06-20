import mongoose from "mongoose"
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../model/error-response';
import { CustomError } from "../exception";


/**
 * Handles 404 responses
 * @param req 
 * @param res 
 * @param next 
 */
export function resourceNotFound(req: Request, res: Response, next: NextFunction) {  
  next(new CustomError(`Resource not found - ${req.originalUrl}`, 404));
}

/**
 * Handles Errors
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {

  let statusCode = 500;
  if (err instanceof CustomError) {
    statusCode = err?.status ?? statusCode
  } else {
    statusCode = res.statusCode ?? statusCode;
  }


  const isProduction = process.env.NODE_ENV === 'production';
  console.error(err)

  res.status(statusCode);
  res.json({ message: err.message, stack: !isProduction ? err.stack : undefined });

}


