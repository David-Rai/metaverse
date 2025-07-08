import express, { NextFunction, Response } from 'express'
import { CustomRequest } from '../middlwares/auth.middlware.js'
import db from '../models/db.js'
import { authHandler } from '../middlwares/auth.middlware.js'

export const detailRouter = express.Router()

//Getting your data
detailRouter.get('/myself', authHandler, async (req: CustomRequest, res: Response, next: NextFunction) => {

    //User_id from the request user object
    const user = req.user

    //Getting the user data from database
    try {
        const q = "select name from users where user_id=?"
        const [result] = await db.execute(q, [user?.user_id])

        const q2='select * from spaces where user_id=?'
        const [spaces]=await db.execute(q2,[user?.user_id])
        res.json({ user, messaege: "your data hai ta",result ,spaces})

    }
    catch (err) {
        return next(err)
    }



})

