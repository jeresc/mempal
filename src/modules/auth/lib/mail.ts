import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL!;
const sender = "auth@jeresc.com";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Confirm your email",
    text: `Verify your email by clicking on the link: ${confirmLink}`,
    html: `<a href="${confirmLink}">Verify your email</a>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Reset your password",
    text: `Reset your password by clicking on the link: ${resetLink}`,
    html: `<a href="${resetLink}">Reset your password</a>`,
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
