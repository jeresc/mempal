import {useSession} from "next-auth/react";

export const useCurrentUserRole = () => {
  const {data: session} = useSession();

  return session?.user?.role;
};
