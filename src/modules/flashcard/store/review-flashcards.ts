import {create} from "zustand";
import {Grade} from "ts-fsrs";

import {Flashcard} from "../types";
import {PossibleReview} from "../hooks/use-review-card";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface ReviewFlashcardsState {
  currentFlashcardIndex: number;
  dueFlashcards: Flashcard[];
  reviewedFlashcards: PossibleReview["card"][];
  possibleReviews: PossibleReview["card"][];
  logs: PossibleReview["log"][];
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
  setLogs: (newArrOrSetterFn: ReactStyleStateSetter<PossibleReview["log"][]>) => void;
  addLog: (log: PossibleReview["log"]) => void;
}

const initialState: ReviewFlashcardsState = {
  currentFlashcardIndex: -1,
  reviewedFlashcards: [],
  logs: [],
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
    setLogs: (newArrOrSetterFn) => {
      set((state) => ({
        logs:
          typeof newArrOrSetterFn === "function" ? newArrOrSetterFn(state.logs) : newArrOrSetterFn,
      }));
    },
    addLog: (log) => set((state) => ({logs: [...state.logs, log]})),
  }),
);
