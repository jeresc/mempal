"use client";

import {readStreamableValue} from "ai/rsc";
import {useEffect, useRef, useState} from "react";
import {FaArrowDown, FaArrowUp, FaStop} from "react-icons/fa";
import ReactTextareaAutosize from "react-textarea-autosize";

import {type Message, continueConversation} from "~/chat/actions/continue-conversation";
import {MarkdownRenderer} from "~/chat/components/markdown-renderer";

import {useSidebarStore} from "@/lib/store/sidebar";
import {cn} from "@/lib/utils";

function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isSidebarOpen = useSidebarStore((state) => state.isSideBarOpen());

  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSendMessageInRealTime = async () => {
    if (abortController) {
      abortController.abort();
    }

    const newAbortController = new AbortController();

    setAbortController(newAbortController);
    setIsGenerating(true);

    const {messages, newMessage} = await continueConversation([
      ...conversation,
      {role: "user", content: input},
    ]);

    setInput("");

    let textContent = "";

    const signal = newAbortController.signal;

    (async () => {
      for await (const delta of readStreamableValue(newMessage)) {
        if (signal.aborted) {
          setIsGenerating(false);
          break;
        }
        textContent += delta;
        setConversation([...messages, {role: "assistant", content: textContent}]);
      }
      setIsGenerating(false);
    })();
  };

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      {threshold: 0.1},
    );

    if (messagesEndRef.current) {
      observer.observe(messagesEndRef.current);
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [conversation]);

  return (
    <div className='mx-auto mb-[86px] flex h-full w-full max-w-3xl flex-col'>
      <div className='mx-3 flex h-full flex-col gap-2 lg:mx-0'>
        {conversation.map((message, _) => (
          <div
            key={message.content}
            className={cn(
              "prose min-w-0 text-pretty rounded-md py-[5px] dark:prose-invert prose-strong:text-primary",
              message.role === "user"
                ? "ml-[16%] w-fit self-end bg-blue-500/80 px-3 text-left text-white"
                : "wr-[8%] text-left text-foreground",
            )}
          >
            <MarkdownRenderer markdown={message.content} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!isAtBottom && (
        <button
          className='fixed bottom-20 right-10 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700'
          type='button'
          onClick={scrollToBottom}
        >
          <FaArrowDown />
        </button>
      )}

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 mx-auto flex w-full max-w-[820px] flex-row  items-center justify-center bg-transparent px-4 pb-4 ease-in-out",
          {
            "md:pl-[250px]": isSidebarOpen,
            "lg:mr-[16%]": isSidebarOpen,
            "xl:pl-4": isSidebarOpen,
            "focus-within:z-50": true,
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
            maxRows={6}
            minRows={1}
            style={{position: "relative"}}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          {!isGenerating ? (
            <button
              className={cn(
                "flex aspect-square w-[42px] items-center justify-center self-end rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700",
                {
                  "opacity-50": input.length === 0,
                  "hover:text-gray-300": input.length === 0,
                },
              )}
              disabled={input.length === 0}
              type='button'
              onClick={handleSendMessageInRealTime}
            >
              <FaArrowUp />
            </button>
          ) : (
            <button
              className='flex aspect-square w-[42px] items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700'
              type='button'
              onClick={handleAbort}
            >
              <FaStop />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export {Chat};
