"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Stepper } from "./Stepper"
import { SocialFamilyHistoryStep } from "./steps/SocialFamilyHistoryStep"
import { EmploymentEducationStep } from "./steps/EmploymentEducationStep"
import { MilitaryServiceStep } from "./steps/MilitaryServiceStep"
import { ReviewSubmitStep } from "./steps/ReviewSubmitStep"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface PatientPreAssessmentProps {
  patientId: string
  assessmentId?: string
}

export default function PatientPreAssessment({ patientId, assessmentId }: PatientPreAssessmentProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    socialFamilyHistory: {
      livingStatus: "",
      unstableDuration: "",
      instabilityCause: "",
      shelterUse: "",
      experiencedViolence: "",
      mentalHealthImpact: "",
      seekingHousing: "",
      livingWithStability: "",
      householdSupport: "",
      recoveryConflicts: "",
      askedToLeave: "",
      householdSubstanceUse: "",
      comfortableSeekingHelp: "",
      familyRelationships: "",
      strainedReason: "",
      familyConflictsImpact: "",
      abuseHistory: [] as string[],
      abuseImpact: "",
      traumaTreatment: "",
      outsideSupport: "",
      friendshipsImpacted: "",
      lostRelationships: "",
      communityInvolvement: "",
      socialIsolation: "",
      wantSocialHelp: "",
      experiencedTrauma: "",
      traumaType: [] as string[],
      traumaRelated: "",
      traumaRecoveryImpact: "",
      additionalDetails: "",
    },
    employmentEducation: {
      employmentStatus: "",
      lastEmployment: "",
      supportMethod: "",
      periodsWithoutSupport: "",
      managementMethod: [] as string[],
      legalConsequences: "",
      consequenceTypes: [] as string[],
      skippedNecessities: [] as string[],
      lostAssistance: "",
      assistanceLossReason: [] as string[],
      currentJobDuration: "",
      jobEndReason: "",
      substanceUseNoticed: "",
      jobLossDiscipline: "",
      offeredReferral: "",
      conflictType: [] as string[],
      educationalSetting: "",
      academicsImpacted: "",
      academicImpactType: [] as string[],
      attendanceIssues: "",
      soughtAssistance: "",
      noAssistanceReason: [] as string[],
      financiallySecure: "",
      financialDifficulties: [] as string[],
      formallyRecognized: "",
      receivingBenefits: "",
      noBenefitsReason: "",
      neverAppliedReason: [] as string[],
      additionalDetails: "",
    },
    militaryService: {
      servedInMilitary: "",
      branches: [] as string[],
      activeDutyLength: "",
      dischargeType: "",
      dischargeReason: [] as string[],
      impactedBenefits: "",
      dischargeUpgrade: "",
      emotionalDifficulties: "",
      soughtDischargeSupport: "",
      increasedSubstanceUse: "",
      combatExposure: "",
      conflictType: "",
      serviceInjury: "",
      experiencedTrauma: "",
      traumaSymptoms: "",
      receivedMHServices: "",
      receivingVAServices: "",
      experiencedHarassment: "",
      harassmentType: [] as string[],
      reportedIncidents: "",
      reportsTakenSeriously: "",
      experiencedRetaliation: "",
      experiencesLedToLeaving: "",
      incidentsImpactHealth: "",
      increasedSubstanceUseService: "",
      substancesUsed: [] as string[],
      impactedMilitaryCareer: "",
      soughtTreatment: "",
      causedIssues: "",
      additionalDetails: "",
    },
  })

  // Define step keys that match the formData structure
  const stepKeys = ["socialFamilyHistory", "employmentEducation", "militaryService", "review"]

  const steps = [
    { name: "Social & Family History", component: SocialFamilyHistoryStep, key: "socialFamilyHistory" },
    { name: "Employment & Education", component: EmploymentEducationStep, key: "employmentEducation" },
    { name: "Military Service History", component: MilitaryServiceStep, key: "militaryService" },
    { name: "Review & Submit", component: ReviewSubmitStep, key: "review" },
  ]

  // Load existing assessment data if assessmentId is provided
  useEffect(() => {
    const loadAssessment = async () => {
      if (!assessmentId) return

      setIsLoading(true)
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("patient_assessments")
          .select("*")
          .eq("id", assessmentId)
          .eq("patient_id", patientId)
          .single()

        if (error) throw error

        if (data) {
          setFormData(data.assessment_data)
          // If assessment was completed, go to the last step
          if (data.status === "completed") {
            setCurrentStep(steps.length - 1)
          } else {
            // Otherwise go to the last saved step
            setCurrentStep(data.last_completed_step + 1)
          }
        }
      } catch (error) {
        console.error("Error loading assessment:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAssessment()
  }, [assessmentId, patientId, steps.length])

  // Save progress to Supabase
  const saveProgress = async (step: number, isComplete = false) => {
    setIsSaving(true)
    setSaveStatus("saving")

    try {
      const supabase = getSupabaseClient()
      const status = isComplete ? "completed" : "in_progress"

      // If we have an assessmentId, update the existing record
      if (assessmentId) {
        const { error } = await supabase
          .from("patient_assessments")
          .update({
            assessment_data: formData,
            last_completed_step: step,
            status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", assessmentId)

        if (error) throw error
      } else {
        // Otherwise create a new assessment
        const { data, error } = await supabase
          .from("patient_assessments")
          .insert({
            patient_id: patientId,
            assessment_data: formData,
            last_completed_step: step,
            status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()

        if (error) throw error

        // Set the assessmentId if we created a new record
        if (data && data[0]) {
          router.replace(`/patient/assessment/${data[0].id}`)
        }
      }

      setSaveStatus("success")

      // Reset save status after a delay
      setTimeout(() => {
        setSaveStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Error saving assessment:", error)
      setSaveStatus("error")

      // Reset save status after a delay
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    // Save progress before moving to next step
    await saveProgress(currentStep)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    await saveProgress(steps.length - 1, true)
  }

  const updateFormData = (stepName: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: {
        ...prev[stepName as keyof typeof prev],
        ...data,
      },
    }))
  }

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your assessment...</p>
        </div>
      </div>
    )
  }

  const CurrentStepComponent = steps[currentStep].component
  const currentStepKey = steps[currentStep].key

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="p-6 bg-white rounded-2xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Behavioral Health Pre-Assessment</h1>
          <p className="text-muted-foreground mb-6">
            Please complete all sections of this assessment. Your information will be saved as you progress.
          </p>

          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <Stepper
            steps={steps.map((s) => s.name)}
            currentStep={currentStep}
            onStepClick={(step) => {
              // Only allow clicking on completed steps
              if (step <= currentStep) {
                setCurrentStep(step)
              }
            }}
          />
        </div>

        {/* Save status indicator */}
        {saveStatus !== "idle" && (
          <div
            className={`mb-4 p-2 rounded-md flex items-center gap-2 ${
              saveStatus === "saving"
                ? "bg-amber-50 text-amber-700"
                : saveStatus === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
            }`}
          >
            {saveStatus === "saving" && (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                <span>Saving your progress...</span>
              </>
            )}
            {saveStatus === "success" && (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Progress saved successfully</span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertCircle className="h-4 w-4" />
                <span>Error saving progress. Please try again.</span>
              </>
            )}
          </div>
        )}

        <div className="mb-8">
          <CurrentStepComponent
            data={formData[currentStepKey as keyof typeof formData] || {}}
            updateData={(data: any) => updateFormData(currentStepKey, data)}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isSaving}>
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save & Continue"}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Submitting..." : "Submit Assessment"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

