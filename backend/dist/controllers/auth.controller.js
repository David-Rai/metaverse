var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/db.js';
import { nanoid } from 'nanoid';
import { checkEmail } from "../utils/checkEmail.js";
//Secret key for my JWT 
const secret_Key = process.env.JWT_SECRET || "yoursecretkey";
//*************Signup controller*********
export const handleSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    const user_id = nanoid();
    //If user exist
    if (req === null || req === void 0 ? void 0 : req.user) {
        console.log("user", req.user);
        res.json(req.user);
    }
    console.log("Signup");
    //Checking the email existance
    const exist = yield checkEmail(email);
    // if (exist.length > 0) {
    // return res.status(500).json({ message: "email already exist", status: 500 })
    // }
    //Encrypting the password
    bcrypt.hash(password, 10, function (err, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            // Store hash in your password DB.
            if (!err) {
                try {
                    //Storing in the Database
                    const q = "insert into users (name,email,password,user_id) values(?,?,?,?)";
                    const result = yield db.execute(q, [name, email, hash, user_id]);
                    console.log(result);
                    //Creating the JWT Token
                    const token = jwt.sign({ email, user_id }, secret_Key);
                    res.cookie('token', token);
                    return res.status(201).json({ data: req.body, token, status: 201, result });
                }
                catch (err) {
                    next(err);
                }
            }
        });
    });
});
//************Signin controller************
export const handleSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //If user exist
    if (req === null || req === void 0 ? void 0 : req.user) {
        console.log("user", req.user);
        res.json(req.user);
    }
    //Checking into the database
    const q = "select * from users where email=?";
    const [rows] = yield db.execute(q, [email]);
    //Getting the real password
    const hash = yield rows[0].password;
    bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            return next(err);
        }
        if (!result) {
            const err = new Error("password milena");
            return next(err);
        }
        //Creating the JWT Token
        const token = jwt.sign({ email: rows[0].email, user_id: rows[0].user_id }, secret_Key);
        res.cookie("token", token); //setting the cookies in client side
        res.json({ status: 200, token });
    });
});
