import React from "react";
import {useMediaQuery} from "usehooks-ts";
import Link from "next/link";
import {TooltipProvider} from "@radix-ui/react-tooltip";

import {useSidebarStore} from "~/sidebar/store/sidebar";
import {useCreateFlashcard} from "~/flashcard/store/create-flashcard";
import {DeckToolbarButton} from "~/flashcard/components/deck-toolbar-button";

import {Button} from "@/components/ui/button";

interface DeckToolbarProps {
  setShowAnswers: (showAnswers: boolean) => void;
  showAnswers: boolean;
  deckId: string;
}

function DeckToolbar({setShowAnswers, showAnswers, deckId}: DeckToolbarProps) {
  const [isLocked, lockedPercentage] = useSidebarStore((state) => [
    state.isLocked,
    state.lockedPercentage,
  ]);
  const isSmall = useMediaQuery("(max-width: 860px)");
  const openDrawer = useCreateFlashcard((state) => state.openDrawer);

  return (
    <div
      className='fixed bottom-4 left-0 right-0 z-20 flex w-full justify-center'
      style={isLocked && !isSmall ? {paddingLeft: `${lockedPercentage}%`} : {}}
    >
      <div className='mx-auto flex h-11 w-fit items-center justify-between gap-1 rounded-3xl border border-border bg-secondary-background p-1.5 shadow-xl duration-700'>
        <TooltipProvider delayDuration={0}>
          <div className='flex h-full items-center justify-center gap-1'>
            <DeckToolbarButton
              icon='circle-plus'
              iconSize={22}
              tooltipContent='Create flashcard'
              onClick={openDrawer}
            />

            <DeckToolbarButton
              icon='wand-sparkles'
              iconSize={22}
              tooltipContent='Generate flashcards'
              onClick={() => console.log("generate flashcard")}
            />

            <DeckToolbarButton
              toggable
              active={showAnswers}
              activeIcon='eye'
              iconSize={22}
              inactiveIcon='eye-off'
              tooltipContent={showAnswers ? "Hide answers" : "Show answers"}
              onClick={() => setShowAnswers(!showAnswers)}
            />

            <Button asChild className='ml-3 h-8 rounded-2xl px-2.5 leading-none'>
              <Link href={`/flashcards/${deckId}`}>Practice</Link>
            </Button>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}

export {DeckToolbar};
