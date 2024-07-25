"use client";
import React from "react";

interface CreateStepProps {
  children: React.ReactNode;
  currentStep: number;
  stepNumber: number;
  stepName: string;
  stepDescription?: string;
  completedSteps: number[];
  handleStep: (direction: "next" | "back") => void;
  handleStepComplete: (stepNumber: number) => void;
  setCurrentStep: (step: number) => void;
}

function CreateStep({
  children,
  currentStep,
  stepNumber,
  stepName,
  setCurrentStep,
  completedSteps,
}: CreateStepProps) {
  const isActive = currentStep === stepNumber;

  if (!isActive)
    return (
      <button
        className='flex w-full gap-x-4 rounded-lg border p-4 disabled:opacity-50'
        disabled={!completedSteps.includes(stepNumber - 1)}
        type='button'
        onClick={() => setCurrentStep(stepNumber)}
      >
        <p className='text-2xl font-bold'>{stepNumber}</p>
        <p className='text-2xl font-bold'>{stepName}</p>
      </button>
    );

  return (
    <div className='flex h-full w-full flex-col gap-y-2 rounded-lg border p-4'>
      <header className='flex items-center gap-x-3'>
        <p className='text-2xl font-bold'>{`${stepNumber}.`}</p>
        <p className='text-2xl font-bold'>{stepName}</p>
      </header>
      <section className='flex h-full w-full'>{children}</section>
    </div>
  );
}

export {CreateStep};
