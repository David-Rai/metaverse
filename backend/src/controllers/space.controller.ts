import express, { Request, Response, NextFunction } from "express"
import { nanoid } from "nanoid"
import db from '../models/db.js'


//****Handle creating the room***** */
export const handleSpaceCreate = async (req: Request, res: Response, next: NextFunction) => {
    const { space_name,user_id } = req.body
    const space_id = nanoid()

    try {

        //Storing the room in the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [space_name, space_id,user_id])
        console.log(result)
        res.status(201).json({ status: 201, message: "space is created", space_id })
    }

    catch (err) {
        next(err)
    }
}