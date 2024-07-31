"use client";
import {motion} from "framer-motion";
import React, {useEffect} from "react";

import {variants} from "./anim";

import {cn} from "@/lib/utils/cn";

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
  const [isActive, setIsActive] = React.useState(currentStep === stepNumber - 1);

  useEffect(() => {
    setIsActive(currentStep === stepNumber);
  }, [currentStep, stepNumber, setCurrentStep]);

  return (
    <article
      className={cn(
        "grid h-fit min-h-0 w-full grow grid-rows-[40px_1fr] rounded-lg border border-border p-2 transition-all duration-300",
        !isActive && "grow-0",
      )}
    >
      <button
        className={cn("flex items-center gap-x-4 leading-none disabled:opacity-50")}
        disabled={!completedSteps.includes(stepNumber - 1) && !isActive}
        type='button'
        onClick={() => setCurrentStep(stepNumber)}
      >
        <p className='flex aspect-[1/1] h-[40px] items-center justify-center rounded-md bg-primary/20 p-2.5 text-center text-2xl font-bold'>{`${stepNumber}.`}</p>
        <p className='text-2xl font-bold'>{stepName}</p>
      </button>
      <motion.section
        animate={isActive ? "show" : "hide"}
        className={cn("flex w-full flex-col gap-y-2 overflow-hidden xs:pl-14")}
        initial={false}
        variants={variants}
      >
        {children}
      </motion.section>
    </article>
  );
}

export {CreateStep};
