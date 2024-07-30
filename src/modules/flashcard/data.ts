"use server";

import {Timestamp, collection, doc, writeBatch} from "firebase/firestore";

import {Deck} from "~/deck/types";
import {Flashcard} from "~/flashcard/types";

import {getFirebase} from "@/lib/firebase";
import {generateFirestoreId} from "@/lib/utils/generate-id";

export const addFlashcardsToDeck = async (
  deckId: Deck["id"],
  flashcards: Omit<Flashcard, "id" | "deckId" | "createdAt" | "lastUsedAt">[],
) => {
  const {firestore} = getFirebase();
  const timestamp = Timestamp.now();
  const flashcardIds: string[] = [];

  const docRef = doc(firestore, "decks", deckId);
  const subcollectionRef = collection(docRef, "flashcards");

  const batch = writeBatch(firestore);

  for (const flashcard of flashcards) {
    const flashcardId = generateFirestoreId();

    flashcardIds.push(flashcardId);

    batch.set(doc(subcollectionRef, flashcardId), {
      ...flashcard,
      createdAt: timestamp,
      id: flashcardId,
    });
  }

  await batch.commit();

  return {
    flashcards: flashcards.map((flashcard, i) => ({
      ...flashcard,
      id: flashcardIds[i],
    })),
  };
};
