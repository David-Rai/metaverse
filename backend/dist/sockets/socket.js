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
//*****Socket Connection******** */
export const handleSocketConnection = (client, io) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(client.id);
    //******CREATING THE ROOM********** */
    client.on("space-create", (_a) => __awaiter(void 0, [_a], void 0, function* ({ space_name, user_id }) {
        console.log(`Creating the space`);
        const space_id = nanoid();
        //Storing the room data into the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)";
        const result = yield db.execute(q, [space_name, space_id, user_id]);
        console.log(result);
        client.join(space_id); //creating the socket room
        client.emit("space-created", { space_id, status: 201 });
    }));
    //Joining the space
    client.on("join-space", (_a) => __awaiter(void 0, [_a], void 0, function* ({ space_id, user_id }) {
        //Joinin the socket room
        client.join(space_id);
        //storing into the database
        const q = 'insert into space_user (space_id,user_id) values(?,?)';
        const result = yield db.execute(q, [space_id, user_id]);
        client.emit("joined", { space_id, status: 201, result });
        // io.to(space_id).emit("")
    }));
});
