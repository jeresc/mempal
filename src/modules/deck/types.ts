import {Timestamp} from "firebase/firestore";

import {FirestoreFlashcard, Flashcard} from "~/flashcard/types";

export type FirestoreDeck = {
  userId: string;
  documentId: string;
  createdAt: Timestamp;
  flashcards: FirestoreFlashcard[];
};

export type Deck = Omit<FirestoreDeck, "createdAt" | "flashcards"> & {
  createdAt: Date;
  id: string;
  flashcards: Flashcard[];
};
