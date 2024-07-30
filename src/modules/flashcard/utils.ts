import {Flashcard} from "./types";

export const adaptGeneratedFlashcards = (generatedFlashcards: Flashcard[], deckId: string) => {
  return generatedFlashcards.map(({question, answer, topic}) => ({
    question,
    answer,
    topic,
    score: 0,
    repeatedTimes: 0,
    deckId,
  }));
};
