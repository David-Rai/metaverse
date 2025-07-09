
import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { nanoid } from 'nanoid'
import { spaceRouter } from './routers/space.router.js'
import { authRouter } from './routers/auth.router.js'
import { detailRouter } from './routers/detail.router.js'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { errorHandler } from './middlwares/error.middlware.js'
import { handleSocketConnection } from './sockets/socket.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import db from './models/db.js'

dotenv.config({ path: path.resolve('../.env') })

//Socket and Routing instance
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: "https://maetaverse.netlify.app",
    credentials: true
  }
});


app.use(cors({
  origin: "https://maetaverse.netlify.app",
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//Router implementation
app.use('/auth', authRouter)
app.use(spaceRouter)
app.use(detailRouter)


//*******Socket connection handling******* */
io.on("connection", (client) => {
  handleSocketConnection(client, io)
})

//Routing handling
app.get('/', async (req, res, next) => {

  try {
    //getting your details from database
    const q = "select user_id,user_name from users"
    const [result] = await db.execute(q)
    res.json({result})

  }
  catch (err) {
    next(err)
  }

})


//Error handling middlware
app.use(errorHandler)

const PORT = process.env.PORT
server.listen(PORT, () => console.log("server is running on", PORT))
