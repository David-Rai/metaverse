import { Server, Socket } from 'socket.io'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import express from 'express'
import cookie from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'
import checkSpace from '../utils/checkSpace.js'

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


        if (token === "" || token === undefined) {
            return client.emit("login-first")
        }

        const secret = process.env.JWT_SECRET || "yoursecretkey"
        const tokenData = jwt.verify(token, secret) as JwtPayload
        const user_id = tokenData.user_id


        //Storing the room data into the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)"
        const result = await db.execute(q, [space_name, space_id, user_id])

        client.join(space_id)//creating the socket room
        client.emit("space-created", { space_id, status: 201 })

    })


    //Joining the space
    client.on("join-space", async ({ space_id }) => {

        //Checking if the space id is valid or not
        const checkSpaceResult = await checkSpace(space_id)
        if (!checkSpaceResult) return

        //Getting the user_id from token

        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";

        if (token === "" || token === undefined) {
            return client.emit("login-first")
        }

        const secret = process.env.JWT_SECRET || "yoursecretkey"
        const tokenData = jwt.verify(token, secret) as JwtPayload
        const user_id = tokenData.user_id

        //checking if the user exist in the space or not
        const check_query = "select * from space_user where user_id = ?"
        const [check_query_result]: any[] = await db.execute(check_query, [user_id])


        // console.log(check_query_result)
        if (check_query_result.length > 0) {
            console.log("invalid you are already exist")

            //Getting all the previous user data
            const q2 = "select * from space_user where space_id=?"
            const [users] = await db.execute(q2, [space_id])


            //Joinin the socket room
            client.join(space_id)

            return client.emit("rejoin", { user_id, users })
        }

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
    client.on("move", async ({ user_id, space_id, x, y }) => {

        //Updating the user x and y
        const q = "update space_user set x=? , y=? where user_id=? and space_id =?"
        const [result] = await db.execute(q, [x, y, user_id, space_id])

        //Getting all the pervios user data
        const q2 = "select * from space_user where space_id=?"
        const [users] = await db.execute(q2, [space_id])


        io.to(space_id).emit("new-move", { users })

    })

    //Deleting the space
    client.on("delete-space", async ({ space_id }) => {
        console.log("deleting this space ", space_id)

        //Getting the user_id from token

        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";

        if (token === "" || token === undefined) {
            return client.emit("login-first")
        }

        const secret = process.env.JWT_SECRET || "yoursecretkey"
        const tokenData = jwt.verify(token, secret) as JwtPayload
        const user_id = tokenData.user_id

        try {
            //Deleting the space now
            const q = 'delete from spaces where space_id = ? and user_id =?'
            const [result] = await db.execute(q, [space_id, user_id])

            //Deleted successfully message to the client
            client.emit("delete-success")

        }
        catch (err) {
            console.log(err)
        }
    })
}