import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import DefaultAvatarImg from "../../../assets/avatar.png";
import { XIcon } from "lucide-react";

function ChatHeader() {
  const { activeChat, setActiveChat } = useChatStore();

  return (
    <div
      className="flex items-center justify-between px-6 flex-1 max-h-20
      bg-slate-800/50 border-b border-slate-500/50"
    >
      <div className="flex flex-row items-center gap-3">
        <div className="avatar">
          <div className="size-12 rounded-full overflow-hidden relative">
            <img
              src={activeChat.profilePic || DefaultAvatarImg}
              alt={activeChat.username}
              className="size-full object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium text-xl">
            {activeChat.username}
          </h3>
          <h3 className="text-slate-400 text-xs">online</h3>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setActiveChat(null)}
        className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
      >
        <XIcon />
      </button>
    </div>
  );
}

export default ChatHeader;
