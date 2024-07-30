"use server";

import {Timestamp, doc, setDoc} from "firebase/firestore";

import {Deck} from "~/deck/types";

import {getFirebase} from "@/lib/firebase";

export const addDeck = async (data: Omit<Deck, "createdAt" | "flashcards">) => {
  const {firestore} = getFirebase();
  const timestamp = Timestamp.now();

  await setDoc(doc(firestore, "decks", data.id), {
    ...data,
    createdAt: timestamp,
  });
};
