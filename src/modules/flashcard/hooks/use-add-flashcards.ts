import {useMutation, useQueryClient} from "@tanstack/react-query";

import {addFlashcardsToDeck} from "~/flashcard/data";
import {Flashcard} from "~/flashcard/types";
import {adaptGeneratedFlashcards} from "~/flashcard/utils";
import {useCreateFlashcard} from "~/flashcard/store/create-flashcard";
import {usePaginatedFlashcardsStore} from "~/flashcard/store/paginated-flashcards";

const useAddFlashcards = ({deckId}: {deckId: string}) => {
  const setOpenDrawer = useCreateFlashcard((state) => state.setDrawerOpen);
  const setPage = usePaginatedFlashcardsStore((state) => state.setPage);

  const queryClient = useQueryClient();

  const mutationFn = async ({
    flashcards,
  }: {
    flashcards: Omit<Flashcard, "id" | "deckId" | "createdAt" | "lastReviewedAt">[];
  }) => {
    const flashcardsResult = await addFlashcardsToDeck(deckId, flashcards);

    return flashcardsResult.flashcards;
  };

  const {
    mutate,
    isPending: isMutating,
    mutateAsync,
  } = useMutation({
    mutationFn,
    mutationKey: ["flashcards", deckId, 1],
    onMutate: async ({flashcards}) => {
      await Promise.all([queryClient.cancelQueries({queryKey: ["flashcards", deckId, 1]})]);
      const previousFlashcards = queryClient.getQueryData(["flashcards", deckId, 1]);

      await queryClient.setQueryData(["flashcards", deckId], (oldFlashcards: Flashcard[]) => {
        if (oldFlashcards === undefined) return adaptGeneratedFlashcards(flashcards, deckId);

        return [...adaptGeneratedFlashcards(flashcards, deckId), ...oldFlashcards].slice(0, 6);
      });

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
      setOpenDrawer(false);
      setPage(1);

      await queryClient.invalidateQueries({queryKey: ["flashcards", deckId, 1]});
    },
  });

  return {mutate, isMutating, mutateAsync};
};

export {useAddFlashcards};
