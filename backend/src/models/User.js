import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        profilePic: {
            type: String,
            default: ""
        }
    }, 
    { timestamps: true } // tells mongo to store timestamps.createdAt and timestamps.updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
