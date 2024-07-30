"use client";

import {Header} from "~/auth/components/header";
import {Social} from "~/auth/components/social";
import {BackButton} from "~/auth/components/back-button";

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  backButtonTrigger: string;
  showSocial?: boolean;
  terms?: string; 
}

export function CardWrapper({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  backButtonTrigger,
  showSocial,
  terms
}: CardWrapperProps) {
  return (
    <Card className='relative w-full border-none shadow-none sm:w-[430px]'>
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>
        {showSocial ? (
          <>
            <Social />
            <div className='mb-2 mt-5 flex items-center justify-center gap-2 '>
              <div className='w-full border-t border-t-foreground/10' />
              <p className='text-sm tracking-wide text-foreground/60'>OR</p>
              <div className='w-full border-t border-t-foreground/10' />
            </div>
          </>
        ) : null}
        {children}
      </CardContent>

      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} trigger={backButtonTrigger} />
      </CardFooter>

      {terms && (
          <p className='text-sm text-center text-foreground/60'>
            By signing up, you agree to our{' '}
            <Link href={terms} className='text-[#2563EB] hover:underline'>
              Privacy Policy
            </Link>.
          </p>
        )}
    </Card>
  );
}
