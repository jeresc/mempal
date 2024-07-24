"use client"

import { transition, variants } from '@/utils/anim'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import RightBlueArrow from "@/assets/svg/right-arrow-svgrepo-com.svg"
import LightGradient from '@/assets/images/light_blue_gradient.png'
import FlashcardEx from '@/assets/images/flashcardexample.png'
import NotesEx from '@/assets/images/notes.png'
import MCQsEx from '@/assets/images/mcqs.png'
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';


type ImageKeyType = 'flashcards' | 'notes' | 'mcqs'

function About() {

    const images: Record<ImageKeyType, StaticImageData> = {
        flashcards: FlashcardEx,
        notes: NotesEx,
        mcqs: MCQsEx
    }

    const [selectedImage, setSelectedImage] = useState<ImageKeyType>('flashcards')


    const handleImageSwitch = (imageKey: ImageKeyType) => {
        setSelectedImage(imageKey)
    }

    return (
        <motion.section
            animate='animate'
            className='flex flex-col place-items-center gap-y-12 font-outfit px-[20px] lg:px-[280px]'
            initial='initial'
            transition={transition}
            variants={variants}
        >
            <div className='flex w-full pt-8'>
                <Button className='w-1/2 py-4 px-8'>Try for free</Button>
                <button className='w-1/2 text-[#000] flex items-center justify-center gap-x-2'>
                    View Pricing
                    <span>
                        <Image src={RightBlueArrow} alt='Go to Pricing' />
                    </span>
                </button>
            </div>

            <div className='relative w-[99vw] flex h-full justify-center '>
                <Image src={LightGradient} alt='Light Gradient' className='min-h-[500px] md:h-[600px] lg:h-[800px] xl:min-h-[1000px] w-full object-cover blur-xl' />

                <div className='absolute flex w-full flex-col items-center pt-8'>

                    <div className='flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:bg-white  rounded-full  md:w-1/2 lg:w-1/3  justify-center px-4'>
                        <button
                            onClick={() => handleImageSwitch('flashcards')}
                            className={`py-2 my-2 px-4 rounded-full transition-all duration-300 ${selectedImage === 'flashcards' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-500'} md:text-base sm:text-lg text-lg`}
                        >
                            Flashcards
                        </button>
                        <button
                            onClick={() => handleImageSwitch('notes')}
                            className={`py-2 my-2 px-4 rounded-full transition-all duration-300 ${selectedImage === 'notes' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-500'} md:text-base sm:text-lg text-lg`}
                        >
                            Notes
                        </button>
                        <button
                            onClick={() => handleImageSwitch('mcqs')}
                            className={`py-2 my-2 px-4 rounded-full transition-all duration-300 ${selectedImage === 'mcqs' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-500'} md:text-base sm:text-lg text-lg`}
                        >
                            MCQs
                        </button>
                    </div>

                    <div className='w-full sm:w-3/4 md:w-1/2 lg:w-2/3 px-5 py-5 lg:pt-8'>
                        <Image src={images[selectedImage]} alt='Flashcard Example' className='w-full h-auto' />
                    </div>
                </div>
            </div>
        </motion.section>
    )
}


export { About }