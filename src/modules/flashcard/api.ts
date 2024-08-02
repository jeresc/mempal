"use server";

import {currentUser} from "~/auth/lib/auth";
import {findFlashcardsByDeckId, updateFlashcard} from "~/flashcard/data";
import {Flashcard} from "~/flashcard/types";

export const getFlashcardsByDeckId = async (deckId: string) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  try {
    const flashcards = await findFlashcardsByDeckId(deckId);

    return {success: {flashcards}};
  } catch (e) {
    console.log(e);

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
    console.log(e);

    return {error: {message: "Error updating flashcard"}};
  }
};
