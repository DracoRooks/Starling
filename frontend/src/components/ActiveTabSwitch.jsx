import React from 'react';
import { useChatStore } from '../store/useChatStore.js';

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="bg-transparent tabs tabs-box p-2 m-2">
      <button
        type="button"
        className={`w-1/2 my-1 font-medium text-lg hover:cursor-pointer tab transition-all
          ${ activeTab === "chats" ? "tab-active bg-cyan-400/20 text-cyan-400" : "bg-transparent" }`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>
      <button
        type="button"
        className={`w-1/2 my-1 font-medium text-lg hover:cursor-pointer tab transition-all
          ${ activeTab === "contacts" ? "tab-active bg-cyan-400/20 text-cyan-400" : "bg-transparent" }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
