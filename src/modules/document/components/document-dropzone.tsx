"use client";

import React from "react";
import {useDropzone} from "react-dropzone";

import {pdfToText} from "../utils";
import {useCreateDocument} from "../store/create-document";

function DocumentDropzone({onDocumentLoadSuccess}: {onDocumentLoadSuccess?: () => void}) {
  const [setFile, setText, setCharCount] = useCreateDocument((state) => [
    state.setFile,
    state.setText,
    state.setCharCount,
    state.file,
    state.text,
  ]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropAccepted: async (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      const text = await pdfToText(acceptedFiles[0]);

      setText(text);
      setCharCount(text.length);
      onDocumentLoadSuccess?.();
    },
    multiple: false,
  });

  return (
    <section className='flex h-full w-full flex-col gap-y-4'>
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
      </div>
    </section>
  );
}

export {DocumentDropzone};
