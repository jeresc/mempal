"use client";

import React from "react";

import {EditableTitle} from "~/document/components/editable-title";
import {useDocument} from "~/document/hooks/use-document";
import {useParamsDoc} from "~/document/hooks/use-params-doc";

export default function DocumentPage() {
  const {docId} = useParamsDoc();
  const {document, isPending, error} = useDocument({docId});

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className='flex h-full w-full flex-col gap-2'>
      <EditableTitle id={document.id!} title={document.title!} />
      <h2>{document.mediaId}</h2>
    </main>
  );
}
