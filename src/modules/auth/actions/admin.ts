"use server";
import {UserRole} from "@prisma/client";

import {currentRole} from "~/auth/lib/auth";

export const admin = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) return {error: "Unauthorized"};
  else return {success: "Success"};
};
