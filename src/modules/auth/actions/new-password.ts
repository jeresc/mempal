"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByToken,
} from "~/auth/data/password-reset-token";
import {getUserByEmail} from "~/auth/data/user";
import {db} from "~/auth/lib/db";

import {NewPasswordSchema} from "@/schemas";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return {error: "Missing token!", success: ""};
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  const {password} = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {error: "Invalid token!", success: ""};
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return {error: "Token has expired!", success: ""};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: "Email does not exist!", success: ""};
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.update({
    where: {id: existingUser.id},
    data: {password: hashedPassword},
  });

  await deletePasswordResetTokenById(existingToken.id);

  return {error: "", success: "Password updated!"};
};
