import jwt from 'jsonwebtoken';
export const authHandler = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next();
    }
    const secret = process.env.JWT_SECRET || "yoursecretkey";
    if (!secret) {
        return next();
    }
    try {
        //Verifying the token
        const rawData = jwt.verify(token, secret);
        req.user = { user_id: rawData.user_id };
        return next();
    }
    catch (err) {
        return next(err);
    }
};
