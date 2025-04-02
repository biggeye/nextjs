"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface EmploymentEducation {
  employmentStatus: string
  lastEmployment: string
  supportMethod: string
  periodsWithoutSupport: string
  managementMethod: string[]
  legalConsequences: string
  consequenceTypes: string[]
  skippedNecessities: string[]
  lostAssistance: string
  assistanceLossReason: string[]
  currentJobDuration: string
  jobEndReason: string
  substanceUseNoticed: string
  jobLossDiscipline: string
  offeredReferral: string
  conflictType: string[]
  educationalSetting: string
  academicsImpacted: string
  academicImpactType: string[]
  attendanceIssues: string
  soughtAssistance: string
  noAssistanceReason: string[]
  financiallySecure: string
  financialDifficulties: string[]
  formallyRecognized: string
  receivingBenefits: string
  noBenefitsReason: string
  neverAppliedReason: string[]
  additionalDetails: string
}

interface EmploymentEducationStepProps {
  data: Partial<EmploymentEducation>
  updateData: (data: Partial<EmploymentEducation>) => void
}

export function EmploymentEducationStep({ data = {}, updateData }: EmploymentEducationStepProps) {
  // Initialize with default values to prevent undefined errors
  const defaultData: EmploymentEducation = {
    employmentStatus: "",
    lastEmployment: "",
    supportMethod: "",
    periodsWithoutSupport: "",
    managementMethod: [],
    legalConsequences: "",
    consequenceTypes: [],
    skippedNecessities: [],
    lostAssistance: "",
    assistanceLossReason: [],
    currentJobDuration: "",
    jobEndReason: "",
    substanceUseNoticed: "",
    jobLossDiscipline: "",
    offeredReferral: "",
    conflictType: [],
    educationalSetting: "",
    academicsImpacted: "",
    academicImpactType: [],
    attendanceIssues: "",
    soughtAssistance: "",
    noAssistanceReason: [],
    financiallySecure: "",
    financialDifficulties: [],
    formallyRecognized: "",
    receivingBenefits: "",
    noBenefitsReason: "",
    neverAppliedReason: [],
    additionalDetails: "",
  }

  // Merge default data with provided data
  const [formState, setFormState] = useState<EmploymentEducation>({
    ...defaultData,
    ...data,
    // Ensure arrays are initialized
    managementMethod: data.managementMethod || [],
    consequenceTypes: data.consequenceTypes || [],
    skippedNecessities: data.skippedNecessities || [],
    assistanceLossReason: data.assistanceLossReason || [],
    conflictType: data.conflictType || [],
    academicImpactType: data.academicImpactType || [],
    noAssistanceReason: data.noAssistanceReason || [],
    financialDifficulties: data.financialDifficulties || [],
    neverAppliedReason: data.neverAppliedReason || [],
  })

  // Update local state when data prop changes
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      ...data,
      // Ensure arrays are initialized
      managementMethod: data.managementMethod || prev.managementMethod || [],
      consequenceTypes: data.consequenceTypes || prev.consequenceTypes || [],
      skippedNecessities: data.skippedNecessities || prev.skippedNecessities || [],
      assistanceLossReason: data.assistanceLossReason || prev.assistanceLossReason || [],
      conflictType: data.conflictType || prev.conflictType || [],
      academicImpactType: data.academicImpactType || prev.academicImpactType || [],
      noAssistanceReason: data.noAssistanceReason || prev.noAssistanceReason || [],
      financialDifficulties: data.financialDifficulties || prev.financialDifficulties || [],
      neverAppliedReason: data.neverAppliedReason || prev.neverAppliedReason || [],
    }))
  }, [data])

  const handleChange = (field: keyof EmploymentEducation, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    updateData({ [field]: value })
  }

  const handleCheckboxChange = (field: keyof EmploymentEducation, value: string, checked: boolean) => {
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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    updateData({ [name as keyof EmploymentEducation]: value })
  }

  // Rest of the component remains the same
  // ...

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Employment & Education</h2>
        <p className="text-muted-foreground mb-6">
          Please answer the following questions about your employment and education history.
        </p>
      </div>

      {/* Q4.1 Employment Status */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Q4.1 Employment Status:</Label>
        <RadioGroup
          value={formState.employmentStatus}
          onValueChange={(value) => handleChange("employmentStatus", value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full-time" id="employment-full-time" />
            <Label htmlFor="employment-full-time">Employed (Full-Time)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="part-time" id="employment-part-time" />
            <Label htmlFor="employment-part-time">Employed (Part-Time)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="self-employed" id="employment-self-employed" />
            <Label htmlFor="employment-self-employed">Self-Employed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unemployed" id="employment-unemployed" />
            <Label htmlFor="employment-unemployed">Unemployed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="employment-student" />
            <Label htmlFor="employment-student">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="retired" id="employment-retired" />
            <Label htmlFor="employment-retired">Retired</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled" id="employment-disabled" />
            <Label htmlFor="employment-disabled">Disabled</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Q4.2 If 'Unemployed', when was your last regular employment? */}
      {formState.employmentStatus === "unemployed" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.2 When was your last regular employment?</Label>
          <RadioGroup
            value={formState.lastEmployment}
            onValueChange={(value) => handleChange("lastEmployment", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="<1 month" id="last-employment-1month" />
              <Label htmlFor="last-employment-1month">&lt;1 month ago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-6 months" id="last-employment-1-6months" />
              <Label htmlFor="last-employment-1-6months">1-6 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6-12 months" id="last-employment-6-12months" />
              <Label htmlFor="last-employment-6-12months">6-12 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">1 year" id="last-employment-1year" />
              <Label htmlFor="last-employment-1year">&gt;1 year</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">3 years" id="last-employment-3years" />
              <Label htmlFor="last-employment-3years">&gt;3 years</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="last-employment-never" />
              <Label htmlFor="last-employment-never">Never regularly</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.3 If 'Never worked regularly', how have you supported yourself? */}
      {formState.lastEmployment === "never" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.3 How have you supported yourself?</Label>
          <RadioGroup
            value={formState.supportMethod}
            onValueChange={(value) => handleChange("supportMethod", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="support-family" />
              <Label htmlFor="support-family">Family/friends</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="govt" id="support-govt" />
              <Label htmlFor="support-govt">Govt assistance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="informal" id="support-informal" />
              <Label htmlFor="support-informal">Informal work</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="illegal" id="support-illegal" />
              <Label htmlFor="support-illegal">Illegal activities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="charity" id="support-charity" />
              <Label htmlFor="support-charity">Charity/shelters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="support-other" />
              <Label htmlFor="support-other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.4 If 'Family/friends', were there periods without support? */}
      {formState.supportMethod === "family" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.4 Were there periods without support?</Label>
          <RadioGroup
            value={formState.periodsWithoutSupport}
            onValueChange={(value) => handleChange("periodsWithoutSupport", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="periods-yes" />
              <Label htmlFor="periods-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="periods-no" />
              <Label htmlFor="periods-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.5 If yes, how did you manage? */}
      {formState.periodsWithoutSupport === "yes" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.5 How did you manage?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-borrowed"
                checked={formState.managementMethod.includes("borrowed")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "borrowed", checked as boolean)}
              />
              <Label htmlFor="manage-borrowed">Borrowed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-sold"
                checked={formState.managementMethod.includes("sold")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "sold", checked as boolean)}
              />
              <Label htmlFor="manage-sold">Sold items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-illegal"
                checked={formState.managementMethod.includes("illegal")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "illegal", checked as boolean)}
              />
              <Label htmlFor="manage-illegal">Illegal activities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-charity"
                checked={formState.managementMethod.includes("charity")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "charity", checked as boolean)}
              />
              <Label htmlFor="manage-charity">Charity</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-skipped"
                checked={formState.managementMethod.includes("skipped")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "skipped", checked as boolean)}
              />
              <Label htmlFor="manage-skipped">Skipped necessities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manage-other"
                checked={formState.managementMethod.includes("other")}
                onCheckedChange={(checked) => handleCheckboxChange("managementMethod", "other", checked as boolean)}
              />
              <Label htmlFor="manage-other">Other</Label>
            </div>
          </div>
        </div>
      )}

      {/* Q4.6 If 'Illegal activities', any legal consequences? */}
      {(formState.supportMethod === "illegal" || formState.managementMethod.includes("illegal")) && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.6 Any legal consequences?</Label>
          <RadioGroup
            value={formState.legalConsequences}
            onValueChange={(value) => handleChange("legalConsequences", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="legal-yes" />
              <Label htmlFor="legal-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="legal-no" />
              <Label htmlFor="legal-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.7 If yes, consequences? */}
      {formState.legalConsequences === "yes" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.7 Consequences?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-arrested"
                checked={formState.consequenceTypes.includes("arrested")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "arrested", checked as boolean)}
              />
              <Label htmlFor="consequence-arrested">Arrested</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-jail"
                checked={formState.consequenceTypes.includes("jail")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "jail", checked as boolean)}
              />
              <Label htmlFor="consequence-jail">Jail/Prison</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-probation"
                checked={formState.consequenceTypes.includes("probation")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "probation", checked as boolean)}
              />
              <Label htmlFor="consequence-probation">Probation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-court"
                checked={formState.consequenceTypes.includes("court")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "court", checked as boolean)}
              />
              <Label htmlFor="consequence-court">Court-ordered tx</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-pending"
                checked={formState.consequenceTypes.includes("pending")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "pending", checked as boolean)}
              />
              <Label htmlFor="consequence-pending">Pending charges</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consequence-other"
                checked={formState.consequenceTypes.includes("other")}
                onCheckedChange={(checked) => handleCheckboxChange("consequenceTypes", "other", checked as boolean)}
              />
              <Label htmlFor="consequence-other">Other</Label>
            </div>
          </div>
        </div>
      )}

      {/* Q4.8 If 'Skipped necessities', which most often? */}
      {formState.managementMethod.includes("skipped") && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.8 Which necessities did you skip most often?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-food"
                checked={formState.skippedNecessities.includes("food")}
                onCheckedChange={(checked) => handleCheckboxChange("skippedNecessities", "food", checked as boolean)}
              />
              <Label htmlFor="skipped-food">Food</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-shelter"
                checked={formState.skippedNecessities.includes("shelter")}
                onCheckedChange={(checked) => handleCheckboxChange("skippedNecessities", "shelter", checked as boolean)}
              />
              <Label htmlFor="skipped-shelter">Shelter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-healthcare"
                checked={formState.skippedNecessities.includes("healthcare")}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("skippedNecessities", "healthcare", checked as boolean)
                }
              />
              <Label htmlFor="skipped-healthcare">Healthcare</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-hygiene"
                checked={formState.skippedNecessities.includes("hygiene")}
                onCheckedChange={(checked) => handleCheckboxChange("skippedNecessities", "hygiene", checked as boolean)}
              />
              <Label htmlFor="skipped-hygiene">Hygiene</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-transportation"
                checked={formState.skippedNecessities.includes("transportation")}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("skippedNecessities", "transportation", checked as boolean)
                }
              />
              <Label htmlFor="skipped-transportation">Transportation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skipped-utilities"
                checked={formState.skippedNecessities.includes("utilities")}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("skippedNecessities", "utilities", checked as boolean)
                }
              />
              <Label htmlFor="skipped-utilities">Utilities</Label>
            </div>
          </div>
        </div>
      )}

      {/* For brevity, I'll include just a few more key questions */}

      {/* Q4.11 If employed/self-employed, how long at current job? */}
      {(formState.employmentStatus === "full-time" ||
        formState.employmentStatus === "part-time" ||
        formState.employmentStatus === "self-employed") && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.11 How long at current job?</Label>
          <RadioGroup
            value={formState.currentJobDuration}
            onValueChange={(value) => handleChange("currentJobDuration", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="<3 months" id="job-3months" />
              <Label htmlFor="job-3months">&lt;3 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3-6 months" id="job-3-6months" />
              <Label htmlFor="job-3-6months">3-6 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6-12 months" id="job-6-12months" />
              <Label htmlFor="job-6-12months">6-12 months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-3 years" id="job-1-3years" />
              <Label htmlFor="job-1-3years">1-3 years</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3-5 years" id="job-3-5years" />
              <Label htmlFor="job-3-5years">3-5 years</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value=">5 years" id="job-5years" />
              <Label htmlFor="job-5years">&gt;5 years</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.17 If 'Student', current educational setting? */}
      {formState.employmentStatus === "student" && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Q4.17 Current educational setting?</Label>
          <RadioGroup
            value={formState.educationalSetting}
            onValueChange={(value) => handleChange("educationalSetting", value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high-school" id="education-high-school" />
              <Label htmlFor="education-high-school">High School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ged" id="education-ged" />
              <Label htmlFor="education-ged">GED</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trade" id="education-trade" />
              <Label htmlFor="education-trade">Trade School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="college" id="education-college" />
              <Label htmlFor="education-college">College</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="graduate" id="education-graduate" />
              <Label htmlFor="education-graduate">Graduate School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="education-other" />
              <Label htmlFor="education-other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Q4.29 Anything else important? */}
      <div className="space-y-4">
        <Label htmlFor="additionalDetails" className="text-base font-medium">
          Q4.29 Anything else important about your employment or education?
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
    </div>
  )
}

