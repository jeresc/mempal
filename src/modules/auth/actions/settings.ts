"use server";

import * as z from "zod";

import {getUserByEmail, getUserById} from "~/auth/data/user";
import {currentUser} from "~/auth/lib/auth";
import {db} from "~/auth/lib/db";
import {sendVerificationEmail} from "~/auth/lib/mail";
import {generateVerificationToken} from "~/auth/lib/tokens";

import {SettingsSchema} from "@/schemas";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  if (Object.keys(values).length === 0) {
    return {error: "No fields were updated", success: ""};
  }

  const user = await currentUser();

  if (!user) {
    return {error: "Unauthorized", success: ""};
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return {error: "Unauthorized", success: ""};
  }

  if (JSON.stringify({...dbUser, ...values}) === JSON.stringify(dbUser)) {
    return {error: "No fields were updated", success: ""};
  }

  if (user.isOauth) {
    values.email = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {error: "Email already in use!", success: ""};
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      error: "",
      success: "Please check your email for a verification link!",
    };
  }

  await db.user.update({
    where: {id: user.id},
    data: {...values},
  });

  return {
    error: "",
    success: `The following fields were updated: ${Object.keys(values)}`,
  };
};
