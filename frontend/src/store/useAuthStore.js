import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

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
            console.log(data);
            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data });
            toast.success("Account created successfully!");

        } catch (error) {
            console.error("[ERROR]::USE_AUTH_STORE::SIGNUP:", error);
            toast.error(error.response.data.message);

        } finally {
            set({ isSigningUp: false });
        }
    }
}));