import express from 'express';
import { handleSignup, handleSignin } from '../controllers/auth.controller.js';
import { authHandler } from '../middlwares/auth.middlware.js';
export const authRouter = express.Router();
//Signup route
authRouter.post('/signup', authHandler, handleSignup);
//Signin route
authRouter.post('/signin', handleSignin);
