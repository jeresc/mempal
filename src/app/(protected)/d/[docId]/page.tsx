"use client";

import React from "react";

import {EditableTitle} from "~/document/components/editable-title";
import {useDocument} from "~/document/hooks/use-document";
import {useParamsDoc} from "~/document/hooks/use-params-doc";

export default function DocumentPage() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});

  if (isPendingDoc) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message}</div>;

  return (
    <main className='flex h-full w-full flex-col gap-2'>
      <EditableTitle id={document.id!} title={document.title!} />
      <h2>mediaId: {document.mediaId}</h2>
      <div>mediaUrl: {document.mediaUrl}</div>
    </main>
  );
}
