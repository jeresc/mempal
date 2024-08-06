"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import {Badge} from "./badge";

import {cn} from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    selectedValues: [number, number];
  }
>(({className, selectedValues, ...props}, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center pt-8", className)}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'>
      <SliderPrimitive.Range className='absolute h-full bg-primary' />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className='relative block h-4 w-4 rounded-full border border-primary/50 bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
      {Boolean(selectedValues[0]) && (
        <Badge
          className={cn(
            "absolute bottom-5 right-1/2 translate-x-1/2 rounded-sm bg-primary px-1.5 py-1 font-semibold tabular-nums leading-none text-foreground transition-all duration-200",
            selectedValues[1] - selectedValues[0] < 13 &&
              props.max! > 100 &&
              selectedValues[0] != selectedValues[1] &&
              "right-5",
          )}
        >
          {selectedValues[0]}
        </Badge>
      )}
    </SliderPrimitive.Thumb>

    <SliderPrimitive.Thumb className='relative block h-4 w-4 rounded-full border border-primary/50 bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
      {Boolean(selectedValues[1]) && (
        <Badge
          className={cn(
            "absolute bottom-5 left-1/2 -translate-x-1/2 rounded-sm bg-primary px-1.5 py-1 font-semibold tabular-nums leading-none text-foreground transition-all duration-200",
            selectedValues[1] - selectedValues[0] < 13 &&
              props.max! > 100 &&
              selectedValues[0] != selectedValues[1] &&
              "left-5",
          )}
        >
          {selectedValues[1]}
        </Badge>
      )}
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};
