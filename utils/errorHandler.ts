import {Request, Response, NextFunction} from "express";
import { HttpError } from "./error";

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpError) {
        res.status(error.statusCode).send(error.message);
    } else {
        res.status(500).json({message: 'Server error', error: error.message});
    }   
}