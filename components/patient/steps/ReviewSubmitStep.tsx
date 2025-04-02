"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ReviewSubmitStepProps {
  data: any
  updateData: (data: any) => void
}

export function ReviewSubmitStep({ data = {}, updateData }: ReviewSubmitStepProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    socialFamilyHistory: true,
    employmentEducation: false,
    militaryService: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const [consentChecked, setConsentChecked] = useState(false)

  // Helper function to display values in a readable format
  const formatValue = (key: string, value: any): string => {
    if (value === undefined || value === null || value === "") {
      return "Not provided"
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "None"
      }
      return value.join(", ")
    }

    return value.toString()
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
        <p className="text-muted-foreground mb-6">
          Please review your information before submitting. You can go back to any section to make changes.
        </p>
      </div>

      {/* Social & Family History Section */}
      <div className="border rounded-md overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("socialFamilyHistory")}
        >
          <h3 className="text-lg font-medium">Social & Family History</h3>
          <Button variant="ghost" size="sm">
            {expandedSections.socialFamilyHistory ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {expandedSections.socialFamilyHistory && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Current Living Situation:</span>{" "}
                {formatValue("livingStatus", data.socialFamilyHistory?.livingStatus)}
              </div>
              {data.socialFamilyHistory?.livingStatus === "unstable" ||
              data.socialFamilyHistory?.livingStatus === "homeless" ? (
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {formatValue("unstableDuration", data.socialFamilyHistory?.unstableDuration)}
                </div>
              ) : null}
              {data.socialFamilyHistory?.livingStatus === "unstable" ||
              data.socialFamilyHistory?.livingStatus === "homeless" ? (
                <div>
                  <span className="font-medium">Cause of Instability:</span>{" "}
                  {formatValue("instabilityCause", data.socialFamilyHistory?.instabilityCause)}
                </div>
              ) : null}
              <div>
                <span className="font-medium">Experienced Violence/Harm:</span>{" "}
                {formatValue("experiencedViolence", data.socialFamilyHistory?.experiencedViolence)}
              </div>
              <div>
                <span className="font-medium">Family Relationships:</span>{" "}
                {formatValue("familyRelationships", data.socialFamilyHistory?.familyRelationships)}
              </div>
              <div>
                <span className="font-medium">History of Abuse/Neglect:</span>{" "}
                {formatValue("abuseHistory", data.socialFamilyHistory?.abuseHistory)}
              </div>
              <div>
                <span className="font-medium">Experienced Trauma/Loss:</span>{" "}
                {formatValue("experiencedTrauma", data.socialFamilyHistory?.experiencedTrauma)}
              </div>
              {data.socialFamilyHistory?.experiencedTrauma && data.socialFamilyHistory?.experiencedTrauma !== "none" ? (
                <div>
                  <span className="font-medium">Type of Trauma:</span>{" "}
                  {formatValue("traumaType", data.socialFamilyHistory?.traumaType)}
                </div>
              ) : null}
            </div>

            {data.socialFamilyHistory?.additionalDetails && (
              <div className="mt-4">
                <span className="font-medium">Additional Details:</span>
                <p className="mt-1 p-2 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {data.socialFamilyHistory?.additionalDetails}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Employment & Education Section */}
      <div className="border rounded-md overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("employmentEducation")}
        >
          <h3 className="text-lg font-medium">Employment & Education</h3>
          <Button variant="ghost" size="sm">
            {expandedSections.employmentEducation ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>

        {expandedSections.employmentEducation && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Employment Status:</span>{" "}
                {formatValue("employmentStatus", data.employmentEducation?.employmentStatus)}
              </div>
              {data.employmentEducation?.employmentStatus === "unemployed" ? (
                <div>
                  <span className="font-medium">Last Employment:</span>{" "}
                  {formatValue("lastEmployment", data.employmentEducation?.lastEmployment)}
                </div>
              ) : null}
              {data.employmentEducation?.lastEmployment === "never" ? (
                <div>
                  <span className="font-medium">Support Method:</span>{" "}
                  {formatValue("supportMethod", data.employmentEducation?.supportMethod)}
                </div>
              ) : null}
              {data.employmentEducation?.employmentStatus === "full-time" ||
              data.employmentEducation?.employmentStatus === "part-time" ||
              data.employmentEducation?.employmentStatus === "self-employed" ? (
                <div>
                  <span className="font-medium">Current Job Duration:</span>{" "}
                  {formatValue("currentJobDuration", data.employmentEducation?.currentJobDuration)}
                </div>
              ) : null}
              {data.employmentEducation?.employmentStatus === "student" ? (
                <div>
                  <span className="font-medium">Educational Setting:</span>{" "}
                  {formatValue("educationalSetting", data.employmentEducation?.educationalSetting)}
                </div>
              ) : null}
            </div>

            {data.employmentEducation?.additionalDetails && (
              <div className="mt-4">
                <span className="font-medium">Additional Details:</span>
                <p className="mt-1 p-2 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {data.employmentEducation?.additionalDetails}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Military Service Section */}
      <div className="border rounded-md overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
          onClick={() => toggleSection("militaryService")}
        >
          <h3 className="text-lg font-medium">Military Service History</h3>
          <Button variant="ghost" size="sm">
            {expandedSections.militaryService ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        {expandedSections.militaryService && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Served in Military:</span>{" "}
                {formatValue("servedInMilitary", data.militaryService?.servedInMilitary)}
              </div>

              {data.militaryService?.servedInMilitary === "yes" ? (
                <>
                  <div>
                    <span className="font-medium">Branch(es):</span>{" "}
                    {formatValue("branches", data.militaryService?.branches)}
                  </div>
                  <div>
                    <span className="font-medium">Length of Active Duty:</span>{" "}
                    {formatValue("activeDutyLength", data.militaryService?.activeDutyLength)}
                  </div>
                  <div>
                    <span className="font-medium">Discharge Type:</span>{" "}
                    {formatValue("dischargeType", data.militaryService?.dischargeType)}
                  </div>
                  <div>
                    <span className="font-medium">Combat Exposure:</span>{" "}
                    {formatValue("combatExposure", data.militaryService?.combatExposure)}
                  </div>
                  {data.militaryService?.combatExposure === "yes" ? (
                    <div>
                      <span className="font-medium">Conflict:</span>{" "}
                      {formatValue("conflictType", data.militaryService?.conflictType)}
                    </div>
                  ) : null}
                  <div>
                    <span className="font-medium">Substance Use Increased:</span>{" "}
                    {formatValue("increasedSubstanceUseService", data.militaryService?.increasedSubstanceUseService)}
                  </div>
                  {data.militaryService?.increasedSubstanceUseService === "yes" ? (
                    <div>
                      <span className="font-medium">Substances Used:</span>{" "}
                      {formatValue("substancesUsed", data.militaryService?.substancesUsed)}
                    </div>
                  ) : null}
                </>
              ) : (
                <div>
                  <span className="text-muted-foreground italic">No military service reported</span>
                </div>
              )}
            </div>

            {data.militaryService?.additionalDetails && (
              <div className="mt-4">
                <span className="font-medium">Additional Details:</span>
                <p className="mt-1 p-2 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {data.militaryService?.additionalDetails}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="p-4 border rounded-md bg-gray-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={consentChecked}
            onCheckedChange={(checked) => {
              setConsentChecked(checked as boolean)
              updateData({ consentChecked: checked })
            }}
          />
          <div className="space-y-1">
            <Label htmlFor="consent" className="font-medium">
              Consent to Information Use
            </Label>
            <p className="text-sm text-muted-foreground">
              I confirm that the information provided is accurate to the best of my knowledge. I understand that this
              information will be used by healthcare providers to assess my condition and provide appropriate behavioral
              health and addiction treatment services.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Please review all information carefully before submitting. Once submitted, this information will be securely
          stored and accessible to your healthcare provider.
        </p>
      </div>
    </div>
  )
}

