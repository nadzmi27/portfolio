import HandDrawnDiv from "../HandDrawn/HandDrawnDiv";
import { type Message } from "../../services/supabase/messages";
import { formatDate } from "./formatDate";

function RecentMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto no-scrollbar mb-4">
      {messages.map((message) => (
        <HandDrawnDiv
          key={message.id}
          styles={{
            default: {
              stroke: "#76726C",
              roughness: 1,
              fill: "#F5EFE4",
              fillStyle: "solid",
            },
          }}
        >
          <div className="flex flex-col justify-between gap-2 px-4 py-2">
            <div>{message.message}</div>
            <div className="flex flex-row justify-self-end gap-4 items-center text-black/65 justify-between">
              <span className="wrap-break-word">—&nbsp;{message.name}</span>
              {/* <span className="border-l h-4"></span> */}
              <span className="whitespace-nowrap">
                {formatDate(message.created_at)}
              </span>
            </div>
          </div>
        </HandDrawnDiv>
      ))}
    </div>
  );
}

export default RecentMessages;
