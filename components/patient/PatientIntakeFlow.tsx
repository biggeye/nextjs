// components/patient/PatientIntakeFlow.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"; 
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
import { EmploymentStep } from "./steps/EmploymentStep"
import { EducationStep } from "./steps/EducationStep"
import { PatientData } from "@/types/patient"; 
import { 
  PersonalInfoData, 
  DemographicsData, 
  CulturalPreferencesData, 
  MilitaryServiceData, 
  SubstanceUseData, 
  MentalHealthData, 
  LegalHistoryData, 
  EmploymentData,
  EducationData, 
  SocialFamilyHistoryData,
  ConsentData
} from "@/types/steps";
import { submitIntake } from '@/app/intake/actions';

interface PatientIntakeFlowProps {
  patientId?: string;
}

const defaultPersonalInfo: PersonalInfoData = {
  firstName: '', lastName: '', dateOfBirth: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', emergencyContact: '', emergencyPhone: '',
};
const defaultDemographics: DemographicsData = {}; 
const defaultLegalHistory: LegalHistoryData = {}; 
const defaultMilitaryService: MilitaryServiceData = {}; 
const defaultCulturalPreferences: CulturalPreferencesData = {}; 
const defaultSocialFamilyHistory: SocialFamilyHistoryData = {}; 
const defaultMentalHealth: MentalHealthData = {}; 
const defaultEducation: EducationData = {};
const defaultEmployment: EmploymentData = {};
const defaultSubstanceUse: SubstanceUseData = {
  everUsed: '', usedSubstancesPastYear: [], substancesDetails: [],
  everReceivedTreatment: '', readinessToChange: '',
};
const defaultConsent: ConsentData = {};

export function PatientIntakeFlow({ patientId }: PatientIntakeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [patientData, setPatientData] = useState<PatientData>({
    personalInfo: defaultPersonalInfo,
    demographics: defaultDemographics,
    culturalPreferences: defaultCulturalPreferences,
    socialFamilyHistory: defaultSocialFamilyHistory,
    education: defaultEducation,
    employment: defaultEmployment,
    military: defaultMilitaryService,
    legalHistory: defaultLegalHistory,
    substance: defaultSubstanceUse,
    mentalHealth: defaultMentalHealth,
    traumaHistory: {},
    medicalHistory: {},
    strengthsResources: {},
    treatmentGoals: {},
    consent: defaultConsent,
  })

  const steps = [
    "Personal Info",
    "Demographics",
    "Education",
    "Employment",
    "Military Service",
    "Legal History",
    "Cultural Preferences",
    "Social & Family History",
    "Mental Health",
    "Substance Use",
    "Review & Submit"
  ]

  // Centralized update function with improved generics for type safety
  const updateData = <
    K extends keyof PatientData, 
    F extends keyof NonNullable<PatientData[K]>
  >(
    stepKey: K,
    field: F,
    value: NonNullable<PatientData[K]>[F]
  ) => {
    setPatientData(prev => ({
      ...prev,
      [stepKey]: {
        ...(prev[stepKey] ?? {}),
        [field]: value,
      }
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    toast.info("Submitting intake form..."); 
    try {
      const result = await submitIntake(patientData, patientId); 

      if (result.success) {
        toast.success("Intake submitted successfully!");
      } else {
        toast.error(`Submission failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            personalInfo={patientData.personalInfo || defaultPersonalInfo}
            updateData={(field: keyof PersonalInfoData, value: any) => updateData('personalInfo', field, value)}
            onNext={handleNext}
          />
        )
      case 1:
        return (
          <DemographicsStep
            demographics={patientData.demographics || defaultDemographics} 
            updateData={(field: keyof DemographicsData, value: any) => updateData('demographics', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
        case 2:
          return (
            <EducationStep
              education={patientData.education || defaultEducation}
              updateData={(field: keyof EducationData, value: any) => updateData('education', field, value)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )
        case 3:
          return (
            <EmploymentStep
              employment={patientData.employment || defaultEmployment}
              updateData={(field: keyof EmploymentData, value: any) => updateData('employment', field, value)}
              onNext={handleNext}
              onBack={handleBack}
            />
          )
          case 4:
            return (
              <MilitaryServiceStep
                militaryService={patientData.military || defaultMilitaryService}
                updateData={(field: keyof MilitaryServiceData, value: any) => updateData('military', field, value)}
                onNext={handleNext}
                onBack={handleBack}
              />
            )
      case 5:
        return (
          <LegalHistoryStep
            legalHistory={patientData.legalHistory || defaultLegalHistory}
            updateData={(field: keyof LegalHistoryData, value: any) => updateData('legalHistory', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 6:
        return (
          <CulturalPreferencesStep
            culturalPreferences={patientData.culturalPreferences || defaultCulturalPreferences}
            updateData={(field: keyof CulturalPreferencesData, value: any) => updateData('culturalPreferences', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 7:
        return (
          <SocialFamilyHistoryStep
            socialFamilyHistory={patientData.socialFamilyHistory || defaultSocialFamilyHistory}
            updateData={(field: keyof SocialFamilyHistoryData, value: any) => updateData('socialFamilyHistory', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 8:
        return (
          <MentalHealthStep
            mentalHealth={patientData.mentalHealth || defaultMentalHealth}
            updateData={(field: keyof MentalHealthData, value: any) => updateData('mentalHealth', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 9:
        return (
          <SubstanceUseStep
            substance={patientData.substance || defaultSubstanceUse}
            updateData={(field: keyof SubstanceUseData, value: any) => updateData('substance', field, value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 10:
        return (
          <ReviewSubmitStep
            patientData={patientData} 
            onBack={handleBack}
            onSubmit={handleFinalSubmit} 
            isSubmitting={isSubmitting} 
          />
        )
      default:
        return <div>Unknown Step</div>
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="mt-8">
        {renderStep()}
      </div>
    </div>
  )
}