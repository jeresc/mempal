"use server";

import {z} from "zod";
import {AuthError} from "next-auth";

import {
  createTwoFactorConfirmation,
  deleteTwoFactorConfirmationById,
  getTwoFactorConfirmationByUserId,
} from "~/auth/data/two-factor-confirmation";
import {deleteTwoFactorTokenById, getTwoFactorTokenByEmail} from "~/auth/data/two-factor-token";
import {getUserByEmail} from "~/auth/data/user";
import {generateTwoFactorToken, generateVerificationToken} from "~/auth/lib/tokens";
import {sendTwoFactorTokenEmail, sendVerificationEmail} from "~/auth/lib/mail";

import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {LoginSchema} from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: "Invalid fields!", success: ""};
  }

  const {email, password, code} = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Invalid credentials!", success: ""};
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      error: "",
      success: "Please check your email for a verification link!",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return {
          error: "Invalid code!",
          success: "",
        };
      }

      if (twoFactorToken.token !== code) {
        return {
          error: "Invalid code!",
          success: "",
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return {
          error: "Code has expired!",
          success: "",
        };
      }

      await deleteTwoFactorTokenById(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await deleteTwoFactorConfirmationById(existingConfirmation.id);
      }

      await createTwoFactorConfirmation({userId: existingUser.id});
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        error: "",
        success: "",
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: "",
      error: "",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid credentials!", success: ""};
        default:
          return {error: "Something went wrong!", success: ""};
      }
    }

    throw error;
  }
};
