"use client";

import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";

import {SocialButton} from "~/auth/components/social-button";

export function Social() {
  return (
    <div className='flex w-full flex-col items-center gap-y-1'>
      <SocialButton provider='google'>
        <FcGoogle className='h-6 w-6' /> <p>Continuar con Google</p>
      </SocialButton>
      <SocialButton provider='facebook'>
        <FaFacebook className='h-6 w-6 text-[#0165e1]' /> <p>Continuar con Facebook</p>
      </SocialButton>
    </div>
  );
}
