import {db} from "@/lib/db";

export const getWaitlistUserByEmail = async (email: string) => {
  try {
    const user = await db.waitlistUser.findUnique({where: {email}});

    return user;
  } catch {
    return null;
  }
};
