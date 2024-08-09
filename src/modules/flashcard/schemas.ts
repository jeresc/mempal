import {z} from "zod";

export const flashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
  topic: z.string(),
});

export const flashcardsSchema = z.array(flashcardSchema);

export const createFlashcardFormSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  topic: z.string().min(5),
});
