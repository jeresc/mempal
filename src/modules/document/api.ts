"use server";

import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  Timestamp,
  addDoc,
} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";

import {Document, FirestoreDocument} from "./types";

import {getFirebase} from "@/lib/firebase";

export const getDocuments = async () => {
  const {firestore} = getFirebase();
  const user = await currentUser();

  if (!user) return [];

  const q = query(collection(firestore, "documents"), where("userId", "==", user.id));

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreDocument>;

  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  }));
};

export const createDocument = async (data: Omit<Document, "id" | "createdAt">) => {
  const {firestore} = getFirebase();
  const user = await currentUser();
  const timestamp = Timestamp.now();

  if (!user) return;

  const docRef = await addDoc(collection(firestore, "documents"), {
    ...data,
    createdAt: timestamp,
    userId: user.id,
  });

  return docRef.id;
};

export const uploadDocument = async (file: File) => {};
