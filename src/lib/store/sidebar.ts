import {create} from "zustand";

interface SidebarState {
  isOpen: boolean;
  isLocked: boolean;
  setIsOpen: (state: boolean) => void;
  setIsLocked: (state: boolean) => void;
  toggleOpen: () => void;
  toggleLocked: () => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  isLocked: false,
  setIsOpen: (state) => {
    set({isOpen: state});
  },
  setIsLocked: (state) => {
    set({isLocked: state});
  },
  toggleOpen: () => {
    set((state) => ({isOpen: !state.isOpen}));
  },
  toggleLocked: () => {
    set((state) => ({isLocked: !state.isLocked}));
  },
}));
