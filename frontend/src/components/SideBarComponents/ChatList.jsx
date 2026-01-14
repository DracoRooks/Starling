import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore.js';
import { LoaderIcon } from "lucide-react";
import UsersLoaderAnimation from './UsersLoaderAnimation.jsx';
import NoChatsFound from "./NoChatsFound.jsx";
import DefaultAvatarImg from "../../../assets/avatar.png";
import { useAuthStore } from '../../store/useAuthStore.js';

function ChatList() {
  const { onlineUsers } = useAuthStore();
  const { allChats, getAllChatPartners, isChatsLoading, setActiveChat } = useChatStore();

  useEffect(() => {
    getAllChatPartners();
  }, [getAllChatPartners]);

  if(isChatsLoading) return <UsersLoaderAnimation />;
  if(allChats.length === 0) return <NoChatsFound />

  return (
    allChats.map(chat => 
      <div
        key={ chat._id.toString() + "setActiveChat" }
        onClick={ () => setActiveChat(chat) }
        className="bg-cyan-500/10 hover:bg-cyan-500/20 w-full rounded-lg p-4 cursor-pointer transition-colors"
      >
        <div key={ chat._id.toString() + "flex" } className="flex items-center gap-3">
          <div key={ chat._id.toString() + "avatar" } className={`avatar ${onlineUsers.includes(`${chat._id}`) ? "avatar-online" : "avatar-offline"}`}>
            <div key={ chat._id.toString() + "size" } className="size-12 rounded-full">
              <img
                key={ chat._id.toString() + "pfp" }
                src={ chat.profilePic || DefaultAvatarImg }
                alt="pfp"
              />
            </div>
          </div>
          <h4 key={ chat._id.toString() + "name" } className="text-slate-200 font-medium truncate">
            { chat.username }
          </h4>
        </div>
      </div>
    )
  );
};

export default ChatList;
