import {Resend} from "resend";

import {EmailTemplate} from "~/auth/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL!;
const sender = "auth@jeresc.com";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Confirm your email",
    react: EmailTemplate({
      link: confirmLink,
      ctaText: "Verify your email",
      contextText: "Confirm your email on Mempal:",
    }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset your password",
    react: EmailTemplate({
      link: resetLink,
      ctaText: "Reset your password",
      contextText: "Reset your password on Mempal:",
    }),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: sender,
    to: email,
    subject: "[2FA] Two Factor Authentication code",
    text: `Your two factor authentication code is: ${token}`,
    html: `<p>Your two factor authentication code is: ${token}</p>`,
  });
};
