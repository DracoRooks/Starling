import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";
import RecievedMsgAudio from "../../assets/audio/msg-sent.wav";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    allChats: [],
    messagesById: [],
    activeTab: "chats",
    activeChat: null,
    isContactsLoading: false,
    isChatsLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,
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

    sendMessage: async (data, userId) => {
        set({ isSendingMessage: true });

        const {authUser} = useAuthStore.getState();
        const tempId = `tempId-${Date.now()}`;
        const messagesState = get().messagesById;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            recieverId: userId,
            text: data.get("text"),
            image: data.get("image"),
            createdAt: new Date().toISOString(),
            isOptimistic: true
        };

        set({ messagesById: [...messagesState, optimisticMessage] });

        try {
            const res = await axiosInstance.post(`/message/send/${userId}/`, data);
            set({ messagesById: messagesState.concat(res.data) });
            set({ activeTab: "chats" });

        } catch (error) {
            console.error("[ERROR]::USE_CHAT_STORE::SEND_MESSAGE:", error);
            toast.error(error.response?.data?.message || error.message);
            
            set({ messagesById: messagesState });

        } finally {
            set({ isSendingMessage: false });
        }
    },
    
    subscribeToMessages: () => {
        const { isAudioEnabled, activeChat } = get();
        if(!activeChat) return;

        const { socket } = useAuthStore.getState();

        const recievedMsgAudio = new Audio(RecievedMsgAudio);

        socket.on("newMessage", newMessage => {
            if(isAudioEnabled) {
                recievedMsgAudio.current = 0;
                recievedMsgAudio.play().catch(error => console.error("Error in playing sendMsgAudio:", error));
            }

            const isMessageFromActiveChat = newMessage.senderId === activeChat._id;
            if(!isMessageFromActiveChat) return;

            set({ messagesById: [...get().messagesById, newMessage] });
        });
    },
    
    unsubscribeToMessages: () => {
        const { socket } = useAuthStore.getState();
        socket?.off("newMessage");
    },
}));
