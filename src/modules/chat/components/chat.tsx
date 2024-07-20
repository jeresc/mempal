"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {type Message, continueConversation} from "~/chat/actions/continue-conversation";
import {MarkdownRenderer} from "~/chat/components/markdown-renderer";

import {cn} from "@/lib/utils";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
// export const dynamic = "force-dynamic";
// export const maxDuration = 30;

function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div className='mx-auto w-full max-w-3xl'>
      <div className='flex flex-col gap-2'>
        {conversation.map((message, _) => (
          <div
            key={message.content}
            className={cn(
              "prose min-w-0 text-pretty rounded-md py-[5px]",
              message.role === "user"
                ? "ml-[16%] w-fit self-end bg-blue-500/80 px-3 text-right text-white"
                : "wr-[8%] text-left text-foreground",
            )}
          >
            <MarkdownRenderer markdown={message.content} />
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        <textarea
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
          className='rounded-lg bg-blue-500 p-2 text-white'
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
            }
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export {Chat};
