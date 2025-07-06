import express from 'express';
export const authRouter = express.Router();
authRouter.get('/signup', (req, res) => {
    res.json("you are signuping the data");
});
