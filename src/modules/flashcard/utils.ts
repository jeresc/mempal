import compare from "just-compare";
import {Card, Grades, State, fsrs} from "ts-fsrs";

import {Flashcard} from "~/flashcard/types";

const initialFlashcard = {
  stability: 0,
  difficulty: 0,
  lapses: 0,
  reps: 0,
  state: State.New,
  dueAt: new Date(),
  createdAt: new Date(),
  lastReviewedAt: undefined,
  scheduledDays: 0,
};

export const adaptGeneratedFlashcards = (
  generatedFlashcards: {question: string; answer: string; topic: string}[],
  deckId: string,
) => {
  return generatedFlashcards.map(({question, answer, topic}) => ({
    question,
    answer,
    topic,
    deckId,
    ...initialFlashcard,
  }));
};

export const compareFlashcards = (oldFlashcard: Flashcard, newFlashcard: Flashcard) => {
  if (compare(oldFlashcard, newFlashcard) === false) {
    return true;
  }

  return false;
};

export const adaptFlashcardToFsrs = (
  flashcard: Flashcard,
): Card & Omit<Flashcard, "dueAt" | "lastReviewedAt" | "scheduledDays"> => {
  const now = new Date();
  const {dueAt, lastReviewedAt, scheduledDays, ...rest} = flashcard;

  return {
    ...rest,
    due: dueAt,
    last_review: lastReviewedAt,
    scheduled_days: scheduledDays,
    elapsed_days: flashcard.lastReviewedAt ? now.getTime() - flashcard.lastReviewedAt.getTime() : 0,
  };
};

export const adaptCardToFlashcard = (
  card: Card & Omit<Flashcard, "dueAt" | "lastReviewedAt" | "scheduledDays">,
): Flashcard => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {due, last_review, elapsed_days, scheduled_days, ...rest} = card;

  return {
    ...rest,
    dueAt: due,
    lastReviewedAt: last_review,
    scheduledDays: scheduled_days,
  };
};

type PossibleReviews = {
  possibleCards: (Card & Omit<Flashcard, "dueAt" | "lastReviewedAt" | "scheduledDays">)[];
};

export const getPossibleReviews = (flashcard: Flashcard) => {
  const f = fsrs();
  const possibleCards: PossibleReviews["possibleCards"] = [];

  const scheduledCards = f.repeat(adaptFlashcardToFsrs(flashcard), new Date());

  Grades.forEach((grade) => {
    const {card} = scheduledCards[grade] as unknown as {
      card: Card & Omit<Flashcard, "dueAt" | "lastReviewedAt" | "scheduledDays">;
    };

    possibleCards.push({...card});
  });

  return {possibleCards};
};
