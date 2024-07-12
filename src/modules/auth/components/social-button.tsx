import {signIn} from "next-auth/react";

import {Button} from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

interface SocialButtonProps {
  provider: "google" | "facebook";
  children: React.ReactNode;
}

function SocialButton({provider, children}: SocialButtonProps) {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      className='flex w-full items-center justify-center gap-x-2 border-blue-300 hover:bg-sky-100'
      size='lg'
      variant='outline'
      onClick={() => onClick(provider)}
    >
      {children}
    </Button>
  );
}

export {SocialButton};
