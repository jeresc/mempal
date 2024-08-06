"use server";

import {
  documentId,
  Timestamp,
  doc,
  query,
  setDoc,
  where,
  getDocs,
  QuerySnapshot,
  collection,
} from "firebase/firestore";

import {Deck, FirestoreDeck} from "~/deck/types";

import {getFirebase} from "@/lib/firebase";

export const addDeck = async (data: Omit<Deck, "createdAt" | "flashcards">) => {
  const {firestore} = getFirebase();
  const timestamp = Timestamp.now();

  await setDoc(doc(firestore, "decks", data.id), {
    ...data,
    createdAt: timestamp,
  });
};

export const findDeckByIds = async (deckId: string, userId: string) => {
  const {firestore} = getFirebase();

  const q = query(
    collection(firestore, "decks"),
    where("userId", "==", userId),
    where(documentId(), "==", deckId),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreDeck>;

  const docRef = querySnap.docs[0];

  return {
    id: docRef.id!,
    ...docRef.data(),
    createdAt: docRef.data().createdAt.toDate(),
  };
};
