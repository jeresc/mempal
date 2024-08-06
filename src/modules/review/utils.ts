import {ReviewLog} from "ts-fsrs";

import {Review} from "~/review/types";

export const adaptFsrsToReview = (review: ReviewLog): Omit<Review, "flashcardId" | "deckId"> => {
  const {
    elapsed_days,
    last_elapsed_days,
    scheduled_days,
    due,
    review: reviewed_at,
    ...rest
  } = review;

  return {
    ...rest,
    elapsedDays: elapsed_days,
    lastElapsedDays: last_elapsed_days,
    scheduledDays: scheduled_days,
    dueAt: due,
    reviewedAt: reviewed_at,
  };
};

export const adaptReviewToFsrs = (review: Review): ReviewLog => {
  const {elapsedDays, lastElapsedDays, scheduledDays, reviewedAt, dueAt, ...rest} = review;

  return {
    ...rest,
    elapsed_days: elapsedDays,
    last_elapsed_days: lastElapsedDays,
    scheduled_days: scheduledDays,
    due: dueAt,
    review: reviewedAt,
  };
};
