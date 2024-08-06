import confetti from "canvas-confetti";
import {useEffect} from "react";

import {useReviewFlashcards} from "~/flashcard/store/review-flashcards";
import {useUpdateFlashcards} from "~/flashcard/hooks/use-update-flashcards";
import {useAddReviews} from "~/review/hooks/use-add-reviews";

import {PossibleReview} from "./use-review-card";

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
    logs,
    setLogs,
    addLog,
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
    state.logs,
    state.setLogs,
    state.addLog,
  ]);
  const {mutate: updateFlashcards} = useUpdateFlashcards({deckId});
  const {mutate: addReviews} = useAddReviews();

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

      updateFlashcards({flashcards: updatedFlashcards});
      addReviews({reviews: logs});

      setReviewedFlashcards([]);
      setDueFlashcards([]);
      setLogs([]);
    }
  }, [
    reviewedFlashcards,
    dueFlashcards.length,
    updateFlashcards,
    setDueFlashcards,
    setReviewedFlashcards,
    addReviews,
    logs,
    setLogs,
  ]);

  const onReview = (review: PossibleReview) => {
    nextFlashcard(dueFlashcards.length);

    const {card: flashcard, log} = review;
    const reviewedFlashcardIndex = reviewedFlashcards.findIndex(({id}) => id === flashcard.id);
    const logIndex = logs.findIndex(({flashcardId}) => flashcardId === flashcard.id);

    if (reviewedFlashcardIndex === -1) {
      addReviewedFlashcard(flashcard);
    } else
      setReviewedFlashcards((prev) => [
        ...prev.slice(0, reviewedFlashcardIndex),
        flashcard,
        ...prev.slice(reviewedFlashcardIndex + 1),
      ]);

    if (logIndex === -1) addLog(log);
    else setLogs((prev) => [...prev.slice(0, logIndex), log, ...prev.slice(logIndex + 1)]);
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
