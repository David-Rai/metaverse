import express, { Request, Response, NextFunction } from "express"
import { nanoid } from "nanoid"
import db from '../models/db.js'


//****Handle creating the room***** */
export const handleRoomCreate = async (req: Request, res: Response, next: NextFunction) => {
    const { room_name,user_id } = req.body
    const room_id = nanoid()

    try {

        //Storing the room in the database
        const q = "insert into rooms (room_name,room_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [room_name, room_id,user_id])
        console.log(result)
        res.status(201).json({ status: 201, message: "Room is created", room_id })
    }

    catch (err) {
        next(err)
    }
}