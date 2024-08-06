import {Timestamp} from "firebase/firestore";
import {Rating, State} from "ts-fsrs";

export type FirestoreReview = {
  rating: Rating; // Rating of the review (Again, Hard, Good, Easy)
  state: State; // State of the review (New, Learning, Review, Relearning)
  stability: number; // Stability of the card before the review
  difficulty: number; // Difficulty of the card before the review
  elapsedDays: number; // Number of days elapsed since the last review
  lastElapsedDays: number; // Number of days between the last two reviews
  scheduledDays: number; // Number of days until the next review
  deckId: string; // ID of the deck
  flashcardId: string; // ID of the flashcard
  userId: string; // ID of the user
  dueAt: Timestamp; // Date of the last scheduling
  reviewedAt: Timestamp; // Date of the review
};

export type Review = Omit<FirestoreReview, "reviewedAt" | "dueAt" | "createdAt"> & {
  reviewedAt: Date;
  dueAt: Date;
};
