import {PasswordResetToken} from "@prisma/client";

import {db} from "~/auth/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: {token},
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.verificationToken.findFirst({
      where: {email},
    });

    return passwordToken;
  } catch {
    return null;
  }
};

export const deletePasswordResetTokenById = async (id: string) => {
  try {
    await db.passwordResetToken.delete({where: {id}});
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async ({
  email,
  token,
  expires,
}: Omit<PasswordResetToken, "id">) => {
  const passwordToken = await db.passwordResetToken.create({
    data: {email, token, expires},
  });

  return passwordToken;
};
