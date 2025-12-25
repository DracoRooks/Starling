import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    const { JWT_SECRET, NODE_ENV } = ENV;
    if(!JWT_SECRET) {
        throw new Error("JWT_TOKEN enviroment variable is not set.");
    }

    const token = jwt.sign(
        { userId }, 
        JWT_SECRET, 
        { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true, // prevents XSS attacks (Cross-Site Scripting)
        sameSite: "strict", // prevents CSRF attacks (Cross-Side Request Forgery)
        secure: (NODE_ENV === "development" ? false : true)
    });

    return token;
}