import { useEffect, useRef, useState } from "react";
import { ImageIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import MsgSentAudio from "../../../assets/audio/msg-sent.wav";

const msgSentAudio = new Audio(MsgSentAudio);

function MessageInputBar() {
  const { sendMessage, activeChat, isAudioEnabled } = useChatStore();

  const [textMessage, setTextMessage] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const imgInputRef = useRef(null);
  const sendMsdBtnRef = useRef(null);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedImg?.type?.startsWith("image") === true)
      formData.append("image", selectedImg);
    else if (selectedImg?.type?.startsWith("image") === false) {
      toast.error("Please select an image file.");
      return;
    }

    formData.append("text", textMessage);

    if (isAudioEnabled) {
      msgSentAudio.current = 0;
      msgSentAudio.play().catch((error) =>
        console.error("Failed to play msg-sent.wav", error)
      );
    }

    setTextMessage("");
    setSelectedImg(null);
    imgInputRef.current.value = "";

    sendMessage(formData, activeChat._id);
  };

  const handleImgPrev = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRemoveImg = () => {
    if (imgInputRef.current) imgInputRef.current.value = "";
    if (selectedImg) setSelectedImg(null);
    if (imgPreview) setImgPreview(null);
  };

  useEffect(() => {
    const handleEnterKey = (event) => {
      if(event.key === "Enter" && sendMsdBtnRef.current) sendMsdBtnRef.current.click();
    }

    document.addEventListener("keydown", handleEnterKey);

    return () => document.removeEventListener("keydown", handleEnterKey);
  }, []);

  return (
    <div
      className="w-[98%] rounded-3xl px-2 mx-auto mb-2 flex flex-col gap-2 items-center justify-center 
      bg-slate-500/80 border border-slate-700 text-slate-200"
    >
      <div
        className="h-28 flex items-center justify-start w-full border-b border-slate-300"
        hidden={!selectedImg}
      >
        {selectedImg && (
          <div className="relative">
            <img
              src={imgPreview}
              alt="Image Preview"
              className="max-h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 size-5 z-10 bg-slate-500/50 hover:bg-slate-700 transition-colors rounded-full flex items-center justify-center text-slate-200"
              onClick={() => handleRemoveImg()}
            >
              {<XIcon className="size-4" />}
            </button>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => handleMessageSend(e)}
        className="h-12 flex items-center justify-center w-full"
      >
        <input
          type="file"
          ref={imgInputRef}
          accept="image/*"
          onChange={(e) => {
            setSelectedImg(e.target.files[0]);
            handleImgPrev(e);
          }}
          className="hidden"
        />
        <ImageIcon
          className={`size-10.5 hover:bg-slate-700 transition-colors p-2 rounded-full ${
            imgPreview ? "text-cyan-600 bg-slate-700" : ""
          }`}
          onClick={() => imgInputRef.current?.click()}
        />
        <textarea
          placeholder="Type a message"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="w-full rounded-xl bg-transparent placeholder-slate-400 ring-transparent border-none focus:border-transparent resize-none"
          rows={1}
        />
        <button
          type="button"
          onClick={(e) => handleMessageSend(e)}
          ref={sendMsdBtnRef}
          disabled={textMessage.trim() === "" && !selectedImg}
          className="size-10.5 transition-colors p-2 rounded-full bg-linear-to-r disabled:opacity-50
          from-cyan-600 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
        >
          <SendHorizontalIcon />
        </button>
      </form>
    </div>
  );
}

export default MessageInputBar;
