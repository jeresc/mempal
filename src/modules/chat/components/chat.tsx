"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";
import ReactTextareaAutosize from "react-textarea-autosize";
import {FaArrowUp} from "react-icons/fa";

import {type Message, continueConversation} from "~/chat/actions/continue-conversation";
import {MarkdownRenderer} from "~/chat/components/markdown-renderer";

import {cn} from "@/lib/utils";
import {useSidebarStore} from "@/lib/store/sidebar";

function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const isSidebarOpen = useSidebarStore((state) => state.isSideBarOpen());

  return (
    <div className='mx-auto mb-[86px] flex h-full  w-full max-w-3xl flex-col'>
      <div className='flex h-full flex-col gap-2'>
        {conversation.map((message, _) => (
          <div
            key={message.content}
            className={cn(
              "prose min-w-0 text-pretty rounded-md py-[5px] dark:prose-invert prose-strong:text-primary",
              message.role === "user"
                ? "ml-[16%] w-fit self-end bg-blue-500/80 px-3 text-right text-white"
                : "wr-[8%] text-left text-foreground",
            )}
          >
            <MarkdownRenderer markdown={message.content} />
          </div>
        ))}
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 mx-auto flex w-full max-w-[820px] flex-row  items-center justify-center bg-transparent px-4 pb-4 ease-in-out",
          { 
            "md:pl-[250px]": isSidebarOpen,
            "lg:mr-[16%]": isSidebarOpen,
            "xl:pl-4": isSidebarOpen,
            "focus-within:z-50": true
          },
        )}
      >
        <div
          className={cn(
            "flex w-full flex-row items-center justify-center gap-3 rounded-[28px] bg-slate-800 py-2.5 pl-6 pr-2",
          )}
        >
          <ReactTextareaAutosize
            className='m-0 min-h-0 w-full resize-none border-0 bg-transparent p-0 py-2 text-base text-foreground outline-0 ring-0 focus:ring-0 focus-visible:ring-0'
            style={{ position: 'relative' }}
            maxRows={6}
            minRows={1}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <button
            className='flex aspect-square w-[42px] items-center justify-center self-end rounded-full bg-blue-500 text-gray-300 hover:text-white'
            type='button'
            onClick={async () => {
              const {messages, newMessage} = await continueConversation([
                ...conversation,
                {role: "user", content: input},
              ]);

              let textContent = "";

              for await (const delta of readStreamableValue(newMessage)) {
                textContent = `${textContent}${delta}`;

                setConversation([...messages, {role: "assistant", content: textContent}]);
                setInput("");
              }
            }}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}

export {Chat};
