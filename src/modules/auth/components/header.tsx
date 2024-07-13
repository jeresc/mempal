import {Poppins} from "next/font/google";
import {Shield} from "lucide-react";

import {cn} from "@/lib/utils";

const poppins = Poppins({subsets: ["latin"], weight: ["600"]});

interface HeaderProps {
  label: string;
}

export function Header({label}: HeaderProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1
        className={cn(
          "flex items-center justify-center gap-1 text-4xl font-semibold drop-shadow-sm",
          poppins.className,
        )}
      >
        <Shield fill='currentColor' size={32} />
        Auth
      </h1>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </div>
  );
}
