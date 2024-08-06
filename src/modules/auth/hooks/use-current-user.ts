"use client";
import {User} from "next-auth";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export const useCurrentUser = () => {
  const {data: session} = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return user;
};
