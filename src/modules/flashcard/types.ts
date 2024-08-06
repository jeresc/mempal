import {Timestamp} from "firebase/firestore";
import {State} from "ts-fsrs";

export type FirestoreFlashcard = {
  createdAt: Timestamp;
  question: string;
  answer: string;
  topic: string;
  deckId: string;
  lapses: number;
  reps: number;
  state: State;
  stability: number;
  difficulty: number;
  dueAt: Timestamp;
  scheduledDays: number;
  lastReviewedAt: Timestamp | undefined;
  elapsedDays: number;
};

export type Flashcard = Omit<FirestoreFlashcard, "createdAt" | "lastReviewedAt" | "dueAt"> & {
  createdAt: Date;
  dueAt: Date;
  lastReviewedAt: Date | undefined;
  id: string;
};
