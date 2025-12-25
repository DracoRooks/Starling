import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if(!MONGO_URI) {
            throw new Error("MONGO_URI enviroment variable is not set.");
        }
        const conn = await mongoose.connect(MONGO_URI);
        console.log("[INFO]::MONGO_DB_CONNECTED_SUCCESSFULY_TO_HOST:", conn.connection.host);
    } catch(error) {
        throw error;
    }
}