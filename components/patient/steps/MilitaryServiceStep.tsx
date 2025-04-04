"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface MilitaryService {
  servedInMilitary: string
  branches: string[]
  activeDutyLength: string
  dischargeType: string
  dischargeReason: string[]
  impactedBenefits: string
  dischargeUpgrade: string
  emotionalDifficulties: string
  soughtDischargeSupport: string
  increasedSubstanceUse: string
  combatExposure: string
  conflictType: string
  serviceInjury: string
  experiencedTrauma: string
  traumaSymptoms: string
  receivedMHServices: string
  receivingVAServices: string
  experiencedHarassment: string
  harassmentType: string[]
  reportedIncidents: string
  reportsTakenSeriously: string
  experiencedRetaliation: string
  experiencesLedToLeaving: string
  incidentsImpactHealth: string
  increasedSubstanceUseService: string
  substancesUsed: string[]
  impactedMilitaryCareer: string
  soughtTreatment: string
  causedIssues: string
  additionalDetails: string
}

interface MilitaryServiceStepProps {
  data: Partial<MilitaryService>
  updateData: (data: Partial<MilitaryService>) => void
  onNext?: () => void
  onBack?: () => void
}

export function MilitaryServiceStep({ data = {}, updateData, onNext, onBack }: MilitaryServiceStepProps) {
  // Initialize with default values to prevent undefined errors
  const defaultData: MilitaryService = {
    servedInMilitary: "",
    branches: [],
    activeDutyLength: "",
    dischargeType: "",
    dischargeReason: [],
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
    harassmentType: [],
    reportedIncidents: "",
    reportsTakenSeriously: "",
    experiencedRetaliation: "",
    experiencesLedToLeaving: "",
    incidentsImpactHealth: "",
    increasedSubstanceUseService: "",
    substancesUsed: [],
    impactedMilitaryCareer: "",
    soughtTreatment: "",
    causedIssues: "",
    additionalDetails: "",
  }

  // Merge default data with provided data
  const [formState, setFormState] = useState<MilitaryService>({
    ...defaultData,
    ...data,
    // Ensure arrays are initialized
    branches: data.branches || [],
    dischargeReason: data.dischargeReason || [],
    harassmentType: data.harassmentType || [],
    substancesUsed: data.substancesUsed || [],
  })

  // Update local state when data prop changes
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      ...data,
      // Ensure arrays are initialized
      branches: data.branches || prev.branches || [],
      dischargeReason: data.dischargeReason || prev.dischargeReason || [],
      harassmentType: data.harassmentType || prev.harassmentType || [],
      substancesUsed: data.substancesUsed || prev.substancesUsed || [],
    }))
  }, [data])

  const handleChange = (field: keyof MilitaryService, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    updateData({ [field]: value })
  }

  const handleCheckboxChange = (field: keyof MilitaryService, value: string, checked: boolean) => {
    const currentValues = (formState[field] as string[]) || []
    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((v) => v !== value)
    }

    setFormState((prev) => ({ ...prev, [field]: newValues }))
    updateData({ [field]: newValues })
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    updateData({ [name as keyof MilitaryService]: value })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Military Service History</h2>
        <p className="text-muted-foreground mb-6">
          Please answer the following questions about your military service history, if applicable.
        </p>
      </div>

      {/* Q5.1 Served in military? */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Q5.1 Served in military?</Label>
        <RadioGroup
          value={formState.servedInMilitary}
          onValueChange={(value) => handleChange("servedInMilitary", value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="military-yes" />
            <Label htmlFor="military-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="military-no" />
            <Label htmlFor="military-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Only show the rest of the questions if they served in the military */}
      {formState.servedInMilitary === "yes" && (
        <>
          {/* Q5.2 If yes, branch(es)? */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Q5.2 Branch(es)?</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-army"
                  checked={formState.branches.includes("army")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "army", checked as boolean)}
                />
                <Label htmlFor="branch-army">Army</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-navy"
                  checked={formState.branches.includes("navy")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "navy", checked as boolean)}
                />
                <Label htmlFor="branch-navy">Navy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-air-force"
                  checked={formState.branches.includes("air-force")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "air-force", checked as boolean)}
                />
                <Label htmlFor="branch-air-force">Air Force</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-marines"
                  checked={formState.branches.includes("marines")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "marines", checked as boolean)}
                />
                <Label htmlFor="branch-marines">Marines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-coast-guard"
                  checked={formState.branches.includes("coast-guard")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "coast-guard", checked as boolean)}
                />
                <Label htmlFor="branch-coast-guard">Coast Guard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="branch-guard-reserves"
                  checked={formState.branches.includes("guard-reserves")}
                  onCheckedChange={(checked) => handleCheckboxChange("branches", "guard-reserves", checked as boolean)}
                />
                <Label htmlFor="branch-guard-reserves">Guard/Reserves</Label>
              </div>
            </div>
          </div>

          {/* Q5.30 Anything else we should know? */}
          <div className="space-y-4">
            <Label htmlFor="additionalDetails" className="text-base font-medium">
              Q5.30 Anything else we should know about your military service?
            </Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formState.additionalDetails}
              onChange={handleTextChange}
              placeholder="Please share any additional information that you feel is important for us to know..."
              rows={4}
            />
          </div>
        </>
      )}

      {/* If they didn't serve in the military, show a message */}
      {formState.servedInMilitary === "no" && (
        <div className="p-4 bg-gray-50 rounded-md">
          <p>No military service history to report. You can proceed to the next section.</p>
        
              <div className="flex justify-between">
              {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
              {onNext && <Button onClick={onNext}>Next</Button>}
            </div>
            </div>
      )}
    </div>
  )
}

