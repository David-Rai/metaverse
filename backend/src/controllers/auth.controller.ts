import express, { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import db from '../models/db.js'
import { nanoid } from 'nanoid'
import { checkEmail } from "../utils/checkEmail.js";
import { RowDataPacket } from 'mysql2/promise'


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
export const handleSignup = async (req: Request<{}, {}, signupBody>, res: Response,next:NextFunction) => {
    const { name, password, email } = req.body
    const user_id = nanoid()

    //Checking the email existance
    // const exist : any= await checkEmail(email)
    // if (exist.length > 0) {
    //     return res.status(500).json({ message: "email already exist", status: 500 })
    // }


    //Encrypting the password
    bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
            try {
                //Storing in the Database
                const q = "insert into users (name,email,password,user_id) values(?,?,?,?)"
                const result = await db.execute(q, [name, email, password, user_id])
                console.log(result)


                //Creating the JWT Token
                const token = jwt.sign({ email, name }, secret_Key)
                res.cookie("token", token)//setting the cookies in client side

                res.status(201).json({ data: req.body, token, status: 201, result })
            }
            catch (err) {
                console.log(err)
                next(err)
                return res.status(500).json({ message: "erorr hai ta", err })
            }
        }
    });
}

//************Signin controller************
export const handleSignin = (req: Request<{}, {}, signinBody>, res: Response) => {
    const { email, password } = req.body

    res.json(req.body)
}

