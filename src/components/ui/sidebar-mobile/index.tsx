"use client";
import {motion} from "framer-motion";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from "react-icons/md";
import {useMediaQuery} from "usehooks-ts";

import {Sidebar} from "../sidebar";

import {transition, largeVariants, smallVariants} from "./anim";

import {useSidebarStore} from "@/lib/store/sidebar";
import {cn} from "@/lib/utils/cn";

function SidebarMobile() {
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
        initial='open'
        transition={transition}
        variants={variants}
        onMouseEnter={() => !isLocked && setIsOpen(true)}
        onMouseLeave={() => !isLocked && setIsOpen(false)}
      >
        <Sidebar />
        {Boolean(isLocked && isSmall) && (
          <button
            className='absolute left-[calc(100%-40px)] top-0 m-1'
            type='button'
            onClick={() => setIsLocked(false)}
          >
            <MdKeyboardDoubleArrowLeft size={36} />
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
        <motion.button
          className='fixed left-0 top-0 z-10 m-1'
          type='button'
          onClick={() => setIsLocked(true)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <MdKeyboardDoubleArrowRight size={36} />
        </motion.button>
      )}
    </>
  );
}

export {SidebarMobile};
