import express, { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'

//Secret key for my JWT 
const secret_Key = process.env.JWT_SECRET || "yoursecretkey"

//Interfaces for signup and signin
interface signupBody {
    name: string
    email: string
    password: string
}

interface signinBody {
    email: string
    password: string
}

//*************Signup controller*********
export const handleSignup = (req: Request<{}, {}, signupBody>, res: Response) => {
    const { name, password, email } = req.body

    //Encrypting the password
    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        if(!err){
            console.log(hash)
        }
    });
  
    //Storing in the Database
    


    //Creating the JWT Token
    const token=jwt.sign({email,name},secret_Key)
    

    res.status(201).json({data:req.body,token,status:201})
}

//************Signin controller************
export const handleSignin = (req: Request<{}, {}, signinBody>, res: Response) => {
    const { email, password } = req.body

    res.json(req.body)
}

