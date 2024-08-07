import {create} from "zustand";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

interface SidebarState {
  isOpen: boolean;
  isLocked: boolean;
  setIsOpen: (state: boolean) => void;
  setIsLocked: (state: boolean) => void;
  toggleOpen: () => void;
  toggleLocked: () => void;
  setTabToggled: (newStringOrSetterFn: ReactStyleStateSetter<string>) => void;
  tabToggled: string;
  lockedPercentage: number;
  setLockedPercentage: (newPercentage: number) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  isLocked: false,
  tabToggled: "",
  lockedPercentage: 0,
  setLockedPercentage: (newPercentage) => {
    set({lockedPercentage: newPercentage});
  },
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
  setTabToggled: (newStringOrSetterFn) => {
    set((state) => ({
      tabToggled:
        typeof newStringOrSetterFn === "function"
          ? newStringOrSetterFn(state.tabToggled)
          : newStringOrSetterFn,
    }));
  },
}));
