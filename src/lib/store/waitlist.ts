import {create} from "zustand";

interface WaitlistState {
  hasJoinedWaitlist: boolean;
  setHasJoinedWaitlist: (state: boolean) => void;
}

export const useWaitlistStore = create<WaitlistState>()((set) => ({
  hasJoinedWaitlist: false,
  setHasJoinedWaitlist: (state) => {
    set({hasJoinedWaitlist: state});
  },
}));
