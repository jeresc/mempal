"use server";

import {currentUser} from "~/auth/lib/auth";
import {patchDocument} from "~/document/api";

import {addDeck, findDeckByIds} from "./data";

import {generateFirestoreId} from "@/lib/utils/generate-id";

export const createDeck = async (id: string = generateFirestoreId(), documentId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const patchResult = await patchDocument(documentId, {deckId: id});

  if (patchResult.error !== undefined) return {error: {message: patchResult.error.message}};

  await addDeck({documentId, id, userId: user.id!});

  return {success: {deckId: id}};
};

export const getDeckById = async (deckId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const deck = await findDeckByIds(deckId, user.id!);

  return {success: {deck}};
};
