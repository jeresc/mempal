import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Sidebar} from "@/components/ui/sidebar";

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='h-full w-full'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className='hidden min-w-[248px] max-w-[480px] bg-foreground/[2%] px-1 sm:flex'>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
