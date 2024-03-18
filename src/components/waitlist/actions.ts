"use server";

import type {z} from "zod";

import {db} from "@/lib/db";
import {WaitlistSchema} from "@/schemas";
import {getWaitlistUserByEmail} from "@/data/waitlist-user";

export const registerWaitlistUser = async (values: z.infer<typeof WaitlistSchema>) => {
  const validatedFields = WaitlistSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  let {email} = validatedFields.data;

  email = email.toLowerCase();

  const existingUser = await getWaitlistUserByEmail(email);

  if (existingUser) {
    return {error: "", success: "Successfully joined waitlist!"};
  }

  await db.waitlistUser.create({
    data: {email},
  });

  return {
    success: "Successfully joined waitlist!",
    error: "",
  };
};
