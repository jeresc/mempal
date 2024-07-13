import Link from "next/link";

import {Button} from "@/components/ui/button";

function Nav() {
  return (
    <nav className='h-fit'>
      <Button asChild className='text-base' size='sm'>
        <Link href='/login'>Log In</Link>
      </Button>
    </nav>
  );
}

export {Nav};
