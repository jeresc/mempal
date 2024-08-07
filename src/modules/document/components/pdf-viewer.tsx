"use client";
import {Document, Page} from "react-pdf";
import {MouseEvent, useRef, useState} from "react";

import "react-pdf/dist/Page/TextLayer.css";
import {ArrowLeft, ArrowRight, ZoomIn, ZoomOut} from "lucide-react";

import {SelectionPopover} from "~/document/components/selection-popover";

interface PdfViewerProps {
  file: string;
  startPage: number;
  endPage: number;
}

const maxZoom = 200;
const minZoom = 50;

function PdfViewer({file, startPage, endPage}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(100);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const prevPage = () => {
    if (pageNumber <= 1) return;
    setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (!numPages) return;

    if (pageNumber >= endPage - startPage + 1) return;
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleZoomIn = () => {
    if (zoom >= maxZoom) return;
    setZoom((prevZoom) => prevZoom + 10);
  };

  const handleZoomOut = () => {
    if (zoom <= minZoom) return;
    setZoom((prevZoom) => prevZoom - 10);
  };

  function onDocumentLoadSuccess({numPages}: {numPages: number}): void {
    setNumPages(numPages);
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    const selection = window?.getSelection();

    if (!selection) return;

    const selectedText = selection.toString();

    setSelectedText(selectedText);
    setMenuOpen(true);
  };

  const rendererRef = useRef<HTMLDivElement>(null);

  return (
    <article className='relative flex h-full flex-col gap-2 rounded-md border border-border p-2 selection:bg-primary selection:text-white sm:p-4'>
      {file && startPage && endPage ? (
        <>
          <header className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2 rounded-sm border border-border p-2'>
              <button
                className='disabled:opacity-50'
                disabled={pageNumber <= 1}
                type='button'
                onClick={prevPage}
              >
                <ArrowLeft size={20} />
              </button>
              <p className='tabular-nums'>
                Page {pageNumber} of {endPage - startPage + 1}
              </p>
              <button
                className='disabled:opacity-50'
                disabled={pageNumber >= endPage - startPage + 1}
                type='button'
                onClick={nextPage}
              >
                <ArrowRight size={20} />
              </button>
            </div>
            <div className='flex items-center gap-2 rounded-sm border border-border p-2'>
              <button type='button' onClick={handleZoomOut}>
                <ZoomOut size={20} />
              </button>
              <p className='tabular-nums'>{zoom}%</p>
              <button type='button' onClick={handleZoomIn}>
                <ZoomIn size={20} />
              </button>
            </div>
          </header>
          <SelectionPopover container={rendererRef.current!}>
            <section ref={rendererRef}>
              <Document
                className='aspect-[6/7] max-h-[840px] w-full overflow-auto rounded-md border border-border bg-white'
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  className='h-full w-full'
                  pageNumber={pageNumber + startPage - 1}
                  renderAnnotationLayer={false}
                  scale={zoom / 100}
                  onMouseUp={handleMouseUp}
                />
              </Document>
            </section>
          </SelectionPopover>
        </>
      ) : null}
    </article>
  );
}

export {PdfViewer};
