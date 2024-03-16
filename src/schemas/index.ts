import * as z from "zod";

export const WaitlistSchema = z.object({
  email: z.string().email({message: "You must provide a valid email address"}),
});
