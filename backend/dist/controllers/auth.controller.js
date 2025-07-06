import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//Secret key for my JWT 
const secret_Key = process.env.JWT_SECRET || "yoursecretkey";
//Signup controller
export const handleSignup = (req, res) => {
    const { name, password, email } = req.body;
    //Encrypting the password
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (!err) {
            console.log(hash);
        }
    });
    //Creating the JWT Token
    const token = jwt.sign({ email, name }, secret_Key);
    res.json({ data: req.body, token });
};
//Signin controller
export const handleSignin = (req, res) => {
    const { email, password } = req.body;
    res.json(req.body);
};
