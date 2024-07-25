"use client";
import React from "react";
import {Document, Page} from "react-pdf";

import usePagedDocument from "../hooks/use-paged-document";

import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils/cn";

function SecondCreateStep() {
  const {
    file,
    pages,
    pagesArray,
    pagesOffset,
    maxPagesInView,
    totalPagesToShow,
    placeholdersNeeded,
    onLoadSuccess,
    nextPage,
    previousPage,
    charCount,
  } = usePagedDocument();

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
            className='my-6 grid w-full grid-cols-2 grid-rows-3 justify-items-center gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sml:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
            file={file}
            renderMode='canvas'
            onLoadSuccess={onLoadSuccess}
          >
            {pagesArray?.slice(pagesOffset, pagesOffset + totalPagesToShow).map((_, i) => (
              <div
                key={i + 1 + pagesOffset}
                className='h-full w-full rounded-md border border-border p-1'
              >
                <Page
                  className='aspect-[6/7] overflow-hidden rounded-sm'
                  height={170}
                  pageNumber={i + 1 + pagesOffset}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={120}
                />
              </div>
            ))}
            {placeholdersNeeded > 0 &&
              [...Array(placeholdersNeeded)].fill(0).map((_, i) => (
                <div
                  key={i + 1 + pagesOffset}
                  className='h-full w-full rounded-md border border-border p-1'
                >
                  <div className='aspect-[6/7] max-h-[170px] max-w-[120px] overflow-hidden rounded-sm' />
                </div>
              ))}
          </Document>
          <button
            className={cn(pagesOffset + maxPagesInView >= pages && "hidden")}
            disabled={pagesOffset + maxPagesInView >= pages}
            type='button'
            onClick={nextPage}
          >
            Next
          </button>
          <button
            className={cn(pagesOffset === 0 && "hidden")}
            disabled={pagesOffset === 0}
            type='button'
            onClick={previousPage}
          >
            Previous
          </button>
        </>
      ) : null}
    </div>
  );
}

export {SecondCreateStep};
