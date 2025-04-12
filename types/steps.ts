// Types related to patient intake steps

// Interface for Personal Information Step Data (Based on typical fields & PatientIntakeFlow)
export interface PersonalInfoData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  preferredName?: string;
  dateOfBirth?: string; // Consider Date type if validation is client-side
  // age?: number; // Usually calculated
  phone?: string;
  email?: string;
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Demographics Step Data (Based on master.md & PatientIntakeFlow)
export interface DemographicsData {
  gender?: string;
  pronouns?: ('she_her' | 'he_him' | 'they_them' | 'other')[];
  pronounsOther?: string;
  raceEthnicity?: ('white' | 'black_african_american' | 'hispanic_latino' | 'asian' | 'native_american' | 'pacific_islander' | 'other')[];
  raceEthnicityOther?: string;
  maritalStatus?: 'single' | 'married' | 'partnered' | 'divorced' | 'widowed' | 'separated' | '';
  // employmentStatus moved to EmploymentEducationData
  // livingSituation moved to SocialFamilyHistoryData
  // veteranStatus handled by MilitaryServiceData
  primaryLanguage?: string;
  interpreterNeeded?: 'yes' | 'no' | '';
  preferredContactMethod?: ('phone' | 'email' | 'text' | 'mail')[];
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  additionalDemographicNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Cultural & Linguistic Preferences Step Data
export interface CulturalPreferencesData {
  isEnglishPrimary?: 'yes' | 'no' | '';
  primaryLanguageOther?: 'spanish' | 'chinese' | 'vietnamese' | 'russian' | 'arabic' | 'other' | '';
  primaryLanguageOtherSpecify?: string;
  interpreterRequired?: 'yes' | 'no' | '';
  // Conditional: interpreterRequired === 'yes'
  interpreterDifficultyPast?: 'yes' | 'no' | '';
  // Conditional: interpreterDifficultyPast === 'yes'
  interpreterDifficulties?: ('unavailable' | 'wrong_language' | 'confidentiality_breach' | 'bias_unprofessional' | 'poor_quality_technical')[];
  interpreterDifficultyLedToAvoidance?: 'yes' | 'no' | '';
  // Conditional: interpreterDifficultyLedToAvoidance === 'yes'
  missedAppointmentsDueToInterpreter?: 'yes' | 'no' | '';

  culturalBeliefsAffectHealthcare?: 'yes' | 'no' | '';
  // Conditional: culturalBeliefsAffectHealthcare === 'yes'
  beliefsAffectedAspects?: ('medication' | 'counseling_topics' | 'dietary' | 'provider_gender' | 'procedures_touch' | 'scheduling')[];
  // Conditional: beliefsAffectedAspects includes 'medication'
  refusedMedicationDueToBeliefs?: 'yes' | 'no' | '';
  // Conditional: refusedMedicationDueToBeliefs === 'yes'
  refusalImpactedHealth?: 'yes_significantly' | 'yes_somewhat' | 'no_not_noticeably' | '';
  // Conditional: beliefsAffectedAspects includes 'provider_gender'
  preferredProviderGender?: 'male' | 'female' | 'no_preference' | 'other' | '';
  preferredProviderGenderSpecify?: string;

  culturalEthnicBackground?: string;
  bornOutsideUSOrDifferentCulture?: 'yes' | 'no' | '';
  // Conditional: bornOutsideUSOrDifferentCulture === 'yes'
  acculturationChallenges?: 'yes' | 'no' | '';
  acculturationChallengeDescription?: string;

  culturalCommunitySupport?: 'yes' | 'no' | '';
  culturalDifferencesAffectedCare?: 'yes' | 'no' | '';
  culturalDifferencesDescription?: string;
  preferredLanguageForServices?: 'english' | 'other' | '';
  preferredLanguageForServicesSpecify?: string;
  additionalCulturalNotes?: string;

  considersSelfReligiousSpiritual?: 'yes' | 'no' | '';
  faithDescriptionSpecify?: ('christianity' | 'islam' | 'judaism' | 'hinduism' | 'buddhism' | 'indigenous' | 'other' | 'spiritual_not_religious')[];
  christianityDenomination?: string; // Conditional on 'christianity' selected
  faithDescriptionOther?: string; // Conditional on 'other' selected
  spiritualityImportance?: 'not_at_all' | 'somewhat' | 'very' | 'central' | '';
  memberOfSpiritualCommunity?: 'yes' | 'no' | '';
  communityProvidesSupport?: 'yes_alot' | 'yes_somewhat' | 'not_much' | ''; // Conditional on memberOfSpiritualCommunity === 'yes'
  personalSpiritualPractices?: ('prayer' | 'meditation' | 'yoga' | 'scripture' | 'services' | 'other')[];
  spiritualPracticesOther?: string; // Conditional on 'other' practice selected
  hasSpiritualConcerns?: 'yes' | 'no' | '';
  spiritualConcernsDescription?: string; // Conditional on hasSpiritualConcerns === 'yes'
  integrateSpiritualBeliefsTreatment?: 'yes' | 'no' | 'not_sure' | '';
  hasReligiousRestrictions?: 'yes' | 'no' | '';
  religiousRestrictionsDescription?: string; // Conditional on hasReligiousRestrictions === 'yes'
  feltUncomfortablePastCounseling?: 'yes' | 'no' | '';
  uncomfortableCounselingDetails?: string; // Conditional on feltUncomfortablePastCounseling === 'yes'
  additionalSpiritualComments?: string;

  // Allow flexibility
  [key: string]: any;
}

export interface LegalHistoryData {
  // Arrests/Charges
  everArrested?: 'yes' | 'no' | '';
  arrestsRelatedToSubstanceUse?: 'yes' | 'no' | ''; // Conditional on everArrested
  mostSeriousOffense?: 'misdemeanor' | 'felony' | 'dui_dwi' | 'drug_related' | 'other' | ''; // Conditional on everArrested
  mostSeriousOffenseOther?: string; // Conditional on mostSeriousOffense === 'other'
  // Incarceration
  everIncarcerated?: 'yes' | 'no' | '';
  incarcerationCount?: '1' | '2-5' | '>5' | ''; // Conditional on everIncarcerated
  mostRecentReleaseYear?: string; // Conditional on everIncarcerated
  releasedPast12Months?: 'yes' | 'no' | ''; // Conditional on everIncarcerated
  // Current Legal Status
  currentLegalStatus?: ('probation' | 'parole' | 'pretrial' | 'other')[]; // Changed from simple yes/no
  currentLegalStatusOther?: string; // Conditional on currentLegalStatus including 'other'
  probationOfficer?: string; // Keep conditional on 'probation' or 'parole' in currentLegalStatus?
  pendingChargesDetails?: string; // Keep conditional on 'pretrial' in currentLegalStatus?
  // Court-Ordered Treatment
  isCourtOrderedTreatment?: 'yes' | 'no' | '';
  // Legal Issues Linked to Treatment Needs
  everCourtOrderedProgram?: 'yes' | 'no' | '';
  courtOrderedProgramType?: ('substance_abuse_dui' | 'mental_health' | 'dv_anger' | 'other')[]; // Conditional on everCourtOrderedProgram
  courtOrderedProgramTypeOther?: string; // Conditional on courtOrderedProgramType including 'other'
  legalTroublesRelatedToMHSubstance?: 'yes' | 'no' | '';
  // Civil Legal Matters
  hasCivilLegalIssues?: 'yes' | 'no' | '';
  civilLegalIssuesDescription?: string; // Conditional on hasCivilLegalIssues
  // Legal Impact on Life
  legalImpactOnEmploymentHousing?: 'yes' | 'no' | '';
  concernedAboutUpcomingCourt?: 'yes' | 'no' | '';
  // Legal Support
  hasAttorney?: 'yes_public' | 'yes_private' | 'no' | ''; // Adjusted options slightly
  // Victim of Crime
  isVictimOfCrime?: 'yes' | 'no' | '';
  // Additional Information
  additionalLegalInfo?: string; // Replace the old 'pastArrests' text area

  // Allow flexibility during development
  [key: string]: any;
}

export interface MilitaryServiceData {
  servedInMilitary?: 'yes' | 'no' | '';
  // Conditional on servedInMilitary === 'yes'
  branchOfService?: ('army' | 'navy' | 'air_force' | 'marines' | 'coast_guard' | 'national_guard_reserves')[];
  lengthOfService?: '<1' | '1-3' | '3-5' | '5-10' | '10-20' | '>20' | '';
  combatExposure?: 'yes' | 'no' | '';
  // Conditional on combatExposure === 'yes'
  combatConflict?: ('vietnam' | 'gulf_war' | 'iraq_afghanistan' | 'other')[];
  combatConflictOther?: string;
  combatTroubledByExperience?: 'yes' | 'no' | '';
  // End Combat Exposure Conditional
  rankAtDischarge?: string;
  jobMOS?: string;
  dischargeType?: 'honorable' | 'general' | 'oth' | 'bad_conduct' | 'dishonorable' | 'active_reserve' | '';
  // Conditional on dischargeType === 'oth' || 'bad_conduct' || 'dishonorable'
  dischargeReason?: ('substance_use' | 'mental_health' | 'misconduct' | 'legal_issues' | 'medical' | 'other')[];
  dischargeReasonOther?: string;
  // End Discharge Reason Conditional
  dischargeImpactOnBenefits?: 'yes' | 'no' | 'na' | '';
  // Conditional on dischargeImpactOnBenefits === 'yes'
  dischargeTriedUpgrade?: 'yes' | 'no' | '';
  // End Discharge Impact Conditional
  dischargeEmotionalImpact?: 'yes' | 'no' | '';
  // Service-Related Stressors
  injuredDuringService?: 'yes' | 'no' | '';
  militarySexualTrauma?: 'yes' | 'no' | '';
  // Conditional on militarySexualTrauma === 'yes'
  mstType?: ('sexual' | 'racial_ethnic' | 'hazing_bullying' | 'physical_assault' | 'other')[];
  mstReported?: 'yes' | 'no' | '';
  // Conditional on mstReported === 'yes'
  mstReportTakenSeriously?: 'yes' | 'no' | 'na' | '';
  // End mstReported Conditional
  mstRetaliation?: 'yes' | 'no' | 'na' | '';
  mstImpactToday?: 'yes' | 'no' | '';
  mstWantSupport?: 'yes' | 'no' | '';
  // End MST Conditional
  experiencedLossDuringService?: 'yes' | 'no' | '';
  // Conditional on experiencedLossDuringService === 'yes'
  lossRelatedPtsd?: 'yes' | 'no' | '';
  // End Loss Conditional
  // Health Services
  receivedMHServicesDuringService?: 'yes' | 'no' | '';
  receivingVAServices?: 'yes' | 'no' | '';
  // Substance Use in Military
  substanceUseIncrease?: 'yes' | 'no' | '';
  // Conditional on substanceUseIncrease === 'yes'
  postServiceSubstances?: ('alcohol' | 'cannabis' | 'opioids' | 'stimulants' | 'prescription_misuse' | 'other')[];
  substanceUseAffectedCareer?: 'yes' | 'no' | '';
  soughtSubstanceTreatmentPostService?: 'yes' | 'no' | '';
  substanceUseContributedIssues?: 'yes' | 'no' | '';
  // End Substance Use Conditional
  additionalMilitaryInfo?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Social / Family History Step Data
export interface SocialFamilyHistoryData {
  // Relationships & Living Situation
  maritalStatus?: 'single' | 'married' | 'partnered' | 'divorced' | 'widowed' | 'separated' | ''; // Duplicates Demographics - decide source of truth
  livingSituation?: 'own_rent_home' | 'with_family_friends' | 'group_home' | 'shelter_transitional' | 'homeless_unstable' | 'other' | '';
  livingSituationOther?: string;
  // Conditional: if livingSituation === 'homeless_unstable' or 'shelter_transitional'
  lengthOfHomelessness?: '<1m' | '1-6m' | '6-12m' | '>1y' | '';
  reasonForHomelessness?: string;
  accessedHousingResources?: 'yes' | 'no' | '';

  children?: { name?: string; age?: string; relationship?: string; livingWithPatient?: 'yes' | 'no' | '' }[]; // Array of objects for children
  hasChildren?: 'yes' | 'no' | ''; // Simpler yes/no if details aren't needed initially
  // Conditional: hasChildren === 'yes'
  childrenCustodyIssues?: 'yes' | 'no' | '';

  // Family Origin & Current Relationships
  familyCompositionDescription?: string; // Growing up
  familyOriginDescription?: string; // Relationship quality growing up
  currentFamilyRelationshipDescription?: string; // Current quality
  familyHistoryMentalHealthSubstanceAbuse?: {
    exists?: 'yes' | 'no' | '';
    details?: string; // Which relatives, what issues
  };

  // Social Support
  socialSupportNetworkDescription?: string; // Friends, partners, community
  leisureActivitiesHobbies?: string;
  spiritualityReligionImportance?: 'very' | 'somewhat' | 'not_important' | '';
  // Conditional: spiritualityReligionImportance !== 'not_important'
  spiritualityProvidesSupport?: 'yes' | 'no' | '';
  spiritualCommunityInvolvement?: string;

  // Abuse/Neglect History (Consider moving to Trauma?)
  historyOfAbuseNeglect?: 'yes' | 'no' | 'prefer_not_to_say' | '';
  // Conditional: historyOfAbuseNeglect === 'yes'
  abuseTypes?: ('physical' | 'emotional' | 'sexual' | 'neglect')[];
  abuseDetails?: string; // Who, when, impact

  additionalSocialFamilyNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Employment & Education Data
export interface EmploymentEducationData {
  // Employment Status
  currentEmploymentStatus?: 'employed_full_time' | 'employed_part_time' | 'self_employed' | 'unemployed_seeking' | 'not_in_labor_force' | 'student' | 'homemaker_caregiver' | 'retired' | '';

  // Conditional: If Employed (full, part, self)
  occupation?: string;
  currentJobLength?: '<3m' | '1-3m' | '3-6m' | '6-12m' | '1-3y' | '3-5y' | '>5y' | '';
  // Conditional: If currentJobLength === '<3m'
  lastJobReason?: 'laid_off' | 'quit' | 'fired' | 'temp_ended' | 'other' | '';
  lastJobReasonOther?: string;
  // Conditional: If lastJobReason === 'fired' or 'quit'
  lastJobSubstanceMentalHealthRelated?: 'yes' | 'no' | '';
  // Conditional: If lastJobSubstanceMentalHealthRelated === 'yes'
  employerAware?: 'yes' | 'no' | '';
  offeredEAP?: 'yes' | 'no' | '';
  workSchedule?: 'daytime' | 'night_shifts' | 'varies' | 'na' | '';
  jobAccommodatesNeeds?: 'yes' | 'no' | 'na' | '';

  // Conditional: If Unemployed (seeking or not in labor force)
  unemployedLength?: '<1m' | '1-6m' | '6-12m' | '1-3y' | '>3y' | 'never_regular' | '';
  unemploymentReason?: 'laid_off' | 'stay_home' | 'disability_health' | 'unable_to_find' | 'other' | '';
  unemploymentReasonOther?: string;
  // Conditional: If unemployedLength === 'never_regular'
  financialSupportSources?: ('family_friends' | 'government_assistance' | 'informal_work' | 'illegal_activities' | 'charities_shelters' | 'other')[];
  financialSupportSourcesOther?: string;
  // Conditional: If financialSupportSources includes 'family_friends'
  familySupportGaps?: 'yes' | 'no' | '';
  // Conditional: If familySupportGaps === 'yes'
  gapManagementStrategies?: ('borrowed' | 'sold_items' | 'illegal_activities' | 'charity_shelter' | 'went_without' | 'other')[];
  gapManagementStrategiesOther?: string;
  // Conditional: If gapManagementStrategies includes 'illegal_activities'
  gapIllegalActivityResultedLegal?: 'yes' | 'no' | ''; // Connects to LegalHistory
  // Conditional: If gapManagementStrategies includes 'went_without'
  skippedBasicNeeds?: ('food' | 'housing' | 'healthcare' | 'hygiene' | 'transportation' | 'utilities')[];
  // Conditional: If financialSupportSources includes 'government_assistance'
  lostOrDeniedAssistance?: 'yes' | 'no' | '';
  // Conditional: If lostOrDeniedAssistance === 'yes'
  assistanceLossReason?: ('paperwork' | 'missed_appt' | 'substance_noncompliance' | 'incarceration' | 'ineligible' | 'other')[];
  assistanceLossReasonOther?: string;
  activelySeekingWork?: 'yes' | 'no' | '';
  // Conditional: If activelySeekingWork === 'no'
  notSeekingWorkReason?: string;

  // Conditional: If Student (and not employed)
  studentFinancialStrain?: 'yes' | 'no' | '';

  // Conditional: If Retired
  retirementYear?: string;
  retirementReason?: 'age' | 'medical_disability' | 'choice' | 'layoff' | '';
  financiallySecureRetirement?: 'yes' | 'no' | '';
  // Conditional: If financiallySecureRetirement === 'no'
  retirementFinancialDifficulties?: ('medical_expenses' | 'housing_costs' | 'living_expenses' | 'debt' | 'supporting_family' | 'other')[];
  retirementFinancialDifficultiesOther?: string;

  // Conditional: If Disabled (currentEmploymentStatus === 'not_in_labor_force' AND unemployedReason === 'disability_health')
  disabilityFormallyRecognized?: 'yes' | 'no' | '';
  // Conditional: If disabilityFormallyRecognized === 'yes'
  receivingDisabilityBenefits?: 'yes' | 'no' | '';
  // Conditional: If receivingDisabilityBenefits === 'no'
  notReceivingBenefitsReason?: ('denied_appealing' | 'never_applied' | 'lost_eligibility' | 'applying_awaiting' | 'unsure_how' | 'other')[];
  notReceivingBenefitsReasonOther?: string;
  // Conditional: If notReceivingBenefitsReason === 'never_applied'
  whyNeverAppliedDisability?: ('unaware' | 'complex_process' | 'didnt_think_qualify' | 'stigma' | 'other')[];
  whyNeverAppliedDisabilityOther?: string;

  // Financial Strain & Resources
  currentFinancialProblems?: 'yes' | 'no' | '';
  financialProblemsDescription?: string;
  currentIncomeSources?: ('job' | 'spouse_partner' | 'savings' | 'disability' | 'unemployment' | 'social_security_pension' | 'public_assistance' | 'family_support' | 'no_reliable')[];
  stableAffordableHousing?: 'yes' | 'no' | '';
  // Conditional: If stableAffordableHousing === 'no'
  accessedHousingResourcesCommunity?: 'yes' | 'no' | '';
  reliableTransportation?: 'yes' | 'no' | '';
  // Conditional: If reliableTransportation === 'no'
  transportationIssuesAffectTreatment?: 'yes' | 'no' | '';

  // Work/School Impact
  mhSubstanceImpactWorkFinance?: 'yes' | 'no' | '';

  // Education History
  highestEducationLevel?: 'less_than_hs' | 'hs_ged' | 'some_college_no_degree' | 'associates' | 'bachelors' | 'masters' | 'doctoral_professional' | '';
  currentlyEnrolled?: 'yes' | 'no' | '';
  // Conditional: If currentlyEnrolled === 'yes'
  schoolName?: string;
  fieldOfStudy?: string;
  expectedGraduationDate?: string;
  educationGoals?: string;
  learningDisabilityHistory?: 'yes' | 'no' | '';
  learningDisabilityDetails?: string;

  additionalEmploymentEducationNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// New interface for Employment Data
export interface EmploymentData {
  currentEmploymentStatus?: string; // Employed Full-Time, Part-Time, Self-Employed, Unemployed, Not in labor force, Student, Homemaker/Caregiver, Retired

  // If Employed
  occupation?: string;
  currentJobDuration?: string; // <3 months, 3–6 months, 6–12 months, 1–3 years, 3–5 years, >5 years
  reasonForLeavingLastJob?: string; // Laid off, Quit, Fired, Temp/contract ended, Other
  reasonForLeavingLastJobOther?: string;
  lastJobEndRelatedToIssues?: string; // yes, no
  employerAwareOfIssues?: string; // yes, no
  employerOfferedAssistance?: string; // yes, no
  workSchedule?: string; // Daytime, Night shifts, Varies, N/A
  jobAccommodatesNeeds?: string; // yes, no, n/a

  // If Unemployed
  unemployedDuration?: string; // <1 month, 1–6 months, 6–12 months, 1–3 years, >3 years, Never held a regular job
  unemploymentReason?: string; // Laid off/economy, Choosing to stay home, Disability/health issues, Unable to find work, Other
  unemploymentReasonOther?: string;
  financialSupportSourcesNeverWorked?: string[]; // Family/friends, Government assistance, Informal work, Illegal activities, Charities/shelters, Other
  financialSupportSourcesNeverWorkedOther?: string;
  familySupportGaps?: string; // yes, no
  familySupportGapManagement?: string[]; // Borrowed money, Sold items, Illegal activities, Charity/shelters, Went without basic needs, Other
  familySupportGapManagementOther?: string;
  illegalActivitiesLegalConsequences?: string; // yes, no
  skippedBasicNecessities?: string[]; // Food, Housing, Healthcare, Hygiene, Transportation, Utilities
  lostGovernmentAssistance?: string; // yes, no
  reasonLostAssistance?: string[]; // Missed paperwork, Missed appointments, Substance use non-compliance, Incarceration, No longer eligible, Other
  reasonLostAssistanceOther?: string;
  activelySeekingWork?: string; // yes, no
  reasonNotSeekingWork?: string;

  // If Student
  studentWorkingStatus?: string;
  studentOccupation?: string;
  studentHoursPerWeek?: number | string; // Use string if input type allows non-numeric initially
  studentJobRelatedToStudy?: string;
  studentFundingSources?: string[];
  studentFundingSourcesOther?: string;

  // If Retired
  retirementYear?: string;
  retirementReason?: string; // Age, Medical disability, Early retirement, Layoff
  financiallySecureRetirement?: string; // yes, no
  retirementFinancialDifficulties?: string[]; // Medical expenses, Housing costs, Daily living expenses, Debt, Supporting family, Other
  retirementFinancialDifficultiesOther?: string;
  retirementIncomeSource?: string;
  retirementIncomeSourceOther?: string;
  retirementDependents?: string;
  retirementDependentsCount?: number | string; // Use string if input type allows non-numeric initially

  // If Disabled
  disabilityRecognized?: string; // yes, no
  receivingDisabilityBenefits?: string; // yes, no
  reasonNotReceivingBenefits?: string[]; // Denied/appeals, Never applied, Lost eligibility, Applying/awaiting, Unsure how to apply, Other
  reasonNotReceivingBenefitsOther?: string;
  reasonNeverAppliedDisability?: string[]; // Unaware of process, Process too complex, Didn't think qualify, Didn't want label, Other
  reasonNeverAppliedDisabilityOther?: string;

  // General Financial
  hasFinancialStrain?: string; // yes, no
  financialStrainDescription?: string;
  incomeSources?: string[]; // Job income, Spouse/partner, Savings, Disability, Unemployment, Social Security/pension, Public assistance, Family support, No reliable income
  stableHousing?: string; // yes, no
  accessedHousingResources?: string; // yes, no
  reliableTransportation?: string; // yes, no
  transportationLackMakesTreatmentHard?: string; // yes, no
  issuesAffectedWorkFinance?: string; // yes, no
  additionalComments?: string;
}

// Interface for Education Data
export interface EducationData {
  // Educational Background
  highestEducationLevel?: string; // radio: 'no_hs', 'hs_diploma', 'ged', 'some_college', 'associate', 'bachelor', 'master', 'doctoral'
  currentlyEnrolled?: string; // radio: 'yes', 'no'
  currentEducationalSetting?: string; // radio (if enrolled=yes): 'high_school', 'ged_program', 'trade_school', 'community_college', 'undergrad', 'grad_professional', 'other'
  currentEducationalSettingOther?: string; // input (if setting=other)
  academicsAffected?: string; // radio (if enrolled=yes & in college): 'yes', 'no'
  academicImpacts?: string[]; // checkbox (if affected=yes): 'grades', 'attendance_dropped', 'concentration', 'conflict', 'missed_assignments', 'other'
  academicImpactsOther?: string; // input (if impacts=other)
  academicProbationSuspension?: string; // radio (if attendance problems): 'yes', 'no'
  soughtStudentSupport?: string; // radio (if probation=yes): 'yes', 'no'
  reasonNoSupport?: string[]; // checkbox (if soughtSupport=no): 'stigma', 'unaware', 'handle_myself', 'privacy', 'schedule', 'other'
  reasonNoSupportOther?: string; // input (if reason=other)
  academicAchievements?: string[]; // checkbox: 'hs_diploma', 'ged', 'associate', 'bachelor', 'master', 'doctorate', 'vocational', 'other_cert'
  academicAchievementsOther?: string; // input (if achievements=other_cert)
  learningDifficulties?: string; // radio: 'yes', 'no'
  learningDifficultiesArea?: string[]; // checkbox (if difficulties=yes): 'reading', 'writing', 'math', 'attention', 'other'
  learningDifficultiesAreaOther?: string; // input (if area=other)
  specialEducationIEP?: string; // radio: 'yes', 'no'
  repeatedGrade?: string; // radio: 'yes', 'no'
  droppedOut?: string; // radio: 'yes', 'no'
  highestGradeReached?: string; // input (if droppedOut=yes)
  reasonDroppedOut?: string; // input (if droppedOut=yes)
  schoolDisciplineHistory?: string[]; // checkbox: 'none', 'detention', 'suspension', 'expulsion', 'other'
  schoolDisciplineHistoryOther?: string; // input (if discipline=other)
  // Cognitive Functioning
  currentCognitiveDifficulties?: string[]; // checkbox: 'concentration', 'memory', 'processing', 'expression', 'slow_thinking', 'none'
  diagnosedDisorders?: string[]; // checkbox: 'asd', 'intellectual_disability', 'speech_language', 'learning_disorder', 'other_dev', 'none'
  diagnosedDisordersOther?: string; // input (if disorders=other_dev)
  neuropsychEvaluation?: string; // radio: 'yes', 'no'
  neuropsychEvalYear?: string; // input (if eval=yes)
  neuropsychEvalFindings?: string; // textarea (if eval=yes)
  needsAssistanceDailyTasks?: string; // radio: 'yes', 'no'
  assistanceAreas?: string[]; // checkbox (if needsAssistance=yes): 'money', 'reading_forms', 'transportation', 'other'
  assistanceAreasOther?: string; // input (if assistanceAreas=other)
  additionalComments?: string; // textarea
}

// Interface for Mental Health Step Data
export interface MentalHealthData {
  pastDiagnoses?: string[]; // e.g., ['depression', 'anxiety', 'other']
  pastDiagnosesOther?: string;
  pastOutpatientTreatment?: 'yes' | 'no' | '';
  pastPsychiatricHospitalization?: 'yes' | 'no' | '';
  hospitalizationDetails?: string;
  pastMedications?: 'yes' | 'no' | '';
  medicationDetails?: string;
  currentMentalHealthConcerns?: string;
  symptomsImpactDailyLife?: 'yes' | 'no' | '';
  symptomsImpactDetails?: string;
  // Safety Assessment
  pastSuicidalThoughts?: 'yes' | 'no' | '';
  pastSuicideAttempt?: 'yes' | 'no' | '';
  attemptDetails?: string;
  currentSuicidalThoughts?: 'frequently' | 'sometimes' | 'rarely' | 'never' | '';
  currentSuicidalPlan?: 'yes' | 'no' | '';
  suicidalPlanDetails?: string;
  currentSuicidalIntent?: 'yes' | 'no' | '';
  suicidalProtectiveFactors?: string;
  pastSelfHarm?: 'yes' | 'no' | '';
  selfHarmDetails?: string;
  currentSelfHarmUrges?: 'frequently' | 'sometimes' | 'rarely' | 'never' | '';
  currentSelfHarmActions?: 'yes' | 'no' | '';
  selfHarmActionDetails?: string;
  additionalConcerns?: string;
  // Allow flexibility
  [key: string]: any;
}

export interface SubstanceDetail {
  substance: string; // Name of the substance (e.g., 'Alcohol', 'Marijuana')
  ageFirstUse: string;
  lastUseDate: string;
  frequency: string; // e.g., 'Daily', 'Weekly', 'Monthly', 'Less than monthly'
  method: string; // e.g., 'Oral', 'Smoked', 'Injected', 'Snorted'
  amount: string; // Quantity per use occasion
  longestAbstinence: string; // Duration
  previousTreatment: 'Yes' | 'No' | '';
  treatmentType?: string; // Optional: details if previousTreatment is 'Yes'
}

export interface SubstanceUseData {
  everUsed: 'Yes' | 'No' | '';
  usedSubstancesPastYear: string[]; // Array of substance names
  substancesDetails: SubstanceDetail[]; // Details for each substance checked above
  everReceivedTreatment: 'Yes' | 'No' | '';
  treatmentHistory?: {
    type: string; // e.g., 'Inpatient', 'Outpatient', 'Detox', 'Sober Living'
    facilityName: string;
    dates: string; // e.g., 'MM/YYYY - MM/YYYY' or 'MM/YYYY'
    completed: 'Yes' | 'No' | 'Ongoing' | '';
  }[];
  readinessToChange: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | ''; // Scale 1-10
  additionalComments?: string;
}

// Interface for Trauma History Step Data
export interface TraumaHistoryData {
  experiencedTraumaticEvent?: 'yes' | 'no' | 'prefer_not_to_say' | '';
  // Conditional: experiencedTraumaticEvent === 'yes'
  traumaTypes?: ('combat' | 'physical_assault' | 'sexual_assault_abuse' | 'childhood_abuse_neglect' | 'domestic_violence' | 'serious_accident' | 'natural_disaster' | 'witness_violence_death' | 'medical_trauma' | 'other')[];
  traumaTypesOther?: string;
  // Detailed questions per type might be too much here, maybe a summary field?
  traumaDescriptionImpact?: string;
  ptsdSymptoms?: 'yes' | 'no' | '';
  // Could embed a PTSD checklist score (e.g., PCL-5)
  pcl5Score?: number;
  traumaRelatedTherapyPast?: 'yes' | 'no' | '';
  traumaRelatedTherapyCurrent?: 'yes' | 'no' | '';
  additionalTraumaNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Medical History Step Data
export interface MedicalHistoryData {
  primaryCarePhysicianName?: string;
  primaryCarePhysicianPhone?: string;
  lastPhysicalExamDate?: string;
  currentMedicalConditions?: string; // Free text for list
  // Specific conditions with yes/no if highly relevant
  hasChronicPain?: 'yes' | 'no' | '';
  hasSeizures?: 'yes' | 'no' | '';
  hasDiabetes?: 'yes' | 'no' | '';
  hasHypertension?: 'yes' | 'no' | '';
  hasLiverDisease?: 'yes' | 'no' | '';
  hasKidneyDisease?: 'yes' | 'no' | '';
  hasHeartDisease?: 'yes' | 'no' | '';
  hasRespiratoryIssues?: 'yes' | 'no' | '';
  hasNeurologicalIssues?: 'yes' | 'no' | '';
  hasInfectiousDiseases?: ('hiv' | 'hepatitis_c' | 'hepatitis_b' | 'tb' | 'other' | 'none')[];
  infectiousDiseasesOther?: string;
  pastSurgeriesHospitalizations?: string; // Free text for list/dates
  currentMedications?: { name?: string; dosage?: string; frequency?: string; prescribingDoctor?: string; reason?: string }[]; // Array of objects
  allergies?: string; // Free text (e.g., 'Penicillin - rash, Peanuts - anaphylaxis')
  dietaryRestrictions?: string;
  pregnantOrRecentlyPregnant?: 'yes' | 'no' | 'na' | '';
  // Conditional: pregnantOrRecentlyPregnant === 'yes'
  dueDateOrDeliveryDate?: string;
  prenatalCare?: 'yes' | 'no' | '';
  additionalMedicalNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Strengths & Resources Step Data
export interface StrengthsResourcesData {
  personalStrengths?: string; // Free text - patient identified
  copingSkills?: string; // Free text - strategies used
  hobbiesInterests?: string; // From social history, but re-ask focus
  supportSystem?: string; // Who is supportive (family, friends, etc.)
  motivationForChange?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | ''; // Readiness ruler (duplicates Substance Use?)
  pastSuccessesInRecovery?: string;
  communityResourcesUsed?: string; // AA/NA, support groups, etc.
  accessToTechnology?: 'yes' | 'no' | ''; // For telehealth, resources
  additionalStrengthsNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Goals for Treatment Step Data
export interface TreatmentGoalsData {
  primaryReasonSeekingTreatment?: string; // Open text
  goalsForTreatment?: string; // Open text - what patient hopes to achieve
  whatWouldRecoveryLookLike?: string; // Open text - vision for success
  willingToParticipate?: ('individual_therapy' | 'group_therapy' | 'medication_management' | 'case_management' | 'family_therapy' | 'support_groups')[];
  potentialBarriersToTreatment?: string; // Patient concerns
  additionalGoalsNotes?: string;
  // Allow flexibility
  [key: string]: any;
}

// Interface for Consent & Acknowledgments Step Data
export interface ConsentData {
  consentForTreatment?: boolean;
  consentToReleaseInfo?: boolean; // Specific releases might be separate forms
  hipaaAcknowledgement?: boolean;
  programRulesAcknowledgement?: boolean;
  financialAgreementAcknowledgement?: boolean;
  telehealthConsent?: boolean; // If applicable
  // Add specific signature fields if needed electronically
  patientSignature?: string; // Or a boolean indicating signed
  dateSigned?: string; // Consider Date type
  witnessSignature?: string;
  // Allow flexibility
  [key: string]: any;
}