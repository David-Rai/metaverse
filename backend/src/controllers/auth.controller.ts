import express, { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import db from '../models/db.js'
import { nanoid } from 'nanoid'
import { checkEmail } from "../utils/checkEmail.js";
import { RowDataPacket } from "mysql2";
import type { CustomRequest } from '../middlwares/auth.middlware.js'


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
export const handleSignup = async (req: CustomRequest<{}, {}, signupBody>, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body
    const user_id = nanoid()

    //If user exist
    if (req?.user) {
        console.log("user", req.user)
        res.json(req.user)
    }

    //Checking the email existance
    const exist = await checkEmail(email)
    // if (exist.length > 0) {
    // return res.status(500).json({ message: "email already exist", status: 500 })
    // }


    //Encrypting the password
    bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
            try {
                //Storing in the Database
                const q = "insert into users (name,email,password,user_id) values(?,?,?,?)"
                const result = await db.execute(q, [name, email, hash, user_id])
                console.log(result)


                //Creating the JWT Token
                const token = jwt.sign({ email, user_id }, secret_Key)
                res.cookie('token', token)


                return res.status(201).json({ data: req.body, token, status: 201, result })
            }
            catch (err) {
                next(err)
            }
        }
    });
}


//************Signin controller************
export const handleSignin = async (req: Request<{}, {}, signinBody>, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    //Checking into the database
    const q = "select * from users where email=?"
    const [rows] = await db.execute<RowDataPacket[]>(q, [email])

    //Getting the real password
    const hash = await rows[0].password
    bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            return next(err)
        }

        if (!result) {
            const err = new Error("password milena")
            return next(err)
        }

        //Creating the JWT Token
        const token = jwt.sign({ email: rows[0].email, user_id: rows[0].user_id }, secret_Key)
        res.cookie("token", token)//setting the cookies in client side
        res.json({ status: 200, token })
    });

}

