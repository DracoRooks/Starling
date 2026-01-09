// importing necessary modules
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileupload from "express-fileupload";

// importing all routes, controllers and libs
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV, isDevelopment, isProduction } from "./lib/env.js";

// creating and configuring necessary objects
const website = express();
const PORT = ENV.PORT || 2001;
const __dirname = path.resolve();

// website hints
website.use(cors({
    origin: isDevelopment ? "http://localhost:5173" : ENV.CLIENT_URL,
    credentials: true
}));
website.use(express.json()); // to be able to read req.body
website.use(fileupload({ limits: { fileSize: 5 * 1025 * 1024 } }));
website.use(cookieParser()); // to parse user cookies for user request validation and authentication

// all endpoints
website.use("/api/auth", authRoutes);
website.use("/api/message", messageRoutes);

// production deployment
if(isProduction) {
    website.use(express.static(path.join(__dirname, "../frontend/dist")));
    website.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    });
}

// listening port
connectDB()
.then(() => {
    website.listen(PORT, "0.0.0.0", error => {
        if(error) {
            console.log("[ERROR]::LISTENING_PORT:", PORT);
        } else {
            console.log("[INFO]::LISTENING_PORT:", PORT);
        }
    });
}).catch((error) => {
    console.error("[ERROR]::MONGO_DB_CONNECTION_FAILURE:", error);
    process.exit(1);
})