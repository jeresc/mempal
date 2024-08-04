"use client";

import {Grade} from "ts-fsrs";
import {motion} from "framer-motion";
import {ChevronLeft} from "lucide-react";

import {formatDate} from "~/flashcard/utils";
import {Flashcard} from "~/flashcard/types";

import {useReviewCard} from "../hooks/use-review-card";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils/cn";

const rating: Record<number, {label: string; color: string}> = {
  1: {label: "Forgot", color: "red"},
  2: {label: "Hard", color: "amber"},
  3: {label: "Good", color: "lime"},
  4: {label: "Easy", color: "sky"},
};

interface ReviewFlashcardCardProps {
  flashcard: Flashcard;
  onReview: (flashcard: Flashcard & {grade: Grade}) => void;
  onBack: () => void;
  currentFlashcardIndex: number;
  dueFlashcardsLength: number;
}

function ReviewFlashcardCard({
  flashcard,
  onReview,
  onBack,
  currentFlashcardIndex,
  dueFlashcardsLength,
}: ReviewFlashcardCardProps) {
  const {
    handleReview,
    handleBack,
    reviewedFlashcards,
    showAnswer,
    possibleReviews,
    now,
    toggleShowAnswer,
  } = useReviewCard({flashcard, onReview, onBack});

  if (!flashcard) return null;

  return (
    <article className='flex h-full flex-col justify-between gap-1'>
      <header className='flex items-center justify-between gap-2'>
        <button className='flex items-center justify-center' type='button' onClick={handleBack}>
          <ChevronLeft
            className='text-muted-foreground transition-all hover:text-foreground'
            size={48}
          />
        </button>
        <p className='text-pretty rounded-lg bg-secondary px-2 py-0.5 text-center text-xl sm:text-2xl'>
          {currentFlashcardIndex === -1
            ? `${dueFlashcardsLength} of ${dueFlashcardsLength}`
            : `${currentFlashcardIndex + 1} of ${dueFlashcardsLength}`}
        </p>
        <div className='w-[48px]' />
      </header>
      <p className='text-pretty text-center text-2xl sm:text-3xl'>{flashcard.question}</p>
      {showAnswer ? (
        <motion.p
          animate='animate'
          className='mx-4 text-pretty text-center text-lg text-foreground/60 sm:text-xl'
          initial='initial'
          variants={{
            initial: {opacity: 0, transition: {duration: 0}},
            animate: {opacity: 1, transition: {duration: 0.5}},
          }}
        >
          {flashcard.answer}
        </motion.p>
      ) : null}
      {showAnswer ? (
        possibleReviews.length > 0 &&
        now !== null && (
          <div className='flex flex-col gap-1 sm:flex-row'>
            {possibleReviews.map((possibleReview, index) => {
              const {label, color} = rating[index + 1];
              const {dueAt, id, grade} = possibleReview;

              return (
                <Button
                  key={id + dueAt}
                  className={cn(
                    "grid h-fit w-full grid-cols-[1fr_1fr] place-content-center gap-1 rounded-xl sm:grid-cols-none sm:grid-rows-[1fr_1fr]",
                    `hover:bg-${color}-500/60 bg-${color}-500/85`,
                    reviewedFlashcards.find(({id}) => id === flashcard?.id)?.grade === grade &&
                      "bg-background/30 hover:bg-background/80",
                  )}
                  variant='outline'
                  onClick={() => handleReview(possibleReview)}
                >
                  <span className='rounded-sm px-1'>{label}</span>
                  <span className='text-pretty rounded-sm bg-background/30 px-2 py-0.5'>
                    {formatDate(dueAt, now)}
                  </span>
                </Button>
              );
            })}
          </div>
        )
      ) : (
        <Button
          className='mt-[30px] h-12 w-full rounded-xl text-xl'
          variant='default'
          onClick={toggleShowAnswer}
        >
          Show answer
        </Button>
      )}
    </article>
  );
}

export {ReviewFlashcardCard};
