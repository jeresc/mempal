import {Grade} from "ts-fsrs";
import {useEffect, useState} from "react";

import {Flashcard} from "~/flashcard/types";
import {adaptCardToFlashcard, getPossibleReviews} from "~/flashcard/utils";
import {adaptFsrsToReview} from "~/review/utils";
import {Review} from "~/review/types";

import {useReviewFlashcards} from "../store/review-flashcards";

export type PossibleReview = {
  card: Flashcard & {grade: Grade};
  log: Review;
};

interface ReviewFlashcardCardProps {
  flashcard: Flashcard;
  onReview: (review: PossibleReview) => void;
  onBack: () => void;
}

const useReviewCard = ({flashcard, onReview, onBack}: ReviewFlashcardCardProps) => {
  const [possibleReviews, setPossibleReviews] = useState<PossibleReview[]>([]);
  const [now, setNow] = useState<null | Date>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedFlashcards] = useReviewFlashcards((state) => [state.reviewedFlashcards]);

  const toggleShowAnswer = () => setShowAnswer((prev) => !prev);

  useEffect(() => {
    setNow(new Date());
    const {possibleReviews} = getPossibleReviews(flashcard);

    const reviews = possibleReviews.map(({card, log}) => {
      const {grade, ...fsrsCard} = card;

      return {
        card: {...adaptCardToFlashcard(fsrsCard), grade},
        log: {...adaptFsrsToReview(log), flashcardId: flashcard.id, deckId: flashcard.deckId},
      };
    });

    /*
    const flashcards = possibleCards.map(({grade, ...card}) => ({
      ...adaptCardToFlashcard(card),
      grade,
    }));
    */

    setPossibleReviews(reviews);
  }, [flashcard]);

  useEffect(() => {
    const currentGrade = reviewedFlashcards.find(({id}) => id === flashcard?.id)?.grade;

    if (currentGrade) setShowAnswer(true);
    else setShowAnswer(false);
  }, [reviewedFlashcards, flashcard]);

  const handleReview = (possibleReview: PossibleReview) => {
    onReview(possibleReview);
  };

  const handleBack = () => {
    onBack();
  };

  return {
    handleReview,
    handleBack,
    reviewedFlashcards,
    showAnswer,
    possibleReviews,
    now,
    toggleShowAnswer,
  };
};

export {useReviewCard};
