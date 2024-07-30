import {Timestamp} from "firebase/firestore";

export type FirestoreFlashcard = {
  createdAt: Timestamp;
  question: string;
  answer: string;
  topic: string;
  score: number;
  lastUsedAt: Timestamp;
  repeatedTimes: number;
  deckId: string;
};

export type Flashcard = Omit<FirestoreFlashcard, "createdAt" | "lastUsedAt"> & {
  createdAt: Date;
  lastUsedAt: Date;
  id: string;
};
