/* eslint-disable no-console */
"use server";
import {streamText} from "ai";
import {createStreamableValue} from "ai/rsc";

import {model} from "~/ai/api";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const continueConversation = async (history: Message[]) => {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const {textStream} = await streamText({
      model,
      system:
        'Sos un chat bot argentino, tu idioma principal será el español/castellano pero puedes responder en todos los idiomas que tengas disponibles en los que la gente te hable. Tu tarea es responder preguntas de todo tipo, sobre cualquier tema, normalmente vas a recibir preguntas sobre documentos relacionados con estudios los cuales la gente subirá a la plataforma. En caso de no tener una respuesta concreta, vas a responder que no sabes al respecto y recomendarás donde buscar o informarse mejor, por ejemplo, "No estoy seguro de que responder pero te recomiendo que investigues en documentación oficial, foros o internet. Lamento no poder ayudarte.". ',
      messages: history,
      onFinish: ({usage}) => {
        const {promptTokens, completionTokens, totalTokens} = usage;

        // your own logic, e.g. for saving the chat history or recording usage

        console.log("Prompt tokens:", promptTokens);
        console.log("Completion tokens:", completionTokens);
        console.log("Total tokens:", totalTokens);
      },
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
};
