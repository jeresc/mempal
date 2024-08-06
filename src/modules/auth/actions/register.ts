"use server";

import bcrypt from "bcrypt-edge";
import {z} from "zod";

import {db} from "~/auth/lib/db";
import {getUserByEmail} from "~/auth/data/user";
import {generateVerificationToken} from "~/auth/lib/tokens";
import {sendVerificationEmail} from "~/auth/lib/mail";

import {RegisterSchema} from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  const {email, password, name} = validatedFields.data;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: "Email already in use", success: ""};
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "Confirmation email sent!",
    error: "",
  };
};
