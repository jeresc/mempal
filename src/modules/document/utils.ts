import {pdfjs} from "react-pdf";

const pdfToText = async (file: File | Blob | MediaSource): Promise<string[]> => {
  const blobUrl = URL.createObjectURL(file);

  const loadingTask = pdfjs.getDocument(blobUrl);

  let pageTexts: string[] = [];
  let hadParsingError = false;

  try {
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Extract text from all pages
    const pageTextPromises = Array.from({length: numPages}, (_, i) => i + 1).map(
      async (pageNumber) => {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        return textContent.items.map((item) => ("str" in item ? item.str : "")).join(" ");
      },
    );

    pageTexts = await Promise.all(pageTextPromises);

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);

    // Free memory from loading task
    loadingTask.destroy();

    console.log(pageTexts);

    return pageTexts;
  } catch (error) {
    hadParsingError = true;
    console.error("Error extracting text from PDF:", error);
  }

  // Clean up the blob URL
  URL.revokeObjectURL(blobUrl);

  // Free memory from loading task
  loadingTask.destroy();

  if (!hadParsingError) {
    return pageTexts;
  }

  return [];
};

export {pdfToText};
