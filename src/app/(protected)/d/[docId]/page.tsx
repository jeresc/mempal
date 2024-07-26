"use client";

import React from "react";

import {EditableTitle} from "~/document/components/editable-title";
import {useDocument} from "~/document/hooks/use-document";
import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useMedia} from "~/media/hooks/use-media";

export default function DocumentPage() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const {
    media,
    isPending: isPendingMedia,
    error: errorMedia,
  } = useMedia({mediaId: document.mediaId!});

  if (isPendingDoc) return <div>Loading...</div>;

  if (errorDoc) return <div>Error: {errorDoc?.message || errorMedia?.message}</div>;

  return (
    <main className='flex h-full w-full flex-col gap-2'>
      <EditableTitle id={document.id!} title={document.title!} />
      <h2>mediaId: {document.mediaId}</h2>
      {isPendingMedia ? <div>Loading Media...</div> : null}
      {errorMedia ? <div>Error Media: {errorMedia?.message}</div> : null}
      {!isPendingMedia && !errorMedia && <div>mediaUrl: {media.url}</div>}
      {!isPendingMedia && !errorMedia && <div>mediaText: {media.text}</div>}
    </main>
  );
}
