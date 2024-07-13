"use client";

import {FaGithub, FaGoogle} from "react-icons/fa";

import {SocialButton} from "./social-button";

export function Social() {
  return (
    <div className='flex w-full flex-col items-center gap-y-[6px]'>
      <SocialButton provider='google'>
        <FaGoogle className='h-5 w-5' /> <p>Continue with Google</p>
      </SocialButton>
      <SocialButton provider='github'>
        <FaGithub className='h-5 w-5' /> <p>Continue with GitHub</p>
      </SocialButton>
    </div>
  );
}
