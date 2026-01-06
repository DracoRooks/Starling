import React from 'react';
import { useChatStore } from "../store/useChatStore.js";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import ChatPlaceholder from "../components/ChatPlaceholder.jsx";

function ChatPage() {
  const { activeTab, activeChat } = useChatStore();

  return (
    <div className="flex w-full max-w-6xl h-screen md:max-h-175 max-h-160 ">

      {/* LEFT USER LIST PANEL */}
      <div className="w-full max-w-[28%] bg-slate-800/50 flex flex-col backdrop-blur-sm rounded-xl">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto space-y-2 p-4">
          { activeTab === "chats" ? <ChatList /> : null }
          { activeTab === "contacts" ? <ContactList /> : null }
        </div>
      </div>

      {/* RIGHT CHAT PANEL */}
      <div className="w-full max-w-[72%] flex flex-1 flex-col bg-slate-900/60 backdrop-blur-sm">
        { activeChat ? <ChatContainer /> : <ChatPlaceholder /> }
      </div>
    </div>
  );
};

export default ChatPage;