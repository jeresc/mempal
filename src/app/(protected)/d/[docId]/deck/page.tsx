"use client";

import {useState} from "react";
import {readStreamableValue} from "ai/rsc";
import Link from "next/link";

import {generateFlashcards} from "~/flashcard/actions/generate-flashcards";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {getMediaById} from "~/media/api";
import {adaptGeneratedFlashcards} from "~/flashcard/utils";
import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";
import {GeneratedFlashcard} from "~/flashcard/components/generated-flashcards";
import {useAddFlashcards} from "~/flashcard/hooks/use-add-flashcards";
import {FlashcardCard} from "~/flashcard/components/flashcard-card";

import {cn} from "@/lib/utils/cn";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";

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
  const {mutate: addFlashcards, isMutating: isMutatingAddFlashcards} = useAddFlashcards({
    deckId: document.deckId!,
  });
  const [showAnswers, setShowAnswers] = useState(false);

  const generateAndAddFlashcards = async ({
    deckId,
    mediaId,
    topics,
  }: {
    deckId: string;
    mediaId: string;
    topics: string[];
  }) => {
    const getMediaResult = await getMediaById(mediaId);

    if (getMediaResult.error !== undefined) return {error: {message: getMediaResult.error.message}};

    const {success: mediaSuccess} = getMediaResult;

    if (!mediaSuccess.media.text) return {error: {message: "No text found in media"}};

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

        addFlashcards({flashcards});
      }
    }
  };

  if (isPendingDoc) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message}</div>;

  if (document.topics?.length === 0) return <div>In this document, there are no topics</div>;

  if (flashcards?.length === 0 && !isPendingFlashcards)
    return (
      <section>
        <h2>Create a deck</h2>
        <button
          className='self-start rounded bg-primary px-3 py-1.5 font-semibold text-white'
          type='button'
          onClick={async () => {
            await generateAndAddFlashcards({
              deckId: document.deckId!,
              mediaId: document.mediaId!,
              topics: document.topics!,
            });
          }}
        >
          Generate flashcards and add to deck
        </button>
        <h2>Flashcards generated: {generatedFlashcards?.length ?? 0}</h2>
        <div className='flex flex-col-reverse gap-4'>
          {generatedFlashcards?.length > 0 &&
            generatedFlashcards
              ?.slice(-1)
              .map((flashcard, index) => (
                <GeneratedFlashcard
                  key={index}
                  answer={flashcard?.answer}
                  question={flashcard?.question}
                  topic={flashcard?.topic}
                />
              ))}
        </div>
      </section>
    );

  return (
    <main className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2 rounded-md border border-border p-2'>
        <h1>
          {Boolean(document.title) ? (
            <span className='text-pretty'>{document.title}&apos;s Flashcards</span>
          ) : (
            "Flashcards"
          )}
        </h1>
        <div className='flex items-center gap-2 '>
          <Switch checked={showAnswers} onCheckedChange={(checked) => setShowAnswers(checked)} />
          <p className='leading-none'>Show answers</p>

          <Button asChild className='ml-2 h-7 px-2 py-1.5 leading-none'>
            <Link href={`/flashcards/${document.deckId}`}>Review</Link>
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {flashcards?.length > 0 &&
          flashcards.map(({question, answer, topic, id}, index) => (
            <FlashcardCard
              key={id ?? index}
              answer={answer}
              question={question}
              showAnswer={showAnswers}
              topic={topic}
            />
          ))}
      </div>
    </main>
  );
}
