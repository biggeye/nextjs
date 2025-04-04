// components/patient/steps/SubstanceUseStep.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface SubstanceUseStepProps {
  data: any
  updateData: (data: any) => void
  onNext?: () => void
  onBack?: () => void
}

export function SubstanceUseStep({ data, updateData, onNext, onBack }: SubstanceUseStepProps) {
  const substance = data.substance || {}
  
  const [showAlcoholQuestions, setShowAlcoholQuestions] = useState(false)
  const [showCannabisQuestions, setShowCannabisQuestions] = useState(false)
  const [showOpioidQuestions, setShowOpioidQuestions] = useState(false)
  const [showStimulantQuestions, setShowStimulantQuestions] = useState(false)
  const [showOtherDrugQuestions, setShowOtherDrugQuestions] = useState(false)
  const [showTreatmentQuestions, setShowTreatmentQuestions] = useState(false)
  const [showWithdrawalQuestions, setShowWithdrawalQuestions] = useState(false)
  
  useEffect(() => {
    setShowAlcoholQuestions(substance.alcoholUse === 'yes')
    setShowCannabisQuestions(substance.cannabisUse === 'yes')
    setShowOpioidQuestions(substance.opioidUse === 'yes')
    setShowStimulantQuestions(substance.stimulantUse === 'yes')
    setShowOtherDrugQuestions(substance.otherDrugUse === 'yes')
    setShowTreatmentQuestions(substance.substanceTreatment === 'yes')
    setShowWithdrawalQuestions(substance.withdrawalSymptoms === 'yes')
  }, [substance])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      substance: {
        ...substance,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateData({
      substance: {
        ...substance,
        [id]: checked
      }
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    updateData({
      substance: {
        ...substance,
        [name]: value
      }
    })
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Substance Use History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Do you currently use alcohol?</Label>
            <RadioGroup 
              value={substance.alcoholUse || ""}
              onValueChange={(value) => handleRadioChange('alcoholUse', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="alcoholUseYes" />
                <Label htmlFor="alcoholUseYes">Yes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="alcoholUseNo" />
                <Label htmlFor="alcoholUseNo">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          {showAlcoholQuestions && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>How often do you have a drink containing alcohol?</Label>
                <RadioGroup 
                  value={substance.alcoholFrequency || ""}
                  onValueChange={(value) => handleRadioChange('alcoholFrequency', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="alcoholMonthly" />
                    <Label htmlFor="alcoholMonthly">Monthly or less</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-4monthly" id="alcohol2-4Monthly" />
                    <Label htmlFor="alcohol2-4Monthly">2–4 times a month</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-3weekly" id="alcohol2-3Weekly" />
                    <Label htmlFor="alcohol2-3Weekly">2–3 times a week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+weekly" id="alcohol4+Weekly" />
                    <Label htmlFor="alcohol4+Weekly">4+ times a week</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>How many standard drinks containing alcohol do you have on a typical day when drinking?</Label>
                <RadioGroup 
                  value={substance.alcoholQuantity || ""}
                  onValueChange={(value) => handleRadioChange('alcoholQuantity', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2" id="alcohol1-2" />
                    <Label htmlFor="alcohol1-2">1–2</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-4" id="alcohol3-4" />
                    <Label htmlFor="alcohol3-4">3–4</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5-6" id="alcohol5-6" />
                    <Label htmlFor="alcohol5-6">5–6</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7-9" id="alcohol7-9" />
                    <Label htmlFor="alcohol7-9">7–9</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10+" id="alcohol10+" />
                    <Label htmlFor="alcohol10+">10 or more</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>How often do you have 5 or more drinks on one occasion?</Label>
                <RadioGroup 
                  value={substance.alcoholBinge || ""}
                  onValueChange={(value) => handleRadioChange('alcoholBinge', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="alcoholBingeNever" />
                    <Label htmlFor="alcoholBingeNever">Never</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="less_monthly" id="alcoholBingeLessMonthly" />
                    <Label htmlFor="alcoholBingeLessMonthly">Less than monthly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="alcoholBingeMonthly" />
                    <Label htmlFor="alcoholBingeMonthly">Monthly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="alcoholBingeWeekly" />
                    <Label htmlFor="alcoholBingeWeekly">Weekly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="alcoholBingeDaily" />
                    <Label htmlFor="alcoholBingeDaily">Daily or almost daily</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Have you ever felt you should cut down on your drinking?</Label>
                <RadioGroup 
                  value={substance.alcoholCutDown || ""}
                  onValueChange={(value) => handleRadioChange('alcoholCutDown', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcoholCutDownYes" />
                    <Label htmlFor="alcoholCutDownYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcoholCutDownNo" />
                    <Label htmlFor="alcoholCutDownNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Have people annoyed you by criticizing your drinking?</Label>
                <RadioGroup 
                  value={substance.alcoholCriticized || ""}
                  onValueChange={(value) => handleRadioChange('alcoholCriticized', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcoholCriticizedYes" />
                    <Label htmlFor="alcoholCriticizedYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcoholCriticizedNo" />
                    <Label htmlFor="alcoholCriticizedNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Have you ever felt guilty about your drinking?</Label>
                <RadioGroup 
                  value={substance.alcoholGuilt || ""}
                  onValueChange={(value) => handleRadioChange('alcoholGuilt', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcoholGuiltYes" />
                    <Label htmlFor="alcoholGuiltYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcoholGuiltNo" />
                    <Label htmlFor="alcoholGuiltNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Have you ever had a drink first thing in the morning to steady your nerves or get rid of a hangover?</Label>
                <RadioGroup 
                  value={substance.alcoholMorning || ""}
                  onValueChange={(value) => handleRadioChange('alcoholMorning', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcoholMorningYes" />
                    <Label htmlFor="alcoholMorningYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcoholMorningNo" />
                    <Label htmlFor="alcoholMorningNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Has your alcohol use ever caused problems in your life (e.g. legal, relationship, work, health)?</Label>
                <RadioGroup 
                  value={substance.alcoholProblems || ""}
                  onValueChange={(value) => handleRadioChange('alcoholProblems', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="alcoholProblemsYes" />
                    <Label htmlFor="alcoholProblemsYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcoholProblemsNo" />
                    <Label htmlFor="alcoholProblemsNo">No</Label>
                  </div>
                </RadioGroup>
                
                {substance.alcoholProblems === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="alcoholProblemsDescription">Please describe</Label>
                    <Textarea 
                      id="alcoholProblemsDescription"
                      name="alcoholProblemsDescription"
                      value={substance.alcoholProblemsDescription || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Label>Do you currently use cannabis (marijuana, weed, pot, etc.)?</Label>
            <RadioGroup 
              value={substance.cannabisUse || ""}
              onValueChange={(value) => handleRadioChange('cannabisUse', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="cannabisUseYes" />
                <Label htmlFor="cannabisUseYes">Yes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="cannabisUseNo" />
                <Label htmlFor="cannabisUseNo">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          {showCannabisQuestions && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>How often do you use cannabis?</Label>
                <RadioGroup 
                  value={substance.cannabisFrequency || ""}
                  onValueChange={(value) => handleRadioChange('cannabisFrequency', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="cannabisMonthly" />
                    <Label htmlFor="cannabisMonthly">Monthly or less</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-4monthly" id="cannabis2-4Monthly" />
                    <Label htmlFor="cannabis2-4Monthly">2–4 times a month</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-3weekly" id="cannabis2-3Weekly" />
                    <Label htmlFor="cannabis2-3Weekly">2–3 times a week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+weekly" id="cannabis4+Weekly" />
                    <Label htmlFor="cannabis4+Weekly">4+ times a week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="cannabisDaily" />
                    <Label htmlFor="cannabisDaily">Daily</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>What forms of cannabis do you use? (Check all that apply)</Label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisSmoked"
                      checked={substance.cannabisSmoked || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisSmoked", checked as boolean)}
                    />
                    <Label htmlFor="cannabisSmoked">Smoked (joints, pipes, bongs)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisVaped"
                      checked={substance.cannabisVaped || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisVaped", checked as boolean)}
                    />
                    <Label htmlFor="cannabisVaped">Vaped</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisEdibles"
                      checked={substance.cannabisEdibles || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisEdibles", checked as boolean)}
                    />
                    <Label htmlFor="cannabisEdibles">Edibles</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisTinctures"
                      checked={substance.cannabisTinctures || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisTinctures", checked as boolean)}
                    />
                    <Label htmlFor="cannabisTinctures">Tinctures/oils</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisConcentrates"
                      checked={substance.cannabisConcentrates || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisConcentrates", checked as boolean)}
                    />
                    <Label htmlFor="cannabisConcentrates">Concentrates (dabs, wax, etc.)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cannabisOther"
                      checked={substance.cannabisOther || false}
                      onCheckedChange={(checked) => handleCheckboxChange("cannabisOther", checked as boolean)}
                    />
                    <Label htmlFor="cannabisOther">Other</Label>
                  </div>
                </div>
                
                {substance.cannabisOther && (
                  <div className="space-y-2">
                    <Label htmlFor="cannabisOtherDescription">Please specify</Label>
                    <Textarea 
                      id="cannabisOtherDescription"
                      name="cannabisOtherDescription"
                      value={substance.cannabisOtherDescription || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Do you use cannabis for medical reasons, recreational reasons, or both?</Label>
                <RadioGroup 
                  value={substance.cannabisReason || ""}
                  onValueChange={(value) => handleRadioChange('cannabisReason', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medical" id="cannabisMedical" />
                    <Label htmlFor="cannabisMedical">Medical</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recreational" id="cannabisRecreational" />
                    <Label htmlFor="cannabisRecreational">Recreational</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="cannabisBoth" />
                    <Label htmlFor="cannabisBoth">Both</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Has your cannabis use ever caused problems in your life (e.g. legal, relationship, work, health)?</Label>
                <RadioGroup 
                  value={substance.cannabisProblems || ""}
                  onValueChange={(value) => handleRadioChange('cannabisProblems', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cannabisProblemsYes" />
                    <Label htmlFor="cannabisProblemsYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cannabisProblemsNo" />
                    <Label htmlFor="cannabisProblemsNo">No</Label>
                  </div>
                </RadioGroup>
                
                {substance.cannabisProblems === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="cannabisProblemsDescription">Please describe</Label>
                    <Textarea 
                      id="cannabisProblemsDescription"
                      name="cannabisProblemsDescription"
                      value={substance.cannabisProblemsDescription || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Label>Do you currently use opioids (heroin, fentanyl, oxycodone, etc.)?</Label>
            <RadioGroup 
              value={substance.opioidUse || ""}
              onValueChange={(value) => handleRadioChange('opioidUse', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="opioidUseYes" />
                <Label htmlFor="opioidUseYes">Yes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="opioidUseNo" />
                <Label htmlFor="opioidUseNo">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Do you currently use stimulants (cocaine, methamphetamine, MDMA, etc.)?</Label>
            <RadioGroup 
              value={substance.stimulantUse || ""}
              onValueChange={(value) => handleRadioChange('stimulantUse', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="stimulantUseYes" />
                <Label htmlFor="stimulantUseYes">Yes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="stimulantUseNo" />
                <Label htmlFor="stimulantUseNo">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Do you currently use any other drugs not mentioned above?</Label>
            <RadioGroup 
              value={substance.otherDrugUse || ""}
              onValueChange={(value) => handleRadioChange('otherDrugUse', value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="otherDrugUseYes" />
                <Label htmlFor="otherDrugUseYes">Yes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="otherDrugUseNo" />
                <Label htmlFor="otherDrugUseNo">No</Label>
              </div>
            </RadioGroup>
            
            {substance.otherDrugUse === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="otherDrugDescription">Please specify which drugs and frequency of use</Label>
                <Textarea 
                  id="otherDrugDescription"
                  name="otherDrugDescription"
                  value={substance.otherDrugDescription || ''}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-3 border-t pt-6">
            <h3 className="font-semibold">Substance Use Treatment History</h3>
            
            <div className="space-y-3">
              <Label>Have you ever received treatment for substance use?</Label>
              <RadioGroup 
                value={substance.substanceTreatment || ""}
                onValueChange={(value) => handleRadioChange('substanceTreatment', value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="substanceTreatmentYes" />
                  <Label htmlFor="substanceTreatmentYes">Yes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="substanceTreatmentNo" />
                  <Label htmlFor="substanceTreatmentNo">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {showTreatmentQuestions && (
              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                <Label>What type(s) of treatment have you received? (Check all that apply)</Label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentDetox"
                      checked={substance.treatmentDetox || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentDetox", checked as boolean)}
                    />
                    <Label htmlFor="treatmentDetox">Detoxification</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentInpatient"
                      checked={substance.treatmentInpatient || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentInpatient", checked as boolean)}
                    />
                    <Label htmlFor="treatmentInpatient">Inpatient/residential rehab</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentOutpatient"
                      checked={substance.treatmentOutpatient || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentOutpatient", checked as boolean)}
                    />
                    <Label htmlFor="treatmentOutpatient">Outpatient program</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentSupportGroup"
                      checked={substance.treatmentSupportGroup || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentSupportGroup", checked as boolean)}
                    />
                    <Label htmlFor="treatmentSupportGroup">Support groups (AA, NA, etc.)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentMedication"
                      checked={substance.treatmentMedication || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentMedication", checked as boolean)}
                    />
                    <Label htmlFor="treatmentMedication">Medication-assisted treatment (e.g. methadone, Suboxone)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatmentOther"
                      checked={substance.treatmentOther || false}
                      onCheckedChange={(checked) => handleCheckboxChange("treatmentOther", checked as boolean)}
                    />
                    <Label htmlFor="treatmentOther">Other</Label>
                  </div>
                </div>
                
                {substance.treatmentOther && (
                  <div className="space-y-2">
                    <Label htmlFor="treatmentOtherDescription">Please specify</Label>
                    <Textarea 
                      id="treatmentOtherDescription"
                      name="treatmentOtherDescription"
                      value={substance.treatmentOtherDescription || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="mostRecentTreatment">When was your most recent treatment? (year)</Label>
                  <Input 
                    id="mostRecentTreatment"
                    name="mostRecentTreatment"
                    value={substance.mostRecentTreatment || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Label>Have you ever experienced withdrawal symptoms when stopping or reducing substance use?</Label>
              <RadioGroup 
                value={substance.withdrawalSymptoms || ""}
                onValueChange={(value) => handleRadioChange('withdrawalSymptoms', value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="withdrawalSymptomsYes" />
                  <Label htmlFor="withdrawalSymptomsYes">Yes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="withdrawalSymptomsNo" />
                  <Label htmlFor="withdrawalSymptomsNo">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {showWithdrawalQuestions && (
              <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label>Which substances have caused withdrawal symptoms? (Check all that apply)</Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalAlcohol"
                        checked={substance.withdrawalAlcohol || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalAlcohol", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalAlcohol">Alcohol</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalOpioids"
                        checked={substance.withdrawalOpioids || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalOpioids", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalOpioids">Opioids</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalBenzodiazepines"
                        checked={substance.withdrawalBenzodiazepines || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalBenzodiazepines", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalBenzodiazepines">Benzodiazepines</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalStimulants"
                        checked={substance.withdrawalStimulants || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalStimulants", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalStimulants">Stimulants</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalCannabis"
                        checked={substance.withdrawalCannabis || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalCannabis", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalCannabis">Cannabis</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawalOther"
                        checked={substance.withdrawalOther || false}
                        onCheckedChange={(checked) => handleCheckboxChange("withdrawalOther", checked as boolean)}
                      />
                      <Label htmlFor="withdrawalOther">Other</Label>
                    </div>
                  </div>
                  
                  {substance.withdrawalOther && (
                    <div className="space-y-2">
                      <Label htmlFor="withdrawalOtherDescription">Please specify</Label>
                      <Textarea 
                        id="withdrawalOtherDescription"
                        name="withdrawalOtherDescription"
                        value={substance.withdrawalOtherDescription || ''}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="withdrawalSymptomsDescription">Please describe your withdrawal symptoms</Label>
                  <Textarea 
                    id="withdrawalSymptomsDescription"
                    name="withdrawalSymptomsDescription"
                    value={substance.withdrawalSymptomsDescription || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Label>Are you currently interested in treatment for substance use?</Label>
              <RadioGroup 
                value={substance.treatmentInterest || ""}
                onValueChange={(value) => handleRadioChange('treatmentInterest', value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="treatmentInterestYes" />
                  <Label htmlFor="treatmentInterestYes">Yes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="treatmentInterestNo" />
                  <Label htmlFor="treatmentInterestNo">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="additionalSubstanceInfo">Is there anything else you would like us to know about your substance use history?</Label>
              <Textarea 
                id="additionalSubstanceInfo"
                name="additionalSubstanceInfo"
                value={substance.additionalSubstanceInfo || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}