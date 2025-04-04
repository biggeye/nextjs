"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useFormContext } from "@/components/form-context"

interface SubstanceUseProps {
  onNext: () => void
  onPrevious: () => void
}

export function SubstanceUse({ onNext, onPrevious }: SubstanceUseProps) {
  const { formData, updateFormData } = useFormContext()
  const substance = formData.substance || {}
  
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
    updateFormData('substance', { [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateFormData('substance', { [id]: checked })
  }

  const handleRadioChange = (name: string, value: string) => {
    updateFormData('substance', { [name]: value })
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Substance Use History</h2>
          
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
                    <RadioGroupItem value="monthly" id="alcoholBingeMonthly" />
                    <Label htmlFor="alcoholBingeMonthly">Less than monthly</Label>
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
                    <RadioGroupItem value="weekly" id="cannabisWeekly" />
                    <Label htmlFor="cannabisWeekly">Weekly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="several" id="cannabisSeveral" />
                    <Label htmlFor="cannabisSeveral">Several times per week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="cannabisDaily" />
                    <Label htmlFor="cannabisDaily">Daily/Almost daily</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Method of use (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cannabisSmoke" 
                      checked={substance.cannabisSmoke || false}
                      onCheckedChange={(checked) => handleCheckboxChange('cannabisSmoke', checked as boolean)}
                    />
                    <Label htmlFor="cannabisSmoke">Smoke</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cannabisVape" 
                      checked={substance.cannabisVape || false}
                      onCheckedChange={(checked) => handleCheckboxChange('cannabisVape', checked as boolean)}
                    />
                    <Label htmlFor="cannabisVape">Vape</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cannabisEdibles" 
                      checked={substance.cannabisEdibles || false}
                      onCheckedChange={(checked) => handleCheckboxChange('cannabisEdibles', checked as boolean)}
                    />
                    <Label htmlFor="cannabisEdibles">Edibles</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cannabisOther" 
                      checked={substance.cannabisOther || false}
                      onCheckedChange={(checked) => handleCheckboxChange('cannabisOther', checked as boolean)}
                    />
                    <Label htmlFor="cannabisOther">Other</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Do you use cannabis for medical reasons?</Label>
                <RadioGroup 
                  value={substance.cannabisMedical || ""}
                  onValueChange={(value) => handleRadioChange('cannabisMedical', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cannabisMedicalYes" />
                    <Label htmlFor="cannabisMedicalYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cannabisMedicalNo" />
                    <Label htmlFor="cannabisMedicalNo">No</Label>
                  </div>
                </RadioGroup>
                
                {substance.cannabisMedical === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="cannabisMedicalReason">For what condition?</Label>
                    <Textarea 
                      id="cannabisMedicalReason"
                      name="cannabisMedicalReason"
                      value={substance.cannabisMedicalReason || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Has your cannabis use ever caused problems in your life?</Label>
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
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Label>Do you currently use opioids (heroin, fentanyl, prescription painkillers like oxycodone, etc.)?</Label>
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
          
          {showOpioidQuestions && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>Which opioids do you use? (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidHeroin" 
                      checked={substance.opioidHeroin || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidHeroin', checked as boolean)}
                    />
                    <Label htmlFor="opioidHeroin">Heroin</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidFentanyl" 
                      checked={substance.opioidFentanyl || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidFentanyl', checked as boolean)}
                    />
                    <Label htmlFor="opioidFentanyl">Fentanyl</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidOxycodone" 
                      checked={substance.opioidOxycodone || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidOxycodone', checked as boolean)}
                    />
                    <Label htmlFor="opioidOxycodone">Oxycodone (OxyContin, Percocet)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidHydromorphone" 
                      checked={substance.opioidHydromorphone || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidHydromorphone', checked as boolean)}
                    />
                    <Label htmlFor="opioidHydromorphone">Hydromorphone (Dilaudid)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidHydrocodone" 
                      checked={substance.opioidHydrocodone || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidHydrocodone', checked as boolean)}
                    />
                    <Label htmlFor="opioidHydrocodone">Hydrocodone (Vicodin)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidCodeine" 
                      checked={substance.opioidCodeine || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidCodeine', checked as boolean)}
                    />
                    <Label htmlFor="opioidCodeine">Codeine</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidMorphine" 
                      checked={substance.opioidMorphine || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidMorphine', checked as boolean)}
                    />
                    <Label htmlFor="opioidMorphine">Morphine</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidMethadone" 
                      checked={substance.opioidMethadone || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidMethadone', checked as boolean)}
                    />
                    <Label htmlFor="opioidMethadone">Methadone</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidBuprenorphine" 
                      checked={substance.opioidBuprenorphine || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidBuprenorphine', checked as boolean)}
                    />
                    <Label htmlFor="opioidBuprenorphine">Buprenorphine (Suboxone, Subutex)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidOther" 
                      checked={substance.opioidOther || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidOther', checked as boolean)}
                    />
                    <Label htmlFor="opioidOther">Other</Label>
                  </div>
                </div>
                
                {substance.opioidOther && (
                  <div className="space-y-2">
                    <Label htmlFor="otherOpioid">Please specify other opioid</Label>
                    <Textarea 
                      id="otherOpioid"
                      name="otherOpioid"
                      value={substance.otherOpioid || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>How often do you use opioids?</Label>
                <RadioGroup 
                  value={substance.opioidFrequency || ""}
                  onValueChange={(value) => handleRadioChange('opioidFrequency', value)}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="opioidMonthly" />
                    <Label htmlFor="opioidMonthly">Monthly or less</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="opioidWeekly" />
                    <Label htmlFor="opioidWeekly">Weekly</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="several" id="opioidSeveral" />
                    <Label htmlFor="opioidSeveral">Several times per week</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="opioidDaily" />
                    <Label htmlFor="opioidDaily">Daily/Almost daily</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label>Method of use (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidOral" 
                      checked={substance.opioidOral || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidOral', checked as boolean)}
                    />
                    <Label htmlFor="opioidOral">Oral (swallowing)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidSnorting" 
                      checked={substance.opioidSnorting || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidSnorting', checked as boolean)}
                    />
                    <Label htmlFor="opioidSnorting">Snorting/Insufflation</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidSmoking" 
                      checked={substance.opioidSmoking || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidSmoking', checked as boolean)}
                    />
                    <Label htmlFor="opioidSmoking">Smoking</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="opioidInjection" 
                      checked={substance.opioidInjection || false}
                      onCheckedChange={(checked) => handleCheckboxChange('opioidInjection', checked as boolean)}
                    />
                    <Label htmlFor="opioidInjection">Injection</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Do you use opioids for medical reasons (prescribed by a doctor)?</Label>
                <RadioGroup 
                  value={substance.opioidMedical || ""}
                  onValueChange={(value) => handleRadioChange('opioidMedical', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="opioidMedicalYes" />
                    <Label htmlFor="opioidMedicalYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="opioidMedicalNo" />
                    <Label htmlFor="opioidMedicalNo">No</Label>
                  </div>
                </RadioGroup>
                
                {substance.opioidMedical === 'yes' && (
                  <div className="space-y-2">
                    <Label htmlFor="opioidMedicalReason">For what condition?</Label>
                    <Textarea 
                      id="opioidMedicalReason"
                      name="opioidMedicalReason"
                      value={substance.opioidMedicalReason || ''}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Have you ever overdosed on opioids?</Label>
                <RadioGroup 
                  value={substance.opioidOverdose || ""}
                  onValueChange={(value) => handleRadioChange('opioidOverdose', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="opioidOverdoseYes" />
                    <Label htmlFor="opioidOverdoseYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="opioidOverdoseNo" />
                    <Label htmlFor="opioidOverdoseNo">No</Label>
                  </div>
                </RadioGroup>
                
                {substance.opioidOverdose === 'yes' && (
                  <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                    <div className="space-y-3">
                      <Label>How many times?</Label>
                      <RadioGroup 
                        value={substance.overdoseTimes || ""}
                        onValueChange={(value) => handleRadioChange('overdoseTimes', value)}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="overdose1" />
                          <Label htmlFor="overdose1">1</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2-3" id="overdose2-3" />
                          <Label htmlFor="overdose2-3">2–3</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value=">3" id="overdose>3" />
                          <Label htmlFor="overdose>3">{'>3'}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Was Narcan/naloxone used?</Label>
                      <RadioGroup 
                        value={substance.narcanUsed || ""}
                        onValueChange={(value) => handleRadioChange('narcanUsed', value)}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="narcanUsedYes" />
                          <Label htmlFor="narcanUsedYes">Yes</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="narcanUsedNo" />
                          <Label htmlFor="narcanUsedNo">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>When was your most recent overdose?</Label>
                      <Input 
                        id="recentOverdose"
                        name="recentOverdose"
                        value={substance.recentOverdose || ''}
                        onChange={handleChange}
                        placeholder="Month/Year"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Label>Do you have access to Narcan/naloxone?</Label>
                <RadioGroup 
                  value={substance.narcanAccess || ""}
                  onValueChange={(value) => handleRadioChange('narcanAccess', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="narcanAccessYes" />
                    <Label htmlFor="narcanAccessYes">Yes</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="narcanAccessNo" />
                    <Label htmlFor="narcanAccessNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Label>Do you currently use stimulants (cocaine, methamphetamine, amphetamines like Adderall, etc.)?</Label>
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
          
          {showStimulantQuestions && (
            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
              <div className="space-y-3">
                <Label>Which stimulants do you use? (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stimulantCocaine" 
                      checked={substance.stimulantCocaine || false}
                      onCheckedChange={(checked) => handleCheckboxChange('stimulantCocaine', checked as boolean)}
                    />
                    <Label htmlFor="stimulantCocaine">Cocaine/Crack</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stimulantMeth" 
                      checked={substance.stimulantMeth || false}
                      onCheckedChange={(checked) => handleCheckboxChange('stimulantMeth', checked as boolean)}
                    />
                    <Label htmlFor="stimulantMeth">Methamphetamine</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stimulantAdderall" 
                      checked={substance.stimulantAdderall || false}
                      onCheckedChange={(checked) => handleCheckboxChange('stimulantAdderall', checked as boolean)}
                    />
                    <Label htmlFor="stimulantAdderall">Adderall/Amphetamine</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stimulantRitalin" 
                      checked={substance.stimulantRitalin || false}
                      onCheckedChange={(checked) => handleCheckboxChange('stimulantRitalin', checked as boolean)}
                    />
                    <Label htmlFor="stimulantRitalin">Ritalin/Methylphenidate</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stimulantMDMA" 
                      checked={substance.stimulantM

