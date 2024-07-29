"use client";

import {useState} from "react";

import {CreateStep} from "./create-step";
import {FirstCreateStep} from "./first-create-step";
import {SecondCreateStep} from "./second-create-step";

import {Separator} from "@/components/ui/separator";

const steps = [
  {number: 1, name: "Upload your file", completed: false, component: FirstCreateStep},
  {number: 2, name: "Confirm details", completed: false, component: SecondCreateStep},
];

function CreateDocumentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  const handleStep = (direction: "next" | "back") => {
    if (direction === "next" && currentStep <= 2) setCurrentStep((prevStep) => prevStep + 1);
    if (direction === "back" && currentStep > 1) setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStepComplete = (stepNumber: number) => {
    setCompletedSteps((prevSteps) => [...prevSteps, stepNumber]);
  };

  return (
    <div className='flex h-full w-full flex-col gap-y-2'>
      {steps.map(({number, name, completed, component: Component}) => (
        <CreateStep
          key={number}
          completedSteps={completedSteps}
          currentStep={currentStep}
          handleStep={handleStep}
          handleStepComplete={handleStepComplete}
          setCurrentStep={setCurrentStep}
          stepDescription={completed ? "Completed" : ""}
          stepName={name}
          stepNumber={number}
        >
          <Component handleStep={handleStep} handleStepComplete={handleStepComplete} />
        </CreateStep>
      ))}
    </div>
  );
}

export {CreateDocumentWizard};
