import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessagesLoadingAnimation from "./MessagesLoadingAnimation.jsx";
import MessageInputBar from "./MessageInputBar.jsx";

function ChatContainer() {
  const { activeChat, messagesById, isMessagesLoading, getMessagesById } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesById(activeChat._id);
  }, [getMessagesById, activeChat]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 py-8 overflow-y-auto ">
        {isMessagesLoading ? (
          <MessagesLoadingAnimation />
        ) : messagesById.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messagesById.map((msg) => {
              const isMe = authUser._id === msg.senderId;

              return (
                <div
                  key={`${msg._id} chat`}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div
                    key={`${msg._id} chat-bubble`}
                    className={`chat-bubble relative max-w-[75%] px-3 py-2 ${
                      isMe
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-600 text-slate-200"
                    }`}
                  >
                    <div
                      key={`${msg._id} grid`}
                      className="grid grid-cols-1 gap-x-2 gap-y-1"
                    >
                      <div
                        key={`${msg._id} col`}
                        className="col-span-2 warp-break-word whitespace-pre-wrap"
                      >
                        {msg.image && (
                          <img
                            key={`${msg._id} img`}
                            src={msg.image}
                            alt="Image message"
                            className="rounded-lg h-48 object-cover"
                          />
                        )}
                        {msg.text && <p>{msg.text}</p>}
                      </div>
                    </div>
                    <div />
                    <p
                      key={`${msg._id} timestamp`}
                      className={`text-xs opacity-75 leading-none ${
                        isMe ? "self-end" : "self-start"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoChatHistoryPlaceholder username={activeChat.username} />
        )}
      </div>
      <MessageInputBar />
    </>
  );
}

export default ChatContainer;
