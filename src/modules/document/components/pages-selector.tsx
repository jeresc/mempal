"use client";
import {Document, Page} from "react-pdf";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

import usePagedDocument from "../hooks/use-paged-document";
import {useMutateDocuments} from "../hooks/use-mutate-documents";

import {Slider} from "@/components/ui/slider";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils/cn";
import {generateFirestoreId} from "@/lib/utils/generate-id";
import {Input} from "@/components/ui/input";

const getPageNumbers = (
  pagesOffset: number,
  maxPagesInView: number,
  pagesOfPages: number,
): (number | string)[] => {
  const maxButtons = 9; // Maximum number of buttons to display
  const pageNumbers: (number | string)[] = [];
  const currentPageIndex = Math.floor(pagesOffset / maxPagesInView) + 1;
  const firstPage = 1;
  const lastPage = pagesOfPages;

  // Helper function to create a range of page numbers
  const createRange = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  // Case: Total pages are less than or equal to the maximum buttons
  if (pagesOfPages <= maxButtons) {
    return createRange(firstPage, lastPage);
  }

  // Case: Current page is in the first few pages
  if (currentPageIndex <= 4) {
    pageNumbers.push(...createRange(firstPage, Math.min(8, lastPage - 1)));
    if (pagesOfPages > maxButtons) {
      pageNumbers.push("...", lastPage);
    }
  }
  // Case: Current page is in the last few pages
  else if (currentPageIndex >= pagesOfPages - 4) {
    pageNumbers.push(firstPage);
    if (pagesOfPages > maxButtons) {
      pageNumbers.push("...");
    }
    pageNumbers.push(...createRange(Math.max(lastPage - 7, firstPage + 1), lastPage));
  }
  // Case: Current page is somewhere in the middle
  else {
    pageNumbers.push(firstPage);
    if (currentPageIndex > 5) {
      pageNumbers.push("...");
    }
    pageNumbers.push(
      ...createRange(currentPageIndex - 2, currentPageIndex + 2).filter(
        (p) => p >= firstPage && p <= lastPage,
      ),
    );
    if (currentPageIndex < pagesOfPages - 4) {
      pageNumbers.push("...", lastPage);
    }
  }

  return pageNumbers;
};

function PageSelector() {
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
    pagesOfPages,
    setPagesOffset,
    text,
    selectedRange,
    setSelectedRange,
  } = usePagedDocument();

  const router = useRouter();
  const {mutate} = useMutateDocuments();

  if (!file) return null;

  const pageNumbers = getPageNumbers(pagesOffset, maxPagesInView, pagesOfPages);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      if (charCount > 50000 || !file || !text) return;

      const docId = generateFirestoreId();

      mutate({file, docId, text});
      router.push(`/d/${docId}`);
    } catch (e: unknown) {
      // Handle errors here
    }
  };

  return (
    <section className='flex w-full flex-col gap-y-6'>
      <div className='flex items-start gap-2'>
        <Badge className='py-1 text-sm' variant={charCount > 50000 ? "destructive" : "default"}>
          Character Count: {charCount} / 50000
        </Badge>
        {charCount > 50000 && (
          <div className='flex items-center gap-2'>Try reducing the selected pages range.</div>
        )}
      </div>

      {pages > 1 && (
        <div className='w-full px-2'>
          <Slider
            defaultValue={[1, pages]}
            max={pages}
            min={1}
            selectedValues={selectedRange}
            step={1}
            value={selectedRange}
            onValueChange={(selectedRange) => setSelectedRange(selectedRange as [number, number])}
          />
        </div>
      )}

      <Document
        className='grid w-full grid-cols-2 grid-rows-3 justify-items-center gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 sml:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
        file={file}
        renderMode='canvas'
        onLoadSuccess={onLoadSuccess}
      >
        {pagesArray?.slice(pagesOffset, pagesOffset + totalPagesToShow).map((_, i) => (
          <button
            key={i + 1 + pagesOffset}
            className={cn(
              "relative h-full w-full rounded-md border border-border p-1",
              selectedRange[0] <= i + 1 + pagesOffset &&
                i + 1 + pagesOffset <= selectedRange[1] &&
                "border-blue-500",
            )}
            type='button'
            onClick={() => {
              const currentPage = i + 1 + pagesOffset;

              setSelectedRange((prevSelectedRange: [number, number]) => {
                const [start, end] = prevSelectedRange;

                // If the current page is before the start or after the end of the range, expand the range
                if (currentPage < start) {
                  return [currentPage, end];
                } else if (currentPage > end) {
                  return [start, currentPage];
                } else {
                  // If the current page is within the range, reset the range to just this page
                  return [currentPage, currentPage];
                }
              });
            }}
          >
            <Page
              className='aspect-[6/7] max-h-[150px] w-full overflow-hidden rounded-sm'
              height={170}
              pageNumber={i + 1 + pagesOffset}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={120}
            />
            <p
              className={cn(
                "absolute right-1.5 top-1.5 rounded-sm bg-zinc-400 px-1.5 py-1 text-sm leading-none text-white",
                selectedRange[0] <= i + 1 + pagesOffset &&
                  i + 1 + pagesOffset <= selectedRange[1] &&
                  "bg-blue-400",
              )}
            >
              {i + 1 + pagesOffset}
            </p>
          </button>
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
      {pagesOfPages > 1 && (
        <div className='grid w-full grid-cols-[repeat(auto-fit,minmax(50px,1fr))] grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-[repeat(auto-fit,minmax(20px,1fr))] sm:grid-rows-1'>
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-md border px-1 py-0.5 disabled:opacity-30",
            )}
            disabled={pagesOffset === 0}
            type='button'
            onClick={previousPage}
          >
            <ChevronLeft size={20} />
          </button>
          {pageNumbers.map((number, index) => (
            <button
              key={`select-page-${index}`}
              className={cn(
                "flex w-full items-center justify-center rounded-md border px-1 py-0.5",
                pagesOffset / maxPagesInView + 1 === number && "bg-blue-500 text-white",
                number === "..." && "text-gray-500",
              )}
              disabled={number === "..."}
              type='button'
              onClick={() => {
                if (number === "...") return;
                setPagesOffset(
                  () => maxPagesInView * (typeof number === "number" ? number - 1 : 0),
                );
              }}
            >
              {number}
            </button>
          ))}
          <button
            className={cn(
              "flex w-full items-center justify-center rounded-md border px-1 py-0.5 disabled:opacity-30",
            )}
            disabled={pagesOffset + maxPagesInView >= pages}
            type='button'
            onClick={nextPage}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <button
          className='flex w-full items-center justify-center rounded-md border px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-30'
          disabled={!file || !text || charCount > 50000}
          type='submit'
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export {PageSelector};
