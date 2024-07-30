"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {generateFlashcards} from "~/flashcard/actions/generate-flashcards";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {addFlashcardsToDeck} from "~/flashcard/data";
import {createDeck} from "~/deck/api";
import {getMediaById} from "~/media/api";
import {adaptGeneratedFlashcards} from "~/flashcard/utils";
import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";

import {generateFirestoreId} from "@/lib/utils/generate-id";
import {cn} from "@/lib/utils/cn";
import {Skeleton} from "@/components/ui/skeleton";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function DeckPage() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const [generatedFlashcards, setGeneratedFlashcards] = useState<
    {question: string; answer: string; topic: string}[]
  >([]);
  const {
    flashcards,
    isPending: isPendingFlashcards,
    error: errorFlashcards,
  } = useFlashcardsByDeck({
    deckId: document.deckId!,
  });

  const createDeckAndGenerateFlashcards = async (
    docId: string,
    mediaId: string,
    topics: string[],
  ) => {
    const deckId = generateFirestoreId();
    const getMediaResult = await getMediaById(mediaId);

    if (getMediaResult.error !== undefined) return {error: {message: getMediaResult.error.message}};

    const {success: mediaSuccess} = getMediaResult;

    if (!mediaSuccess.media.text) return {error: {message: "No text found in media"}};

    const createDeckResult = await createDeck(deckId, docId);

    if (createDeckResult.error !== undefined)
      return {error: {message: createDeckResult.error.message}};

    const {success} = createDeckResult;

    if (!success.deckId) return;

    const {object} = await generateFlashcards({
      topics: topics,
      text: mediaSuccess.media.text,
    });

    for await (const {partialObject, finishedObject} of readStreamableValue(object)) {
      if (partialObject) {
        setGeneratedFlashcards(partialObject.flashcards);
      }

      if (finishedObject && finishedObject.flashcards) {
        const flashcards = adaptGeneratedFlashcards(finishedObject.flashcards, deckId);
        const flashcardsResult = await addFlashcardsToDeck(deckId, flashcards);

        console.log("Flashcards result", flashcardsResult);
      }
    }
  };

  if (isPendingDoc) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message}</div>;

  if (document.topics?.length === 0) return <div>In this document, there are no topics</div>;

  if (!document.deckId)
    return (
      <section>
        <h2>Create a deck</h2>
        <button
          className='self-start rounded bg-primary px-3 py-1.5 font-semibold text-white'
          type='button'
          onClick={async () => {
            await createDeckAndGenerateFlashcards(
              document.id!,
              document.mediaId!,
              document.topics!,
            );
          }}
        >
          Generate flashcards and create deck
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
      </section>
    );

  return (
    <main className='flex flex-col gap-4'>
      <h1>{document.title}&apos;s flashcards</h1>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {flashcards?.length > 0 &&
          flashcards.map(({question, answer, topic, id}) => (
            <div
              key={id}
              className={cn(
                "flex flex-col justify-between gap-2 rounded-md border border-border p-4 text-xs",
              )}
            >
              <p>{topic}</p>

              <h3 className='text-pretty text-xl font-semibold'>{question}</h3>
              <p className='text-sm text-slate-400'>{answer}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
