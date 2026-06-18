import { useEffect, useState } from "react";
import {
  fetchMessages,
  sendMessage,
  type Message,
  type NewMessageInput,
} from "../../services/supabase/messages";
import HandDrawnDiv from "../HandDrawn/HandDrawnDiv";
import HandDrawnLine from "../HandDrawn/HandDrawnLine";
import MessageInput from "../Visitor/MessageInput";
import RecentMessages from "../Visitor/RecentMessages";

function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function loadMessages() {
      const data = await fetchMessages(6);
      setMessages(data);
    }
    loadMessages();
  }, []);

  const handleNewMessage = async (newMessage: NewMessageInput) => {
    setMessages((prev) => [
      {
        id: Date.now(), // temporary  id
        name: newMessage.name || "Anonymous",
        message: newMessage.message,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    // server sync
    await sendMessage({
      name: newMessage.name,
      message: newMessage.message,
      website: newMessage.website,
    });
  };
  return (
    <div className="flex flex-col md:flex-row md:pr-2 lg:px-0 mb-8">
      <div className="flex flex-col items-center md:basis-9/20">
        <div className="flex flex-col leading-loose min-w-[300px] w-[90%] text-pretty mb-2 md:mb-4 md:self-start md:pl-10">
          Leave a little note, a kind word, or a random thought. I'd love to
          read it!
        </div>
        <div className="min-w-[300px] w-[90%] mb-4">
          <MessageInput onMessageSent={handleNewMessage} />
        </div>
        <HandDrawnLine
          className="w-[95%] mb-2 hidden md:block"
          styles={{
            stroke: "#999A92",
            strokeWidth: 2,
            roughness: 0,
            strokeLineDash: [6, 3],
          }}
          seed={1}
          pad={1}
        />
        <div className="hidden md:flex flex-col w-full">
          <HandDrawnDiv
            className="w-[85%] self-center"
            styles={{
              default: {
                stroke: "#76726C",
                fill: "#F3EDDF",
                fillStyle: "solid",
              },
            }}
          >
            <div className="break w-full px-4 py-3">
              Thank you for stopping by and leaving a little piece of you here!
            </div>
          </HandDrawnDiv>
        </div>
      </div>

      {/* Message board */}
      <div className="md:basis-11/20 self-center min-w-[300px] w-[90%] md:w-[85%] md:self-start md:w-full md:px-2 mt-4 md:mt-0">
        <div className="flex flex-row items-center gap-2 pl-2 md:pl-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-800" />
          RECENT MESSAGES
        </div>
        <RecentMessages messages={messages} />
        <HandDrawnDiv
          className="w-full text-center"
          onClick={() => {
            window.location.href = "/portfolio/visitor";
          }}
          styles={{
            default: {
              roughness: 1,
              stroke: "#A09D90",
              strokeLineDash: [8, 4],
              seed: 7,
              bowing: 0.2,
            },
          }}
        >
          <p className="py-2 text-black/60">view all messages</p>
        </HandDrawnDiv>
      </div>
    </div>
  );
}

export default MessageBoard;
