import express, { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export interface CustomRequest<
    Params = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = {}
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user?: {
        user_id: string
    };
}

export const authHandler = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies

    if (!token) {
        return next()
    }

    const secret = process.env.JWT_SECRET || "yoursecretkey"

    if (!secret) {
        return next()
    }

    try {
        //Verifying the token
        const rawData = jwt.verify(token, secret) as JwtPayload
        req.user = {user_id:rawData.user_id}
        return next()

    }
    catch (err) {
        return next(err)
    }

}
