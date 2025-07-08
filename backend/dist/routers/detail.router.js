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
import db from '../models/db.js';
import { authHandler } from '../middlwares/auth.middlware.js';
export const detailRouter = express.Router();
//Getting your data
detailRouter.get('/myself', authHandler, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //User_id from the request user object
    const user = req.user;
    //Getting the user data from database
    try {
        const q = "select name from users where user_id=?";
        const [result] = yield db.execute(q, [user === null || user === void 0 ? void 0 : user.user_id]);
        const q2 = 'select * from spaces where user_id=?';
        const [spaces] = yield db.execute(q2, [user === null || user === void 0 ? void 0 : user.user_id]);
        res.json({ user, messaege: "your data hai ta", result, spaces });
    }
    catch (err) {
        return next(err);
    }
}));
