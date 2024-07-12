import {type NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

import {getUserByEmail} from "~/auth/data/user";

import {LoginSchema} from "@/schemas";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const {email, password} = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
