import Link from "next/link";

import {Button} from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
  trigger: string;
}

export function BackButton({href, label, trigger}: BackButtonProps) {
  return (
    <p className='w-full text-center text-sm text-foreground/60'>
      {label}
      <Button asChild className='pl-[6px] pr-0 text-sm ' size='sm' variant='link'>
        <Link href={href}>{trigger}</Link>
      </Button>
    </p>
  );
}
