"use client";
import {motion} from "framer-motion";

import {WaitlistForm} from "@/components/waitlist";

import {transition, variants} from "./anim";

export function Hero() {
  return (
    <motion.section
      animate="animate"
      className="grid grid-cols-1 place-items-center gap-4 gap-y-12 md:grid-cols-2"
      initial="initial"
      transition={transition}
      variants={variants}
    >
      <section className="flex h-full max-w-xl flex-col items-center justify-center gap-3 py-8 text-center md:items-start md:gap-4 md:py-0 md:text-left">
        <h1 className="my-0 max-w-[320px] text-pretty text-[42px] font-bold leading-[106%] tracking-tight text-[#202228] md:max-w-none md:text-4xl xl:text-[42px]">
          Unlock your true potential
        </h1>
        <sub className="my-0 mb-0 text-balance text-lg leading-6 text-gray-400 md:pr-8 xl:text-xl">
          Supercharge your learning with our intelligent study platform. Generate personalized
          questions and flashcards directly from your resources.
        </sub>
        <WaitlistForm />
      </section>
      <article className="aspect-video w-full rounded-lg border border-blue-50 bg-[rgb(255,255,255,.5)]" />
    </motion.section>
  );
}
