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

// Define interfaces for the different data types
interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface PatientData {
  personalInfo: PersonalInfo;
  demographics: Record<string, any>;
  cultural: Record<string, any>;
  military: Record<string, any>;
  substance: Record<string, any>;
  mentalHealth: Record<string, any>;
  legalHistory: Record<string, any>;
  employmentEducation: Record<string, any>;
  socialFamilyHistory: Record<string, any>;
}

interface PatientIntakeFlowProps {
  patientId?: string;
}

export function PatientIntakeFlow({ patientId }: PatientIntakeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [patientData, setPatientData] = useState<PatientData>({
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
    legalHistory: {},
    employmentEducation: {},
    socialFamilyHistory: {}
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

  const updateData = (newData: Partial<PatientData>) => {
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
            data={patientData.demographics} 
            updateData={(data) => updateData({ demographics: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 2 && (
          <LegalHistoryStep 
            data={patientData.legalHistory} 
            updateData={(data) => updateData({ legalHistory: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
            
        {currentStep === 3 && (
          <MilitaryServiceStep 
            data={patientData.military} 
            updateData={(data) => updateData({ military: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 4 && (
          <EmploymentEducationStep
            data={patientData.employmentEducation} 
            updateData={(data) => updateData({ employmentEducation: data })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <CulturalPreferencesStep 
            data={patientData.cultural} 
            updateData={(data) => updateData({ cultural: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 6 && (
          <SocialFamilyHistoryStep 
            data={patientData.socialFamilyHistory} 
            updateData={(data) => updateData({ socialFamilyHistory: data })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 7 && (
          <MentalHealthStep 
            data={patientData.mentalHealth} 
            updateData={(data) => updateData({ mentalHealth: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 8 && (
          <SubstanceUseStep 
            data={patientData.substance} 
            updateData={(data) => updateData({ substance: data })} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
      
        {currentStep === 9 && (
          <ReviewSubmitStep 
            data={patientData} 
            updateData={updateData}
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  )
}