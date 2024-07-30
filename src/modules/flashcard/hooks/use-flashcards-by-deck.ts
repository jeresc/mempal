import {useQuery} from "@tanstack/react-query";

import {Deck} from "~/deck/types";
import {Flashcard} from "~/flashcard/types";

import {getFlashcardsByDeckId} from "../api";

const useFlashcardsByDeck = ({deckId}: {deckId: Deck["id"]}) => {
  const queryFn = async () => {
    if (!deckId) return;
    const flashcards = await getFlashcardsByDeckId(deckId);

    return flashcards;
  };

  const {data, isPending, error} = useQuery({
    queryKey: ["flashcards", deckId],
    queryFn,
    staleTime: 10 * 60 * 1000,
    enabled: !!deckId,
  });

  const flashcards: Flashcard[] = data?.success?.flashcards ?? [];

  return {
    flashcards,
    isPending,
    error,
  };
};

export {useFlashcardsByDeck};
