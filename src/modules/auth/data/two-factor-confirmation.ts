import {TwoFactorConfirmation} from "@prisma/client";

import {db} from "~/auth/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {userId},
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const deleteTwoFactorConfirmationById = async (id: string) => {
  try {
    await db.twoFactorConfirmation.delete({where: {id}});
  } catch {
    return null;
  }
};

export const createTwoFactorConfirmation = async ({userId}: Omit<TwoFactorConfirmation, "id">) => {
  const twoFactorConfirmation = await db.twoFactorConfirmation.create({
    data: {userId},
  });

  return twoFactorConfirmation;
};
