import Link from "next/link";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface BackButtonProps {
  href: string;
  label: string;
  trigger: string;
}

export function BackButton({href, label, trigger}: BackButtonProps) {
  return (
    <p className='w-full text-center text-sm text-foreground/60'>
      {label}
      <Button
        asChild
        className={cn("pl-0 text-sm", trigger.length > 0 && "pl-[6px] pr-0")}
        size='sm'
        variant='link'
      >
        <Link href={href}>{trigger}</Link>
      </Button>
    </p>
  );
}
