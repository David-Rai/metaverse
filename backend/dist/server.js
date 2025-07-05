import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { nanoid } from 'nanoid';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
let rooms = [];
//*******Socket connection handling******* */
io.on("connection", (client) => {
    console.log(client.id);
    //Getting the create space request
    client.on("createSpace", ({ name }) => {
        console.log(`Creating the room`);
        const spaceID = nanoid();
        let newRoom = {
            id: spaceID,
            users: []
        };
        rooms.push(newRoom);
        client.join(spaceID);
        client.emit("spaceID", { spaceID });
    });
    //Joining the space
    client.on("joinSpace", ({ spaceID, userID }) => {
        let user = {
            id: userID,
            x: 0,
            y: 0
        };
        let room = rooms.filter(room => room.id === spaceID);
        room.users.push(user);
        //joining the space
        client.join(spaceID);
        client.emit("spaceID", { spaceID });
        //sending the all users that someone joined
        client.to(spaceID).emit("someoneJoin", { userID, rooms });
    });
});
//Routing handling
app.get('/', (req, res) => {
    res.json({ message: "lets make metaverse" });
});
server.listen(1111, () => console.log("server is running"));
