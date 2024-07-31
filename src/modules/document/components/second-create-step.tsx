"use client";
import React from "react";

import {PageSelector} from "./pages-selector";

interface SecondCreateStepProps {
  handleStep: (direction: "next" | "back") => void;
  handleStepComplete: (stepNumber: number) => void;
}
function SecondCreateStep({handleStep, handleStepComplete}: SecondCreateStepProps) {
  const nextStep = () => {
    handleStep("next");
    handleStepComplete(2);
  };

  return <PageSelector nextStep={nextStep} />;
}

export {SecondCreateStep};
