"use client";
import {motion} from "framer-motion";

import {Flashcard} from "~/flashcard/types";

import {variants} from "./anim";

import {cn} from "@/lib/utils/cn";

type FlashcardCardProps = Flashcard & {
  showAnswer?: boolean;
};

function FlashcardCard(flashcard: FlashcardCardProps) {
  return (
    <motion.article
      className={cn(
        "flex flex-col justify-between gap-2 rounded-md border border-border p-4 text-xs ",
      )}
    >
      <p>{flashcard.topic}</p>

      <h3 className='text-pretty text-xl font-semibold'>{flashcard.question}</h3>
      <motion.p
        animate={flashcard.showAnswer ? "animate" : "initial"}
        className='overflow-hidden text-sm text-slate-400'
        initial='initial'
        variants={variants}
      >
        {flashcard.answer}
      </motion.p>
    </motion.article>
  );
}

export {FlashcardCard};
