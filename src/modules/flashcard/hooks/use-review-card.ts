import {Grade} from "ts-fsrs";
import {useEffect, useState} from "react";

import {Flashcard} from "~/flashcard/types";
import {adaptCardToFlashcard, getPossibleReviews} from "~/flashcard/utils";

import {useReviewFlashcards} from "../store/review-flashcards";

export type PossibleReview = Flashcard & {grade: Grade};

export type PossibleReviews = PossibleReview[];

interface ReviewFlashcardCardProps {
  flashcard: Flashcard;
  onReview: (flashcard: Flashcard & {grade: Grade}) => void;
  onBack: () => void;
}

const useReviewCard = ({flashcard, onReview, onBack}: ReviewFlashcardCardProps) => {
  const [possibleReviews, setPossibleReviews] = useState<PossibleReviews>([]);
  const [now, setNow] = useState<null | Date>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedFlashcards] = useReviewFlashcards((state) => [state.reviewedFlashcards]);

  const toggleShowAnswer = () => setShowAnswer((prev) => !prev);

  useEffect(() => {
    setNow(new Date());
    const {possibleCards} = getPossibleReviews(flashcard);

    const flashcards = possibleCards.map(({grade, ...card}) => ({
      ...adaptCardToFlashcard(card),
      grade,
    }));

    setPossibleReviews(flashcards);
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
