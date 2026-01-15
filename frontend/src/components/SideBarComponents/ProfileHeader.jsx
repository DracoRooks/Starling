import React from 'react';
import { useState, useRef } from 'react';
import { LoaderIcon, LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import DefaultAvatarImg from "../../../assets/avatar.png";
import BtnClickAudio from "../../../assets/audio/btn-click.wav";

const btnClickAudio = new Audio(BtnClickAudio);

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isAudioEnabled, audioToggle } = useChatStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    updateProfile(formData);
  };

  return (
    <div className="p-6 border-b border-slate-500/50 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-3">
          {/* PROFILE PICTURE / ONLINE STATUS */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative"
              onClick={ () => fileInputRef.current.click() }
            >
              <img
                src={ selectedImage || authUser.profilePic || DefaultAvatarImg }
                alt="Profile Pic"
                className="size-full object-cover"
              />
              {
                isUpdatingProfile
                ? <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <LoaderIcon className="size-5 animate-spin" />
                  </div>
                : <div
                    className="absolute inset-0 flex items-center justify-center
                    bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white text-xs">Change?</span>
                  </div>
              }
            </button>
            <input
              type="file"
              accept="image/*"
              ref={ fileInputRef }
              onChange={ handleImageUpload }
              className="hidden"
              disabled={ isUpdatingProfile }
            />
          </div>
          <div className="max-w-40 truncate flex flex-col justify-center">
            <h3 className="text-slate-200 font-medium">{ authUser.username }</h3>
            <p className="text-green-500 text-xs">online</p>
          </div>
        </div>

        {/* AUDIO / LOGOUT */}
        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={() => {
                btnClickAudio.currentTime = 0;
                btnClickAudio.play().catch((error) => console.error("Failed to play BtnClickAudio:", error));
                audioToggle();
              }
            }
            className="hover:cursor-pointer text-slate-400 hover:text-slate-200 transition-colors"
          >{
            isAudioEnabled
            ? <Volume2Icon className="size-5" />
            : <VolumeOffIcon className="size-5" />
          }</button>

          <button
            type="button"
            onClick={() => {
                btnClickAudio.currentTime = 0;
                btnClickAudio.play().catch((error) => console.error("Failed to play BtnClickAudio:", error));
                logout();
              }
            }
            className="hover:cursor-pointer text-slate-400 hover:text-slate-200 transition-colors"
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
