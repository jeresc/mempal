"use client";
import {motion} from "framer-motion";
import {MailCheck} from "lucide-react";

import {WaitlistForm} from "@/components/waitlist";
import {useWaitlistStore} from "@/lib/store/waitlist";

import {transition, variants} from "./anim";

function Hero() {
  const hasJoinedWaitlist = useWaitlistStore((state) => state.hasJoinedWaitlist);

  return (
    <motion.section
      animate="animate"
      className="flex flex-col place-items-center gap-4 gap-y-12 lg:flex-row"
      initial="initial"
      transition={transition}
      variants={variants}
    >
      <section className="flex h-full max-w-xl flex-col items-center justify-center gap-3 py-8 text-center lg:items-start lg:gap-4 lg:py-0 lg:text-left">
        <h1 className="my-0 max-w-[320px] text-pretty text-[42px] font-bold leading-[106%] tracking-tight text-[#202228] lg:max-w-none lg:text-4xl xl:text-[42px]">
          Unlock your true potential
        </h1>
        <sub className="my-0 mb-0 text-balance text-lg leading-6 text-gray-400 lg:pr-8 xl:text-xl">
          Supercharge your learning with our intelligent study platform. Generate personalized
          questions and flashcards directly from your resources.
        </sub>
        {!hasJoinedWaitlist ? (
          <WaitlistForm />
        ) : (
          <motion.p
            animate={{opacity: 1}}
            className="mt-3 flex max-w-[320px] items-center gap-1.5 text-pretty rounded-md border border-sky-100 bg-[rgb(245,249,255)] px-2 py-1.5 text-[17px] font-medium leading-[110%] xs:max-w-none lg:mt-2 xl:text-lg"
            initial={{opacity: 0}}
          >
            <MailCheck className="ml-1 pt-[1px] text-[rgb(80,178,247)] xl:h-5 xl:w-5" size={18} />
            <span className="bg-[linear-gradient(90deg,rgb(80,178,247)_0%,rgb(80,187,247)_100%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Thanks
              <span className="hidden xs:inline"> for joining our waitlist</span>, we&apos;ll be in
              touch shortly.
            </span>
          </motion.p>
        )}
      </section>
      <article className="flex-grow-1 aspect-video w-full rounded-lg border border-blue-50 bg-[rgb(255,255,255,.5)]" />
    </motion.section>
  );
}

export {Hero};
