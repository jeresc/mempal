"use server";

import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import {Deck} from "~/deck/types";
import {FirestoreFlashcard, Flashcard} from "~/flashcard/types";

import {getFirebase} from "@/lib/firebase";
import {generateFirestoreId} from "@/lib/utils/generate-id";

export const addFlashcardsToDeck = async (
  deckId: Deck["id"],
  flashcards: Omit<Flashcard, "id" | "deckId" | "createdAt" | "lastReviewedAt">[],
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

export const updateFlashcards = async (
  deckId: Deck["id"],
  flashcards: Omit<Flashcard, "deckId" | "createdAt">[],
) => {
  const {firestore} = getFirebase();

  const docRef = doc(firestore, "decks", deckId);
  const subcollectionRef = collection(docRef, "flashcards");

  const batch = writeBatch(firestore);

  for (const flashcard of flashcards) {
    const {lastReviewedAt, dueAt, ...rest} = flashcard;

    const lastReviewedAtTimestamp = lastReviewedAt ? Timestamp.fromDate(lastReviewedAt) : undefined;
    const dueAtTimestamp = Timestamp.fromDate(dueAt);

    const flashcardRef = doc(subcollectionRef, flashcard.id);

    batch.update(flashcardRef, {
      ...rest,
      lastReviewedAt: lastReviewedAtTimestamp,
      dueAt: dueAtTimestamp,
    });
  }

  await batch.commit();

  return {
    flashcards,
  };
};

export const findFlashcardsByDeckId = async (deckId: Deck["id"]) => {
  const {firestore} = getFirebase();

  const docRef = doc(firestore, "decks", deckId);
  const flashcardsRef = collection(docRef, "flashcards");

  const q = query(flashcardsRef);

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreFlashcard>;

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    dueAt: doc.data().dueAt?.toDate(),
    lastReviewedAt: doc.data().lastReviewedAt?.toDate(),
  }));
};

export const findFlashcardsByPage = async ({
  deckId,
  start,
  perPage,
  order,
}: {
  deckId: Deck["id"];
  start: number;
  perPage: number;
  order: "desc" | "asc";
}) => {
  const {firestore} = getFirebase();

  const docRef = doc(firestore, "decks", deckId);
  const flashcardsRef = collection(docRef, "flashcards");

  const q = query(flashcardsRef, orderBy("elapsedDays", "desc"), startAt(0), limit(6));

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreFlashcard>;

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    dueAt: doc.data().dueAt?.toDate(),
    lastReviewedAt: doc.data().lastReviewedAt?.toDate(),
  }));
};

export const updateFlashcard = async (
  deckId: Deck["id"],
  flashcardId: Flashcard["id"],
  data: Partial<Omit<Flashcard, "id" | "deckId" | "createdAt">>,
) => {
  const {firestore} = getFirebase();

  const docRef = doc(firestore, "decks", deckId);
  const subcollectionRef = collection(docRef, "flashcards");

  const timestamp = data.lastReviewedAt ? Timestamp.fromDate(data.lastReviewedAt) : undefined;

  await updateDoc(doc(subcollectionRef, flashcardId), {
    ...data,
    lastReviewedAt: timestamp,
  });

  return {
    flashcard: {
      ...data,
      id: flashcardId,
    },
  };
};
