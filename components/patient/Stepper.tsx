"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative">
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "absolute top-4 w-full h-[2px] right-1/2",
                index < currentStep ? "bg-primary" : "bg-gray-200",
              )}
            />
          )}

          {/* Step circle */}
          <button
            onClick={() => onStepClick?.(index)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors",
              index < currentStep
                ? "bg-primary text-white cursor-pointer"
                : index === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed",
            )}
            disabled={index > currentStep}
          >
            {index < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{index + 1}</span>}
          </button>

          {/* Step label */}
          <span className={cn("text-xs mt-2 font-medium", index <= currentStep ? "text-primary" : "text-gray-500")}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}

