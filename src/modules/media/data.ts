"use server";

import {
  collection,
  Timestamp,
  addDoc,
  query,
  where,
  QuerySnapshot,
  getDocs,
  documentId,
} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";

import {FirestoreMedia, Media} from "./types";

import {getFirebase} from "@/lib/firebase";

export const addMedia = async (data: Omit<Media, "id" | "createdAt">) => {
  const {firestore} = getFirebase();
  const user = await currentUser();
  const timestamp = Timestamp.now();

  if (!user) return;

  const docRef = await addDoc(collection(firestore, "media"), {
    ...data,
    createdAt: timestamp,
    userId: user.id,
  });

  return docRef.id;
};

export const findMediaByIds = async (mediaId: string, userId: string) => {
  const {firestore} = getFirebase();

  const q = query(
    collection(firestore, "media"),
    where(documentId(), "==", mediaId),
    where("userId", "==", userId),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreMedia>;

  const docRef = querySnap.docs[0];

  return {
    id: docRef.id!,
    ...docRef.data(),
    createdAt: docRef.data().createdAt.toDate(),
  };
};
