"use client";
import React, {useEffect, useState} from "react";
import {Document, Page} from "react-pdf";
import {useWindowSize} from "usehooks-ts";

import {useCreateDocument} from "../store/create-document";

import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils/cn";

function SecondCreateStep() {
  const [setCharCount, file, text, setPages, charCount, pages] = useCreateDocument((state) => [
    state.setCharCount,
    state.file,
    state.text,
    state.setPages,
    state.charCount,
    state.pages,
  ]);
  const [maxPagesToRender, setMaxPagesToRender] = useState(1);
  const [pagesToDisplay, setPagesToDisplay] = useState(1);
  const [displayOffset, setDisplayOffset] = useState(0);

  const {width} = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setMaxPagesToRender(9);
    } else if (width < 1024) {
      setMaxPagesToRender(12);
    } else if (width < 1280) {
      setMaxPagesToRender(15);
    } else {
      setMaxPagesToRender(18);
    }
  }, []);

  useEffect(() => {
    if (displayOffset + maxPagesToRender >= pages) {
      setPagesToDisplay(pages - displayOffset);
    }

    setPagesToDisplay(maxPagesToRender);
  }, [displayOffset, maxPagesToRender, pages]);

  useEffect(() => {
    if (!file) return;
    if (!text) return;
    setCharCount(text?.length);
  }, [setCharCount, text, file]);

  function onLoadSuccess({numPages}: {numPages: number}): void {
    setPages(numPages);
  }

  return (
    <div>
      {file !== undefined ? (
        <>
          <div className='flex flex-col items-start gap-2'>
            <Badge className='py-1 text-sm' variant={charCount > 50000 ? "destructive" : "success"}>
              Character Count: {charCount} / 50000
            </Badge>
            {charCount > 50000 && (
              <div className='flex items-center gap-2'>Try reducing the selected pages range.</div>
            )}
          </div>

          <Document
            className='my-6 grid h-[460px] w-full grid-cols-3 grid-rows-3 justify-items-center gap-4 overflow-hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
            file={file}
            renderMode='canvas'
            onLoadSuccess={onLoadSuccess}
          >
            {[...Array(pagesToDisplay)].map((_, i) => (
              <Page
                key={i + 1 + displayOffset}
                className='border-2 border-black'
                height={170}
                pageNumber={i + 1 + displayOffset}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                width={120}
              />
            ))}
            {[...Array(maxPagesToRender - pagesToDisplay)].map((_, i) => (
              <div key={i + 1 + displayOffset} className='h-full w-full border-2 border-black' />
            ))}
          </Document>
          <button
            className={cn(displayOffset + maxPagesToRender >= pages && "hidden")}
            disabled={displayOffset + maxPagesToRender >= pages}
            type='button'
            onClick={() => setDisplayOffset((previousOffter) => previousOffter + maxPagesToRender)}
          >
            Next
          </button>
          <button
            className={cn(displayOffset === 0 && "hidden")}
            disabled={displayOffset === 0}
            type='button'
            onClick={() => setDisplayOffset((previousOffter) => previousOffter - maxPagesToRender)}
          >
            Previous
          </button>
        </>
      ) : null}
    </div>
  );
}

export {SecondCreateStep};
