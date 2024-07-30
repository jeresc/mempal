"use server";

import {currentUser} from "~/auth/lib/auth";

import {addDeck, findDeckByIds} from "./data";

import {generateFirestoreId} from "@/lib/utils/generate-id";

export const createDeck = async ({
  id = generateFirestoreId(),
  documentId,
}: {
  id?: string;
  documentId: string;
}) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  await addDeck({documentId, id, userId: user.id!});

  return {success: {deckId: id}};
};

export const getDeckById = async (deckId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const deck = await findDeckByIds(deckId, user.id!);

  return {success: {deck}};
};
