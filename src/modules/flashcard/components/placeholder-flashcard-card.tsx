"use client";
import {motion} from "framer-motion";

import {cn} from "@/lib/utils/cn";

function PlaceholderFlashcardCard() {
  return (
    <motion.article
      className={cn(
        "flex min-h-[240px] min-w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border p-4 text-xs",
      )}
    />
  );
}

export {PlaceholderFlashcardCard};
