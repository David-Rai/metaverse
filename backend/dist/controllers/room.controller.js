var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nanoid } from "nanoid";
import db from '../models/db.js';
//****Handle creating the room***** */
export const handleRoomCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_name } = req.body;
    const room_id = nanoid();
    try {
        //Storing the room in the database
        const q = "insert into rooms (room_name,room_id) values(?,?)";
        const result = yield db.execute(q, [room_name, room_id]);
        console.log(result);
        res.status(201).json({ status: 201, message: "Room is created", room_id });
    }
    catch (err) {
        next(err);
    }
});
