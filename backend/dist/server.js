var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { spaceRouter } from './routers/space.router.js';
import { authRouter } from './routers/auth.router.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './middlwares/error.middlware.js';
import { handleSocketConnection } from './sockets/socket.js';
import cookieParser from 'cookie-parser';
import db from './models/db.js';
dotenv.config({ path: path.resolve('../.env') });
//Socket and Routing instance
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});
app.use(cors({
    origin: "http://localhost:5173", // your frontend origin here
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Router implementation
app.use('/auth', authRouter);
app.use(spaceRouter);
//*******Socket connection handling******* */
io.on("connection", (client) => {
    handleSocketConnection(client, io);
});
//Routing handling
app.get('/:username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        //getting your details from database
        const q = "select user_id,email,name from users where name=?";
        const [result] = yield db.execute(q, [username]);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}));
//Error handling middlware
app.use(errorHandler);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log("server is running on", PORT));
