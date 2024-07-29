import React from "react";

import {DocumentDropzone} from "./document-dropzone";

interface FirstCreateStepProps {
  handleStep: (direction: "next" | "back") => void;
  handleStepComplete: (stepNumber: number) => void;
}

function FirstCreateStep({handleStep, handleStepComplete}: FirstCreateStepProps) {
  const onDocumentLoadSuccess = () => {
    handleStep("next");
    handleStepComplete(1);
  };

  return <DocumentDropzone onDocumentLoadSuccess={onDocumentLoadSuccess} />;
}

export {FirstCreateStep};
