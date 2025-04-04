// components/patient/PatientIntakeFlow.tsx
"use client"

import { useState } from "react"
import { Stepper } from "@/components/patient/Stepper"
import { PersonalInfoStep } from "@/components/patient/steps/PersonalInfoStep"
import { DemographicsStep } from "@/components/patient/steps/DemographicsStep"
import { CulturalPreferencesStep } from "@/components/patient/steps/CulturalPreferencesStep"
import { MilitaryServiceStep } from "@/components/patient/steps/MilitaryServiceStep"
import { SubstanceUseStep } from "@/components/patient/steps/SubstanceUseStep"
import { MentalHealthStep } from "@/components/patient/steps/MentalHealthStep"
import { LegalHistoryStep } from "@/components/patient/steps/LegalHistoryStep"
import { ReviewSubmitStep } from "@/components/patient/steps/ReviewSubmitStep"
import { SocialFamilyHistoryStep } from "./steps/SocialFamilyHistoryStep"
import { EmploymentEducationStep } from "./steps/EmploymentEducationStep"

export function PatientIntakeFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [patientData, setPatientData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: ""
    },
    demographics: {},
    cultural: {},
    military: {},
    substance: {},
    mentalHealth: {},
    legalHistory: {}
  })

  const steps = [
    "Personal Information",
    "Demographics",
    "Legal History",
    "Military Service",
    "Employment & Education",
    "Cultural Preferences", 
    "Social / Family History",
    "Mental Health",
    "Substance Use",
    "Review & Submit"
  ]

  const handleStepClick = (step: number) => {
    // Only allow clicking on completed steps or the next available step
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (newData: any) => {
    setPatientData({
      ...patientData,
      ...newData
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <Stepper 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
      />
      
      <div className="mt-8">
        {currentStep === 0 && (
          <PersonalInfoStep 
            data={patientData.personalInfo} 
            updateData={(data) => updateData({ personalInfo: { ...patientData.personalInfo, ...data } })} 
            onNext={handleNext}
          />
        )}
        
        {currentStep === 1 && (
          <DemographicsStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
                {currentStep === 2 && (
          <LegalHistoryStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
            
            {currentStep === 3 && (
          <MilitaryServiceStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep ===4 && (
          <EmploymentEducationStep
            data={patientData} 
            onNext={handleNext}
          onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <CulturalPreferencesStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 6 && (
          <SocialFamilyHistoryStep 
            data={patientData} 
            updateData={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

{currentStep === 7 && (
          <MentalHealthStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 8 && (
          <SubstanceUseStep 
            data={patientData} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
      
        {currentStep === 9 && (
          <ReviewSubmitStep 
            data={patientData} 
            onBack={handleBack} 
            onSubmit={() => console.log("Submitting data:", patientData)}
          />
        )}
      </div>
    </div>
  )
}