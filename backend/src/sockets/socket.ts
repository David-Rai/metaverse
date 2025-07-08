import { Server, Socket } from 'socket.io'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import express from 'express'
import cookie from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'

//*****Socket Connection******** */
export const handleSocketConnection = async (client: Socket, io: Server) => {

    console.log(client.id)

    //******CREATING THE ROOM********** */
    client.on("space-create", async ({ space_name }) => {
        console.log(`Creating the space`)

        const space_id = nanoid()

        //Getting the user_id from token

        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";

        const secret = process.env.JWT_SECRET || "yoursecretkey"
        const tokenData = jwt.verify(token, secret) as JwtPayload
        // console.log(tokenData.user_id)
        const user_id = tokenData.user_id
        console.log(tokenData)


        //Storing the room data into the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [space_name, space_id, user_id])
        console.log(result)

        client.join(space_id)//creating the socket room
        client.emit("space-created", { space_id, status: 201 })

    })


    //Joining the space
    client.on("join-space", async ({ space_id }) => {

        //Joinin the socket room
        client.join(space_id)

        //Getting the user_id from token

        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";

        const secret = process.env.JWT_SECRET || "yoursecretkey"
        const tokenData = jwt.verify(token, secret) as JwtPayload
        // console.log(tokenData.user_id)
        const user_id = tokenData.user_id

        //storing into the database
        const q = 'insert into space_user (space_id,user_id) values(?,?)'
        const result = await db.execute(q, [space_id, user_id])

        //Getting all the previous user data
        const q2 = "select * from space_user where space_id=?"
        const [users] = await db.execute(q2, [space_id])

        //sending the message when joined the space
        client.emit("joined", { space_id, status: 201, result, users, user_id })
        client.to(space_id).emit("new-joined", { user_id, users })

    })


    //Getting the user move
    client.on("move",async ({ user_id, space_id, x, y }) => {

        //Updating the user x and y
        const q="update space_user set x=? , y=? where user_id=? and space_id =?"
        const [result]=await db.execute(q,[x,y,user_id,space_id])
    
        //Getting all the pervios user data
        const q2 = "select * from space_user where space_id=?"
        const [users] = await db.execute(q2, [space_id])

        io.to(space_id).emit("new-move", {  users })

    })
}