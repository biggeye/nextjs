// types/patient.ts

import type {
  PersonalInfoData,
  DemographicsData,
  CulturalPreferencesData,
  MilitaryServiceData,
  SubstanceUseData,
  MentalHealthData,
  LegalHistoryData,
  SocialFamilyHistoryData,
  TraumaHistoryData,
  MedicalHistoryData,
  StrengthsResourcesData,
  TreatmentGoalsData,
  ConsentData,
  EmploymentData,
  EducationData,
} from "./steps";

/**
 * Represents the comprehensive data collected throughout the patient intake flow.
 * Each key corresponds to a specific step/section of the intake process.
 */
export interface PatientData {
  personalInfo?: PersonalInfoData;
  demographics?: DemographicsData;
  culturalPreferences?: CulturalPreferencesData;
  socialFamilyHistory?: SocialFamilyHistoryData;
  education?: EducationData;
  military?: MilitaryServiceData; // Corresponds to MilitaryServiceStep
  legalHistory?: LegalHistoryData;
  substance?: SubstanceUseData; // Corresponds to SubstanceUseStep
  mentalHealth?: MentalHealthData;
  traumaHistory?: TraumaHistoryData;
  medicalHistory?: MedicalHistoryData;
  strengthsResources?: StrengthsResourcesData;
  treatmentGoals?: TreatmentGoalsData;
  consent?: ConsentData;
  employment?: EmploymentData;
}
