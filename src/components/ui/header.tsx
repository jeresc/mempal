import Link from "next/link";

import {Logo} from "@/assets/logo";
import {Nav} from "@/components/ui/nav";

function Header() {
  return (
    <header className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 text-xl font-bold leading-[4rem] backdrop-blur-md sm:px-8'>
      <Link href='/'>
        <Logo className='h-8 text-foreground' />
      </Link>
      <Nav />
    </header>
  );
}

export {Header};
