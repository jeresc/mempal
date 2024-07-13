import {Poppins} from "next/font/google";

import {cn} from "@/lib/utils";

const poppins = Poppins({subsets: ["latin"], weight: ["600", "700"]});

interface HeaderProps {
  label: string;
  title: string;
}

export function Header({label, title}: HeaderProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h2
        className={cn(
          "mb-2 flex items-center justify-center gap-1 text-3xl font-[700] drop-shadow-sm",
        )}
      >
        {title}
      </h2>
      {/* <p className='text-sm text-muted-foreground'>{label}</p> */}
    </div>
  );
}
