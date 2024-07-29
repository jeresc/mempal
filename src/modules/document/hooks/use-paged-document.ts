import {useEffect, useState} from "react";
import {useWindowSize} from "usehooks-ts";
import {useDebounceValue} from "usehooks-ts";

import {useCreateDocument} from "../store/create-document";
import {pdfToText} from "../utils";

function usePagedDocument() {
  const [
    setCharCount,
    file,
    text,
    setPages,
    charCount,
    pages,
    selectedRange,
    setSelectedRange,
    setText,
  ] = useCreateDocument((state) => [
    state.setCharCount,
    state.file,
    state.text,
    state.setPages,
    state.charCount,
    state.pages,
    state.selectedRange,
    state.setSelectedRange,
    state.setText,
  ]);

  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [pagesOffset, setPagesOffset] = useState(0);
  const [maxPagesInView, setMaxPagesInView] = useState(1);
  const [debouncedSelectedRange, setDebouncedSelectedRange] = useDebounceValue(selectedRange, 150);
  const [allPageTexts, setAllPageTexts] = useState<string[]>([]);

  useEffect(() => {
    setSelectedRange([1, pages]);
  }, [pages, setSelectedRange]);

  useEffect(() => {
    const fetchAllTexts = async () => {
      if (!file) return;

      try {
        const texts = await pdfToText(file);

        setAllPageTexts(texts);
      } catch (error) {
        console.error("Error fetching all text:", error);
      }
    };

    fetchAllTexts();
  }, [file]);

  useEffect(() => {
    if (allPageTexts.length === 0) return;

    const [startPage, endPage] = debouncedSelectedRange || [1, allPageTexts.length];
    const validStartPage = Math.max(1, startPage);
    const validEndPage = Math.min(allPageTexts.length, endPage);

    if (validStartPage <= validEndPage) {
      const pageTextsInRange = allPageTexts.slice(validStartPage - 1, validEndPage);
      const combinedText = pageTextsInRange.join(" ");

      setText(combinedText);
      setCharCount(combinedText.length);
    }
  }, [allPageTexts, debouncedSelectedRange, setText, setCharCount]);

  useEffect(() => {
    setDebouncedSelectedRange(selectedRange);
  }, [selectedRange, setDebouncedSelectedRange]);

  const {width} = useWindowSize();

  function onLoadSuccess({numPages}: {numPages: number}): void {
    setPages(numPages);
  }

  useEffect(() => {
    setPagesArray([...Array(pages).keys()]); // Create an array of page indices
  }, [pages]);

  useEffect(() => {
    if (width < 490) {
      setMaxPagesInView(6);
    } else if (width < 768) {
      setMaxPagesInView(12);
    } else if (width < 860) {
      setMaxPagesInView(15);
    } else if (width < 1024) {
      setMaxPagesInView(12);
    } else if (width < 1280) {
      setMaxPagesInView(15);
    } else {
      setMaxPagesInView(18);
    }
  }, [width]);

  const totalPagesToShow = Math.min(maxPagesInView, pages - pagesOffset);
  const placeholdersNeeded = maxPagesInView - totalPagesToShow;
  const pagesOfPages = Math.ceil(pages / maxPagesInView);

  const nextPage = () => {
    setPagesOffset((prevOffset) => prevOffset + maxPagesInView);
  };

  const previousPage = () => {
    setPagesOffset((prevOffset) => prevOffset - maxPagesInView);
  };

  return {
    file,
    pages,
    pagesArray,
    pagesOffset,
    maxPagesInView,
    totalPagesToShow,
    placeholdersNeeded,
    pagesOfPages,
    onLoadSuccess,
    nextPage,
    previousPage,
    setPagesOffset,
    charCount,
    text,
    selectedRange,
    setSelectedRange,
  };
}

export default usePagedDocument;
