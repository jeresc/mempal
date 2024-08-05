import {XIcon} from "lucide-react";
import Link from "next/link";

import {Skeleton} from "@/components/ui/skeleton";

function ReviewQueueSkeleton() {
  return (
    <section className='mx-auto flex h-full w-full max-w-screen-sml flex-col bg-foreground/5 p-4 shadow-sm sm:max-h-[600px] sm:rounded-[1.75rem]'>
      <Link
        className='absolute right-6 top-6 z-10 grid aspect-square h-[60px] w-[60px] place-content-center rounded-full bg-foreground/10 p-2 text-muted-foreground transition-all hover:bg-foreground/5'
        href='/flashcards'
        type='button'
      >
        <XIcon size={48} />
      </Link>

      <article className='flex h-full flex-col justify-between gap-1'>
        <header className='flex items-center justify-between gap-2'>
          <button className='flex items-center justify-center' type='button'>
            <Skeleton className='h-12 w-12' />
          </button>

          <Skeleton className='h-10 w-24' />
          <div className='w-[48px]' />
        </header>
        <div className='flex flex-col items-center justify-center gap-1'>
          <Skeleton className='h-[32px] w-[80%] text-pretty text-center text-2xl sm:text-3xl' />
          <Skeleton className='h-[32px] w-[70%] text-pretty text-center text-2xl sm:text-3xl' />
        </div>

        <Skeleton className='mt-[30px] h-12 w-full rounded-xl text-xl' />
      </article>
    </section>
  );
}

export {ReviewQueueSkeleton};
