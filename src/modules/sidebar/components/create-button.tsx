"use client";
import {CirclePlus} from "lucide-react";
import {useRouter} from "next/navigation";

function CreateButton() {
  const router = useRouter();

  return (
    <button
      className='mt-0.5 flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-bold text-primary hover:cursor-pointer hover:bg-primary/10 dark:text-foreground dark:hover:bg-primary/80'
      type='button'
      onClick={() => router.push("/new-document")}
    >
      <span className='h-4.5 w-4.5 rounded-sm p-0.5'>
        <CirclePlus size={16} />
      </span>
      Create document
    </button>
  );
}

export {CreateButton};
