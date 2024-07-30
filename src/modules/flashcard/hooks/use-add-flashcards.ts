import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

import {addFlashcardsToDeck} from "~/flashcard/data";
import {Flashcard} from "~/flashcard/types";

import {adaptGeneratedFlashcards} from "../utils";

const useAddFlashcards = ({deckId}: {deckId: string}) => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    flashcards,
  }: {
    flashcards: Omit<Flashcard, "id" | "deckId" | "createdAt" | "lastUsedAt">[];
  }) => {
    const flashcardsResult = await addFlashcardsToDeck(deckId, flashcards);

    return flashcardsResult.flashcards;
  };

  const {mutate, isPending: isMutating} = useMutation({
    mutationFn,
    mutationKey: ["flashcards", deckId],
    onMutate: async ({flashcards}) => {
      await Promise.all([queryClient.cancelQueries({queryKey: ["flashcards", deckId]})]);
      const previousFlashcards = queryClient.getQueryData(["flashcards", deckId]);

      await queryClient.setQueryData(
        ["flashcards", deckId],
        (oldFlashcardsResult: {success: {flashcards: Flashcard[]}}) => {
          if (oldFlashcardsResult === undefined)
            return adaptGeneratedFlashcards(flashcards, deckId);

          console.log(oldFlashcardsResult);
          const oldFlashcards = oldFlashcardsResult.success.flashcards;

          return [...oldFlashcards, ...adaptGeneratedFlashcards(flashcards, deckId)];
        },
      );

      return {previousFlashcards};
    },
    onSuccess: () => {
      toast.success("Flashcards added successfully");
    },
    onError: (error, _, context) => {
      console.error("Error adding flashcards:", error);
      if (context?.previousFlashcards != null) {
        queryClient.setQueryData(["flashcards", deckId], context?.previousFlashcards);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ["flashcards", deckId]});
    },
  });

  return {mutate, isMutating};
};

export {useAddFlashcards};
