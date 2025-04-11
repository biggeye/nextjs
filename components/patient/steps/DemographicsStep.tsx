// components/patient/steps/DemographicsStep.tsx
"use client"

import React from 'react';
import { PatientData } from '../PatientIntakeFlow'; // Import PatientData
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

// --- Types defined inline for now, consider moving to /types/steps.ts ---
// TODO: Define the actual fields for DemographicsData
// TODO: Move this type to /types/steps.ts or similar (Ref MEMORY[172bf59a])
export interface DemographicsData { // Defined and Exported
  // Currently a placeholder - define specific fields as needed
  [key: string]: any;
}

interface DemographicsStepProps { // Defined props interface
  demographics: DemographicsData; // Expect 'demographics' prop
  updateData: (newData: Partial<PatientData>) => void; // Expect correct updateData signature
  onNext?: () => void;
  onBack?: () => void;
}
// --- End Types ---

export const DemographicsStep: React.FC<DemographicsStepProps> = ({
  demographics, // Destructure correct prop
  updateData,
  onNext,
  onBack,
}) => {

  // Placeholder handler - adjust based on actual DemographicsData fields
  const handleChange = (field: string, value: any) => {
    updateData({ demographics: { ...demographics, [field]: value } });
  };

  // Example input handler (adapt as needed)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

   // Example Radio handler (adapt as needed)
  const handleRadioChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Example Select handler (adapt as needed)
  const handleSelectChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Example Checkbox handler (adapt as needed)
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = (demographics[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData({ demographics: { ...demographics, [field]: newValues } });
  };

  // Helper to render radio options (adapt as needed)
  const renderRadioOption = (groupName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${groupName}-${value}`} />
      <Label htmlFor={`${groupName}-${value}`}>{label}</Label>
    </div>
  );

  // Helper to render checkbox options (adapt as needed)
  const renderCheckboxOption = (fieldName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${fieldName}-${value}`}
        checked={((demographics[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographic Information</CardTitle>
        {/* Add description if needed */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* --- Personal Info --- */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={demographics.fullName || ""} onChange={handleInputChange} placeholder="Enter full name" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={demographics.dob || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" value={demographics.age || ""} onChange={handleInputChange} placeholder="Age" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" name="gender" value={demographics.gender || ""} onChange={handleInputChange} placeholder="Specify gender" />
              </div>
            </div>
          </div>

          {/* --- Pronouns --- */}
          <div className="space-y-3 rounded-md border p-4">
            <Label className="font-semibold">Pronouns</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {renderCheckboxOption('pronounsSheHer', 'She/Her', 'She/Her')}
              {renderCheckboxOption('pronounsHeHim', 'He/Him', 'He/Him')}
              {renderCheckboxOption('pronounsTheyThem', 'They/Them', 'They/Them')}
              {renderCheckboxOption('pronounsOther', 'Other', 'Other')}
            </div>
            {demographics.pronounsOther && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="pronounsOtherSpecify">Other Pronouns:</Label>
                <Input
                  id="pronounsOtherSpecify"
                  name="pronounsOtherSpecify"
                  value={demographics.pronounsOtherSpecify || ""}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                />
              </div>
            )}
          </div>

          {/* --- Race/Ethnicity --- */}
          <div className="space-y-3 rounded-md border p-4">
            <Label className="font-semibold">Race/Ethnicity (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {renderCheckboxOption('raceWhite', 'White', 'White')}
              {renderCheckboxOption('raceBlack', 'Black/African American', 'Black/African American')}
              {renderCheckboxOption('raceHispanic', 'Hispanic/Latino', 'Hispanic/Latino')}
              {renderCheckboxOption('raceAsian', 'Asian', 'Asian')}
              {renderCheckboxOption('raceNativeAmerican', 'Native American', 'Native American')}
              {renderCheckboxOption('racePacificIslander', 'Pacific Islander', 'Pacific Islander')}
              {renderCheckboxOption('raceOther', 'Other', 'Other')}
            </div>
            {demographics.raceOther && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="raceOtherSpecify">Other Race/Ethnicity:</Label>
                <Input
                  id="raceOtherSpecify"
                  name="raceOtherSpecify"
                  value={demographics.raceOtherSpecify || ""}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                />
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* --- Marital Status --- */}
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Marital/Relationship Status</Label>
              <RadioGroup
                name="maritalStatus"
                value={demographics.maritalStatus || ''}
                onValueChange={(value) => handleRadioChange('maritalStatus', value)}
                className="space-y-2"
              >
                {renderRadioOption('maritalStatus', 'single', 'Single')}
                {renderRadioOption('maritalStatus', 'married', 'Married')}
                {renderRadioOption('maritalStatus', 'partnered', 'Partnered')}
                {renderRadioOption('maritalStatus', 'divorced', 'Divorced')}
                {renderRadioOption('maritalStatus', 'widowed', 'Widowed')}
                {renderRadioOption('maritalStatus', 'separated', 'Separated')}
              </RadioGroup>
            </div>

            {/* --- Employment Status --- */}
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Employment Status</Label>
              <RadioGroup
                name="employmentStatus"
                value={demographics.employmentStatus || ''}
                onValueChange={(value) => handleRadioChange('employmentStatus', value)}
                className="space-y-2"
              >
                {renderRadioOption('employmentStatus', 'employed', 'Employed')}
                {renderRadioOption('employmentStatus', 'unemployed', 'Unemployed')}
                {renderRadioOption('employmentStatus', 'student', 'Student')}
                {renderRadioOption('employmentStatus', 'retired', 'Retired')}
                {renderRadioOption('employmentStatus', 'disabled', 'Disabled')}
              </RadioGroup>
            </div>

            {/* --- Living Situation --- */}
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Living Situation</Label>
              <RadioGroup
                name="livingSituation"
                value={demographics.livingSituation || ''}
                onValueChange={(value) => handleRadioChange('livingSituation', value)}
                className="space-y-2"
              >
                {renderRadioOption('livingSituation', 'own_rent', 'Own/Rent Home')}
                {renderRadioOption('livingSituation', 'family_friends', 'With family/friends')}
                {renderRadioOption('livingSituation', 'shelter', 'Shelter/Transitional')}
                {renderRadioOption('livingSituation', 'homeless', 'Homeless/No stable housing')}
              </RadioGroup>
            </div>

            {/* --- Veteran Status --- */}
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Veteran/Military Service</Label>
              <RadioGroup
                name="veteranStatus"
                value={demographics.veteranStatus || ''}
                onValueChange={(value) => handleRadioChange('veteranStatus', value)}
                className="space-y-2"
              >
                {renderRadioOption('veteranStatus', 'yes', 'Yes')}
                {renderRadioOption('veteranStatus', 'no', 'No')}
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                (If Yes, the Military Service section will follow later.)
              </p>
            </div>
          </div>

          {/* --- Language --- */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Input id="primaryLanguage" name="primaryLanguage" value={demographics.primaryLanguage || ""} onChange={handleInputChange} placeholder="Specify primary language"/>
            </div>
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Interpreter Needed?</Label>
              <RadioGroup
                name="interpreterNeeded"
                value={demographics.interpreterNeeded || ''}
                onValueChange={(value) => handleRadioChange('interpreterNeeded', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('interpreterNeeded', 'yes', 'Yes')}
                {renderRadioOption('interpreterNeeded', 'no', 'No')}
              </RadioGroup>
            </div>
          </div>

          {/* --- Contact & Insurance --- */}
          <div className="space-y-3 rounded-md border p-4">
            <Label className="font-semibold">Preferred Contact Method</Label>
            <RadioGroup
              name="preferredContactMethod"
              value={demographics.preferredContactMethod || ''}
              onValueChange={(value) => handleRadioChange('preferredContactMethod', value)}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {renderRadioOption('preferredContactMethod', 'phone', 'Phone')}
              {renderRadioOption('preferredContactMethod', 'email', 'Email')}
              {renderRadioOption('preferredContactMethod', 'text', 'Text')}
              {renderRadioOption('preferredContactMethod', 'mail', 'Mail')}
            </RadioGroup>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" name="emergencyContactName" value={demographics.emergencyContactName || ""} onChange={handleInputChange} placeholder="Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={demographics.emergencyContactPhone || ""} onChange={handleInputChange} placeholder="Phone Number" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input id="insuranceProvider" name="insuranceProvider" value={demographics.insuranceProvider || ""} onChange={handleInputChange} placeholder="Insurance Company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurancePolicyNumber">Policy #</Label>
              <Input id="insurancePolicyNumber" name="insurancePolicyNumber" value={demographics.insurancePolicyNumber || ""} onChange={handleInputChange} placeholder="Policy or Member ID" />
            </div>
          </div>

          {/* --- Additional Notes --- */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Demographic Notes</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={demographics.additionalNotes || ""}
              onChange={handleInputChange}
              placeholder="Enter any other relevant demographic information here..."
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
};