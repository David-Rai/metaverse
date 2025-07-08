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
import { handleSignup, handleSignin } from '../controllers/auth.controller.js';
import { authHandler } from '../middlwares/auth.middlware.js';
export const authRouter = express.Router();
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If user exists
        if (req === null || req === void 0 ? void 0 : req.user) {
            console.log("user from verification", req.user);
            res.json({ user: req.user, status: true });
            return; // Explicit return to ensure we don't continue
        }
        throw new Error("Credentials are incorrect");
    }
    catch (err) {
        // console.log("checking ", req.user)
        next(err);
    }
});
//verification
authRouter.get('/verify', authHandler, verifyUser);
//Signup routea
authRouter.post('/signup', authHandler, handleSignup);
//Signin route
authRouter.post('/signin', authHandler, handleSignin);
