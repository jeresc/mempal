import {motion} from "framer-motion";

import {variants} from "./anim";

import {cn} from "@/lib/utils/cn";

interface FlashcardCardProps {
  question: string;
  answer: string;
  topic: string;
  showAnswer?: boolean;
}

function FlashcardCard({question, answer, topic, showAnswer}: FlashcardCardProps) {
  return (
    <motion.article
      className={cn(
        "flex flex-col justify-between gap-2 rounded-md border border-border p-4 text-xs ",
      )}
    >
      <p>{topic}</p>

      <h3 className='text-pretty text-xl font-semibold'>{question}</h3>
      <motion.p
        animate={showAnswer ? "animate" : "initial"}
        className='text-sm text-slate-400'
        initial='initial'
        variants={variants}
      >
        {answer}
      </motion.p>
    </motion.article>
  );
}

export {FlashcardCard};
