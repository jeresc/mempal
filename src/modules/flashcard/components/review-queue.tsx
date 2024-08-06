"use client";

import {XIcon} from "lucide-react";
import Link from "next/link";

import {ReviewFlashcardCard} from "~/flashcard/components/review-flashcard-card";
import {useReviewQueue} from "~/flashcard/hooks/use-review-queue";

function ReviewQueue({deckId}: {deckId: string}) {
  const {currentFlashcardIndex, onReview, onBack, dueFlashcards} = useReviewQueue({deckId});

  return (
    <section className='mx-auto flex h-full w-full max-w-screen-sml flex-col bg-foreground/5 p-4 shadow-sm sm:max-h-[600px] sm:rounded-[1.75rem]'>
      <Link
        className='absolute right-6 top-6 z-10 grid aspect-square h-[60px] w-[60px] place-content-center rounded-full bg-foreground/10 p-2 text-muted-foreground transition-all hover:bg-foreground/5'
        href='/flashcards'
        type='button'
      >
        <XIcon size={48} />
      </Link>

      {currentFlashcardIndex !== -1 &&
      currentFlashcardIndex < dueFlashcards.length &&
      dueFlashcards.length > 0 ? (
        <ReviewFlashcardCard
          currentFlashcardIndex={currentFlashcardIndex}
          dueFlashcardsLength={dueFlashcards.length}
          flashcard={dueFlashcards[currentFlashcardIndex]}
          onBack={onBack}
          onReview={onReview}
        />
      ) : (
        <div>
          <p>Well done!</p>
          <Link className='mt-2 h-12 w-full rounded-xl text-xl' href='/flashcards' type='button'>
            Go back Home
          </Link>
        </div>
      )}
    </section>
  );
}

export {ReviewQueue};
