// components/patient/steps/LegalHistoryStep.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface LegalHistoryStepProps {
  data: any
  updateData: (data: any) => void
  onNext?: () => void
  onBack?: () => void
}

export function LegalHistoryStep({ data, updateData, onNext, onBack }: LegalHistoryStepProps) {
  const legal = data.legal || {}

  const [showArrestDetails, setShowArrestDetails] = useState(false)
  const [showIncarcerationDetails, setShowIncarcerationDetails] = useState(false)
  const [showLegalStatusDetails, setShowLegalStatusDetails] = useState(false)
  const [showCourtOrderedDetails, setShowCourtOrderedDetails] = useState(false)

  useEffect(() => {
    setShowArrestDetails(legal.everArrested === "yes")
    setShowIncarcerationDetails(legal.everIncarcerated === "yes")
    setShowLegalStatusDetails(legal.currentLegalStatus === "yes")
    setShowCourtOrderedDetails(legal.courtOrderedTreatment === "yes")
  }, [legal])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      legal: {
        ...legal,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateData({
      legal: {
        ...legal,
        [id]: checked
      }
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    updateData({
      legal: {
        ...legal,
        [name]: value
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            This section gathers information about any past or current legal issues, which can be important for
            treatment planning. It covers criminal justice involvement, civil legal matters, and any links between legal
            problems and substance use or mental health.
          </p>

          <div className="space-y-3">
            <Label>Have you ever been arrested or charged with a crime?</Label>
            <RadioGroup
              value={legal.everArrested || ""}
              onValueChange={(value) => handleRadioChange("everArrested", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="everArrestedYes" />
                <Label htmlFor="everArrestedYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="everArrestedNo" />
                <Label htmlFor="everArrestedNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {showArrestDetails && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>Were any charges related to substance use (e.g. DUI, drug possession)?</Label>
                <RadioGroup
                  value={legal.substanceCharges || ""}
                  onValueChange={(value) => handleRadioChange("substanceCharges", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="substanceChargesYes" />
                    <Label htmlFor="substanceChargesYes">Yes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="substanceChargesNo" />
                    <Label htmlFor="substanceChargesNo">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Please indicate the most serious offense you were charged with:</Label>
                <RadioGroup
                  value={legal.mostSeriousOffense || ""}
                  onValueChange={(value) => handleRadioChange("mostSeriousOffense", value)}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="misdemeanor" id="offenseMisdemeanor" />
                    <Label htmlFor="offenseMisdemeanor">Misdemeanor</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="felony" id="offenseFelony" />
                    <Label htmlFor="offenseFelony">Felony</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dui" id="offenseDUI" />
                    <Label htmlFor="offenseDUI">DUI/DWI</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="drugrelated" id="offenseDrugrelated" />
                    <Label htmlFor="offenseDrugrelated">Drug-related</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="offenseOther" />
                    <Label htmlFor="offenseOther">Other</Label>
                  </div>
                </RadioGroup>

                {legal.mostSeriousOffense === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherOffense">Please specify other offense</Label>
                    <Input
                      id="otherOffense"
                      name="otherOffense"
                      value={legal.otherOffense || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Have you ever spent time in jail or prison?</Label>
            <RadioGroup
              value={legal.everIncarcerated || ""}
              onValueChange={(value) => handleRadioChange("everIncarcerated", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="everIncarceratedYes" />
                <Label htmlFor="everIncarceratedYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="everIncarceratedNo" />
                <Label htmlFor="everIncarceratedNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {showIncarcerationDetails && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>Total number of times incarcerated:</Label>
                <RadioGroup
                  value={legal.incarceratedTimes || ""}
                  onValueChange={(value) => handleRadioChange("incarceratedTimes", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="incarcerated1" />
                    <Label htmlFor="incarcerated1">1</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-5" id="incarcerated2-5" />
                    <Label htmlFor="incarcerated2-5">2–5</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value=">5" id="incarcerated>5" />
                    <Label htmlFor="incarcerated>5">{">"} 5</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseYear">Most recent release year</Label>
                <Input
                  id="releaseYear"
                  name="releaseYear"
                  value={legal.releaseYear || ""}
                  onChange={handleChange}
                  type="number"
                  maxLength={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Was your most recent release within the last 12 months?</Label>
                <RadioGroup
                  value={legal.recentIncarceration || ""}
                  onValueChange={(value) => handleRadioChange("recentIncarceration", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="recentIncarcerationYes" />
                    <Label htmlFor="recentIncarcerationYes">Yes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="recentIncarcerationNo" />
                    <Label htmlFor="recentIncarcerationNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Are you currently on probation, parole, or awaiting trial/sentencing for any offense?</Label>
            <RadioGroup
              value={legal.currentLegalStatus || ""}
              onValueChange={(value) => handleRadioChange("currentLegalStatus", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="currentLegalStatusYes" />
                <Label htmlFor="currentLegalStatusYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="currentLegalStatusNo" />
                <Label htmlFor="currentLegalStatusNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {showLegalStatusDetails && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>Please specify:</Label>
                <RadioGroup
                  value={legal.legalStatusSpecify || ""}
                  onValueChange={(value) => handleRadioChange("legalStatusSpecify", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="probation" id="legalStatusProbation" />
                    <Label htmlFor="legalStatusProbation">Probation</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parole" id="legalStatusParole" />
                    <Label htmlFor="legalStatusParole">Parole</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pretrial" id="legalStatusPretrial" />
                    <Label htmlFor="legalStatusPretrial">Pre-trial</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="legalStatusOther" />
                    <Label htmlFor="legalStatusOther">Other</Label>
                  </div>
                </RadioGroup>

                {legal.legalStatusSpecify === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherLegalStatus">Please specify other legal status</Label>
                    <Input
                      id="otherLegalStatus"
                      name="otherLegalStatus"
                      value={legal.otherLegalStatus || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Is your current treatment court-ordered or mandated (e.g. as a condition of probation)?</Label>
                <RadioGroup
                  value={legal.courtMandated || ""}
                  onValueChange={(value) => handleRadioChange("courtMandated", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="courtMandatedYes" />
                    <Label htmlFor="courtMandatedYes">Yes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="courtMandatedNo" />
                    <Label htmlFor="courtMandatedNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>
              Have you ever been ordered by a court to attend treatment or educational programs (e.g. substance abuse
              treatment, DUI classes, anger management)?
            </Label>
            <RadioGroup
              value={legal.courtOrderedTreatment || ""}
              onValueChange={(value) => handleRadioChange("courtOrderedTreatment", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="courtOrderedTreatmentYes" />
                <Label htmlFor="courtOrderedTreatmentYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="courtOrderedTreatmentNo" />
                <Label htmlFor="courtOrderedTreatmentNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {showCourtOrderedDetails && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>What type of program?</Label>
                <RadioGroup
                  value={legal.programType || ""}
                  onValueChange={(value) => handleRadioChange("programType", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="substance" id="programSubstance" />
                    <Label htmlFor="programSubstance">Substance abuse treatment</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dui" id="programDUI" />
                    <Label htmlFor="programDUI">DUI/DWI classes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anger" id="programAnger" />
                    <Label htmlFor="programAnger">Anger management</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="domestic" id="programDomestic" />
                    <Label htmlFor="programDomestic">Domestic violence</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="programOther" />
                    <Label htmlFor="programOther">Other</Label>
                  </div>
                </RadioGroup>

                {legal.programType === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherProgramType">Please specify other program type</Label>
                    <Input
                      id="otherProgramType"
                      name="otherProgramType"
                      value={legal.otherProgramType || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="programYear">Year of most recent court-ordered program</Label>
                <Input
                  id="programYear"
                  name="programYear"
                  value={legal.programYear || ""}
                  onChange={handleChange}
                  type="number"
                  maxLength={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Did you complete the program?</Label>
                <RadioGroup
                  value={legal.programCompleted || ""}
                  onValueChange={(value) => handleRadioChange("programCompleted", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="programCompletedYes" />
                    <Label htmlFor="programCompletedYes">Yes</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="programCompletedNo" />
                    <Label htmlFor="programCompletedNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label>Do you have any pending legal issues (e.g. upcoming court dates, unresolved charges)?</Label>
            <RadioGroup
              value={legal.pendingIssues || ""}
              onValueChange={(value) => handleRadioChange("pendingIssues", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pendingIssuesYes" />
                <Label htmlFor="pendingIssuesYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pendingIssuesNo" />
                <Label htmlFor="pendingIssuesNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalLegal">
              Please provide any additional information about your legal history that you think would be helpful for us
              to know:
            </Label>
            <Textarea
              id="additionalLegal"
              name="additionalLegal"
              value={legal.additionalLegal || ""}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
        {onNext && <Button onClick={onNext}>Next</Button>}
      </CardFooter>
    </Card>
  )
}