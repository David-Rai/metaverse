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
export const handleSpaceCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { space_name, user_id } = req.body;
    const space_id = nanoid();
    try {
        //Storing the room in the database
        const q = "insert into spaces (space_name,space_id,user_id) values(?,?,?)";
        const result = yield db.execute(q, [space_name, space_id, user_id]);
        console.log(result);
        res.status(201).json({ status: 201, message: "space is created", space_id });
    }
    catch (err) {
        next(err);
    }
});
