"use server";

import {currentUser} from "~/auth/lib/auth";
import {findFlashcardsByDeckId} from "~/flashcard/data";

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
