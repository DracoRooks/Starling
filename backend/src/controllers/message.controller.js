import { getRecieverSocketId, io } from "../lib/socket.js";
import { uploadCareClient } from "../lib/uploadCare.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }, { username: 1, profilePic: 1 });

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("[ERROR]::GET_ALL_CONTACTS_CONTROLLER:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getMessagesById = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const chatPartnerId = req.params.id;

        const chatPartnerExists = await User.exists({ _id: chatPartnerId });
        if(!chatPartnerExists) return res.status(404).json({ message: "Chat Partner not found." });

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, recieverId: chatPartnerId },
                { senderId: chatPartnerId, recieverId: loggedInUserId }
            ]
        });

        return res.status(200).json(messages);

    } catch (error) {
        console.error("[ERROR]::GET_MESSAGES_BY_ID_CONTROLLER:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        
        const userRelatedMessages = await Message.find({ 
            $or: [{ senderId: loggedInUserId }, { recieverId: loggedInUserId }]
        });

        const chatPartnerIds = [
            ...new Set(
                userRelatedMessages.map(msg =>
                    msg.senderId.toString() === loggedInUserId.toString() ? msg.recieverId.toString() : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }, { username: 1, profilePic: 1 });

        return res.status(200).json(chatPartners);

    } catch (error) {
        console.error("[ERROR]::GET_CHAT_PARTNERS_CONTROLLER:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { _id: senderId } = req.user;
        const { id: recieverId } = req.params;
        const { text } = req.body;
        const image = req.files?.image;

        const recieverExists = await User.exists({ _id: recieverId });
        if(!recieverExists) return res.status(404).json({ message: "Reciever not found." });

        const validText = text?.trim();
        if(!validText && !image) return res.status(400).json({ message: "Empty messages not allowed." });

        let imageUrl = "";
        if(image) {
            const uploadResponse = await uploadCareClient.uploadFile(image.data);
            imageUrl = "https://5fsdttzqfl.ucarecd.net/" + uploadResponse.uuid + "/";
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text: validText,
            image: imageUrl
        });

        const savedMessage = await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId) {
            io.emit("newMessage", savedMessage);
        }

        return res.status(201).json(savedMessage);

    } catch (error) {
        console.error("[ERROR]::SEND_MESSAGE_CONTROLLER:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};