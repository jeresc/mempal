import {create} from "zustand";
import {Grade} from "ts-fsrs";

import {Flashcard} from "../types";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface ReviewFlashcardsState {
  currentFlashcardIndex: number;
  dueFlashcards: Flashcard[];
  reviewedFlashcards: (Flashcard & {grade: Grade})[];
  possibleReviews: (Flashcard & {grade: Grade})[];
}

interface ReviewFlashcardsActions {
  setCurrentFlashcardIndex: (index: number) => void;
  setReviewedFlashcards: (
    newArrOrSetterFn: ReactStyleStateSetter<(Flashcard & {grade: Grade})[]>,
  ) => void;
  setPossibleReviews: (possibleReviews: (Flashcard & {grade: Grade})[]) => void;
  addReviewedFlashcard: (flashcard: Flashcard & {grade: Grade}) => void;
  nextFlashcard: (flashcardsLength: number) => void;
  previousFlashcard: () => void;
  setDueFlashcards: (dueFlashcards: Flashcard[]) => void;
  upsertDueFlashcard: (dueFlashcard: Flashcard) => void;
  reset: () => void;
}

const initialState: ReviewFlashcardsState = {
  currentFlashcardIndex: -1,
  reviewedFlashcards: [],
  possibleReviews: [],
  dueFlashcards: [],
};

export const useReviewFlashcards = create<ReviewFlashcardsState & ReviewFlashcardsActions>()(
  (set) => ({
    ...initialState,
    setCurrentFlashcardIndex: (index) => set({currentFlashcardIndex: index}),
    setReviewedFlashcards: (newArrOrSetterFn) => {
      set((state) => ({
        reviewedFlashcards:
          typeof newArrOrSetterFn === "function"
            ? newArrOrSetterFn(state.reviewedFlashcards)
            : newArrOrSetterFn,
      }));
    },
    setPossibleReviews: (possibleReviews) => set({possibleReviews}),
    addReviewedFlashcard: (flashcard) =>
      set((state) => ({reviewedFlashcards: [...state.reviewedFlashcards, flashcard]})),
    nextFlashcard: () => set((state) => ({currentFlashcardIndex: state.currentFlashcardIndex + 1})),
    previousFlashcard: () =>
      set((state) => ({
        currentFlashcardIndex:
          state.currentFlashcardIndex - 1 < 0 ? 0 : state.currentFlashcardIndex - 1,
      })),
    reset: () => set(initialState),
    setDueFlashcards: (dueFlashcards) => set({dueFlashcards}),
    upsertDueFlashcard: (dueFlashcard) =>
      set((state) => {
        const updatedCardIndex = state.dueFlashcards.findIndex(
          (card) => card.id === dueFlashcard.id,
        );

        if (updatedCardIndex === -1) state.dueFlashcards.push(dueFlashcard);
        else state.dueFlashcards[updatedCardIndex] = dueFlashcard;

        return {dueFlashcards: state.dueFlashcards};
      }),
  }),
);
