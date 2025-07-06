import express from 'express';
import { handleSignup, handleSignin } from '../controllers/auth.controller.js';
export const authRouter = express.Router();
//Signup route
authRouter.post('/signup', handleSignup);
//Signin route
authRouter.post('/signin', handleSignin);
