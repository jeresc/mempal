"use client";

import {pdfjs} from "react-pdf";

import {CreateDocumentWizard} from "~/document/components/create-document-wizard";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function NewDocumentPage() {
  return (
    <div className='flex h-full w-full flex-col gap-y-4 p-4'>
      <main className='h-full w-full'>
        <CreateDocumentWizard />
      </main>
    </div>
  );
}

export default NewDocumentPage;
