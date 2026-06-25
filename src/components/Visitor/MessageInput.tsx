import { useState, useRef, type ChangeEvent, useEffect } from "react";
import HandDrawnDiv from "../HandDrawn/HandDrawnDiv";
import {
  sendMessage,
  type NewMessageInput,
} from "../../services/supabase/messages";

const CHAR_LIMIT = 200;
function MessageInput({
  onMessageSent,
}: {
  onMessageSent?: (newMessage: NewMessageInput) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = message.length;

  const handleSubmit = async () => {
    setMessage("");
    if (message.length <= 3){
      return null
    }
    const submit = onMessageSent
      ? () => onMessageSent({ name, message, website })
      : () => sendMessage({ name, message, website });

    const result = await submit();
    console.log("Done", result);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    const newText = e.target.value.substring(0, CHAR_LIMIT);
    setMessage(newText);
    if (!el || newText.length >= CHAR_LIMIT) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <HandDrawnDiv
      className="w-full"
      styles={{
        default: {
          seed: 9,
          stroke: "#2C2D2D",
          fill: "#F3EAD9",
          fillStyle: "solid",
          roughness: 1,
        },
      }}
    >
      <form>
        <input
          type="message"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <HandDrawnDiv
          className="w-full text-base"
          styles={{
            default: { fill: "#F5EFE4", fillStyle: "solid", roughness: 1 },
          }}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            // onInput={handleInput}
            placeholder="Write your message here..."
            className="pt-3 pl-3 w-full max-w-[400px] box-border focus:outline-none resize-none min-h-24 mb-6 overflow-hidden"
          />
          <span className="absolute bottom-1 right-2 text-black/60">
            {charCount} / {CHAR_LIMIT}
          </span>
        </HandDrawnDiv>
        <div className="flex flex-row">
          <HandDrawnDiv
            className="basis-3/5"
            styles={{
              default: { fill: "#F5EFE4", fillStyle: "solid", roughness: 1 },
            }}
          >
            <input
              className="w-full pl-3 py-2 focus:outline-none"
              placeholder="Name (or leave it empty)"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </HandDrawnDiv>
          <HandDrawnDiv
            onClick={() => handleSubmit()}
            className="basis-2/5"
            styles={{
              default: { fill: "#A2C061", fillStyle: "solid", roughness: 1 },
              hover: { fill: "#9DBD5A", fillStyle: "solid", roughness: 1 },
              active: { fill: "#9DBD5A", fillStyle: "solid", roughness: 1 },
            }}
            seed={11}
          >
            <div className="w-full h-full py-2 flex items-center justify-center shadow-2xl">
              POST IT!
            </div>
          </HandDrawnDiv>
        </div>
      </form>
    </HandDrawnDiv>
  );
}

export default MessageInput;
