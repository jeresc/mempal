import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

import {cn} from "@/lib/utils";

export const Toolbar = ToolbarPrimitive.Root;

export const ToolbarToggleGroup = ToolbarPrimitive.ToggleGroup;

type ToolbarButtonElement = React.ComponentRef<typeof ToolbarPrimitive.Button>;
type ToolbarButtonProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>;

export const ToolbarButton = React.forwardRef<ToolbarButtonElement, ToolbarButtonProps>(
  ({className, ...props}, forwardedRef) => {
    return (
      <ToolbarPrimitive.Button
        {...props}
        ref={forwardedRef}
        className={cn(
          "text-mauve11 hover:bg-violet3 hover:text-violet11 ml-0.5 inline-flex h-6 items-center gap-1 rounded px-1 text-sm first:ml-0",
          "focus:ring-violet7 focus:ring-2",
          className,
        )}
      />
    );
  },
);
ToolbarButton.displayName = "ToolbarButton";

type ToolbarLinkElement = React.ElementRef<typeof ToolbarPrimitive.Link>;
type ToolbarLinkProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link>;

export const ToolbarLink = React.forwardRef<ToolbarLinkElement, ToolbarLinkProps>(
  ({className, ...props}, forwardedRef) => {
    return (
      <ToolbarPrimitive.Link
        {...props}
        ref={forwardedRef}
        className={cn(
          "text-mauve11 hover:bg-violet3 hover:text-violet11 ml-0.5 inline-flex h-6 items-center gap-1 rounded px-1 text-sm first:ml-0",
          "focus:ring-violet7 focus:ring-2",
          className,
        )}
      />
    );
  },
);
ToolbarLink.displayName = "ToolbarLink";

type ToolbarToggleItemElement = React.ElementRef<typeof ToolbarPrimitive.ToggleItem>;
type ToolbarToggleItemProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>;

export const ToolbarToggleItem = React.forwardRef<ToolbarToggleItemElement, ToolbarToggleItemProps>(
  ({className, children, ...props}, forwardedRef) => {
    return (
      <ToolbarPrimitive.ToggleItem asChild {...props} ref={forwardedRef}>
        <button
          className={cn(
            "text-mauve11 hover:bg-violet3 hover:text-violet11 inline-flex h-7 items-center justify-center gap-2 rounded px-1 text-sm leading-none outline-none",
            "focus:ring-violet7 focus:ring-2",
            "ml-0.5 h-6 first:ml-0",
            "data-[state=on]:bg-violet5 data-[state=on]:text-violet11",
            className,
          )}
          type='button'
        >
          {children}
        </button>
      </ToolbarPrimitive.ToggleItem>
    );
  },
);
ToolbarToggleItem.displayName = "ToolbarToggleItem";

type ToolbarSeparatorProps = React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>;

export function ToolbarSeparator({className, ...props}: ToolbarSeparatorProps) {
  return (
    <ToolbarPrimitive.Separator
      {...props}
      className={cn("bg-mauve6 mx-2.5 h-full w-px", className)}
    />
  );
}
