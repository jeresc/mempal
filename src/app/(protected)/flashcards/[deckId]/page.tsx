"use client";

import {useParams} from "next/navigation";

import {useFlashcardsByDeck} from "~/flashcard/hooks/use-flashcards-by-deck";

export default function DeckReviewPage() {
  const {deckId} = useParams();

  const {flashcards} = useFlashcardsByDeck({deckId: Array.isArray(deckId) ? deckId[0] : deckId});

  return (
    <div>
      {flashcards?.length > 0
        ? flashcards.map(({question, answer, topic}) => (
            <div key={question}>
              {question}: {answer}
              {topic}
            </div>
          ))
        : "No flashcards found"}
    </div>
  );
}
