"use client";

import {pdfjs} from "react-pdf";
import React from "react";

import {EditableTitle} from "~/document/components/editable-title";
import {useDocument} from "~/document/hooks/use-document";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {PdfViewer} from "~/document/components/pdf-viewer";
import {useMedia} from "~/media/hooks/use-media";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function DocumentPage() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const {media} = useMedia({mediaId: document.mediaId!});

  if (isPendingDoc) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message}</div>;

  return (
    <main className='flex h-full w-full flex-col gap-2'>
      <header className='rounded-md border border-border px-2 py-1 sm:px-4 sm:py-2'>
        <EditableTitle id={document.id!} title={document.title!} />
      </header>
      <PdfViewer endPage={media.endPage!} file={document.mediaUrl!} startPage={media.startPage!} />
    </main>
  );
}
