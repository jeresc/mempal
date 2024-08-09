"use client";
import {useQuery, keepPreviousData} from "@tanstack/react-query";

import {Deck} from "~/deck/types";
import {Flashcard} from "~/flashcard/types";

import {getFlashcardsByPage} from "../api";

const usePaginatedFlashcards = ({
  deckId,
  page,
  order = "desc",
  perPage = 6,
}: {
  deckId: Deck["id"];
  page: number;
  order?: "desc" | "asc";
  perPage?: number;
}) => {
  const queryFn = async () => {
    if (!deckId) return;

    const flashcardsResult = await getFlashcardsByPage({page, deckId, order, perPage});

    if (flashcardsResult.error !== undefined)
      throw new Error("Error getting flashcards: " + flashcardsResult.error.message);

    return flashcardsResult.success.flashcards;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["flashcards", deckId, page],
    queryFn,
    staleTime: 10 * 60 * 1000,
    enabled: !!deckId,
  });

  const flashcards: Flashcard[] = data ?? [];

  return {
    flashcards,
    isPending,
    error,
  };
};

export {usePaginatedFlashcards};
