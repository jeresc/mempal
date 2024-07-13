import Link from "next/link";

import {Logo} from "@/assets/logo";
import {Nav} from "@/components/ui/nav";

function Header() {
  return (
    <header className='flex items-center justify-between text-xl font-bold leading-[4rem] backdrop-blur-md'>
      <Link href='/'>
        <Logo className='h-8 text-foreground' />
      </Link>
      <Nav />
    </header>
  );
}

export {Header};
