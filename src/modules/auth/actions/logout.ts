import {signOut} from "next-auth/react";

export const logout = async () => {
  // server stuff
  await signOut();
};
