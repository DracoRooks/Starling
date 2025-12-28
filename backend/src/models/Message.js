import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            trim: true
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);

// a pre-validation middleware to check that atleast one of text or image are there in the message to be saved.
messageSchema.path("text").validate(
    function () {
        return !(this.text.trim() === "" && !this.image)
    },
    "Message must not be empty.",
    "MessageEmpty"
);

const Message = mongoose.model("Message", messageSchema);

export default Message;