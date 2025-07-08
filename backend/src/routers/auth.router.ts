import express, { Request, Response, NextFunction } from 'express'
import { handleSignup, handleSignin } from '../controllers/auth.controller.js'
import { authHandler } from '../middlwares/auth.middlware.js'
import type { CustomRequest } from '../middlwares/auth.middlware.js'

export const authRouter = express.Router()

const verifyUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // If user exists
        if (req?.user) {
            console.log("user from verification", req.user);
            res.json({ user: req.user, status: true });
            return; // Explicit return to ensure we don't continue
        }


        throw new Error("Credentials are incorrect");
    } catch (err) {
        // console.log("checking ", req.user)
        next(err);
    }
};

//verification
authRouter.get('/verify', authHandler, verifyUser)

//Signup routea
authRouter.post('/signup', authHandler, handleSignup)

//Signin route
authRouter.post('/signin', authHandler, handleSignin)


