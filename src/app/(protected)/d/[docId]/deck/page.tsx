"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {generateFlashcards} from "~/flashcard/actions/generate-flashcards";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {useMedia} from "~/media/hooks/use-media";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const {
    media,
    isPending: isPendingMedia,
    error: errorMedia,
  } = useMedia({mediaId: document.mediaId!});
  const [generation, setGeneration] = useState<string>("");
  const [flashcards, setFlashcards] = useState<{question: string; answer: string; topic: string}[]>(
    [],
  );

  if (isPendingDoc || isPendingMedia) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message || errorMedia?.message}</div>;

  if (document.topics?.length === 0) return <div>In this document, there are no topics</div>;

  return (
    <div>
      <button
        onClick={async () => {
          const {object} = await generateFlashcards({topics: document.topics!, text: media.text!});

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(JSON.stringify(partialObject.flashcards, null, 2));
              setFlashcards(partialObject.flashcards);
            }
          }
        }}
      >
        Ask
      </button>
      <h2>Flashcards gerated: {flashcards?.length ?? 0}</h2>
      <div className='flex flex-col-reverse gap-4'>
        {flashcards?.length > 0 &&
          flashcards?.map((flashcard, index) => (
            <div key={index} className='rounded-md border border-border p-4'>
              <h3>{flashcard?.question?.length > 0 ? flashcard.question : "No question"}</h3>
              <p>{flashcard?.answer?.length > 0 ? flashcard.answer : "No answer"}</p>
              <p>{flashcard?.topic?.length > 0 ? flashcard.topic : "No topic"}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
