import jwt from 'jsonwebtoken';
export const authHandler = (req, res, next) => {
    const { token } = req.cookies;
    if (token === "" || token === undefined) {
        console.log("no token found here first");
        return next();
    }
    const secret = process.env.JWT_SECRET || "yoursecretkey";
    try {
        //Verifying the token
        const rawData = jwt.verify(token, secret);
        req.user = { user_id: rawData.user_id };
        return next();
    }
    catch (err) {
        console.log("no token found here");
        return next(err);
    }
};
