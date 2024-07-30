"use client";

import Link from "next/link";
import {Dot, File} from "lucide-react";
import {useEffect, useState} from "react";
import data from "@emoji-mart/data/sets/15/twitter.json";
import {init} from "emoji-mart";
import {usePathname} from "next/navigation";

import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocuments} from "~/document/hooks/use-documents";
import {useCurrentUser} from "~/auth/hooks/use-current-user";

import {GradientAvatar} from "./gradient-avatar";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils/cn";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const emojis = {
  chat: "robot_face",
  deck: "card_file_box",
  summary: "spiral_note_pad",
};

const tabs = ["chat", "deck", "summary"];

init({data});

const docUrl = (docTitle: string, docId: string) => {
  const docTitleSlug = docTitle.replaceAll(" ", "-");

  return docTitle.length > 0 ? `/d/${docTitleSlug}-${docId}` : `/d/${docId}`;
};

function Sidebar() {
  const {isPending, error, documents} = useDocuments();
  const {docId} = useParamsDoc();
  const user = useCurrentUser();
  const [toggled, setToggled] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (docId) {
      const currentTab = tabs.find((tab) => pathname.endsWith(`${docId}/${tab}`));

      if (currentTab) setToggled(docId);
    }
  }, [pathname, docId]);

  return (
    <aside className='flex h-full w-full flex-col gap-4 p-2 px-1 text-sm text-foreground/80'>
      <div className='flex items-center gap-2 rounded-md p-2 transition-all duration-75 hover:bg-foreground/[7%]'>
        <Avatar className='h-6 w-6 rounded-full'>
          <AvatarImage className='h-full w-full rounded-full' src={user?.image || ""} />
          <AvatarFallback>
            {user?.id?.length !== undefined && <GradientAvatar size={24} userId={user.id} />}
          </AvatarFallback>
        </Avatar>
        <h2 className='text-semibold text-white'>{user?.name}</h2>
      </div>
      <div className='flex w-full flex-col gap-0.5'>
        <Link href='/flashcards'>Flashcards</Link>
        <Button asChild className='justify-start text-left text-sm' variant='ghost'>
          <Link href='/new-document'>New Document</Link>
        </Button>
      </div>
      {isPending ? <p>Loading...</p> : null}
      {error ? <p>An error has occurred: {error.message}</p> : null}
      <div className='flex flex-col gap-0.5'>
        {documents?.length > 0 &&
          documents.map(({id, title}) => (
            <>
              <span
                key={id}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-foreground/[7%]",
                  pathname.endsWith(docUrl(title, id)) &&
                    "bg-foreground/[7%] hover:bg-foreground/[12%]",
                )}
              >
                <Link
                  className='flex h-full items-center justify-start gap-1.5 '
                  href={docUrl(title, id)}
                >
                  <button
                    className='group/icon h-4.5 w-4.5 relative rounded-sm p-0.5 hover:bg-foreground/[10%]'
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      setToggled((prevToggled) => (prevToggled === id ? null : id));
                    }}
                  >
                    <Dot
                      className='absolute left-0 top-0 scale-0 transition-all duration-75 group-hover/icon:scale-100 group-hover/icon:duration-100'
                      size={21}
                    />
                    <File
                      className='opacity-100 transition-all duration-100 group-hover/icon:opacity-0'
                      size={16}
                    />
                  </button>

                  <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
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
                      toggled === id && "flex",
                      pathname.endsWith(`${id}/${tab}`) && "flex",
                      pathname.endsWith(`${id}/${tab}`) &&
                        "bg-foreground/[7%] hover:bg-foreground/[12%]",
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
            </>
          ))}
      </div>
    </aside>
  );
}

export {Sidebar};
