"use server";

import {currentUser} from "~/auth/lib/auth";
import {findFlashcardsByDeckId, findFlashcardsByPage, updateFlashcard} from "~/flashcard/data";
import {Flashcard} from "~/flashcard/types";

export const getFlashcardsByDeckId = async (deckId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  try {
    const flashcards = await findFlashcardsByDeckId(deckId);

    return {success: {flashcards}};
  } catch (e) {
    return {error: {message: "Error getting flashcards"}};
  }
};

export const patchFlashcard = async (
  deckId: string,
  flashcardId: string,
  data: Partial<Omit<Flashcard, "id" | "deckId" | "createdAt">>,
) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  try {
    const flashcard = await updateFlashcard(deckId, flashcardId, data);

    return {success: {flashcard}};
  } catch (e) {
    return {error: {message: "Error updating flashcard"}};
  }
};

export const getFlashcardsByPage = async ({
  deckId,
  page,
  perPage = 6,
  order = "desc",
}: {
  deckId: string;
  page: number;
  order: "desc" | "asc";
  perPage?: number;
}) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const start = (page - 1) * perPage;

  try {
    const flashcards = await findFlashcardsByPage({
      deckId,
      start,
      perPage,
      order,
    });

    return {success: {flashcards}};
  } catch (e) {
    return {error: {message: "Error getting flashcards"}};
  }
};
