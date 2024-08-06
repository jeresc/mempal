import {create} from "zustand";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface CreateDocumentState {
  file: File | undefined;
  charCount: number;
  pages: number;
  text: string;
  selectedRange: [number, number];
  topics: string[];
}

interface CreateDocumentActions {
  setPages: (pages: number) => void;
  setCharCount: (charCount: number) => void;
  setFile: (file: File | undefined) => void;
  setText: (text: string) => void;
  setSelectedRange: (newArrOrSetterFn: ReactStyleStateSetter<[number, number]>) => void;
  setTopics: (newArrOrSetterFn: ReactStyleStateSetter<string[]>) => void;
  reset: () => void;
}

const initialState: CreateDocumentState = {
  file: undefined,
  charCount: 0,
  pages: 0,
  text: "",
  selectedRange: [1, 1],
  topics: [],
};

export const useCreateDocument = create<CreateDocumentState & CreateDocumentActions>()((set) => ({
  ...initialState,
  setFile: (file) => set({file}),
  setCharCount: (charCount) => set({charCount}),
  setPages: (pages) => set({pages}),
  setText: (text) => set({text}),
  setTopics: (newArrOrSetterFn) => {
    set((state) => ({
      topics:
        typeof newArrOrSetterFn === "function" ? newArrOrSetterFn(state.topics) : newArrOrSetterFn,
    }));
  },

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
