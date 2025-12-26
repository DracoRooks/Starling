import jwt from "jsonwebtoken";
import { ENV, isProduction } from "./env.js";

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = ENV;
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
        secure: (isProduction)
    });

    return token;
}