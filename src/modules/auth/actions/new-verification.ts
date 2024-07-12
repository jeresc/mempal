"use server";

import {getUserByEmail} from "~/auth/data/user";
import {getVerificationTokenByToken} from "~/auth/data/verification-token";
import {db} from "~/auth/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {error: "Token does not exist!", success: ""};
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return {error: "Token has expired!", success: ""};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: "Email does not exist!", success: ""};
  }

  if (existingUser.emailVerified) {
    return {error: "Email already verified!", success: ""};
  }

  await db.user.update({
    where: {id: existingUser.id},
    data: {emailVerified: new Date(), email: existingUser.email},
  });

  await db.verificationToken.delete({
    where: {id: existingToken.id},
  });

  return {error: "", success: "Email verified!"};
};
