// importing necessary modules
import express from "express";
import dotenv from "dotenv";

// importing all routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// creating and configuring necessary objects
const website = express();
dotenv.config();
const PORT = process.env.PORT || 2001;

// all endpoints
website.use("/api/auth", authRoutes);
website.use("/api/message", messageRoutes);

// listening port
website.listen(PORT, "0.0.0.0", err => {
    if(err) {
        console.log("[ERROR]::LISTENING_PORT:", PORT);
    } else {
        console.log("[INFO]::LISTENING_PORT:", PORT);
    }
});