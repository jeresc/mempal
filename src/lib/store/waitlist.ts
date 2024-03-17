import {create} from "zustand";
import {persist} from "zustand/middleware";

interface WaitlistState {
  hasJoinedWaitlist: boolean;
  setHasJoinedWaitlist: (state: boolean) => void;
}

export const useWaitlistStore = create<WaitlistState>()(
  persist(
    (set) => ({
      hasJoinedWaitlist: false,
      setHasJoinedWaitlist: (state) => {
        set({hasJoinedWaitlist: state});
      },
    }),
    {
      name: "waitlist",
    },
  ),
);
