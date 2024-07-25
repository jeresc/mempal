"use client";
import {MdKeyboardDoubleArrowLeft} from "react-icons/md";
import {useDebounceValue} from "usehooks-ts";
import {useEffect} from "react";

import {MobileSidebar} from "~/sidebar";
import {Sidebar} from "~/sidebar";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useSidebarStore} from "@/lib/store/sidebar";
import {cn} from "@/lib/utils/cn";

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
  const [isLocked, setIsLocked, setIsOpen] = useSidebarStore((state) => [
    state.isLocked,
    state.setIsLocked,
    state.setIsOpen,
  ]);

  const [debouncedIsLocked, setDebouncedIsLocked] = useDebounceValue(isLocked, 400);

  useEffect(() => {
    setDebouncedIsLocked(isLocked);
  }, [isLocked, setDebouncedIsLocked]);

  return (
    <div className='h-full max-h-screen w-full overflow-y-hidden'>
      <MobileSidebar />
      <ResizablePanelGroup direction='horizontal'>
        {debouncedIsLocked ? (
          <ResizablePanel
            className={cn(
              "hidden h-full max-h-screen min-w-[248px] max-w-[480px] bg-[#181b20] px-1 sml:relative sml:flex",
              !isLocked &&
                "w-0 min-w-0 max-w-0 -translate-x-full opacity-0 transition-[transform_width] duration-500",
            )}
            defaultSize={10}
            order={1}
          >
            <button
              className='absolute left-[calc(100%-40px)] top-0 m-1'
              type='button'
              onClick={() => {
                setIsLocked(false);
                setIsOpen(false);
              }}
            >
              <MdKeyboardDoubleArrowLeft size={36} />
            </button>
            <Sidebar />
          </ResizablePanel>
        ) : null}
        <ResizableHandle />
        <ResizablePanel className='h-full w-full !overflow-y-scroll' defaultSize={90} order={2}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
