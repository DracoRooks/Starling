import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided." });
        }
        
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token." });
        }

        // jwt.verify() returns an object of extracted payload and metadata
        // eg. payload = { x: 100, y: "hi" } 
        // after tokenization & verification becomes: decoded = { x: 100, y: "hi", iat: stuff, iss: "issuer" } 
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user; // to pass the authorized user to updateProfile

        next(); // chains the middleware to the controller

    } catch (error) {
        console.error("[ERROR]::UPDATE_PROFILE_MIDDLEWARE_FAILURE:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};