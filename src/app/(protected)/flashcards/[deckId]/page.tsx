"use client";

import {useParams} from "next/navigation";
import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

import {ReviewQueue} from "~/flashcard/components/review-queue";
import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";
import {useReviewFlashcards} from "~/flashcard/store/review-flashcards";
import {ReviewQueueSkeleton} from "~/flashcard/components/review-queue-skeleton";

import {Skeleton} from "@/components/ui/skeleton";

export default function DeckReviewPage() {
  const [isMounted, setIsMounted] = useState(false);

  const {deckId} = useParams();
  const extractedDeckId = Array.isArray(deckId) ? deckId[0] : deckId;

  const {flashcards, isPending} = useFlashcardsByDeck({deckId: extractedDeckId});

  const [
    dueFlashcards,
    upsertDueFlashcard,
    currentFlashcardIndex,
    setCurrentFlashcardIndex,
    setDueFlashcards,
  ] = useReviewFlashcards((state) => [
    state.dueFlashcards,
    state.upsertDueFlashcard,
    state.currentFlashcardIndex,
    state.setCurrentFlashcardIndex,
    state.setDueFlashcards,
  ]);

  useEffect(() => {
    setDueFlashcards([]);
    setCurrentFlashcardIndex(-1);
  }, [deckId, setDueFlashcards, setCurrentFlashcardIndex]);

  useEffect(() => {
    setIsMounted(true);

    if (currentFlashcardIndex === -1 && !isPending) {
      setCurrentFlashcardIndex(0);

      flashcards.forEach((flashcard) => {
        const {dueAt} = flashcard;

        if (dueAt) {
          const dueAtDate = dayjs(dueAt);
          const now = dayjs();

          if (dueAtDate.diff(now, "minute") < 1) {
            upsertDueFlashcard(flashcard);
          }
        }
      });
    }
  }, [
    flashcards,
    upsertDueFlashcard,
    currentFlashcardIndex,
    setCurrentFlashcardIndex,
    dueFlashcards,
    isPending,
  ]);

  return (
    <div>
      {isMounted
        ? extractedDeckId && !isPending
          ? createPortal(
              <main className='min-w-screen absolute bottom-0 left-0 right-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-background sm:p-4'>
                <ReviewQueue deckId={extractedDeckId} />
              </main>,
              document.body,
            )
          : createPortal(
              <main className='min-w-screen fixed bottom-0 left-0 right-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-background sm:p-4'>
                <ReviewQueueSkeleton />
              </main>,
              document.body,
            )
        : null}
    </div>
  );
}
