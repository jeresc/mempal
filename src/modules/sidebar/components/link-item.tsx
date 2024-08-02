"use client";

import Link from "next/link";

function LinkItem({text, href, icon}: {text: string; href: string; icon: React.ReactNode}) {
  return (
    <li className='flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:cursor-pointer hover:bg-foreground/[7%]'>
      <span className='h-4.5 w-4.5 rounded-sm'>{icon}</span>
      <Link href={href}>{text}</Link>
    </li>
  );
}

export {LinkItem};
