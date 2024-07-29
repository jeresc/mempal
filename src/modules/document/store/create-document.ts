import {create} from "zustand";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface CreateDocumentState {
  file: File | undefined;
  charCount: number;
  pages: number;
  text: string;
  selectedRange: [number, number];
}

interface CreateDocumentActions {
  setPages: (pages: number) => void;
  setCharCount: (charCount: number) => void;
  setFile: (file: File | undefined) => void;
  setText: (text: string) => void;
  setSelectedRange: (newArrOrSetterFn: ReactStyleStateSetter<[number, number]>) => void;
  reset: () => void;
}

const initialState: CreateDocumentState = {
  file: undefined,
  charCount: 0,
  pages: 0,
  text: "",
  selectedRange: [1, 1],
};

export const useCreateDocument = create<CreateDocumentState & CreateDocumentActions>()((set) => ({
  ...initialState,
  setFile: (file) => set({file}),
  setCharCount: (charCount) => set({charCount}),
  setPages: (pages) => set({pages}),
  setText: (text) => set({text}),
  setSelectedRange: (newArrOrSetterFn) => {
    set((state) => ({
      selectedRange:
        typeof newArrOrSetterFn === "function"
          ? newArrOrSetterFn(state.selectedRange)
          : newArrOrSetterFn,
    }));
  },
  reset: () => set(initialState),
}));
