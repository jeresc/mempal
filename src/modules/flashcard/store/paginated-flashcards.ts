import {create} from "zustand";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface PaginatedFlashcardsState {
  page: number;
}

interface PaginatedFlashcardsActions {
  setPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  reset: () => void;
}

const initialState: PaginatedFlashcardsState = {
  page: 1,
};

export const usePaginatedFlashcardsStore = create<
  PaginatedFlashcardsState & PaginatedFlashcardsActions
>()((set) => ({
  ...initialState,
  setPage: (page) => set({page}),
  previousPage: () => set((state) => ({page: state.page - 1})),
  nextPage: () => set((state) => ({page: state.page + 1})),
  reset: () => set(initialState),
}));
