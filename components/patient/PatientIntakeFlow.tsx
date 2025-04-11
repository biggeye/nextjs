// components/patient/PatientIntakeFlow.tsx
"use client"

import { useState } from "react"
import { Stepper } from "@/components/patient/Stepper"
import { PersonalInfoStep, PersonalInfoData } from "@/components/patient/steps/PersonalInfoStep"
import { DemographicsStep, DemographicsData } from "@/components/patient/steps/DemographicsStep"
import { CulturalPreferencesStep, CulturalPreferencesData } from "@/components/patient/steps/CulturalPreferencesStep"
import { MilitaryServiceStep, MilitaryServiceData } from "@/components/patient/steps/MilitaryServiceStep"
import { SubstanceUseStep, SubstanceUseData } from "@/components/patient/steps/SubstanceUseStep"
import { MentalHealthStep, MentalHealthData } from "@/components/patient/steps/MentalHealthStep"
import { LegalHistoryStep, LegalHistoryData } from "@/components/patient/steps/LegalHistoryStep"
import { ReviewSubmitStep } from "@/components/patient/steps/ReviewSubmitStep"
import { SocialFamilyHistoryStep, SocialFamilyHistoryData } from "./steps/SocialFamilyHistoryStep"
import { EmploymentEducationStep, EmploymentEducationData } from "./steps/EmploymentEducationStep"

// Define interfaces for the different data types

export interface PatientData {
  personalInfo: PersonalInfoData;
  demographics: DemographicsData;
  culturalPreferences: CulturalPreferencesData;
  military: MilitaryServiceData;
  substance: SubstanceUseData;
  mentalHealth: MentalHealthData;
  legalHistory: LegalHistoryData;
  employmentEducation: EmploymentEducationData;
  socialFamilyHistory: SocialFamilyHistoryData;
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
      city: "",
      state: "",
      zip: "",
      emergencyContact: "",
      emergencyPhone: ""
    },
    demographics: {},
    culturalPreferences: {},
    military: {},
    substance: {
      everUsed: '',
      usedSubstancesPastYear: [],
      substancesDetails: [],
      everReceivedTreatment: '',
      readinessToChange: '',
    },
    mentalHealth: {},
    legalHistory: {},
    employmentEducation: {},
    socialFamilyHistory: {
      maritalStatus: '',
      livingSituation: '',
      children: [],
      familyCompositionDescription: '',
      familyOriginDescription: '',
      currentFamilyRelationshipDescription: '',
      familyHistoryMentalHealthSubstanceAbuse: {
        exists: '',
        details: ''
      }
    },
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
            personalInfo={patientData.personalInfo} 
            updateData={updateData} 
            onNext={handleNext}
          />
        )}
        
        {currentStep === 1 && (
          <DemographicsStep 
            demographics={patientData.demographics} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 2 && (
          <LegalHistoryStep 
            legalHistory={patientData.legalHistory} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
            
        {currentStep === 3 && (
          <MilitaryServiceStep 
            militaryService={patientData.military} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 4 && (
          <EmploymentEducationStep
            employmentEducation={patientData.employmentEducation} 
            updateData={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <CulturalPreferencesStep 
            culturalPreferences={patientData.culturalPreferences} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 6 && (
          <SocialFamilyHistoryStep 
            socialFamilyHistory={patientData.socialFamilyHistory} 
            updateData={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 7 && (
          <MentalHealthStep 
            mentalHealth={patientData.mentalHealth} 
            updateData={updateData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        
        {currentStep === 8 && (
          <SubstanceUseStep 
            substance={patientData.substance} 
            updateData={updateData} 
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