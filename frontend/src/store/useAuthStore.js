import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });

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
}));
