import confetti from "canvas-confetti";
import {Grade} from "ts-fsrs";
import {useEffect} from "react";

import {useReviewFlashcards} from "~/flashcard/store/review-flashcards";
import {Flashcard} from "~/flashcard/types";
import {useUpdateFlashcards} from "~/flashcard/hooks/use-update-flashcards";

const useReviewQueue = ({deckId}: {deckId: string}) => {
  const [
    currentFlashcardIndex,
    reviewedFlashcards,
    nextFlashcard,
    previousFlashcard,
    addReviewedFlashcard,
    setReviewedFlashcards,
    dueFlashcards,
    setDueFlashcards,
    setCurrentFlashcardIndex,
  ] = useReviewFlashcards((state) => [
    state.currentFlashcardIndex,
    state.reviewedFlashcards,
    state.nextFlashcard,
    state.previousFlashcard,
    state.addReviewedFlashcard,
    state.setReviewedFlashcards,
    state.dueFlashcards,
    state.setDueFlashcards,
    state.setCurrentFlashcardIndex,
  ]);
  const {mutate} = useUpdateFlashcards({deckId});

  useEffect(() => {
    if (
      reviewedFlashcards.length >= dueFlashcards.length &&
      dueFlashcards.length > 0 &&
      reviewedFlashcards.length > 0
    ) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: {y: 0.6},
        colors: ["#cffafe", "#bae6fd", "#4b73ff"],
      });

      const updatedFlashcards = reviewedFlashcards.map((flashcard) => {
        const {grade, ...rest} = flashcard;

        return {...rest};
      });

      mutate({flashcards: updatedFlashcards});
      setReviewedFlashcards([]);
      setDueFlashcards([]);
    }
  }, [reviewedFlashcards, dueFlashcards.length, mutate]);

  const onReview = (flashcard: Flashcard & {grade: Grade}) => {
    nextFlashcard(dueFlashcards.length);
    const reviewedFlashcardIndex = reviewedFlashcards.findIndex(({id}) => id === flashcard.id);

    if (reviewedFlashcardIndex === -1) addReviewedFlashcard(flashcard);
    else
      setReviewedFlashcards((prev) => [
        ...prev.slice(0, reviewedFlashcardIndex),
        flashcard,
        ...prev.slice(reviewedFlashcardIndex + 1),
      ]);
  };

  const onBack = () => {
    if (currentFlashcardIndex === 0) return;
    previousFlashcard();
  };

  return {
    currentFlashcardIndex,
    reviewedFlashcards,
    nextFlashcard,
    previousFlashcard,
    addReviewedFlashcard,
    setReviewedFlashcards,
    onReview,
    onBack,
    dueFlashcards,
    setDueFlashcards,
    setCurrentFlashcardIndex,
  };
};

export {useReviewQueue};
