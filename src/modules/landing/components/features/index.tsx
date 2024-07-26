"use client";

import {motion} from "framer-motion";

import {fadeInAnimationOnce} from "@/utils/anim";
import {TrainAICard, InstantAnswer, PersonalData, InstantReview} from "@/utils/features/features";

function Features() {
  return (
    <motion.div
      className='flex flex-col items-center justify-center gap-y-12 py-8'
      initial='initial'
      variants={fadeInAnimationOnce}
      viewport={{
        once: true,
      }}
      whileInView='animate'
    >
      <TrainAICard />
      <InstantAnswer />
      <PersonalData />
      <InstantReview />
    </motion.div>
  );
}

export {Features};
