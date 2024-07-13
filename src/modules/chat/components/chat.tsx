"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {type Message, continueConversation} from "~/chat/actions/continue-conversation";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
// export const dynamic = "force-dynamic";
// export const maxDuration = 30;

function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div>
        {conversation.map((message, _) => (
          <div key={message.content}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <div>
        <input
          type='text'
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button
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
