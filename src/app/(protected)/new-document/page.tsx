"use client";

import {pdfjs} from "react-pdf";

import {CreateDocumentWizard} from "~/document/components/create-document-wizard";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function NewDocumentPage() {
  return (
    <div className='flex h-full w-full flex-col gap-y-4 p-4 '>
      <header className='flex w-full flex-col items-center justify-center'>
        <h2 className='mb-2 flex items-center justify-center gap-1 text-3xl font-[700] drop-shadow-sm'>
          Create a new document
        </h2>
        <p className='text-sm text-muted-foreground'>
          Create a new document to share with your friends and family.
        </p>
      </header>
      <main className='h-full w-full'>
        <CreateDocumentWizard />
      </main>
    </div>
  );
}

export default NewDocumentPage;
