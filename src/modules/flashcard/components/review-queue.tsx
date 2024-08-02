"use client";
import React, {useEffect, useState} from "react";

import {Flashcard} from "~/flashcard/types";
import {ReviewFlashcardCard} from "~/flashcard/components/review-flashcard-card";

function ReviewQueue({dueFlashcards}: {dueFlashcards: Flashcard[]}) {
  const [reviewedFlashcards, setReviewedFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  const addReviewedFlashcard = (flashcard: Flashcard) => {
    setReviewedFlashcards((prev) => [...prev, flashcard]);
    setCurrentFlashcardIndex((prev) => (prev + 1) % dueFlashcards.length);
  };

  const onUndo = () => {
    if (!reviewedFlashcards.length) return;
    setReviewedFlashcards((prev) => prev.slice(0, prev.length - 1));
    setCurrentFlashcardIndex((prev) => (prev - 1) % dueFlashcards.length);
  };

  useEffect(() => {
    console.log(reviewedFlashcards);
  }, [reviewedFlashcards]);

  if (!dueFlashcards.length) return null;

  return (
    <section className='mx-auto flex h-full w-full max-w-screen-sml flex-col bg-foreground/5 p-4 shadow-sm sm:max-h-[600px] sm:rounded-[1.75rem]'>
      <ReviewFlashcardCard
        flashcard={dueFlashcards[currentFlashcardIndex]}
        onReview={addReviewedFlashcard}
        onUndo={onUndo}
      />
    </section>
  );
}

export {ReviewQueue};
