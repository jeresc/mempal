import Link from "next/link";

import {Button} from "@/components/ui/button";

function Nav() {
  return (
    <nav className='h-fit space-x-4'>
      {/*
      <Button
        asChild
        className='bg-transparent text-base text-current hover:bg-transparent hover:text-gray-600'
        size='sm'
      >
        <Link className='text-gray-400' href='/pricing'>
          Pricing
        </Link>
      </Button>
        */}
      <Button asChild className='text-base' size='sm'>
        <Link href='/login'>Log In</Link>
      </Button>
    </nav>
  );
}

export {Nav};
