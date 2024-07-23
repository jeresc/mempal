"use server";

import {collection, query, where, getDocs, QuerySnapshot} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";
import {createMedia} from "~/media/api";

import {FirestoreDocument} from "./types";
import {addDocument} from "./data";

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

export const createDocument = async (file: File) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const createMediaResult = await createMedia(file);

  if (createMediaResult.error !== undefined)
    return {error: {message: createMediaResult.error.message}};

  const mediaId = createMediaResult?.success?.mediaId;

  const documentId = await addDocument({
    mediaId,
    userId: user.id!,
    title: "",
  });

  return {success: {documentId}};
};
