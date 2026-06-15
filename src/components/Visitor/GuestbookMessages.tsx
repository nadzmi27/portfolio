// src/components/GuestbookMessages.tsx
import { useState, useEffect } from "react";
import {
  fetchMessagesPaginated,
  sendMessage,
  type Message,
  type NewMessageInput,
} from "../../services/supabase/messages";
import { formatDate } from "./formatDate";
import HandDrawnDiv from "../HandDrawn/HandDrawnDiv";
import MessageInput from "./MessageInput";
import HandDrawnLine from "../HandDrawn/HandDrawnLine";

const PAGE_SIZE = 4;

export default function GuestbookMessages({
  quote,
}: {
  quote?: { q: string; a: string } | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // For pagination
  useEffect(() => {
    setLoading(true);
    fetchMessagesPaginated(page, PAGE_SIZE)
      .then(({ data, count }) => {
        setMessages(data);
        setTotalCount(count);
      })
      .finally(() => setLoading(false));
  }, [page]);

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
    <div className="flex flex-row pr-2 lg:px-0">
      <div className="basis-9/20 flex flex-col items-center">
        <div className="flex flex-col w-[90%] text-pretty mb-2 leading-loose self-start pl-10">
          Leave a little note, a kind word, or a random thought. I'd love to
          read it!
        </div>
        <div className="w-[90%] mb-4">
          <MessageInput onMessageSent={handleNewMessage} />
        </div>
        <HandDrawnLine
          className="w-[95%] mb-2"
          styles={{
            stroke: "#999A92",
            strokeWidth: 2,
            roughness: 0,
            strokeLineDash: [6, 3],
          }}
          seed={1}
          pad={1}
        />
        {quote ? (
          <>
            <p className="self-start pl-10 mb-2">Quotes of The Day</p>
            <HandDrawnDiv
              className="w-[85%]"
              styles={{
                default: {
                  stroke: "#76726C",
                  fill: "#F3EDDF",
                  fillStyle: "solid",
                },
              }}
            >
              <div className="break w-full px-4 py-3">
                <p className="italic">"{quote.q}"</p>
                <p className="mt-1 text-black/65">— {quote.a}</p>
              </div>
            </HandDrawnDiv>
          </>
        ) : (
          <p className="text-sm opacity-50">Loading quote...</p>
        )}
      </div>
      {/* Message board */}
      <div className="basis-11/20  w-full pl-2 pr-2">
        <div className="flex flex-row items-center gap-2 pl-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-800" />
          RECENT MESSAGES
        </div>
        {/* Messages */}
        <div className="flex flex-col gap-3 h-[400px] overflow-y-auto no-scrollbar mb-4">
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
        {/* Pagination */}
        <div className="flex gap-2 mt-6 justify-self-center">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="..."
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={p === page ? "font-bold underline" : ""}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="..."
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div>
  //       {loading ? (
  //         <p>Loading...</p>
  //       ) : (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {messages.map((message) => (
  //             <HandDrawnDiv
  //               key={message.id}
  //               styles={{
  //                 default: {
  //                   stroke: "#76726C",
  //                   roughness: 1,
  //                   fill: "#F5EFE4",
  //                   fillStyle: "solid",
  //                 },
  //               }}
  //               className="h-fit"
  //             >
  //               <div className="h-fit flex flex-col justify-between gap-2 px-4 py-2">
  //                 <div>{message.message}</div>
  //                 <div className="flex flex-row justify-self-end gap-4 items-center text-black/65 justify-between">
  //                   <span className="wrap-break-word">—&nbsp;{message.name}</span>
  //                   {/* <span className="border-l h-4"></span> */}
  //                   <span className="whitespace-nowrap">
  //                     {formatDate(message.created_at)}
  //                   </span>
  //                 </div>
  //               </div>
  //             </HandDrawnDiv>
  //           ))}
  //         </div>
  //       )}

  //       {/* Pagination controls */}
  //       <div className="flex gap-2 mt-6">
  //         <button
  //           onClick={() => setPage((p) => p - 1)}
  //           disabled={page === 1}
  //           className="..."
  //         >
  //           Prev
  //         </button>

  //         {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
  //           <button
  //             key={p}
  //             onClick={() => setPage(p)}
  //             className={p === page ? "font-bold underline" : ""}
  //           >
  //             {p}
  //           </button>
  //         ))}

  //         <button
  //           onClick={() => setPage((p) => p + 1)}
  //           disabled={page === totalPages}
  //           className="..."
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   );
}
