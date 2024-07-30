export const adaptGeneratedFlashcards = (
  generatedFlashcards: {question: string; answer: string; topic: string}[],
  deckId: string,
) => {
  return generatedFlashcards.map(({question, answer, topic}) => ({
    question,
    answer,
    topic,
    score: 0,
    repeatedTimes: 0,
    deckId,
  }));
};
