// components/patient/steps/MentalHealthStep.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface MentalHealthStepProps {
  data: any
  updateData: (data: any) => void
  onNext?: () => void
  onBack?: () => void
}

export function MentalHealthStep({ data, updateData, onNext, onBack }: MentalHealthStepProps) {
  const mental = data.mental || {}

  const [showPsychiatricHospitalization, setShowPsychiatricHospitalization] = useState(false)
  const [showSuicideAttempt, setShowSuicideAttempt] = useState(false)
  const [showCurrentSuicidalIdeation, setShowCurrentSuicidalIdeation] = useState(false)
  const [showCurrentPlan, setShowCurrentPlan] = useState(false)
  const [showCurrentMeans, setShowCurrentMeans] = useState(false)

  useEffect(() => {
    setShowPsychiatricHospitalization(mental.psychiatricHospitalization === "yes")
    setShowSuicideAttempt(mental.suicideAttempt === "yes")
    setShowCurrentSuicidalIdeation(mental.currentSuicidalIdeation === "yes")
    setShowCurrentPlan(mental.currentSuicidalIdeation === "yes" && mental.specificPlan === "yes")
    setShowCurrentMeans(
      mental.currentSuicidalIdeation === "yes" && mental.specificPlan === "yes" && mental.accessToMeans === "yes",
    )
  }, [mental])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      mental: {
        ...mental,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateData({
      mental: {
        ...mental,
        [id]: checked
      }
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    updateData({
      mental: {
        ...mental,
        [name]: value
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health & Psychiatric History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Have you ever been diagnosed with a mental health condition by a professional?</Label>
            <RadioGroup
              value={mental.mentalHealthDiagnosis || ""}
              onValueChange={(value) => handleRadioChange("mentalHealthDiagnosis", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="mentalHealthDiagnosisYes" />
                <Label htmlFor="mentalHealthDiagnosisYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="mentalHealthDiagnosisNo" />
                <Label htmlFor="mentalHealthDiagnosisNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {mental.mentalHealthDiagnosis === "yes" && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <Label>Which of the following diagnoses have you had? (Check all that apply)</Label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisDepression"
                    checked={mental.diagnosisDepression || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisDepression", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisDepression">Depression</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisAnxiety"
                    checked={mental.diagnosisAnxiety || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisAnxiety", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisAnxiety">Anxiety disorder (e.g. GAD, panic disorder)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisBipolar"
                    checked={mental.diagnosisBipolar || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisBipolar", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisBipolar">Bipolar disorder</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisSchizophrenia"
                    checked={mental.diagnosisSchizophrenia || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisSchizophrenia", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisSchizophrenia">Schizophrenia or psychotic disorder</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisPTSD"
                    checked={mental.diagnosisPTSD || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisPTSD", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisPTSD">Post-Traumatic Stress Disorder (PTSD)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisEating"
                    checked={mental.diagnosisEating || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisEating", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisEating">Eating disorder</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisADHD"
                    checked={mental.diagnosisADHD || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisADHD", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisADHD">ADHD or learning disorder</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisPersonality"
                    checked={mental.diagnosisPersonality || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisPersonality", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisPersonality">Personality disorder (e.g. BPD)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="diagnosisOther"
                    checked={mental.diagnosisOther || false}
                    onCheckedChange={(checked) => handleCheckboxChange("diagnosisOther", checked as boolean)}
                  />
                  <Label htmlFor="diagnosisOther">Other</Label>
                </div>
              </div>

              {mental.diagnosisOther && (
                <div className="space-y-2">
                  <Label htmlFor="otherDiagnosis">Please specify other diagnosis</Label>
                  <Textarea
                    id="otherDiagnosis"
                    name="otherDiagnosis"
                    value={mental.otherDiagnosis || ""}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 border-t pt-6">
            <h3 className="font-semibold">Past Mental Health Treatment</h3>

            <div className="space-y-3">
              <Label>Outpatient therapy/counseling in the past?</Label>
              <RadioGroup
                value={mental.outpatientTherapy || ""}
                onValueChange={(value) => handleRadioChange("outpatientTherapy", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="outpatientTherapyYes" />
                  <Label htmlFor="outpatientTherapyYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="outpatientTherapyNo" />
                  <Label htmlFor="outpatientTherapyNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Psychiatric hospitalization (inpatient) in the past?</Label>
              <RadioGroup
                value={mental.psychiatricHospitalization || ""}
                onValueChange={(value) => handleRadioChange("psychiatricHospitalization", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="psychiatricHospitalizationYes" />
                  <Label htmlFor="psychiatricHospitalizationYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="psychiatricHospitalizationNo" />
                  <Label htmlFor="psychiatricHospitalizationNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            {showPsychiatricHospitalization && (
              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                <Label>Number of psychiatric hospitalizations</Label>
                <RadioGroup
                  value={mental.hospitalizationsNumber || ""}
                  onValueChange={(value) => handleRadioChange("hospitalizationsNumber", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="hospitalizations1" />
                    <Label htmlFor="hospitalizations1">1</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-3" id="hospitalizations2-3" />
                    <Label htmlFor="hospitalizations2-3">2–3</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value=">3" id="hospitalizations>3" />
                    <Label htmlFor="hospitalizations>3">{">3"}</Label>
                  </div>
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="mostRecentHospitalizationYear">Most recent year</Label>
                  <Textarea
                    id="mostRecentHospitalizationYear"
                    name="mostRecentHospitalizationYear"
                    value={mental.mostRecentHospitalizationYear || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label>Have you ever visited an ER for a psychiatric crisis?</Label>
              <RadioGroup
                value={mental.erVisitPsychiatric || ""}
                onValueChange={(value) => handleRadioChange("erVisitPsychiatric", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="erVisitPsychiatricYes" />
                  <Label htmlFor="erVisitPsychiatricYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="erVisitPsychiatricNo" />
                  <Label htmlFor="erVisitPsychiatricNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Have you previously taken psychiatric medications?</Label>
              <RadioGroup
                value={mental.previousPsychiatricMeds || ""}
                onValueChange={(value) => handleRadioChange("previousPsychiatricMeds", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="previousPsychiatricMedsYes" />
                  <Label htmlFor="previousPsychiatricMedsYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="previousPsychiatricMedsNo" />
                  <Label htmlFor="previousPsychiatricMedsNo">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-3 border-t pt-6">
            <h3 className="font-semibold">Current Mental Health Treatment</h3>

            <div className="space-y-3">
              <Label>Are you currently seeing a therapist or counselor?</Label>
              <RadioGroup
                value={mental.currentTherapist || ""}
                onValueChange={(value) => handleRadioChange("currentTherapist", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="currentTherapistYes" />
                  <Label htmlFor="currentTherapistYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="currentTherapistNo" />
                  <Label htmlFor="currentTherapistNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Are you currently under the care of a psychiatrist or psychiatric NP (for meds)?</Label>
              <RadioGroup
                value={mental.currentPsychiatrist || ""}
                onValueChange={(value) => handleRadioChange("currentPsychiatrist", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="currentPsychiatristYes" />
                  <Label htmlFor="currentPsychiatristYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="currentPsychiatristNo" />
                  <Label htmlFor="currentPsychiatristNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Are you currently taking any psychiatric medications?</Label>
              <RadioGroup
                value={mental.currentPsychiatricMeds || ""}
                onValueChange={(value) => handleRadioChange("currentPsychiatricMeds", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="currentPsychiatricMedsYes" />
                  <Label htmlFor="currentPsychiatricMedsYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="currentPsychiatricMedsNo" />
                  <Label htmlFor="currentPsychiatricMedsNo">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-3 border-t pt-6">
            <h3 className="font-semibold">Suicide Risk Assessment</h3>

            <div className="space-y-3">
              <Label>Have you ever attempted suicide?</Label>
              <RadioGroup
                value={mental.suicideAttempt || ""}
                onValueChange={(value) => handleRadioChange("suicideAttempt", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="suicideAttemptYes" />
                  <Label htmlFor="suicideAttemptYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="suicideAttemptNo" />
                  <Label htmlFor="suicideAttemptNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            {showSuicideAttempt && (
              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                <Label>Number of suicide attempts</Label>
                <RadioGroup
                  value={mental.suicideAttemptsNumber || ""}
                  onValueChange={(value) => handleRadioChange("suicideAttemptsNumber", value)}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="suicideAttempts1" />
                    <Label htmlFor="suicideAttempts1">1</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-3" id="suicideAttempts2-3" />
                    <Label htmlFor="suicideAttempts2-3">2–3</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value=">3" id="suicideAttempts>3" />
                    <Label htmlFor="suicideAttempts>3">{">3"}</Label>
                  </div>
                </RadioGroup>

                <div className="space-y-2">
                  <Label htmlFor="mostRecentAttemptYear">Most recent attempt (year)</Label>
                  <Textarea
                    id="mostRecentAttemptYear"
                    name="mostRecentAttemptYear"
                    value={mental.mostRecentAttemptYear || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label>Are you currently having thoughts of suicide?</Label>
              <RadioGroup
                value={mental.currentSuicidalIdeation || ""}
                onValueChange={(value) => handleRadioChange("currentSuicidalIdeation", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="currentSuicidalIdeationYes" />
                  <Label htmlFor="currentSuicidalIdeationYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="currentSuicidalIdeationNo" />
                  <Label htmlFor="currentSuicidalIdeationNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            {showCurrentSuicidalIdeation && (
              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                <div className="space-y-3">
                  <Label>Do you have a specific plan for how you would harm yourself?</Label>
                  <RadioGroup
                    value={mental.specificPlan || ""}
                    onValueChange={(value) => handleRadioChange("specificPlan", value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="specificPlanYes" />
                      <Label htmlFor="specificPlanYes">Yes</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="specificPlanNo" />
                      <Label htmlFor="specificPlanNo">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {showCurrentPlan && (
                  <div className="space-y-3">
                    <Label>Do you have access to the means to carry out this plan?</Label>
                    <RadioGroup
                      value={mental.accessToMeans || ""}
                      onValueChange={(value) => handleRadioChange("accessToMeans", value)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="accessToMeansYes" />
                        <Label htmlFor="accessToMeansYes">Yes</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="accessToMeansNo" />
                        <Label htmlFor="accessToMeansNo">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {showCurrentMeans && (
                  <div className="bg-red-50 p-4 rounded-md border border-red-200 mt-4">
                    <p className="text-red-600 font-medium">
                      IMPORTANT: This information suggests you may be at risk. Please speak with a mental health
                      professional immediately. If you are in immediate danger, please call 911 or go to your nearest
                      emergency room.
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Label>How often do you have these thoughts?</Label>
                  <RadioGroup
                    value={mental.thoughtFrequency || ""}
                    onValueChange={(value) => handleRadioChange("thoughtFrequency", value)}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely" id="thoughtFrequencyRarely" />
                      <Label htmlFor="thoughtFrequencyRarely">Rarely (once a month or less)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sometimes" id="thoughtFrequencySometimes" />
                      <Label htmlFor="thoughtFrequencySometimes">Sometimes (a few times a month)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="often" id="thoughtFrequencyOften" />
                      <Label htmlFor="thoughtFrequencyOften">Often (weekly)</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="constantly" id="thoughtFrequencyConstantly" />
                      <Label htmlFor="thoughtFrequencyConstantly">Constantly (daily or almost daily)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalMentalHealth">
              Please provide any additional information about your mental health that you think would be helpful for us
              to know:
            </Label>
            <Textarea
              id="additionalMentalHealth"
              name="additionalMentalHealth"
              value={mental.additionalMentalHealth || ""}
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