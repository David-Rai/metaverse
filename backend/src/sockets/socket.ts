import { Server, Socket } from 'socket.io'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import express from 'express'

//*****Socket Connection******** */
export const handleSocketConnection = async (client: Socket, io: Server) => {

    console.log(client.id)

    //******CREATING THE ROOM********** */
    client.on("space-create", async ({ space_name, user_id }) => {
        console.log(`Creating the space`)
        const space_id = nanoid()


        //Storing the room data into the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [space_name, space_id, user_id])
        console.log(result)

        client.join(space_id)//creating the socket room
        client.emit("space-created", { space_id, result, status: 201 })
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