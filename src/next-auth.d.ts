import {UserRole} from "@prisma/client";
import {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
