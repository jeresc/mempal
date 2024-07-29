import {z} from "zod";

export const flashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
  topic: z.string(),
});

export const flashcardsSchema = z.array(flashcardSchema);
