"use client"
import { Footer } from '@/components/ui/footer'
import { Header } from '@/components/ui/header'
import { fadeInHorizontalOnce } from '@/utils/anim'
import { motion } from 'framer-motion'
import { Pricing } from '~/landing/components/pricing'

export default function PricingPage() {
    return (
        <div className="flex h-full w-full flex-col items-center">
            <Header />
            <motion.div
                className='container'
                initial='initial'
                variants={fadeInHorizontalOnce}
                viewport={{
                    once: true,
                }}
                whileInView='animate'
            >
                <Pricing />
            </motion.div>
            <div className='w-full max-w-7xl px-4 py-12 sm:px-8'>
                <Footer />
            </div>
        </div>
    )
}


