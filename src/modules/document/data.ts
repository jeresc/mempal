"use server";

import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import {Message} from "~/chat/actions/continue-conversation";

import {Chat, Document, FirestoreDocument} from "./types";

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
    where(documentId(), "==", docId),
  );

  const querySnap = (await getDocs(q)) as QuerySnapshot<FirestoreDocument>;

  const docRef = querySnap.docs[0];

  return {
    id: docRef.id!,
    ...docRef.data(),
    createdAt: docRef.data().createdAt.toDate(),
  };
};

export const updateDocument = async (
  docId: Document["id"],
  data: Partial<Omit<Document, "id" | "createdAt">>,
) => {
  const {firestore} = getFirebase();

  await updateDoc(doc(firestore, "documents", docId), {
    ...data,
  });
};

export const addChatToDocument = async (docId: string, chatData: {history: Message[]}) => {
  const {firestore} = getFirebase();
  const documentRef = doc(firestore, "documents", docId);
  const chatCollectionRef = collection(documentRef, "chats");

  await addDoc(chatCollectionRef, chatData);
};

export const getChatsByDocumentId = async (docId: string): Promise<Chat[]> => {
  const {firestore} = getFirebase();
  const documentRef = doc(firestore, "documents", docId);
  const chatCollectionRef = collection(documentRef, "chats");

  const querySnap = (await getDocs(chatCollectionRef)) as QuerySnapshot;

  return querySnap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      history: data.history || [],
    } as Chat;
  });
};
