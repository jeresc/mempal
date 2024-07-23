import {collection, Timestamp, addDoc} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";

import {Media} from "./types";

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
