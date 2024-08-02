"use client";

import {useParams} from "next/navigation";
import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import dayjs from "dayjs";

import {ReviewQueue} from "~/flashcard/components/review-queue";
import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";
import {Flashcard} from "~/flashcard/types";

import {Skeleton} from "@/components/ui/skeleton";

export default function DeckReviewPage() {
  const [isMounted, setIsMounted] = useState(false);

  const {deckId} = useParams();

  const {flashcards} = useFlashcardsByDeck({deckId: Array.isArray(deckId) ? deckId[0] : deckId});
  const [dueFlashcards, setDueFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (!flashcards.length) return;

    flashcards.forEach((flashcard) => {
      const {dueAt} = flashcard;

      if (dueAt) {
        const dueAtDate = dayjs(dueAt);
        const now = dayjs();

        if (dueAtDate.isBefore(now)) {
          setDueFlashcards((prev) => [...prev, flashcard]);
        }
      }
    });
  }, [flashcards]);

  return (
    <div>
      {isMounted ? (
        createPortal(
          <main className='min-w-screen absolute bottom-0 left-0 right-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-background sm:p-4'>
            <ReviewQueue dueFlashcards={dueFlashcards} />
          </main>,
          document.body,
        )
      ) : (
        <main className='min-w-screen fixed bottom-0 left-0 right-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-background p-4'>
          <Skeleton className='mx-auto flex h-full max-h-[600px] w-full max-w-screen-sml flex-col rounded-3xl bg-foreground/5 p-4' />
        </main>
      )}
    </div>
  );
}
