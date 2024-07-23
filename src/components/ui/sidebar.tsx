"use client";

import Link from "next/link";

import {useDocuments} from "~/document/hooks/use-documents";

import {Button} from "@/components/ui/button";

function Sidebar() {
  const {isPending, error, documents} = useDocuments();

  return (
    <aside className='flex h-full w-full flex-col gap-2 p-2 px-1'>
      <h2>Documents</h2>
      <Button asChild variant='ghost'>
        <Link href='/new-document'>New Document</Link>
      </Button>
      {isPending ? <p>Loading...</p> : null}
      {error ? <p>An error has occurred: {error.message}</p> : null}
      <div className='flex flex-col gap-1'>
        {documents?.length > 0 &&
          documents.map((doc) => (
            <span
              key={doc.id}
              className='flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-foreground/10'
            >
              <Link className='h-full w-full' href={`/${doc.title.split(" ").join("-")}`}>
                {doc.title || <em>Untitled</em>}
              </Link>
            </span>
          ))}
      </div>
    </aside>
  );
}

export {Sidebar};
