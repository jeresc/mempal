"use client";

import Link from "next/link";
import {Dot, File} from "lucide-react";
import {useState} from "react";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data/sets/15/twitter.json";

import {useDocuments} from "~/document/hooks/use-documents";
import {useParamsDoc} from "~/document/hooks/use-params-doc";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils/cn";

const docUrl = (docTitle: string, docId: string) => {
  const docTitleSlug = docTitle.replaceAll(" ", "-");

  return docTitle.length > 0 ? `/d/${docTitleSlug}-${docId}` : `/d/${docId}`;
};

function Sidebar() {
  const {isPending, error, documents} = useDocuments();
  const {docId} = useParamsDoc();
  const [open, setOpen] = useState(false);

  return (
    <aside className='relative flex h-full w-full flex-col gap-2 p-2 px-1 text-foreground/80'>
      <h2>Documents</h2>
      <Button asChild variant='ghost'>
        <Link href='/new-document'>New Document</Link>
      </Button>
      {isPending ? <p>Loading...</p> : null}
      {error ? <p>An error has occurred: {error.message}</p> : null}
      <div className='flex flex-col gap-0.5'>
        {documents?.length > 0 &&
          documents.map(({id, title}) => (
            <span
              key={id}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-foreground/[7%]",
                docId == id && "bg-foreground/[7%] hover:bg-foreground/[12%]",
              )}
            >
              <Link
                className='flex h-full w-full items-center justify-start gap-1.5'
                href={docUrl(title, id)}
              >
                <button
                  className='group/icon h-4.5 w-4.5 relative rounded-sm p-0.5 hover:bg-foreground/[10%]'
                  type='button'
                  onClick={() => setOpen(!open)}
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
                {title || "Untitled"}
              </Link>
            </span>
          ))}
      </div>
      {/* {open ? ( */}
      {/*   <div className='absolute bottom-0 left-0 grid w-[400px] flex-col place-content-center gap-0.5'> */}
      {/*     <Picker */}
      {/*       data={data} */}
      {/*       emojiButtonRadius='6px' */}
      {/*       emojiButtonSize={32} */}
      {/*       icons='outline' */}
      {/*       navPosition='top' */}
      {/*       perLine={10} */}
      {/*       previewPosition='none' */}
      {/*       set='twitter' */}
      {/*       skinTonePosition='search' */}
      {/*       onEmojiSelect={console.log} */}
      {/*     /> */}
      {/*   </div> */}
      {/* ) : null} */}
    </aside>
  );
}

export {Sidebar};
