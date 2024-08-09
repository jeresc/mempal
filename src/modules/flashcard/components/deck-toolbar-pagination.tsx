"use client";

import React from "react";

import {usePaginatedFlashcardsStore} from "../store/paginated-flashcards";

import {Icon} from "@/components/ui/icon";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

function DeckToolbarPagination() {
  const [prevousPage, nextPage, page] = usePaginatedFlashcardsStore((state) => [
    state.previousPage,
    state.nextPage,
    state.page,
  ]);

  return (
    <div className='flex h-[32px] items-center gap-1 text-slate-500 duration-700 dark:text-slate-400'>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='relative flex h-8 items-center rounded-2xl px-1.5 text-slate-500 hover:cursor-pointer hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-primary/30'
            disabled={page <= 1}
            type='button'
            onClick={page > 1 ? prevousPage : undefined}
          >
            <Icon name='chevron-left' size={22} strokeWidth={1.7} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align='center'
          className='rounded-xl border border-border bg-secondary-background px-2 py-1 text-sm text-foreground/70'
          side='top'
          sideOffset={10}
        >
          <p>Previous page</p>
        </TooltipContent>
      </Tooltip>

      <p className='flex h-8 min-w-8 items-center justify-center rounded-2xl border border-border px-2 text-center tabular-nums'>
        {page}
      </p>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className='relative flex h-8 items-center rounded-2xl px-1.5 text-slate-500 hover:cursor-pointer hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-primary/30
          '
            type='button'
            onClick={nextPage}
          >
            <Icon name='chevron-right' size={22} strokeWidth={1.7} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align='center'
          className='rounded-xl border border-border bg-secondary-background px-2 py-1 text-sm text-foreground/70'
          side='top'
          sideOffset={10}
        >
          <p>Next page</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export {DeckToolbarPagination};
