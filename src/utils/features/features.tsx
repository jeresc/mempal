"use client";
import Image from "next/image";
import {motion} from "framer-motion";

import {fadeInAnimationOnce} from "../anim";

import flashcardSvg from "@/assets/svg/featuresSvg/cards-outline-svgrepo-com.svg";
import notesSvg from "@/assets/svg/featuresSvg/notes-notepad-svgrepo-com.svg";
import lampSvg from "@/assets/svg/featuresSvg/light-bulb-idea-svgrepo-com.svg";

function TrainAICard() {
  return (
    <motion.div
      className='md:w-5xl relative flex w-11/12 flex-col items-center justify-between rounded-lg bg-gradient-to-l from-purple-50 via-pink-50 p-8 shadow-lg md:flex-row'
      initial='initial'
      variants={fadeInAnimationOnce}
      viewport={{
        once: true,
      }}
      whileInView='animate'
    >
      <div className='md:w-2/4'>
        <Image alt='Flashcard Svg' className='mb-3' height={35} src={flashcardSvg} width={35} />
        <h1 className='text-xl font-bold text-black sm:text-2xl md:text-3xl'>
          Train the{" "}
          <span className='bg-gradient-to-l from-[#1945DE] to-[#112F99] bg-clip-text text-transparent'>
            AI
          </span>{" "}
          with exam data in <br />{" "}
          <span className='bg-gradient-to-r from-[#D96AFE] via-[#C370FF] to-[#8401F2] bg-clip-text text-transparent'>
            60 seconds
          </span>
        </h1>
        <p className='mt-4 text-gray-500'>
          Upload your pdf&apos;s and notes about a exam topic and click generate model.
        </p>
      </div>
      <div className='mt-16 h-48 w-full rounded-t-lg bg-white shadow-left-shadow md:absolute md:bottom-0 md:right-16 md:w-1/3' />
      <div className='relative mt-8 hidden  w-full md:mt-0 md:block md:w-1/3'>
        <div className='absolute -top-[90px] right-8 -translate-y-4 translate-x-7 rotate-45 transform text-xl text-[#E1E1E4]'>
          f a s t
        </div>
      </div>
    </motion.div>
  );
}

function InstantAnswer() {
  return (
    <motion.div
      className='md:w-5xl relative flex w-11/12 flex-col items-center justify-between rounded-lg bg-gradient-to-l from-green-50 to-white p-8 shadow-lg md:flex-row'
      initial='initial'
      variants={fadeInAnimationOnce}
      viewport={{
        once: true,
      }}
      whileInView='animate'
    >
      <div className='md:w-2/3'>
        <Image alt='Flashcard Svg' className='mb-3' height={35} src={lampSvg} width={35} />
        <h1 className='text-xl font-bold text-black sm:text-2xl md:text-3xl'>
          Instant answer validation
        </h1>
        <h1 className='bg-gradient-to-tr from-[#43E00C] via-[#D0FA2B] to-[#47E10D] bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl'>
          and follow-up process
        </h1>
        <p className='mb-8 mt-4 text-gray-500'>
          Get feedback from what you learned and save your knowledge progress.
        </p>
      </div>
      <div className='h-48 w-full bg-white shadow-bottom-shadow md:absolute md:right-0 md:w-1/3 md:rounded-l-lg' />
    </motion.div>
  );
}

function PersonalData() {
  return (
    <motion.div
      className='md:w-5xl relative flex w-11/12 flex-col items-center justify-between rounded-lg bg-gradient-to-l from-blue-100 to-white p-8 shadow-lg md:flex-row'
      initial='initial'
      variants={fadeInAnimationOnce}
      viewport={{
        once: true,
      }}
      whileInView='animate'
    >
      <div className='md:w-2/3'>
        <Image alt='Flashcard Svg' className='mb-3' height={35} src={notesSvg} width={35} />
        <h1 className='text-xl font-bold text-black sm:text-2xl md:text-3xl'>
          Private and secure,
        </h1>
        <h1 className='bg-gradient-to-l from-[#6B84FB] via-[#3038F6] to-[#4cb5ff] bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl'>
          we respect people data
        </h1>
        <p className='mb-8 mt-4 text-gray-500'>
          Get feedback from what you learned and save your knowledge progress.
        </p>
      </div>
      <div className='h-48 w-full bg-white shadow-bottom-shadow md:absolute md:right-0 md:w-1/3 md:rounded-l-lg' />
    </motion.div>
  );
}

function InstantReview() {
  return (
    <motion.div
      className='md:w-5xl relative flex w-11/12 flex-col items-center justify-between rounded-lg bg-gradient-to-l from-gray-300 to-white p-8 shadow-lg md:flex-row'
      initial='initial'
      variants={fadeInAnimationOnce}
      viewport={{
        once: true,
      }}
      whileInView='animate'
    >
      <div className='mb-8 w-full lg:mb-0 lg:w-1/2'>
        <h1 className='mb-4 text-xl font-bold sm:text-2xl md:text-3xl'>Instant review</h1>
        <p className='mb-6 mt-4 w-full text-lg md:w-11/12'>
          Get instant feedback on your answers, on what you got right, wrong, and what is missing.
        </p>
        <button className='text-md transform rounded-lg bg-black px-4 py-2 text-white transition-transform hover:scale-105 sm:text-lg'>
          Start quizzing
        </button>
      </div>
      <div className='w-full rounded-lg bg-gray-100 p-6 lg:w-1/2'>
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold' htmlFor='question'>
            Question
          </label>
          <p className='mb-2 text-sm'>Who is considered the father of psychology?</p>
          <input className='text-md w-full rounded-lg border p-2' id='question' type='text' />
        </div>
        <div className='flex items-center justify-between'>
          <button className='transform rounded-lg bg-black px-4 py-2 text-sm text-white transition-transform hover:scale-105'>
            Answer
          </button>
          <p className='cursor-pointer text-sm text-red-500'>Don&apos;t Know</p>
        </div>
      </div>
    </motion.div>
  );
}

export {TrainAICard, InstantAnswer, PersonalData, InstantReview};
