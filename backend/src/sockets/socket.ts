import { Server, Socket } from 'socket.io'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import express from 'express'

//*****Socket Connection******** */
export const handleSocketConnection = async (client: Socket, io: Server) => {

    console.log(client.id)

    //******CREATING THE ROOM********** */
    client.on("createSpace",async  ({ room_name, user_id }) => {
        console.log(`Creating the room`)
        const spaceID = nanoid()
        const room_id = nanoid()


        //Storing the room data into the database
        const q = "insert into rooms (room_name,room_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [room_name, room_id, user_id])
        console.log(result)

        client.join(spaceID)
        client.emit("spaceCreated", { spaceID,result })
    })


    //Joining the space
    client.on("joinSpace", ({ spaceID, userID }) => {


        //joining the space
        client.join(spaceID)
        client.emit("spaceID", { spaceID })

        //sending the all users that someone joined
        client.to(spaceID).emit("someoneJoin", { userID })

    })
}