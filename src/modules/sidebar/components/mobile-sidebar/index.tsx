"use client";
import {motion} from "framer-motion";
import {ChevronsRight, ChevronsLeft, Menu} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@radix-ui/react-tooltip";

import {useSidebarStore} from "~/sidebar/store/sidebar";

import {Sidebar} from "../sidebar";

import {transition, largeVariants, smallVariants} from "./anim";

import {cn} from "@/lib/utils/cn";
import {useIsSmall} from "@/lib/hooks/use-is-small";

function MobileSidebar() {
  const [isOpen, isLocked, setIsOpen, setIsLocked] = useSidebarStore((state) => [
    state.isOpen,
    state.isLocked,
    state.setIsOpen,
    state.setIsLocked,
  ]);
  const {isSmall} = useIsSmall();
  const variants = isSmall ? smallVariants : largeVariants;

  return (
    <>
      <motion.div
        animate={isLocked ? "locked" : isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-0 z-10 flex h-full w-full max-w-[300px] flex-col gap-2 border border-border bg-secondary-background px-1 text-foreground/80 sm:max-w-[248px]",
          isLocked && "border-r",
        )}
        initial={false}
        transition={transition}
        variants={variants}
        onMouseEnter={() => !isLocked && setIsOpen(true)}
        onMouseLeave={() => !isLocked && setIsOpen(false)}
      >
        <Sidebar key='mobile-sidebar' />
        {Boolean(isLocked && isSmall) && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className='absolute left-[calc(100%-44px)] top-3 m-1 rounded-md hover:bg-border'
                  type='button'
                  onClick={() => setIsLocked(false)}
                >
                  <ChevronsLeft size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                className='rounded-md bg-secondary-background p-1 px-2'
                side='right'
                sideOffset={4}
              >
                <p className='text-sm text-foreground/80'>Unlock sidebar open</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!isLocked && (
          <div
            className={cn(
              "absolute -right-[22px] -z-10 w-[calc(100%+22px)]",
              isSmall ? "-top-[7.5%] h-[115%]" : "-top-[5%] h-[110%]",
            )}
          />
        )}
      </motion.div>

      {!isLocked && (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className='group/menu fixed left-0 top-0.5 z-10 m-1 rounded-md hover:bg-border'
                type='button'
                onClick={() => setIsLocked(true)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <ChevronsRight
                  className='absolute left-0 top-0 m-[3px] opacity-0 transition-all duration-0 group-hover/menu:opacity-100'
                  size={26}
                />
                <Menu
                  className='m-[3px] h-[26px] w-[26px] opacity-100 transition-all duration-0 group-hover/menu:opacity-0'
                  size={26}
                />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              className='z-10 rounded-md border border-border bg-secondary-background p-1 px-2'
              side='right'
              sideOffset={6}
            >
              <p className='text-sm text-foreground/80'>Lock sidebar open</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export {MobileSidebar};
