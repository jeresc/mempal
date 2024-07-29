"use client"
import { Logo } from '@/assets/logo';
import MempalIcon from '../../../public/android-chrome-192x192.png'
import { FiLinkedin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import Image from 'next/image';
import { motion } from 'framer-motion'
import { fadeInAnimationOnce } from '@/utils/anim';
import Link from 'next/link';


function Footer() {
    return (
        <footer className='h-fit px-2 py-20 mt-8 opacity-70'>
            <motion.div
                initial='initial'
                variants={fadeInAnimationOnce}
                viewport={{
                    once: true,
                }}
                whileInView='animate'
                className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center mb-4 w-1/4 md:w-full">
                            <Logo />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://www.facebook.com/" target="blank_" className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <FiFacebook size={25} />
                            </a>
                            <a href="https://www.instagram.com/mempalhq/" target="blank_" className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <FiInstagram size={25} />
                            </a>
                            <a href="https://www.linkedin.com/in/mempalhq/" target="blank_" className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <FiLinkedin size={25} />
                            </a>
                            <a href="https://x.com/mempalhq" target="blank_" className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <FaXTwitter size={25} />
                            </a>
                            <a href="https://www.tiktok.com/@mempalhq" target="blank_" className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <IoLogoTiktok size={25} />
                            </a>
                        </div >
                        <div className="mb-4">
                            <p className="text-gray-500">Originated at</p>
                            <Image
                                alt="Mempal Icon"
                                className="mr-2 mb-3"
                                height={24}
                                src={MempalIcon}
                                width={24}
                            />
                        </div>
                        <div>
                            <p className="text-gray-500">Backed by</p>
                            <Image
                                alt="Mempal Icon"
                                className="mr-2 mb-3"
                                height={24}
                                src={MempalIcon}
                                width={24}
                            />
                        </div>
                    </div >
                    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={'/pricing'} className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Download (In coming)
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        About us
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Terms & Privacy
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Tutorials (In coming)
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
                <div className="mt-8 text-center text-gray-500">
                    © {new Date().getFullYear()} Mempal
                </div>
            </motion.div>
        </footer >
    );
};


export { Footer }