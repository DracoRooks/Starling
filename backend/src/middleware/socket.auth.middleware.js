import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      ?.split("=")[1];

    if(!token) {
      console.error("Socket Connection Refused: No Token Provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if(!decoded) {
      console.error("Socket Connection Refused: Invalid Token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
        console.error("Socket Connection Refused: User Not Found");
        return next(new Error("Unauthorized - User Not Found"));
    }

    socket.user = user;
    socket.userId = user._id;

    console.log(`Socket authenticated for user: ${user.username} (${user._id})`);

    next();

  } catch (error) {
    console.error("Error in socket authentication:", error);
    next(new Error("Unauthorized - Authentication Failed"));
  }
};
