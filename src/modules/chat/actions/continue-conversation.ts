/* eslint-disable no-console */
"use server";
import {streamText} from "ai";
import {createStreamableValue} from "ai/rsc";
import {collection, addDoc, doc} from "firebase/firestore";

import {model} from "~/ai/api";

import {getFirebase} from "@/lib/firebase";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const continueConversation = async (history: Message[], docId: string) => {
  "use server";

  const stream = createStreamableValue();

  const systemPrompt: string = ` Sos un chat bot argentino, tu idioma principal será el español/castellano pero puedes responder en todos los idiomas que tengas disponibles en los que la gente te hable. 
    Tu tarea es responder preguntas de todo tipo, sobre cualquier tema. Responderás y hablarás siempre con el máximo respeto hacia cualquier individuo. Normalmente vas a recibir preguntas sobre documentos relacionados con estudios, los cuales la gente subirá a la plataforma. 
    En caso de no tener una respuesta concreta, vas a responder que no sabes al respecto y recomendarás dónde buscar o informarse mejor, por ejemplo, "No estoy seguro de que responder pero te recomiendo que investigues en documentación oficial, foros o internet. Lamento no poder ayudarte."
    Siempre agradecerás a los usuarios por sus preguntas y les desearás un buen día o buen estudio.
    Si el usuario pregunta sobre temas recurrentes, ofrecerás proactivamente recursos adicionales que puedan ser útiles.
    Evitarás jergas o tecnicismos excesivos para asegurar que tus respuestas sean comprensibles para todos los usuarios.
    Recordarás a los usuarios no compartir información personal o sensible.
    Animarás a los usuarios a proporcionar feedback sobre tus respuestas para mejorar tu rendimiento.
    Si un usuario tiene una pregunta que no puedes responder de inmediato, ofrecerás realizar un seguimiento una vez obtengas más información.
    `;

  (async () => {
    const {firestore} = getFirebase();

    const {textStream} = await streamText({
      model,
      system: systemPrompt,
      messages: history,
      onFinish: ({usage}) => {
        const {promptTokens, completionTokens, totalTokens} = usage;

        // your own logic, e.g. for saving the chat history or recording usage

        console.log("Prompt tokens:", promptTokens);
        console.log("Completion tokens:", completionTokens);
        console.log("Total tokens:", totalTokens);
      },
    });

    let assistantMessage = "";

    for await (const text of textStream) {
      assistantMessage += text;
      stream.update(text);
    }

    stream.done();

    console.log("Assistant message:", assistantMessage);

    // if (!docId) {
    //   throw new Error("docId is not provided");
    // }

    const documentRef = doc(firestore, "documents", docId);

    const chatCollectionRef = collection(documentRef, "chats");

    await addDoc(chatCollectionRef, {
      history: [...history, {role: "assistant", content: assistantMessage}],
    });

    console.log("Message successfully added to Firestore");
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
};
