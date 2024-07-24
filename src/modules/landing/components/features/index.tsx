"use client"
import { fadeInAnimationOnce } from '@/utils/anim'
import features from '@/utils/features/features'
import { motion } from 'framer-motion'
import Image from 'next/image'

function Features() {

    return (
        <div className="flex flex-col gap-y-[56px] md:gap-y-5 py-10 md:py-5 items-center">
            <h3 className="text-2xl sm:text-4xl">Why I should use <span className='text-[#2764EB]'>Mempal</span>?</h3>
            {features.map((feature, index) => (
                <motion.div
                    className='flex flex-col md:flex-row gap-4 md:gap-8 gap-y-4 place-items-center md:justify-between bg-white p-4 rounded-lg bg-light-blue-gradient'
                    key={index}
                    variants={fadeInAnimationOnce}
                    initial='initial'
                    whileInView='animate'
                    viewport={{
                        once: true
                    }}
                >
                    <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                        <Image src={feature.svg} alt='Feature Svg' width={50} height={50} className='mb-3' />
                        <h4 className='text-xl mb-5'>{feature.title}</h4>
                        <p className='text-gray-700 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>{feature.description}</p>
                    </div>
                    <Image src={feature.image} alt='Feature Image' className='w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]' />
                </motion.div>
            ))}
        </div>
    )
}



export { Features }