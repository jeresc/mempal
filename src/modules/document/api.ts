"use server";

import {collection, query, where, getDocs, QuerySnapshot} from "firebase/firestore";

import {currentUser} from "~/auth/lib/auth";
import {createMedia} from "~/media/api";
import {addDeck} from "~/deck/data";
import {createDeck} from "~/deck/api";

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

export const createDocument = async (file: File, id = generateFirestoreId(), text: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const createMediaResult = await createMedia(file, text);

  if (createMediaResult.error !== undefined)
    return {error: {message: createMediaResult.error.message}};

  const mediaId = createMediaResult?.success?.mediaId;

  const deckId = generateFirestoreId();

  const [documentId, createDeckResult] = await Promise.all([
    addDocument({
      id,
      mediaId,
      deckId,
      userId: user.id!,
      title: "",
      topics: [
        "Sociedad e instituciones",
        "Concepto de Estado. Tipos de Estado",
        "Concepto de político: características",
        "Concepto de Democracia. La poliarquía",
        "Construcción del Estado Argentino: mecanismos",
        "El régimen conservador: características, conflictos y tensiones",
        "La integración al mercado mundial: el modelo agroexportador. Características, ventajas y límites",
        "La integración al mercado mundial: el modelo agroexportador. Características, ventajas y límites",
        "Situación política, conflictos en el oficialismo y con la oposición",
        "Impacto de la Primera Guerra Mundial. La crisis de 1929 y su influencia en Argentina",
        "Sociedad y cultura, 1880-1930",
      ],
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
