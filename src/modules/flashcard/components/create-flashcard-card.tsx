"use client";
import {motion} from "framer-motion";
import {Plus} from "lucide-react";

import {cn} from "@/lib/utils/cn";

function CreateFlashcardCard() {
  return (
    <motion.article
      className={cn(
        "group/card flex min-h-[240px] min-w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border p-4 text-xs hover:border-primary/20 hover:bg-primary/10",
      )}
    >
      <Plus className='h-11 w-11 text-border group-hover/card:text-primary/20' strokeWidth={1} />
    </motion.article>
  );
}

export {CreateFlashcardCard};
