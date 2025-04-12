// components/patient/steps/ReviewSubmitStep.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"
import { PatientData } from "@/types/patient" // Assuming this path is correct

// Define the props for the component
interface ReviewSubmitStepProps {
  patientData: PatientData;
  onSubmit: () => Promise<void>; // Function to call on final submission
  onBack: () => void;
  isSubmitting: boolean; // Flag to indicate if submission is in progress
}

// Helper function to display values nicely
const formatValue = (value: any): string => {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "None";
  }
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No";
  }
  // Add formatting for dates if needed
  // if (value instanceof Date) { ... }
  return String(value);
};

// Helper component/function to render fields for a section
const renderSectionFields = (data: Record<string, any> | null | undefined) => {
  if (!data) return <p className="text-muted-foreground">No data provided for this section.</p>;

  const entries = Object.entries(data);
  if (entries.length === 0) return <p className="text-muted-foreground">No data provided for this section.</p>;

  // Example: Manually map known fields to labels
  // You might need a more sophisticated approach based on your exact types
  const fieldLabels: Record<string, string> = {
    // Personal Info
    firstName: "First Name", lastName: "Last Name", dateOfBirth: "Date of Birth", email: "Email", phone: "Phone",
    address: "Address", city: "City", state: "State", zip: "Zip", emergencyContact: "Emergency Contact", emergencyPhone: "Emergency Phone",
    // Demographics
    gender: "Gender", race: "Race/Ethnicity", preferredLanguage: "Preferred Language", requiresInterpreter: "Interpreter Required",
    // Education
    highestLevel: "Highest Education Level", schoolName: "School Name", fieldOfStudy: "Field of Study", graduationYear: "Graduation Year",
    // Employment
    employmentStatus: "Employment Status", occupation: "Occupation", employer: "Employer", workAddress: "Work Address", workPhone: "Work Phone",
    // Military
    branch: "Branch", rank: "Rank", yearsOfService: "Years of Service", dischargeStatus: "Discharge Status", deployed: "Deployed", deploymentLocations: "Deployment Locations",
    // Legal
    probationOrParole: "Probation/Parole", probationOfficerName: "PO Name", probationOfficerContact: "PO Contact", pendingCharges: "Pending Charges", pastConvictions: "Past Convictions",
    // Cultural
    culturalBackground: "Cultural Background", spiritualBeliefs: "Spiritual Beliefs", specificNeeds: "Specific Needs/Preferences",
    // Social/Family
    livingStatus: "Living Situation", unstableDuration: "Unstable Duration", instabilityCause: "Cause of Instability", experiencedViolence: "Experienced Violence", familyRelationships: "Family Relationships", abuseHistory: "Abuse History", experiencedTrauma: "Experienced Trauma", traumaType: "Trauma Type",
    // Mental Health (Example fields)
    diagnosedConditions: "Diagnosed Conditions", currentSymptoms: "Current Symptoms", pastTreatment: "Past Treatment", medication: "Medication", suicidalThoughts: "Suicidal Thoughts", selfHarmHistory: "Self-Harm History",
    // Substance Use (Example fields)
    everUsed: "Ever Used Substances", usedSubstancesPastYear: "Used Past Year", substancesDetails: "Substance Details", everReceivedTreatment: "Received Treatment", readinessToChange: "Readiness to Change",
    // Add other sections/fields as needed
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      {entries.map(([key, value]) => (
        <div key={key}>
          <span className="font-medium">{fieldLabels[key] || key}:</span>{" "}
          {formatValue(value)}
          {/* If value is an object (like substancesDetails), you might need custom rendering */}
          {key === 'substancesDetails' && Array.isArray(value) && (
             <div className="pl-4 mt-1 text-sm space-y-1">
               {value.map((detail: any, index: number) => (
                 <div key={index} className="border-l-2 pl-2">
                   <div>Substance: {detail.substance}</div>
                   <div>Frequency: {detail.frequency}</div>
                   <div>Amount: {detail.amount}</div>
                   <div>Last Use: {detail.lastUse}</div>
                 </div>
               ))}
             </div>
          )}
        </div>
      ))}
       {data.additionalDetails && (
         <div className="col-span-1 md:col-span-2 mt-2">
           <span className="font-medium">Additional Details:</span>
           <p className="mt-1 p-2 bg-gray-50 rounded-md whitespace-pre-wrap text-sm">
             {formatValue(data.additionalDetails)}
           </p>
         </div>
       )}
    </div>
  );
};


export function ReviewSubmitStep({ patientData, onSubmit, onBack, isSubmitting }: ReviewSubmitStepProps) {
  // Define all sections based on PatientData keys
  const allSections = Object.keys(patientData).filter(key => typeof patientData[key as keyof PatientData] === 'object' && patientData[key as keyof PatientData] !== null);

  const initialExpandedState = allSections.reduce((acc, section) => {
    // Example: Expand personalInfo and consent by default, collapse others
    acc[section] = ['personalInfo', 'consent'].includes(section);
    return acc;
  }, {} as Record<string, boolean>);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(initialExpandedState);
  const [consentChecked, setConsentChecked] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Map keys to display names
  const sectionDisplayNames: Record<keyof PatientData | string, string> = {
    personalInfo: "Personal Information",
    demographics: "Demographics",
    education: "Education History",
    employment: "Employment History",
    military: "Military Service",
    legalHistory: "Legal History",
    culturalPreferences: "Cultural Preferences",
    socialFamilyHistory: "Social & Family History",
    mentalHealth: "Mental Health History",
    substance: "Substance Use History",
    traumaHistory: "Trauma History",
    medicalHistory: "Medical History",
    strengthsResources: "Strengths & Resources",
    treatmentGoals: "Treatment Goals",
    consent: "Consent & Signatures" // Assuming consent is part of patientData
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-3">Review & Submit</h2>
        <p className="text-muted-foreground mb-6">
          Please review all your information carefully before submitting. You can use the back button to navigate to previous steps and make changes if needed.
        </p>
      </div>

      {/* Dynamically render sections */}
      {allSections.map((sectionKey) => {
        const sectionData = patientData[sectionKey as keyof PatientData];
        // Skip rendering if data is explicitly null or undefined, or maybe empty object for non-consent sections?
        if (!sectionData && sectionKey !== 'consent') return null;
        // Skip rendering sections we don't have a display name for (optional)
        if (!sectionDisplayNames[sectionKey]) return null;

        return (
          <div key={sectionKey} className="border rounded-md overflow-hidden shadow-sm">
            <div
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => toggleSection(sectionKey)}
            >
              <h3 className="text-lg font-medium">{sectionDisplayNames[sectionKey]}</h3>
              <Button variant="ghost" size="sm" aria-label={expandedSections[sectionKey] ? 'Collapse section' : 'Expand section'}>
                {expandedSections[sectionKey] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>

            {expandedSections[sectionKey] && (
              <div className="p-4 space-y-4 border-t">
                {/* Render fields specific to the consent section or use the helper */}
                {sectionKey === 'consent' ? (
                   <div>Consent fields here... (e.g., checkboxes, signature areas)</div>
                ) : (
                   renderSectionFields(sectionData as Record<string, any>)
                )}
              </div>
            )}
          </div>
        );
      })}


      {/* Consent Checkbox */}
      <div className="border rounded-md p-4 space-y-4 shadow-sm">
         <h3 className="text-lg font-medium mb-2">Consent</h3>
         <p className="text-sm text-muted-foreground">
             [Insert your consent statement here. Example: I confirm that the information provided is accurate to the best of my knowledge and consent to its use for treatment purposes.]
         </p>
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="consent"
            checked={consentChecked}
            onCheckedChange={(checked) => setConsentChecked(Boolean(checked))}
            aria-label="Consent to submit information"
          />
          <Label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I have reviewed the information and confirm it is accurate.
          </Label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          type="button" // Changed from submit to prevent default form submission if wrapped in form
          onClick={onSubmit}
          disabled={!consentChecked || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Intake Form"}
        </Button>
      </div>
    </div>
  )
}
