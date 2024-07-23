"use server";
import {
  QuerySnapshot,
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import {Document, FirestoreDocument} from "./types";

import {getFirebase} from "@/lib/firebase";

export const addDocument = async (data: Omit<Document, "createdAt">) => {
  const {firestore} = getFirebase();
  const timestamp = Timestamp.now();

  await setDoc(doc(firestore, "documents", data.id), {
    ...data,
    createdAt: timestamp,
  });
};

export const findDocumentByIds = async (docId: Document["id"], userId: Document["userId"]) => {
  const {firestore} = getFirebase();

  const q = query(
    collection(firestore, "documents"),
    where("userId", "==", userId),
    where("id", "==", docId),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreDocument>;

  if (!querySnap.docs.length) return {};

  const docRef = querySnap.docs[0];

  return {
    id: docRef.id,
    ...docRef.data(),
    createdAt: docRef.data().createdAt.toDate(),
  };
};
