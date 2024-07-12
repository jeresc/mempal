"use client";

import {Header} from "~/auth/components/header";
import {Social} from "~/auth/components/social";
import {BackButton} from "~/auth/components/back-button";

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  headerTitle?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  headerTitle = "",
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className='w-[430px]'>
      <CardHeader className='pb-6'>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial ? (
        <CardFooter className='flex-col '>
          <div className='mx-auto mb-4 flex w-2/3 items-center justify-center'>
            <hr className='w-full' />
            <p className='text-brand-blue mx-3 mb-0 text-center'>O</p>
            <hr className='w-full' />
          </div>

          <Social />
        </CardFooter>
      ) : null}

      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}
