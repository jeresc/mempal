import {create} from "zustand";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface CreateFlashcardState {
  isDrawerOpen: boolean;
}

interface CreateFlashcardActions {
  setDrawerOpen: (isOpen: boolean) => void;
  openDrawer: () => void;
}

const initialState: CreateFlashcardState = {
  isDrawerOpen: false,
};

export const useCreateFlashcard = create<CreateFlashcardState & CreateFlashcardActions>()(
  (set) => ({
    ...initialState,
    setDrawerOpen: (isOpen) => set({isDrawerOpen: isOpen}),
    openDrawer: () => set({isDrawerOpen: true}),
  }),
);
