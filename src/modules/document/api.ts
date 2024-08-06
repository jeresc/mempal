"use server";

import {collection, query, where, getDocs, QuerySnapshot} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";
import {createMedia} from "~/media/api";
import {createDeck} from "~/deck/api";
import {getSubscription} from "~/subscription/api";
import {findActiveSubscriptionByUserId} from "~/subscription/data";

import {Document, FirestoreDocument} from "./types";
import {addDocument, findDocumentByIds, updateDocument} from "./data";

import {getFirebase} from "@/lib/firebase";
import {generateFirestoreId} from "@/lib/utils/generate-id";

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

export const createDocument = async (
  file: File,
  id = generateFirestoreId(),
  text: string,
  topics: string[],
  startPage: number,
  endPage: number,
) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const subscription = await findActiveSubscriptionByUserId(user.id!);

  if (!subscription) return {error: {message: "Subscription not found"}};

  if (subscription.documentsCreated >= 4) {
    return {error: {message: "You have reached the maximum number of documents"}};
  }

  const createMediaResult = await createMedia(file, text, startPage, endPage);

  if (createMediaResult.error !== undefined)
    return {error: {message: createMediaResult.error.message}};

  const {mediaUrl, mediaId} = createMediaResult?.success;

  const deckId = generateFirestoreId();

  const [documentId, createDeckResult] = await Promise.all([
    addDocument({
      id,
      mediaId,
      mediaUrl,
      deckId,
      userId: user.id!,
      title: "",
      topics,
    }),
    createDeck({documentId: id, id: deckId}),
  ]);

  if (createDeckResult.error !== undefined)
    return {error: {message: createDeckResult.error.message}};

  return {success: {documentId}};
};

export const getDocumentById = async (docId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const document = await findDocumentByIds(docId, user.id!);

  return {success: {document}};
};

export const patchDocument = async (
  docId: string,
  data: Partial<Omit<Document, "id" | "createdAt">>,
) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const document = await findDocumentByIds(docId, user.id!);

  if (!document.id) return {error: {message: "Document not found"}};

  await updateDocument(docId, {
    ...data,
  });

  return {
    success: {
      document: {
        ...document,
        ...data,
      },
    },
  };
};
