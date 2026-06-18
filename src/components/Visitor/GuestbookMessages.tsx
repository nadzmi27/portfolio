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
  const [inputValue, setInputValue] = useState("1");
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // For pagination
  useEffect(() => {
    setLoading(true);
    setInputValue(String(page));
    fetchMessagesPaginated(page, PAGE_SIZE)
      .then(({ data, count }) => {
        setMessages(data);
        setTotalCount(count);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const onEnterPageInput = (p: string) => {
    const pageInput = parseInt(p);
    if (isNaN(pageInput)) {
      setInputValue(String(page));
    }
    if (pageInput > 0 && pageInput <= totalPages) {
      setInputValue(String(pageInput));
      setPage(pageInput);
    } else if (pageInput > totalPages) {
      setInputValue(String(totalPages));
      setPage(totalPages);
    } else {
      setPage(page);
    }
  };

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
    <div className="flex flex-col md:flex-row md:pr-2 lg:px-0 mb-12">
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
        {quote ? (
          <div className="hidden md:flex flex-col w-full">
            <p className="self-start mb-2 pl-10">Quotes of The Day</p>
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
              <div className="break px-4 py-3">
                <p className="italic">"{quote.q}"</p>
                <p className="mt-1 text-black/65">— {quote.a}</p>
              </div>
            </HandDrawnDiv>
          </div>
        ) : (
          <p className="text-sm opacity-50">Loading quote...</p>
        )}
      </div>

      {/* Message board */}
      <div className="md:basis-11/20 self-center min-w-[300px] w-[90%] md:w-[85%] md:self-start md:w-full md:px-2 mt-4 md:mt-0">
        <div className="flex flex-row items-center gap-2 pl-2 md:pl-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-800" />
          RECENT MESSAGES
        </div>
        {/* Messages */}
        <div className="flex flex-col gap-3 md:h-[450px] md:overflow-y-auto no-scrollbar mb-4">
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
        <div className="flex gap-2 mt-4 justify-self-center">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="cursor-pointer text-black/80 hover:text-black disabled:pointer-events-none disabled:opacity-50"
          >
            ← Prev
          </button>

          <span>
            <HandDrawnDiv
              className="w-fit"
              styles={{
                default: {
                  roughness: 1,
                  bowing: 0.5,
                  stroke: "#76726C",
                  seed: 3,
                  // fill: "#F3EDDF",
                  // fillStyle: "solid",
                },
              }}
            >
              <input
                className="w-7 focus:outline-none text-center"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={String(page)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onEnterPageInput(e.currentTarget.value);
                  }
                }}
              />
            </HandDrawnDiv>
            &nbsp;of&nbsp;
            {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="cursor-pointer text-black/80 hover:text-black disabled:pointer-events-none disabled:opacity-50"
          >
            Next →
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
