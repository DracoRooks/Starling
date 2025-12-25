import express from "express";
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // checking if all fields exist or not
        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // checking password strength, dunno if regex should be used or not, special chars are a pain
        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters." });
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            // regex.test() returns true is found and false is not found
            // so false means invalid format, whereas true means pattern is found
            return res.status(400).json({ message: "Invalid Email format." });
        }

        // checking is user already exists or not
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "Email already exists. Try logging in instead?" })
        }

        // password encryption
        const salt = await bcrypt.genSalt(14);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if(!newUser) { // if creating new User failed for some reason, maybe cuz data didn't match userSchema
            return res.status(400).json({ message: "Invalid user data." });
        }
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            profilePic: savedUser.profilePic
        });
        
        sendWelcomeEmail(savedUser.email, savedUser.username, ENV.CLIENT_URL).catch((error) => {
            throw new Error(`SEND_EMAIL_FAILURE: ${error}`);
        });

    } catch (error) {
        console.error("[ERROR]::SIGNUP_CONTROLLER:", error);

        // for race condition in case of concurrent signups 
        if(error?.code === 11000 && (error.keyPattern?.email || error.keyValue?.email)) {
            return res.status(409).json({ message: "Email already exists." })
        }
        return res.status(500).json({ message: "Internal server error. Here" });
    }
}