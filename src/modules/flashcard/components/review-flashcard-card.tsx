"use client";

import {useEffect, useState} from "react";
import dayjs, {UnitType} from "dayjs";
import {Grade} from "ts-fsrs";

import {Flashcard} from "~/flashcard/types";
import {adaptCardToFlashcard, getPossibleReviews} from "~/flashcard/utils";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils/cn";

const formatDate = (date: Date, now: Date) => {
  const addS = (num: number) => (num > 1 ? "s" : "");
  const times: UnitType[] = ["month", "day", "hour", "minute", "second"];

  for (const time of times) {
    const value = dayjs(date).diff(now, time);

    if (value > 0) return `${value} ${time}${addS(value)}`;
  }

  return "Now";
};

const rating: Record<number, {label: string; color: string}> = {
  1: {label: "Forgot", color: "red"},
  2: {label: "Hard", color: "amber"},
  3: {label: "Good", color: "lime"},
  4: {label: "Easy", color: "sky"},
};

interface ReviewFlashcardCardProps {
  flashcard: Flashcard;
  onReview: (flashcard: Flashcard) => void;
  onUndo: () => void;
}

type PossibleReviews = (Flashcard & {grade: Grade})[];

function ReviewFlashcardCard({flashcard, onReview, onUndo}: ReviewFlashcardCardProps) {
  const [dueTimes, setDueTimes] = useState<{dueAt: Date; id: string; grade: Grade}[]>([]);
  const [possibleReviews, setPossibleReviews] = useState<PossibleReviews>([]);
  const [now, setNow] = useState<null | Date>(null);

  const handleReview = (grade: Grade) => {
    if (!possibleReviews.length) return;

    const possibleReview = possibleReviews.find(({grade: cardGrade}) => cardGrade === grade);

    if (!possibleReview) return;

    onReview(possibleReview);
  };

  const handleUndo = () => {
    onUndo();
  };

  useEffect(() => {
    setNow(new Date());
    const {possibleCards} = getPossibleReviews(flashcard);

    const flashcards = possibleCards.map(({grade, ...card}) => ({
      ...adaptCardToFlashcard(card),
      grade,
    }));

    setDueTimes(flashcards.map((card) => ({dueAt: card.dueAt, id: card.id, grade: card.grade})));
    setPossibleReviews(flashcards);
  }, [flashcard]);

  return (
    <article className='flex h-full flex-col justify-between gap-1'>
      <button type='button' onClick={handleUndo}>
        Back
      </button>
      <p className='text-pretty text-center text-2xl sm:text-3xl'>¿{flashcard.question}</p>
      {dueTimes.length > 0 && now !== null && (
        <div className='flex flex-col gap-1 sm:flex-row'>
          {dueTimes.map(({dueAt, id, grade}, index) => {
            const {label, color} = rating[index + 1];

            return (
              <Button
                key={id + dueAt}
                className={cn(
                  "grid h-fit w-full grid-cols-[1fr_1fr] place-content-center gap-1 rounded-xl sm:grid-cols-none sm:grid-rows-[1fr_1fr]",
                  `hover:bg-${color}-500/60 bg-${color}-500/85`,
                )}
                variant='outline'
                onClick={() => handleReview(grade)}
              >
                <span className='rounded-sm px-1'>{label}</span>
                <span className='text-pretty rounded-sm bg-background/30 px-2 py-0.5'>
                  {formatDate(dueAt, now)}
                </span>
              </Button>
            );
          })}
        </div>
      )}
    </article>
  );
}

export {ReviewFlashcardCard};
