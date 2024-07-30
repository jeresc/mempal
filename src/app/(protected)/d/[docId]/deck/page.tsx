"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {generateFlashcards} from "~/flashcard/actions/generate-flashcards";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {useMedia} from "~/media/hooks/use-media";
import {addDeck} from "~/deck/data";
import {addFlashcardsToDeck} from "~/flashcard/data";
import {currentUser} from "~/auth/lib/auth";
import {Flashcard} from "~/flashcard/types";
import {useCurrentUser} from "~/auth/hooks/use-current-user";

import {generateFirestoreId} from "@/lib/utils/generate-id";
import {cn} from "@/lib/utils/cn";
import {Skeleton} from "@/components/ui/skeleton";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function DeckPage() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const {
    media,
    isPending: isPendingMedia,
    error: errorMedia,
  } = useMedia({mediaId: document.mediaId!});
  const [generatedFlashcards, setGeneratedFlashcards] = useState<
    {question: string; answer: string; topic: string}[]
  >([]);
  const user = useCurrentUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!user) return;

      console.log(generatedFlashcards);

      const deckId = generateFirestoreId();

      console.log("generating");

      await addDeck({documentId: docId, id: deckId, userId: user.id!});

      const flashcards = generatedFlashcards.map(({question, answer, topic}) => ({
        question,
        answer,
        topic,
        score: 0,
        repeatedTimes: 0,
        deckId,
      }));

      const flashcardsResult = await addFlashcardsToDeck(deckId, flashcards);

      console.log(flashcardsResult);
    } catch (e: unknown) {
      // Handle errors here
      console.log(e);
    }
  };

  if (isPendingDoc || isPendingMedia) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message || errorMedia?.message}</div>;

  if (document.topics?.length === 0) return <div>In this document, there are no topics</div>;

  return (
    <div className='flex flex-col gap-4'>
      <button
        className='self-start rounded bg-primary px-3 py-1.5 font-semibold text-white'
        type='button'
        onClick={async () => {
          const {object} = await generateFlashcards({
            topics: document.topics!,
            text: media.text!,
          });

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneratedFlashcards(partialObject.flashcards);
            }
          }
        }}
      >
        Generate flashcards
      </button>
      <h2>Flashcards generated: {generatedFlashcards?.length ?? 0}</h2>
      <div className='flex flex-col-reverse gap-4'>
        {generatedFlashcards?.length > 0 &&
          generatedFlashcards?.slice(-1).map((flashcard, index) => (
            <div
              key={index}
              className={cn(
                "flex min-h-[146px] flex-col justify-between gap-2 rounded-md border border-border p-4",
              )}
            >
              <h3>
                {flashcard?.question?.length > 0 ? (
                  flashcard.question
                ) : (
                  <Skeleton className='h-4 w-[72%] bg-zinc-800' />
                )}
              </h3>
              <p>
                {flashcard?.answer?.length > 0 ? (
                  flashcard.answer
                ) : (
                  <div className='flex flex-col'>
                    <Skeleton className='h-4 w-[87%] bg-zinc-800' />
                    <Skeleton className='h-4 w-[59%] bg-zinc-800' />
                  </div>
                )}
              </p>
              <p>
                {flashcard?.topic?.length > 0 ? (
                  flashcard.topic
                ) : (
                  <Skeleton className='h-4 w-36 bg-zinc-800' />
                )}
              </p>
            </div>
          ))}
      </div>

      <form onSubmit={onSubmit}>
        <button
          className='flex w-full items-center justify-center rounded-md border px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-30'
          type='submit'
        >
          Generate flashcards
        </button>
      </form>
    </div>
  );
}
