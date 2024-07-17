"use server";

import {streamText} from "ai";
import {createStreamableValue} from "ai/rsc";

import {model} from "~/ai/api";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const {textStream} = await streamText({
      model,
      system:
        'Sos un matematico experto en matrices y vectores. Tu tarea es responder preguntas sobre matrices y vectores, utilizando el contexto de la conversación anterior. Si no sabes una respuesta, debes decir "No sé". Si no puedes responder, debes decir "No puedo responder".',
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
