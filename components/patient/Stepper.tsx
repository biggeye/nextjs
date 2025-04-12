"use client"

import React from "react";
import { cn } from "@/lib/utils"
import { CheckCircle2, MoreHorizontal } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

// Helper component for rendering a single step element (button + label)
const StepElement = ({
  index,
  step,
  currentStep,
  isCompleted,
  isActive,
  onStepClick,
}: {
  index: number;
  step: string | React.ReactNode;
  currentStep: number;
  isCompleted: boolean;
  isActive: boolean;
  onStepClick?: (step: number) => void;
}) => {
  const canClick = onStepClick && isCompleted;
  const isIconStep = typeof step !== 'string'; // Check if it's the '...' icon

  return (
    <div className={cn("flex flex-col items-center", isIconStep ? "px-1" : "")}>
      <button
        onClick={() => canClick && onStepClick?.(index)}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors relative shrink-0",
          isCompleted && !isIconStep
            ? "bg-primary text-primary-foreground"
            : isActive && !isIconStep
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          canClick ? "cursor-pointer hover:bg-primary/90" : isIconStep ? "cursor-default" : "cursor-default"
        )}
        disabled={!canClick && !isIconStep}
        aria-label={typeof step === 'string' ? `Step ${index + 1}: ${step}` : 'Intermediate steps'}
      >
        {isCompleted && !isActive && !isIconStep ? <CheckCircle2 className="h-5 w-5" /> : 
         isIconStep ? step : 
         <span>{index + 1}</span>}
      </button>
      <span
        className={cn(
          "text-xs mt-2 text-center font-medium w-20 truncate",
          (isCompleted || isActive) && !isIconStep ? "text-primary" : "text-muted-foreground"
        )}
      >
        {typeof step === 'string' ? step : ''}
      </span>
    </div>
  );
};

// Helper component for the connector line
const Connector = ({ isCompleted }: { isCompleted: boolean }) => (
  <div
    className={cn(
      "flex-grow h-[2px] mx-1",
      isCompleted ? "bg-primary" : "bg-muted",
    )}
  />
);

// Main Stepper Component
export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const lastStepIndex = steps.length - 1;

  return (
    <div className="w-full">
      {/* Desktop View (Medium screens and up) - Shows all steps */}
      <div className="hidden md:flex items-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={`desktop-${index}`}>
            <StepElement
              index={index}
              step={step}
              currentStep={currentStep}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              onStepClick={onStepClick}
            />
            {index < lastStepIndex && <Connector isCompleted={index < currentStep} />}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile View (Small screens) - Shows truncated steps */}
      <div className="flex md:hidden items-center w-full justify-between">
        {/* First Step */}
        <StepElement
          index={0}
          step={steps[0]}
          currentStep={currentStep}
          isCompleted={0 < currentStep}
          isActive={0 === currentStep}
          onStepClick={onStepClick}
        />

        {/* Ellipsis after first step */}
        {currentStep > 1 && (
          <>
            <Connector isCompleted={0 < currentStep} />
             <StepElement 
               index={-1} // Placeholder index for ellipsis
               step={<MoreHorizontal className="h-5 w-5 text-muted-foreground" />} 
               currentStep={currentStep} 
               isCompleted={false} 
               isActive={false} 
             />
          </>
        )}
        
        {/* Connector before current step (if needed) */}
        {currentStep > 0 && currentStep < lastStepIndex && (
           <Connector isCompleted={currentStep > 1} />
        )}

        {/* Current Step (only if it's not the first or last) */}
        {currentStep > 0 && currentStep < lastStepIndex && (
          <StepElement
            index={currentStep}
            step={steps[currentStep]}
            currentStep={currentStep}
            isCompleted={false} // Current step is not "completed"
            isActive={true}
            onStepClick={onStepClick}
          />
        )}

        {/* Ellipsis before last step */}
         {currentStep < lastStepIndex - 1 && (
           <>
             <Connector isCompleted={currentStep === lastStepIndex -1 } /> 
             <StepElement 
               index={-2} // Placeholder index for ellipsis
               step={<MoreHorizontal className="h-5 w-5 text-muted-foreground" />} 
               currentStep={currentStep} 
               isCompleted={false} 
               isActive={false} 
             />
           </>
         )}

        {/* Connector before last step (if needed) */}
         {currentStep < lastStepIndex && (
           <Connector isCompleted={currentStep === lastStepIndex} />
         )}

        {/* Last Step */}
        <StepElement
          index={lastStepIndex}
          step={steps[lastStepIndex]}
          currentStep={currentStep}
          isCompleted={lastStepIndex < currentStep}
          isActive={lastStepIndex === currentStep}
          onStepClick={onStepClick}
        />
      </div>
    </div>
  );
}