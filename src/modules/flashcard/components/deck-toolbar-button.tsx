"use client";

import dynamicIconImports from "lucide-react/dynamicIconImports";

import {Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import {Icon} from "@/components/ui/icon";
import {cn} from "@/lib/utils/cn";

interface DeckToolbarButtonProps {
  onClick: () => void;
  tooltipContent: string;
  activeIcon?: keyof typeof dynamicIconImports;
  inactiveIcon?: keyof typeof dynamicIconImports;
  iconSize?: number;
  active?: boolean;
  toggable?: boolean;
  icon?: keyof typeof dynamicIconImports;
  strokeWidth?: number;
}

function DeckToolbarButton({
  onClick,
  tooltipContent,
  activeIcon,
  inactiveIcon,
  active,
  iconSize = 16,
  strokeWidth = 1.7,
  toggable = false,
  icon,
}: DeckToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className='relative flex h-8 items-center rounded-2xl px-2 text-slate-500 hover:cursor-pointer hover:bg-primary/20 dark:text-slate-400 dark:hover:bg-primary/30'
          type='button'
          onClick={onClick}
        >
          {toggable ? (
            <>
              <Icon
                className={cn("opacity-100", !active && "opacity-0")}
                name={activeIcon ?? "check"}
                size={iconSize}
                strokeWidth={strokeWidth}
              />
              <Icon
                className={cn(
                  "absolute left-1/2 top-[5px] -translate-x-1/2 opacity-100",
                  active && "opacity-0",
                )}
                name={inactiveIcon ?? "minus"}
                size={iconSize}
                strokeWidth={strokeWidth}
              />
            </>
          ) : (
            <Icon name={icon ?? "check"} size={iconSize} strokeWidth={strokeWidth} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent
        align='center'
        className='rounded-xl border border-border bg-secondary-background px-2 py-1 text-sm text-foreground/70'
        side='top'
        sideOffset={10}
      >
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export {DeckToolbarButton};
