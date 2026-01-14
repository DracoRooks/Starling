import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:2000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUsers: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });

            get().connectSocket();

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE::CHECK_AUTH:", error);
            set({ authUser: null });

        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data });
            toast.success("Account created successfully!");
            
            get().connectSocket();

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE::SIGNUP:", error);
            toast.error(error.response?.data?.message || error.message);

        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data });
            toast.success("Welcome back!");
            
            get().connectSocket();

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE::LOGIN:", error);
            toast.error(error.response?.data?.message || error.message);

        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/auth/logout");

            set({ authUser: null });
            toast.success("Logged out successfully!");

            get().disconnectSocket();

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE:", error);
            toast.error(error.response?.data?.message || error.message);

        } finally {
            set({ isLoggingOut: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);

            set({ authUser: res.data });
            toast.success("Profile Picture updated successfully");

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE::UPDATE_PROFILE_PIC:", error);
            toast.error(error.response?.data?.message || error.message);

        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    
    connectSocket: () => {
        if(!get().authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {withCredentials: true});

        socket.connect();

        set({ socket });

        socket.on("getOnlineUsers", userIds => {
            set({ onlineUsers: userIds})
        });
    },
    
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },
}));
