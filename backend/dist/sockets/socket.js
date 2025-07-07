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
        client.emit("space-created", { space_id, result, status: 201 });
    }));
    //Joining the space
    client.on("joinSpace", ({ spaceID, userID }) => {
        //joining the space
        client.join(spaceID);
        client.emit("spaceID", { spaceID });
        //sending the all users that someone joined
        client.to(spaceID).emit("someoneJoin", { userID });
    });
});
