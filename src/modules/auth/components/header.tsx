// import {Poppins} from "next/font/google";

import {cn} from "@/lib/utils";

// const poppins = Poppins({subsets: ["latin"], weight: ["600"]});

interface HeaderProps {
  title: string;
  label?: string;
}

export function Header({title, label = ""}: HeaderProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
      <h1 className={cn("text-brand-blue gap-1 text-2xl font-semibold drop-shadow-sm")}>{title}</h1>
      {label.length > 0 && <p className='text-sm text-muted-foreground'>{label}</p>}
    </div>
  );
}
