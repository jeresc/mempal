"use server";

import {streamObject} from "ai";
import {createStreamableValue} from "ai/rsc";
import {z} from "zod";

import {model} from "~/ai/api";
import {flashcardsSchema} from "~/flashcard/schemas";

export const generateFlashcards = async ({topics, text}: {topics: string[]; text: string}) => {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const {partialObjectStream} = await streamObject({
      model,
      prompt: `
      You are a question-answer pairs generator bot. You have been given a text and a list of topics. Your mission is to generate question-answer pairs for each topic that has been given to you.

      The question must be a question that can be answered with the text. The answer must be an answer to the question. I gave you a list of ${topics.length} topics, so you must generate ${topics.length < 5 ? topics.length * 6 : topics.length * 4}.

      Here is the text:
      ${text}

      And here is the list of topics:
      [${topics.join(",")}]
      `,
      schema: z.object({
        flashcards: flashcardsSchema,
      }),
      onFinish: ({usage, object}) => {
        const {promptTokens, completionTokens, totalTokens} = usage;

        // your own logic, e.g. for saving the chat history or recording usage
        /* eslint-disable no-console */
        console.log("Prompt tokens:", promptTokens);
        console.log("Completion tokens:", completionTokens);
        console.log("Total tokens:", totalTokens);

        stream.done({finishedObject: object});
      },
    });

    for await (const partialObject of partialObjectStream) {
      stream.update({partialObject});
    }
  })();

  return {object: stream.value};
};
