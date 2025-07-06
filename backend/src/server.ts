
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import { nanoid } from 'nanoid'
import { authRouter } from './routers/auth.js'
import cors from 'cors'

//Socket and Routing instance
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*"
    }
}) 

//Middlwares for json parsing and form parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Router implementation


//*******Socket connection handling******* */
io.on("connection",(client)=>{
    console.log(client.id)

    //Getting the create space request
    client.on("createSpace",({name})=>{
        console.log(`Creating the room`)
        const spaceID=nanoid()

        client.join(spaceID)
        client.emit("spaceID",{spaceID})
    })


    //Joining the space
    client.on("joinSpace",({spaceID,userID})=>{


        //joining the space
        client.join(spaceID)
        client.emit("spaceID",{spaceID})

        //sending the all users that someone joined
        client.to(spaceID).emit("someoneJoin",{userID})

    })
})

//Routing handling
app.get('/',(req,res)=>{
res.json({message:"lets make metaverse"})

})

server.listen(1111,()=>console.log("server is running"))
