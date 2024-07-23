"use client";

import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Document, Page, pdfjs} from "react-pdf";

import {DocumentConfirmationDialog} from "~/document/components/document-confirmation-dialog";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const pdfToText = async (file: File | Blob | MediaSource): Promise<string> => {
  // Create a blob URL for the PDF file
  const blobUrl = URL.createObjectURL(file);

  // Load the PDF file
  const loadingTask = pdfjs.getDocument(blobUrl);

  const extractedText = "";
  let hadParsingError = false;

  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Extract text from all pages concurrently
    const pageTextPromises = Array.from({length: numPages}, (_, i) => i + 1).map(
      async (pageNumber) => {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        return textContent.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      },
    );

    const pageTexts = await Promise.all(pageTextPromises);
    const extractedText = pageTexts.join(" ");

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);

    // Free memory from loading task
    loadingTask.destroy();

    console.log(extractedText);

    return extractedText;
  } catch (error) {
    hadParsingError = true;
    console.error("Error extracting text from PDF:", error);
  }

  // Clean up the blob URL
  URL.revokeObjectURL(blobUrl);

  // Free memory from loading task
  loadingTask.destroy();

  if (!hadParsingError) {
    return extractedText;
  }

  return "";
};

function DocumentDropzone() {
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>();

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDropAccepted: async (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setText(await pdfToText(acceptedFiles[0]));
    },
    multiple: false,
  });

  useEffect(() => {
    if (!file) return;

    setOpen(true);
  }, [file]);

  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({numPages}: {numPages: number}): void {
    setNumPages(numPages);
  }

  return (
    <section>
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
      <div>
        {file !== undefined ? (
          <>
            <p>Charcs count: {text?.length}</p>

            <Document file={file} renderMode='canvas' onLoadSuccess={onDocumentLoadSuccess}>
              <div className='my-6 grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {[...Array(numPages)].map((_, i) => (
                  <Page
                    key={file.name + i}
                    className='border-2 border-black'
                    height={170}
                    pageNumber={i + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    width={120}
                  />
                ))}
              </div>
            </Document>
          </>
        ) : null}
      </div>
      <p>{}</p>
    </section>
  );
}

export {DocumentDropzone};
