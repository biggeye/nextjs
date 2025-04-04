// components/patient/steps/CulturalPreferencesStep.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface CulturalPreferencesStepProps {
  data: any
  updateData: (data: any) => void
  onNext?: () => void
  onBack?: () => void
}

export function CulturalPreferencesStep({ data, updateData, onNext, onBack }: CulturalPreferencesStepProps) {
  const cultural = data.cultural || {}

  // Adaptive display states
  const [showLanguageQuestions, setShowLanguageQuestions] = useState(false)
  const [showInterpreterQuestions, setShowInterpreterQuestions] = useState(false)
  const [showDifficultyQuestions, setShowDifficultyQuestions] = useState(false)
  const [showCulturalBeliefQuestions, setShowCulturalBeliefQuestions] = useState(false)

  useEffect(() => {
    setShowLanguageQuestions(cultural.primaryLanguageEnglish === "no")
    setShowInterpreterQuestions(cultural.primaryLanguageEnglish === "no" && cultural.requireInterpreter === "yes")
    setShowDifficultyQuestions(
      cultural.primaryLanguageEnglish === "no" &&
        cultural.requireInterpreter === "yes" &&
        cultural.interpreterDifficulty === "yes"
    )
    setShowCulturalBeliefQuestions(cultural.culturalBeliefs === "yes")
  }, [cultural])

  const handleChange = (field: string, value: any) => {
    updateData({
      cultural: {
        ...cultural,
        [field]: value
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cultural Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Is English your primary language?</Label>
          <RadioGroup 
            value={cultural.primaryLanguageEnglish || ''} 
            onValueChange={(value) => handleChange('primaryLanguageEnglish', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="english-yes" />
              <Label htmlFor="english-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="english-no" />
              <Label htmlFor="english-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {showLanguageQuestions && (
          <>
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">What is your primary language?</Label>
              <Input 
                id="primaryLanguage" 
                value={cultural.primaryLanguage || ''} 
                onChange={(e) => handleChange('primaryLanguage', e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label>Do you require an interpreter?</Label>
              <RadioGroup 
                value={cultural.requireInterpreter || ''} 
                onValueChange={(value) => handleChange('requireInterpreter', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="interpreter-yes" />
                  <Label htmlFor="interpreter-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="interpreter-no" />
                  <Label htmlFor="interpreter-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}

        {showInterpreterQuestions && (
          <div className="space-y-2">
            <Label>Have you had difficulty in the past with interpreters?</Label>
            <RadioGroup 
              value={cultural.interpreterDifficulty || ''} 
              onValueChange={(value) => handleChange('interpreterDifficulty', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="difficulty-yes" />
                <Label htmlFor="difficulty-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="difficulty-no" />
                <Label htmlFor="difficulty-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {showDifficultyQuestions && (
          <div className="space-y-2">
            <Label htmlFor="interpreterDifficultyDetails">Please explain the difficulties you've experienced:</Label>
            <Textarea 
              id="interpreterDifficultyDetails" 
              value={cultural.interpreterDifficultyDetails || ''} 
              onChange={(e) => handleChange('interpreterDifficultyDetails', e.target.value)} 
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Do you have cultural or religious beliefs that might affect your care?</Label>
          <RadioGroup 
            value={cultural.culturalBeliefs || ''} 
            onValueChange={(value) => handleChange('culturalBeliefs', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="beliefs-yes" />
              <Label htmlFor="beliefs-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="beliefs-no" />
              <Label htmlFor="beliefs-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {showCulturalBeliefQuestions && (
          <div className="space-y-2">
            <Label htmlFor="culturalBeliefsDetails">Please explain your cultural or religious needs:</Label>
            <Textarea 
              id="culturalBeliefsDetails" 
              value={cultural.culturalBeliefsDetails || ''} 
              onChange={(e) => handleChange('culturalBeliefsDetails', e.target.value)} 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
        {onNext && <Button onClick={onNext}>Next</Button>}
      </CardFooter>
    </Card>
  )
}