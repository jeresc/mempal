import crypto from "crypto";

import {v4 as uuidv4} from "uuid";

import {
  createVerificationToken,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from "~/auth/data/verification-token";
import {
  createPasswordResetToken,
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from "~/auth/data/password-reset-token";
import {
  createTwoFactorToken,
  deleteTwoFactorTokenById,
  getTwoFactorTokenByEmail,
} from "~/auth/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  const verificationToken = await createVerificationToken({
    email,
    token,
    expires,
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenById(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetToken({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // Token expires in 5 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await deleteTwoFactorTokenById(existingToken.id);
  }

  const twoFactorToken = await createTwoFactorToken({
    email,
    token,
    expires,
  });

  return twoFactorToken;
};
