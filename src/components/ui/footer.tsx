"use client"
import { Logo } from '@/assets/logo';
import MempalIcon from '../../../public/android-chrome-192x192.png'
import facebook from '@/assets/svg/footerSvg/facebook-svgrepo-com.svg'
import instagram from '@/assets/svg/footerSvg/instagram-svgrepo-com.svg'
import twitter from '@/assets/svg/footerSvg/x-twitter-brands-solid.svg'
import linkedIn from '@/assets/svg/footerSvg/linkedin-svgrepo-com.svg'
import Image from 'next/image';

function Footer() {
    return (
        <footer className='h-fit px-2 py-20 mt-8 opacity-70'>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <div className="flex items-center mb-4 w-1/4 md:w-full">
                            <Logo />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <Image src={facebook} alt='Facebook' width={25} height={25} />
                            </p>
                            <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                            <Image src={instagram} alt='Instagram' width={25} height={25} />
                            </p>
                            <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                <Image src={linkedIn} alt='LinkedIn' width={25} height={25} />
                            </p>
                            <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                            <Image src={twitter} alt='X/Twitter' width={21} height={21} />
                            </p>
                        </div>
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
                    </div>
                    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Pricing
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Download (In coming)
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Resources
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
                                        Media Kit
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Terms
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Privacy
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Tutorials
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Help Center
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        What&apos;s New
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-500 cursor-pointer hover:text-gray-700">
                                        Notion vs Mempal
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500">
                    © {new Date().getFullYear()} Mempal
                </div>
            </div>
        </footer>
    );
};


export { Footer }