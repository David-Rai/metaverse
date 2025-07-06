
import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { nanoid } from 'nanoid'
import { authRouter } from './routers/auth.router.js'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { errorHandler } from './middlwares/error.middlware.js'
import { roomRouter } from './routers/room.router.js'
import { handleSocketConnection } from './sockets/socket.js'
import  cookieParser from 'cookie-parser'

dotenv.config({ path: path.resolve('../.env') })

//Socket and Routing instance
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials:true
    }
})

//Middlwares for json parsing and form parsing
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//Router implementation
app.use('/auth', authRouter)
app.use(roomRouter)


//*******Socket connection handling******* */
io.on("connection", (client) => {
    handleSocketConnection(client, io)
})

//Routing handling
app.get('/', (req, res) => {
    res.json({ message: "lets make metaverse with auth and relatime" })

})


//Error handling middlware
app.use(errorHandler)

const PORT = process.env.PORT
server.listen(PORT, () => console.log("server is running on", PORT))
