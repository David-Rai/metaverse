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
        client.emit("space-created", { space_id , status: 201 })
    })


    //Joining the space
    client.on("join-space",async ({ space_id, user_id}) => {

        //Joinin the socket room
        client.join(space_id)

        //storing into the database
        const q='insert into space_user (space_id,user_id) values(?,?)'
        const result=await db.execute(q,[space_id,user_id])

        client.emit("joined",{space_id,status:201,result})
        io.to(space_id).emit("new-joined",{user_id})

    })
}