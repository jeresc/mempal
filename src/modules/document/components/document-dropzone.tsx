"use client";

import React from "react";
import {useDropzone} from "react-dropzone";
import {ArrowBigUpDash} from "lucide-react";

import {pdfToText} from "../utils";
import {useCreateDocument} from "../store/create-document";

import {Button} from "@/components/ui/button";

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
      <div className='flex h-full w-full items-center justify-center'>
        <div
          {...getRootProps({
            className:
              "rounded-md border border-dashed border-border flex items-center justify-center flex-col gap-y-7 hover:bg-primary/15 cursor-pointer hover:border-primary/40 h-full p-4 transition-all duration-75 w-full",
          })}
        >
          <input type='file' {...getInputProps()} accept='application/pdf' />
          <ArrowBigUpDash className='-m-6 h-36 w-36' size={40} strokeWidth={0.8} />
          <div className='flex w-full flex-col items-center justify-center gap-y-3 text-lg leading-none '>
            <p className='px-4 text-center leading-none'>Drag and drop files here</p>
            <Button className='w-full max-w-[260px]'>Or click to select</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export {DocumentDropzone};
