"use client";

import {motion} from "framer-motion";
import Image, {StaticImageData} from "next/image";
import {useState} from "react";

import {transition, variants} from "@/utils/anim";
import {Button} from "@/components/ui/button";
import RightBlueArrow from "@/assets/svg/right-arrow-svgrepo-com.svg";
import LightGradient from "@/assets/images/light_blue_gradient.png";
import FlashcardEx from "@/assets/images/flashcardexample.png";
import NotesEx from "@/assets/images/notes.png";
import MCQsEx from "@/assets/images/mcqs.png";

type ImageKeyType = "flashcards" | "notes" | "mcqs";

function About() {
  const images: Record<ImageKeyType, StaticImageData> = {
    flashcards: FlashcardEx,
    notes: NotesEx,
    mcqs: MCQsEx,
  };

  const [selectedImage, setSelectedImage] = useState<ImageKeyType>("flashcards");

  const handleImageSwitch = (imageKey: ImageKeyType) => {
    setSelectedImage(imageKey);
  };

  return (
    <motion.section
      animate='animate'
      className='flex flex-col place-items-center gap-y-12 px-[20px] font-outfit lg:px-[280px]'
      initial='initial'
      transition={transition}
      variants={variants}
    >
      <div className='flex w-full pt-8'>
        <Button className='w-1/2 px-8 py-4'>Try for free</Button>
        <button className='flex w-1/2 items-center justify-center gap-x-2 text-[#000]'>
          View Pricing
          <span>
            <Image alt='Go to Pricing' src={RightBlueArrow} />
          </span>
        </button>
      </div>

      <div className='relative flex h-full min-h-[500px] w-[99vw] justify-center md:h-[600px] lg:h-[800px] xl:min-h-[1000px]'>
        {/* <Image src={LightGradient} alt='Light Gradient' className='min-h-[500px] md:h-[600px] lg:h-[800px] xl:min-h-[1000px] w-full object-cover blur-xl' /> */}

        <div className='absolute flex w-full flex-col items-center pt-8'>
          <div className='mb-4 flex flex-col justify-center gap-4 rounded-full from-gray-100  to-white px-4  md:w-1/2  md:flex-row md:gap-8  md:bg-gradient-to-t lg:w-1/3'>
            <button
              className={`my-2 rounded-full px-4 py-2 transition-all duration-300 ${selectedImage === "flashcards" ? "bg-blue-500 text-white" : "bg-transparent text-gray-500"} text-lg sm:text-lg md:text-base`}
              onClick={() => handleImageSwitch("flashcards")}
            >
              Flashcards
            </button>
            <button
              className={`my-2 rounded-full px-4 py-2 transition-all duration-300 ${selectedImage === "notes" ? "bg-blue-500 text-white" : "bg-transparent text-gray-500"} text-lg sm:text-lg md:text-base`}
              onClick={() => handleImageSwitch("notes")}
            >
              Notes
            </button>
            <button
              className={`my-2 rounded-full px-4 py-2 transition-all duration-300 ${selectedImage === "mcqs" ? "bg-blue-500 text-white" : "bg-transparent text-gray-500"} text-lg sm:text-lg md:text-base`}
              onClick={() => handleImageSwitch("mcqs")}
            >
              MCQs
            </button>
          </div>

          <div className='w-full px-5 py-5 sm:w-3/4 md:w-1/2 lg:w-2/3 lg:pt-8'>
            <Image alt='Flashcard Example' className='h-auto w-full' src={images[selectedImage]} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export {About};
