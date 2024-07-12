import {TwoFactorToken} from "@prisma/client";

import {db} from "~/auth/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {token},
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {email},
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    await db.twoFactorToken.delete({where: {id}});
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async ({email, token, expires}: Omit<TwoFactorToken, "id">) => {
  const twoFactorToken = await db.twoFactorToken.create({
    data: {email, token, expires},
  });

  return twoFactorToken;
};
