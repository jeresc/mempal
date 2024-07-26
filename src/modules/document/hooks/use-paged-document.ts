import {useEffect, useState} from "react";
import {useWindowSize} from "usehooks-ts";

import {useCreateDocument} from "../store/create-document";

function usePagedDocument() {
  const [setCharCount, file, text, setPages, charCount, pages] = useCreateDocument((state) => [
    state.setCharCount,
    state.file,
    state.text,
    state.setPages,
    state.charCount,
    state.pages,
  ]);

  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [pagesOffset, setPagesOffset] = useState(0);
  const [maxPagesInView, setMaxPagesInView] = useState(1);

  const {width} = useWindowSize();

  useEffect(() => {
    if (file && text) {
      setCharCount(text.length);
    }
  }, [setCharCount, text, file]);

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
  };
}

export default usePagedDocument;
