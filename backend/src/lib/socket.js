import express from "express";
import { ENV } from "./env.js";
import { Server } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const website = express();
const server = http.createServer(website);
const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL, "http://localhost:5173"],
        credentials: true
    },
});

io.use(socketAuthMiddleware);

// userSocketMap: Map<userId, Set<socketId>>
const userSocketMap = Map();

io.on("connection", socket => {
    console.log(`A connection made with '${socket.user.username}' successfully`);

    const userId = socket.userId;
    const userSockets = userSocketMap.get(userId) ?? new Set();
    userSockets.add(socket.id);
    userSocketMap.set(userId, userSockets);

    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.user.username} (${userId})`);

        const userSockets = userSocketMap.get(userId);
        if(userSockets) {
           userSockets.delete(socket.id);
           if(!userSockets) userSocketMap.delete(userId);
        }
        socket.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });
});

export {website, server, io};
