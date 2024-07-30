"use client";
import {FiLinkedin, FiInstagram, FiFacebook, FiTwitter} from "react-icons/fi";
import {FaXTwitter} from "react-icons/fa6";
import {IoLogoTiktok} from "react-icons/io5";
import Image from "next/image";
import {motion} from "framer-motion";
import Link from "next/link";

import MempalIcon from "../../../public/android-chrome-192x192.png";

import {fadeInAnimationOnce} from "@/utils/anim";
import {Logo} from "@/assets/logo";

function Footer() {
  return (
    <footer className='mt-8 h-fit px-2 py-20 opacity-70'>
      <motion.div
        className='container mx-auto px-4'
        initial='initial'
        variants={fadeInAnimationOnce}
        viewport={{
          once: true,
        }}
        whileInView='animate'
      >
        <div className='flex flex-col justify-between md:flex-row'>
          <div className='mb-8 md:mb-0'>
            <div className='mb-4 flex w-1/4 items-center md:w-full'>
              <Logo />
            </div>
            <div className='mb-4 flex space-x-4'>
              <a
                className='cursor-pointer text-gray-500 hover:text-gray-700'
                href='https://www.facebook.com/'
                target='blank_'
              >
                <FiFacebook size={25} />
              </a>
              <a
                className='cursor-pointer text-gray-500 hover:text-gray-700'
                href='https://www.instagram.com/mempalhq/'
                target='blank_'
              >
                <FiInstagram size={25} />
              </a>
              <a
                className='cursor-pointer text-gray-500 hover:text-gray-700'
                href='https://www.linkedin.com/in/mempalhq/'
                target='blank_'
              >
                <FiLinkedin size={25} />
              </a>
              <a
                className='cursor-pointer text-gray-500 hover:text-gray-700'
                href='https://x.com/mempalhq'
                target='blank_'
              >
                <FaXTwitter size={25} />
              </a>
              <a
                className='cursor-pointer text-gray-500 hover:text-gray-700'
                href='https://www.tiktok.com/@mempalhq'
                target='blank_'
              >
                <IoLogoTiktok size={25} />
              </a>
            </div>
            <div className='mb-4'>
              <p className='text-gray-500'>Originated at</p>
              <Image
                alt='Mempal Icon'
                className='mb-3 mr-2'
                height={24}
                src={MempalIcon}
                width={24}
              />
            </div>
            <div>
              <p className='text-gray-500'>Backed by</p>
              <Image
                alt='Mempal Icon'
                className='mb-3 mr-2'
                height={24}
                src={MempalIcon}
                width={24}
              />
            </div>
          </div>
          <div className='flex flex-col space-y-8 md:flex-row md:space-x-16 md:space-y-0'>
            <div>
              <h3 className='mb-4 font-semibold text-gray-700'>Product</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    className='cursor-pointer text-gray-500 hover:text-gray-700'
                    href='/pricing'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <p className='cursor-pointer text-gray-500 hover:text-gray-700'>
                    Download (In coming)
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-semibold text-gray-700'>Company</h3>
              <ul className='space-y-2'>
                <li>
                  <p className='cursor-pointer text-gray-500 hover:text-gray-700'>About us</p>
                </li>
                <li>
                  <Link className='cursor-pointer text-gray-500 hover:text-gray-700' href='/terms'>
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 font-semibold text-gray-700'>Resources</h3>
              <ul className='space-y-2'>
                <li>
                  <p className='cursor-pointer text-gray-500 hover:text-gray-700'>
                    Tutorials (In coming)
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-8 text-center text-gray-500'>© {new Date().getFullYear()} Mempal</div>
      </motion.div>
    </footer>
  );
}

export {Footer};
