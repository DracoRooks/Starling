import React, { useEffect } from 'react';
import { LoaderIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore.js";
import DefaultAvatarImg from "../../assets/avatar.png";
import UsersLoaderAnimation from "./UsersLoaderAnimation.jsx";

function ContactList() {
  const { allContacts, getAllContacts, isContactsLoading, setActiveChat } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if(isContactsLoading) return <UsersLoaderAnimation />;

  return (
    allContacts.map(contact => 
      <div
        key={ contact._id.toString() + "setActiveChat" }
        onClick={ () => setActiveChat(contact) }
        className="bg-cyan-500/10 hover:bg-cyan-500/20 w-full rounded-lg p-4 cursor-pointer transition-colors"
      >
        <div key={ contact._id.toString() + "flex" } className="flex items-center gap-3">
          <div key={ contact._id.toString() + "avatar" } className="avatar">
            <div key={ contact._id.toString() + "size" } className="size-12 rounded-full">
              <img
                key={ contact._id.toString() + "pfp" }
                src={ contact.profilePic || DefaultAvatarImg }
                alt="pfp"
              />
            </div>
          </div>
          <h4 key={ contact._id.toString() + "name" } className="text-slate-200 font-medium truncate">
            { contact.username }
          </h4>
        </div>
      </div>
    )
  );
};

export default ContactList;
