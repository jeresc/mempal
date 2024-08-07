"use client";
import {useDebounceValue} from "usehooks-ts";
import {useEffect} from "react";
import {ChevronsLeft} from "lucide-react";
import {Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "@radix-ui/react-tooltip";

import {MobileSidebar} from "~/sidebar";
import {Sidebar} from "~/sidebar";
import {useSidebarStore} from "~/sidebar/store/sidebar";
import {SubscriptionProvider} from "~/subscription/provider/subscription-provider";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {cn} from "@/lib/utils/cn";

const asciiArtArray = [
  "                _",
  "                \\`*-.",
  "                 )  _`-.",
  "                .  : `. .",
  "                : _   '  \\",
  "                ; *` _.   `*-._",
  "                `-.-'          `-.",
  "                  ;       `       `.",
  "                  :.       .        \\",
  "                  . \\  .   :   .-'   .",
  "                  '  `+.;  ;  '      :",
  "                  :  '  |    ;       ;-.",
  "                  ; '   : :`-:     _.`* ;",
  "      [aletin] .*' /  .*' ; .*`- +'  `*'",
  "               `*-*   `*-*  `*-*'",
];

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
  const [isLocked, setIsLocked, setIsOpen, setLockedPercentage] = useSidebarStore((state) => [
    state.isLocked,
    state.setIsLocked,
    state.setIsOpen,
    state.setLockedPercentage,
  ]);

  const [debouncedIsLocked, setDebouncedIsLocked] = useDebounceValue(isLocked, 400);

  useEffect(() => {
    /* eslint-disable no-console */
    console.info(asciiArtArray.join("\n"));
  }, []);

  useEffect(() => {
    setDebouncedIsLocked(isLocked);
  }, [isLocked, setDebouncedIsLocked]);

  return (
    <SubscriptionProvider>
      <div className='h-full max-h-screen w-full overflow-y-hidden'>
        <MobileSidebar />
        <ResizablePanelGroup direction='horizontal'>
          {debouncedIsLocked ? (
            <ResizablePanel
              className={cn(
                "hidden h-full max-h-screen bg-secondary-background px-1 sml:relative sml:flex",
                !isLocked &&
                  "w-0 min-w-0 max-w-0 -translate-x-full opacity-0 transition-[transform_width] duration-500",
              )}
              defaultSize={25}
              maxSize={40}
              minSize={20}
              order={1}
              style={{
                minWidth: "248px",
                maxWidth: "480px",
              }}
              onResize={(size) => {
                console.log(size);
                setLockedPercentage(size);
              }}
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className='absolute left-[calc(100%-48px)] top-2 m-2 rounded-md hover:bg-border'
                      type='button'
                      onClick={() => {
                        setIsLocked(false);
                        setIsOpen(false);
                      }}
                    >
                      <ChevronsLeft size={24} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    className='z-20 rounded-md border bg-secondary-background p-1 px-2'
                    side='right'
                    sideOffset={4}
                  >
                    <p className='text-sm text-foreground/80'>Unlock sidebar open</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Sidebar key='desktop-sidebar' />
            </ResizablePanel>
          ) : null}
          <ResizableHandle />
          <ResizablePanel
            className='grid h-full w-full !overflow-y-auto pt-8 [&>*]:mx-auto [&>*]:max-w-[800px] md:[&>*]:max-w-[800px] xl:[&>*]:max-w-[960px]'
            defaultSize={75}
            order={2}
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SubscriptionProvider>
  );
}
