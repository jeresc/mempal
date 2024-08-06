"use client";
import * as Selection from "selection-popover";
import {Copy, MessageSquareQuote} from "lucide-react";

import {cn} from "@/lib/utils";

function SelectionPopover({
  children,
  container,
}: {
  children: React.ReactNode;
  container?: HTMLElement;
}) {
  return (
    <Selection.Root>
      <Selection.Portal container={container}>
        <Selection.Content
          className={cn(
            "z-[999] flex w-full min-w-max gap-1 rounded-md bg-foreground p-1 text-slate-600/80 shadow-lg shadow-[#0005]",
            "data-[state=closed]:animate-slide-up-and-fade data-[state=open]:animate-slide-down-and-fade",
          )}
        >
          <button
            className='h-full w-full rounded-sm px-1.5 py-1 text-base hover:bg-primary/10'
            type='button'
          >
            <Copy size={18} />
          </button>
          <button
            className='h-full w-full rounded-sm px-1.5 py-1 text-base hover:bg-primary/10'
            type='button'
          >
            <MessageSquareQuote size={18} />
          </button>
          <Selection.Arrow className='fill-foreground' />
        </Selection.Content>
      </Selection.Portal>
      <Selection.Trigger>{children}</Selection.Trigger>
    </Selection.Root>
  );
}

export {SelectionPopover};
