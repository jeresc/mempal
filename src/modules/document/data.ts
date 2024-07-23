import {Timestamp, addDoc, collection} from "firebase/firestore";

import {Document} from "./types";

import {getFirebase} from "@/lib/firebase";

export const addDocument = async (data: Omit<Document, "id" | "createdAt">) => {
  const {firestore} = getFirebase();
  const timestamp = Timestamp.now();

  const docRef = await addDoc(collection(firestore, "documents"), {
    ...data,
    createdAt: timestamp,
  });

  return docRef.id;
};
