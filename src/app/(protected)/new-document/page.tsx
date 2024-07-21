"use client";

import {useMutateDocument} from "~/document/hooks/use-mutate-document";
import {DocumentDropzone} from "~/document/components/document-dropzone";

function NewDocumentPage() {
  const {isMutating, handleSubmit} = useMutateDocument();

  return (
    <div className='flex h-full w-full flex-col gap-y-4 px-4 py-8'>
      <header className='flex w-full flex-col items-center justify-center'>
        <h2 className='mb-2 flex items-center justify-center gap-1 text-3xl font-[700] drop-shadow-sm'>
          Create a new document
        </h2>
        <p className='text-sm text-muted-foreground'>
          Create a new document to share with your friends and family.
        </p>
      </header>
      <main className='h-full w-full'>
        <DocumentDropzone />
        <button disabled={isMutating} onClick={() => handleSubmit()}>
          {isMutating ? "Creating..." : "Create"}
        </button>
      </main>
    </div>
  );
}

export default NewDocumentPage;
