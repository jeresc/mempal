"use client";

import {useEffect, useState} from "react";
import dayjs, {UnitType} from "dayjs";

import {Flashcard} from "~/flashcard/types";
import {adaptCardToFlashcard, getPossibleReviews} from "~/flashcard/utils";

import {cn} from "@/lib/utils/cn";

const formatDate = (date: Date, now: Date) => {
  const addS = (num: number) => (num > 1 ? "s" : "");
  const times: UnitType[] = ["day", "hour", "minutes", "second"];

  for (const time of times) {
    const value = dayjs(date).diff(now, time);

    if (value > 0) return `${value} ${time}${addS(value)}`;
  }

  return "Now";
};

const rating: Record<number, {label: string; color: string; bg: string}> = {
  1: {label: "Forgot", color: "text-red-800", bg: "bg-red-300"},
  2: {label: "Hard", color: "text-amber-800", bg: "bg-amber-300"},
  3: {label: "Good", color: "text-lime-800", bg: "bg-lime-300"},
  4: {label: "Easy", color: "text-sky-800", bg: "bg-sky-300"},
};

function ReviewFlashcardCard({flashcard}: {flashcard: Flashcard}) {
  const [dueTimes, setDueTimes] = useState<{dueAt: Date; id: string}[]>([]);
  const [now, setNow] = useState<null | Date>(null);

  useEffect(() => {
    setNow(new Date());
    const {possibleCards} = getPossibleReviews(flashcard);

    const flashcards = possibleCards.map(adaptCardToFlashcard);

    setDueTimes(flashcards.map((card) => ({dueAt: card.dueAt, id: card.id})));
  }, [flashcard]);

  return (
    <article>
      {flashcard.question}
      {dueTimes.length > 0 && now !== null && (
        <div className='flex flex-col gap-1'>
          {dueTimes.map(({dueAt, id}, index) => {
            const {bg, color, label} = rating[index + 1];

            return (
              <div key={id + dueAt} className='flex items-center gap-1'>
                <span className='text-foreground/50'>Due in</span>
                <span className='text-pretty'>{formatDate(dueAt, now)}</span>
                <span className={cn(color, bg, "rounded-sm px-1")}>{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export {ReviewFlashcardCard};
