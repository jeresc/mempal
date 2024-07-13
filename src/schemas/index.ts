import * as z from "zod";

export const WaitlistSchema = z.object({
  email: z.string().email({message: "You must provide a valid email address"}),
});

import {UserRole} from "@prisma/client";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {message: "Password is required"}),
    newPassword: z.string().min(6, {message: "Password must be at least 6 characters"}),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(2)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.optional(z.enum([UserRole.USER, UserRole.ADMIN])),
  email: z.optional(z.string().email()),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {message: "Password is required"}),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
  name: z.string().min(2, {message: "Name is required"}),
});

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
    confirmPassword: z.string().min(6, {message: "Password must be at least 6 characters"}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
