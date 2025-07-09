var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from 'nanoid';
import db from '../models/db.js';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import checkSpace from '../utils/checkSpace.js';
//*****Socket Connection******** */
export const handleSocketConnection = (client, io) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(client.id);
    //******CREATING THE ROOM********** */
    client.on("space-create", (_a) => __awaiter(void 0, [_a], void 0, function* ({ space_name }) {
        console.log(`Creating the space`);
        const space_id = nanoid();
        //Getting the user_id from token
        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";
        const secret = process.env.JWT_SECRET || "yoursecretkey";
        const tokenData = jwt.verify(token, secret);
        const user_id = tokenData.user_id;
        //Storing the room data into the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)";
        const result = yield db.execute(q, [space_name, space_id, user_id]);
        client.join(space_id); //creating the socket room
        client.emit("space-created", { space_id, status: 201 });
    }));
    //Joining the space
    client.on("join-space", (_a) => __awaiter(void 0, [_a], void 0, function* ({ space_id }) {
        //Checking if the space id is valid or not
        const checkSpaceResult = yield checkSpace(space_id);
        if (!checkSpaceResult)
            return;
        //Getting the user_id from token
        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";
        if (token === "" || token === undefined) {
            return client.emit("login-first");
        }
        const secret = process.env.JWT_SECRET || "yoursecretkey";
        const tokenData = jwt.verify(token, secret);
        const user_id = tokenData.user_id;
        //checking if the user exist in the space or not
        const check_query = "select * from space_user where user_id = ?";
        const [check_query_result] = yield db.execute(check_query, [user_id]);
        // console.log(check_query_result)
        if (check_query_result.length > 0) {
            console.log("invalid you are already exist");
            //Getting all the previous user data
            const q2 = "select * from space_user where space_id=?";
            const [users] = yield db.execute(q2, [space_id]);
            //Joinin the socket room
            client.join(space_id);
            return client.emit("rejoin", { user_id, users });
        }
        //storing into the database
        const q = 'insert into space_user (space_id,user_id) values(?,?)';
        const result = yield db.execute(q, [space_id, user_id]);
        //Getting all the previous user data
        const q2 = "select * from space_user where space_id=?";
        const [users] = yield db.execute(q2, [space_id]);
        //sending the message when joined the space
        client.emit("joined", { space_id, status: 201, result, users, user_id });
        client.to(space_id).emit("new-joined", { user_id, users });
    }));
    //Getting the user move
    client.on("move", (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, space_id, x, y }) {
        //Updating the user x and y
        const q = "update space_user set x=? , y=? where user_id=? and space_id =?";
        const [result] = yield db.execute(q, [x, y, user_id, space_id]);
        //Getting all the pervios user data
        const q2 = "select * from space_user where space_id=?";
        const [users] = yield db.execute(q2, [space_id]);
        io.to(space_id).emit("new-move", { users });
    }));
    //Deleting the space
    client.on("delete-space", (_a) => __awaiter(void 0, [_a], void 0, function* ({ space_id }) {
        console.log("deleting this space ", space_id);
        //Getting the user_id from token
        const cookies = cookie.parse(client.handshake.headers.cookie || "");
        const token = cookies.token || "";
        if (token === "" || token === undefined) {
            return client.emit("login-first");
        }
        const secret = process.env.JWT_SECRET || "yoursecretkey";
        const tokenData = jwt.verify(token, secret);
        const user_id = tokenData.user_id;
        try {
            //Deleting the space now
            const q = 'delete from spaces where space_id = ? and user_id =?';
            const [result] = yield db.execute(q, [space_id, user_id]);
            //Deleted successfully message to the client
            client.emit("delete-success");
        }
        catch (err) {
            console.log(err);
        }
    }));
});
