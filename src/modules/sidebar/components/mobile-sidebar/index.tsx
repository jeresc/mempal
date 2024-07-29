"use client";
import {motion} from "framer-motion";
import {ChevronsRight, ChevronsLeft, Menu} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@radix-ui/react-tooltip";

import {Sidebar} from "../sidebar";

import {transition, largeVariants, smallVariants} from "./anim";

import {useSidebarStore} from "@/lib/store/sidebar";
import {cn} from "@/lib/utils/cn";

function MobileSidebar() {
  const [isOpen, isLocked, setIsOpen, setIsLocked] = useSidebarStore((state) => [
    state.isOpen,
    state.isLocked,
    state.setIsOpen,
    state.setIsLocked,
  ]);
  const isSmall = useMediaQuery("(max-width: 860px)");
  const variants = isSmall ? smallVariants : largeVariants;

  return (
    <>
      <motion.div
        animate={isLocked ? "locked" : isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-0 z-10 flex h-full w-full max-w-[300px] flex-col gap-2 border border-border bg-[#181b20] px-1 text-foreground/80 sm:max-w-[248px]",
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
          <button
            className='absolute left-[calc(100%-40px)] top-0 m-1 rounded-md hover:bg-border'
            type='button'
            onClick={() => setIsLocked(false)}
          >
            <ChevronsLeft size={30} />
          </button>
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
                className='group/menu fixed left-0 top-0 z-10 m-1 rounded-md hover:bg-border'
                type='button'
                onClick={() => setIsLocked(true)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <ChevronsRight
                  className='absolute left-0 top-0 m-[3px] opacity-0 transition-all duration-300 group-hover/menu:opacity-100 group-hover/menu:duration-200'
                  size={28}
                />
                <Menu
                  className='m-[3px] opacity-100 transition-all duration-100 group-hover/menu:opacity-0 group-hover/menu:duration-200'
                  size={28}
                />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent
              className='z-90 rounded-md bg-border p-1 px-2'
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
