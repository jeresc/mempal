import {signIn} from "next-auth/react";

import {Button} from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

interface SocialButtonProps {
  provider: "google" | "github";
  children: React.ReactNode;
}

function SocialButton({provider, children}: SocialButtonProps) {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Button
      className='flex h-11 w-full items-center justify-center gap-x-2 text-[15px] leading-none hover:bg-primary/10'
      size='lg'
      variant='outline'
      onClick={() => onClick(provider)}
    >
      {children}
    </Button>
  );
}

export {SocialButton};
