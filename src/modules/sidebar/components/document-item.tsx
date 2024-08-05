import Link from "next/link";
import {ChevronRight, File} from "lucide-react";

import {useSidebarStore} from "../store/sidebar";

import {cn} from "@/lib/utils/cn";

const docUrl = (docTitle: string, docId: string) => {
  const docTitleSlug = docTitle.replaceAll(" ", "-");

  return docTitle.length > 0 ? `/d/${docTitleSlug}-${docId}` : `/d/${docId}`;
};

const emojis = {
  chat: "robot_face",
  deck: "card_file_box",
  summary: "spiral_note_pad",
};
const tabs = ["chat", "deck"];

interface DocumentItemProps {
  id: string;
  title: string;
  pathname: string;
}

function DocumentItem({id, title, pathname}: DocumentItemProps) {
  const [tabToggled, setTabToggled] = useSidebarStore((state) => [
    state.tabToggled,
    state.setTabToggled,
  ]);

  return (
    <div className='flex flex-col gap-0.5'>
      <span
        className={cn(
          "group/item flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium hover:cursor-pointer hover:bg-foreground/[7%]",
          pathname.endsWith(docUrl(title, id)) && "bg-foreground/[7%] hover:bg-foreground/[12%]",
        )}
      >
        <Link
          className='flex h-full w-full items-center justify-start gap-1.5'
          href={docUrl(title, id)}
        >
          <button
            className='h-4.5 w-4.5 relative rounded-sm p-0.5 hover:bg-foreground/[10%]'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setTabToggled((prevToggled) => (prevToggled === id ? "" : id));
            }}
          >
            <ChevronRight
              className={cn(
                "absolute left-0.5 top-0.5 scale-0 transition-all duration-75 group-hover/item:scale-100 group-hover/item:duration-100",
                tabToggled == id && "rotate-90",
              )}
              size={16}
            />
            <File
              className='opacity-100 transition-all duration-100 group-hover/item:opacity-0'
              size={16}
            />
          </button>

          <p className='overflow-hidden text-ellipsis whitespace-nowrap leading-none'>
            {title || "Untitled"}
          </p>
        </Link>
      </span>
      <ul className='flex flex-col gap-0.5'>
        {tabs.map((tab) => (
          <li
            key={`${id}_${tab}`}
            className={cn(
              "hidden w-full items-center gap-2.5 rounded-md py-1.5 pr-2 text-sm font-medium hover:bg-foreground/[7%]",
              tabToggled === id && "flex",
              pathname.endsWith(`${id}/${tab}`) && "flex",
              pathname.endsWith(`${id}/${tab}`) && "bg-foreground/[7%] hover:bg-foreground/[12%]",
            )}
          >
            <Link
              className='flex h-full w-full items-center justify-start gap-2 pl-5'
              href={docUrl(title, id) + `/${tab}`}
            >
              {/*@ts-expect-error This is a valid component by emoji-mart*/}
              <em-emoji id={emojis[tab]} set='twitter' size='16px' />
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {DocumentItem};
