import React from "react";

import {Flashcard} from "~/flashcard/types";
import {ReviewFlashcardCard} from "~/flashcard/components/review-flashcard-card";

function ReviewQueue({flashcards}: {flashcards: Flashcard[]}) {
  return (
    <section className='mx-auto flex h-full max-h-[600px] w-full max-w-screen-sml flex-col rounded-3xl bg-foreground/5 p-4'>
      {flashcards.map((flashcard) => (
        <ReviewFlashcardCard key={flashcard.id} flashcard={flashcard} />
      ))}
    </section>
  );
}

export {ReviewQueue};
