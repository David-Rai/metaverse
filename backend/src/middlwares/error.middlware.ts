import { Request, Response, NextFunction } from "express";

//Interface for the error
interface errI extends Error {
    status?: number
}

export const errorHandler = (err: errI, req: Request, res: Response, next: NextFunction) => {

    const status = err.status || 500

    res.status(status).json({ message: err.message || "error ahyo hou sathy", status })
}