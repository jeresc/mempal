"use client";

import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";

import { transition, variants } from "../../../../utils/anim";

import { WaitlistForm } from "@/components/waitlist";
import { useWaitlistStore } from "@/lib/store/waitlist";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const hasJoinedWaitlist = useWaitlistStore((state) => state.hasJoinedWaitlist);

  return (
    <motion.section
      animate='animate'
      className='flex flex-col place-items-center gap-4 gap-y-12 font-outfit lg:flex-row'
      initial='initial'
      transition={transition}
      variants={variants}
    >
      <section className='flex h-full max-w-xl flex-col items-center justify-center gap-3 py-8 text-center lg:items-start lg:gap-4 lg:py-0 lg:text-left'>
        <h1 className='my-0 max-w-[560px] text-pretty text-[42px] font-bold leading-[106%] tracking-tight text-[#202228] lg:max-w-none lg:text-4xl xl:text-[42px]'>
          Accelerate your learning journey
        </h1>
        <sub className='my-0 mb-0 text-balance text-lg leading-6 text-gray-500 lg:pr-8 xl:text-xl'>
          Supercharge your learning experience with our intelligent study platform. Customize
          questions and flashcards from your own materials.
        </sub>
        <div className="w-full items-center justify-center">
          <Button className='w-2/3 sm:w-1/2 px-8 py-4'>
           <Link href={'/register'} className="text-center text-sm sm:text-xl">Try for free</Link>
          </Button>
        </div>
      </section>
      <article className='flex-grow-1 aspect-video w-full rounded-lg border border-blue-50 bg-[rgb(0,0,0,.5)]' />
    </motion.section>
  );
}

export { Hero };
