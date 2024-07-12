"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import {getUserById} from "~/auth/data/user";
import {currentUser} from "~/auth/lib/auth";
import {db} from "~/auth/lib/db";

import {ChangePasswordSchema} from "@/schemas";

export const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  const user = await currentUser();

  if (!user) {
    return {error: "Unauthorized", success: ""};
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return {error: "Unauthorized", success: ""};
  }

  if (user.isOauth) {
    return {error: "Unauthorized", success: ""};
  }

  if (values.currentPassword && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.currentPassword, dbUser.password);

    if (!passwordsMatch) {
      return {error: "Incorrect password!", success: ""};
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 12);

    values.currentPassword = hashedPassword;
  }

  await db.user.update({
    where: {id: user.id},
    data: {password: values.currentPassword},
  });

  return {error: "", success: "Your password has been updated!"};
};
