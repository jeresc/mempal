"use server";

import * as z from "zod";

import {getUserByEmail} from "~/auth/data/user";
import {generatePasswordResetToken} from "~/auth/lib/tokens";
import {sendPasswordResetEmail} from "~/auth/lib/mail";

import {ResetSchema} from "@/schemas";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid email!", success: ""};
  }

  const {email} = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {error: "Email not found!", success: ""};
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken) {
    return {error: "Error generating password reset token!", success: ""};
  }

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return {error: "", success: "Reset email sent!"};
};
