"use client"

import React from "react";
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Element */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onStepClick?.(index)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors relative",
                index < currentStep
                  ? "bg-primary text-white cursor-pointer"
                  : index === currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500",
                onStepClick && index <= currentStep ? "cursor-pointer" : "cursor-default"
              )}
              disabled={!onStepClick || index > currentStep}
            >
              {index < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{index + 1}</span>}
            </button>
            <span
              className={cn(
                "text-xs mt-2 text-center font-medium w-20 truncate",
                index <= currentStep ? "text-primary" : "text-gray-500"
              )}
            >
              {step}
            </span>
          </div>

          {/* Connector Line (Rendered Between Steps) */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-grow h-[2px] mx-1",
                index < currentStep ? "bg-primary" : "bg-gray-200",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
