import {create} from "zustand";

interface CreateDocumentState {
  file: File | undefined;
  charCount: number;
  pages: number;
  text: string;
}

interface CreateDocumentActions {
  setPages: (pages: number) => void;
  setCharCount: (charCount: number) => void;
  setFile: (file: File | undefined) => void;
  setText: (text: string) => void;
  reset: () => void;
}

const initialState: CreateDocumentState = {
  file: undefined,
  charCount: 0,
  pages: 0,
  text: "",
};

export const useCreateDocument = create<CreateDocumentState & CreateDocumentActions>()((set) => ({
  ...initialState,
  setFile: (file) => set({file}),
  setCharCount: (charCount) => set({charCount}),
  setPages: (pages) => set({pages}),
  setText: (text) => set({text}),
  reset: () => set(initialState),
}));
