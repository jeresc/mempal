import {useMutation, useQueryClient} from "@tanstack/react-query";

import {updateFlashcards} from "~/flashcard/data";
import {Flashcard} from "~/flashcard/types";

const useUpdateFlashcards = ({deckId}: {deckId: string}) => {
  const queryClient = useQueryClient();

  const mutationFn = async ({
    flashcards,
  }: {
    flashcards: Omit<Flashcard, "deckId" | "createdAt">[];
  }) => {
    const flashcardsResult = await updateFlashcards(deckId, flashcards);

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
          if (oldFlashcardsResult === undefined) return flashcards;

          const oldFlashcards = oldFlashcardsResult?.success?.flashcards;

          if (oldFlashcards?.length === 0) return flashcards;

          const flashcardsWithNewFlashcards = flashcards.map((flashcard) => {
            const oldFlashcard = oldFlashcards.find(
              (oldFlashcard) => oldFlashcard.id === flashcard.id,
            );

            if (oldFlashcard) return oldFlashcard;

            return flashcard;
          });

          return [...oldFlashcards, ...flashcardsWithNewFlashcards];
        },
      );

      return {previousFlashcards};
    },
    onSuccess: () => {
      // toast.success("Flashcards added successfully");
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

export {useUpdateFlashcards};
