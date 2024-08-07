"use client";

import {Dispatch, SetStateAction, useState} from "react";
import {readStreamableValue} from "ai/rsc";

import {generateFlashcards} from "~/flashcard/actions/generate-flashcards";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {getMediaById} from "~/media/api";
import {adaptGeneratedFlashcards} from "~/flashcard/utils";
import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";
import {useAddFlashcards} from "~/flashcard/hooks/use-add-flashcards";
import {FlashcardCard} from "~/flashcard/components/flashcard-card";
import {PlaceholderFlashcardCard} from "~/flashcard/components/placeholder-flashcard-card";
import {DeckToolbar} from "~/flashcard/components/deck-toolbar";
import {CreateFlashcardDrawer} from "~/flashcard/components/create-flashcard-drawer";
import {useCreateFlashcard} from "~/flashcard/store/create-flashcard";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function DeckPage() {
  const [isDrawerOpen, setDrawerOpen] = useCreateFlashcard((state) => [
    state.isDrawerOpen,
    state.setDrawerOpen,
  ]);
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const [generatedFlashcards, setGeneratedFlashcards] = useState<
    {question: string; answer: string; topic: string}[]
  >([]);
  const {flashcards, isPending: isPendingFlashcards} = useFlashcardsByDeck({
    deckId: document.deckId!,
  });
  const {mutate: addFlashcards} = useAddFlashcards({
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

  if (isPendingFlashcards) return <div>Loading...</div>;

  if (document.topics?.length === 0) return <div>In this document, there are no topics</div>;

  return (
    <main className='flex flex-col gap-2'>
      <CreateFlashcardDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen as Dispatch<SetStateAction<boolean>>}
      />
      <header className='border-boder rounded-md border px-4 py-2'>
        <h1 className='flex items-center gap-2 text-4xl font-bold'>
          {Boolean(document.title) ? (
            <span className='text-pretty'>{document.title}&apos;s Deck</span>
          ) : (
            "Deck"
          )}
        </h1>
      </header>
      {/* flashcards?.length === 0 ? (
        <section>
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
      ) : null */}

      <div className='grid max-h-[calc(100vh-140px)] grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2'>
        {/* <CreateFlashcardCard /> */}
        {[...Array(6).keys()].map((index) => (
          <PlaceholderFlashcardCard key={"placeholder-" + index} />
        ))}
        {flashcards?.length > 0 &&
          [...flashcards]
            .sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime())
            .map((flashcard, index) => (
              <FlashcardCard key={flashcard.id ?? index} {...flashcard} showAnswer={showAnswers} />
            ))}
      </div>
      <DeckToolbar
        deckId={document.deckId!}
        setShowAnswers={setShowAnswers}
        showAnswers={showAnswers}
      />
    </main>
  );
}
