import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    allChats: [],
    messagesById: [],
    activeTab: "chats",
    activeChat: null,
    isContactsLoading: false,
    isChatsLoading: false,
    isMessagesLoading: false,
    isAudioEnabled: JSON.parse(localStorage.getItem("isAudioEnabled")) === true,

    setActiveTab: (tab) => set({ activeTab: tab }),

    setActiveChat: (chat) => set({ activeChat: chat }),

    audioToggle: () => {
        localStorage.setItem("isAudioEnabled", !get().isAudioEnabled);
        set({ isAudioEnabled: !get().isAudioEnabled });
    },

    getAllContacts: async () => {
        set({ isContactsLoading: true });
        try {
            const res = await axiosInstance.get("/message/contacts");
            set({ allContacts: res.data });

        } catch (error) {
            console.error("[ERROR]::USE_CHAT_STORE::GET_ALL_CONTACTS:", error);
            toast.error(error.response?.data?.message || error);

        } finally {
            set({ isContactsLoading: false });
        }
    },

    getAllChatPartners: async () => {
        set({ isChatsLoading: true });
        try {
            const res = await axiosInstance.get("/message/chats");
            set({ allChats: res.data });

        } catch (error) {
            console.error("[ERROR]::USE_CHAT_STORE::GET_ALL_CHATS:", error);
            toast.error(error.response?.data?.message || error);

        } finally {
            set({ isChatsLoading: false });
        }
    },

    getMessagesById: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messagesById: res.data });

        } catch (error) {
            console.error("[ERROR]::USE_CHAT_STORE::GET_MESSAGES:", error);
            toast.error(error.response?.data?.message || error);

        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));
