// components/patient/steps/DemographicsStep.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface DemographicsStepProps {
  data: any
  updateData: (data: any) => void
  onNext?: () => void
  onBack?: () => void
}
export function DemographicsStep({ data, updateData, onNext, onBack }: DemographicsStepProps) {
    const demographics = data.demographics || {}
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateData({
        demographics: {
          ...demographics,
          [e.target.name]: e.target.value
        }
      });
    }
    
    const handleRadioChange = (name: string, value: string) => {
      updateData({
        demographics: {
          ...demographics,
          [name]: value
        }
      });
    }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    updateData({
      demographics: {
        ...demographics,
        [id]: checked
      }
    })
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={demographics.fullName || ""} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={demographics.dob || ""} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={demographics.age || ""} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" name="gender" value={demographics.gender || ""} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Pronouns</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pronounsSheHer"
                  checked={demographics.pronounsSheHer || false}
                  onCheckedChange={(checked) => handleCheckboxChange("pronounsSheHer", checked as boolean)}
                />
                <Label htmlFor="pronounsSheHer">She/Her</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pronounsHeHim"
                  checked={demographics.pronounsHeHim || false}
                  onCheckedChange={(checked) => handleCheckboxChange("pronounsHeHim", checked as boolean)}
                />
                <Label htmlFor="pronounsHeHim">He/Him</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pronounsTheyThem"
                  checked={demographics.pronounsTheyThem || false}
                  onCheckedChange={(checked) => handleCheckboxChange("pronounsTheyThem", checked as boolean)}
                />
                <Label htmlFor="pronounsTheyThem">They/Them</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pronounsOther"
                  checked={demographics.pronounsOther || false}
                  onCheckedChange={(checked) => handleCheckboxChange("pronounsOther", checked as boolean)}
                />
                <Label htmlFor="pronounsOther">Other</Label>
              </div>
            </div>

            {demographics.pronounsOther && (
              <div className="space-y-2">
                <Label htmlFor="otherPronouns">Please specify other pronouns</Label>
                <Input
                  id="otherPronouns"
                  name="otherPronouns"
                  value={demographics.otherPronouns || ""}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Race/Ethnicity (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceWhite"
                  checked={demographics.raceWhite || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceWhite", checked as boolean)}
                />
                <Label htmlFor="raceWhite">White</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceBlack"
                  checked={demographics.raceBlack || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceBlack", checked as boolean)}
                />
                <Label htmlFor="raceBlack">Black/African American</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceHispanic"
                  checked={demographics.raceHispanic || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceHispanic", checked as boolean)}
                />
                <Label htmlFor="raceHispanic">Hispanic/Latino</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceAsian"
                  checked={demographics.raceAsian || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceAsian", checked as boolean)}
                />
                <Label htmlFor="raceAsian">Asian</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceNativeAmerican"
                  checked={demographics.raceNativeAmerican || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceNativeAmerican", checked as boolean)}
                />
                <Label htmlFor="raceNativeAmerican">Native American</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="racePacificIslander"
                  checked={demographics.racePacificIslander || false}
                  onCheckedChange={(checked) => handleCheckboxChange("racePacificIslander", checked as boolean)}
                />
                <Label htmlFor="racePacificIslander">Pacific Islander</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="raceOther"
                  checked={demographics.raceOther || false}
                  onCheckedChange={(checked) => handleCheckboxChange("raceOther", checked as boolean)}
                />
                <Label htmlFor="raceOther">Other</Label>
              </div>
            </div>

            {demographics.raceOther && (
              <div className="space-y-2">
                <Label htmlFor="otherRace">Please specify other race/ethnicity</Label>
                <Input id="otherRace" name="otherRace" value={demographics.otherRace || ""} onChange={handleChange} />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Marital/Relationship Status</Label>
            <RadioGroup
              value={demographics.maritalStatus || ""}
              onValueChange={(value) => handleRadioChange("maritalStatus", value)}
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="maritalSingle" />
                <Label htmlFor="maritalSingle">Single</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="married" id="maritalMarried" />
                <Label htmlFor="maritalMarried">Married</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partnered" id="maritalPartnered" />
                <Label htmlFor="maritalPartnered">Partnered</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="divorced" id="maritalDivorced" />
                <Label htmlFor="maritalDivorced">Divorced</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="widowed" id="maritalWidowed" />
                <Label htmlFor="maritalWidowed">Widowed</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="separated" id="maritalSeparated" />
                <Label htmlFor="maritalSeparated">Separated</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Employment Status</Label>
            <RadioGroup
              value={demographics.employmentStatus || ""}
              onValueChange={(value) => handleRadioChange("employmentStatus", value)}
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employed" id="employmentEmployed" />
                <Label htmlFor="employmentEmployed">Employed</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unemployed" id="employmentUnemployed" />
                <Label htmlFor="employmentUnemployed">Unemployed</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="employmentStudent" />
                <Label htmlFor="employmentStudent">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="retired" id="employmentRetired" />
                <Label htmlFor="employmentRetired">Retired</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled" id="employmentDisabled" />
                <Label htmlFor="employmentDisabled">Disabled</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Living Situation</Label>
            <RadioGroup
              value={demographics.livingSituation || ""}
              onValueChange={(value) => handleRadioChange("livingSituation", value)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ownRent" id="livingOwnRent" />
                <Label htmlFor="livingOwnRent">Own/Rent Home</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="withFamily" id="livingWithFamily" />
                <Label htmlFor="livingWithFamily">With family/friends</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shelter" id="livingShelter" />
                <Label htmlFor="livingShelter">Shelter/Transitional</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homeless" id="livingHomeless" />
                <Label htmlFor="livingHomeless">Homeless/No stable housing</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Veteran/Military Service</Label>
            <RadioGroup
              value={demographics.veteranStatus || ""}
              onValueChange={(value) => handleRadioChange("veteranStatus", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="veteranYes" />
                <Label htmlFor="veteranYes">Yes</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="veteranNo" />
                <Label htmlFor="veteranNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Input
                id="primaryLanguage"
                name="primaryLanguage"
                value={demographics.primaryLanguage || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3">
              <Label>Interpreter Needed?</Label>
              <RadioGroup
                value={demographics.interpreterNeeded || ""}
                onValueChange={(value) => handleRadioChange("interpreterNeeded", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="interpreterYes" />
                  <Label htmlFor="interpreterYes">Yes</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="interpreterNo" />
                  <Label htmlFor="interpreterNo">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preferred Contact Method</Label>
            <RadioGroup
              value={demographics.contactMethod || ""}
              onValueChange={(value) => handleRadioChange("contactMethod", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="contactPhone" />
                <Label htmlFor="contactPhone">Phone</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="contactEmail" />
                <Label htmlFor="contactEmail">Email</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="contactText" />
                <Label htmlFor="contactText">Text Message</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mail" id="contactMail" />
                <Label htmlFor="contactMail">Postal Mail</Label>
              </div>
            </RadioGroup>
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