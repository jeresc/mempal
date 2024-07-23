"use client";

import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

import {DocumentConfirmationDialog} from "~/document/components/document-confirmation-dialog";

function DocumentDropzone() {
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropAccepted: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    multiple: false,
  });

  useEffect(() => {
    if (!file) return;

    setOpen(true);
  }, [file]);

  return (
    <div className='h-full w-full'>
      <div
        {...getRootProps({
          className:
            "rounded-md border border-border flex h-full w-full items-center justify-center",
        })}
      >
        <input type='file' {...getInputProps()} accept='application/pdf' />
        <p className='px-4 text-center text-lg'>Drag and drop files here, or click to select</p>
      </div>
      <DocumentConfirmationDialog file={file} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export {DocumentDropzone};
