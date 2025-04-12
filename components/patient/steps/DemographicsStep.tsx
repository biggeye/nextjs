// components/patient/steps/DemographicsStep.tsx
"use client"

import React from 'react';
import { DemographicsData } from '@/types/steps'; 
import { PatientData } from '@/types/patient'; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';

interface DemographicsStepProps { 
  demographics: DemographicsData; 
  updateData: (field: keyof DemographicsData, value: any) => void; 
  onNext?: () => void;
  onBack?: () => void;
}

export const DemographicsStep: React.FC<DemographicsStepProps> = ({
  demographics,
  updateData,
  onNext,
  onBack,
}) => {

  const handleChange = (field: keyof DemographicsData, value: any) => {
    updateData(field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name as keyof DemographicsData, e.target.value);
  };

   const handleRadioChange = (field: keyof DemographicsData, value: string) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (field: keyof DemographicsData, value: string, checked: boolean) => {
    const currentValues = (demographics[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])]; 
    } else {
      newValues = currentValues.filter((v) => v !== value); 
    }

    const typedNewValues = newValues as DemographicsData[typeof field];

    // Update the main checkbox array field first
    updateData(field, typedNewValues);

    // If 'other' was unchecked for pronouns, clear the 'pronounsOther' field
    if (field === 'pronouns' && value === 'other' && !checked) {
      updateData('pronounsOther', ''); // Separate call
    }

    // If 'other' was unchecked for race/ethnicity, clear the 'raceEthnicityOther' field
    if (field === 'raceEthnicity' && value === 'other' && !checked) {
      updateData('raceEthnicityOther', ''); // Separate call
    }
  };

  const renderRadioOption = (groupName: keyof DemographicsData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${String(groupName)}-${value}`} />
      <Label htmlFor={`${String(groupName)}-${value}`}>{label}</Label>
    </div>
  );

  const renderCheckboxOption = (fieldName: keyof DemographicsData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${String(fieldName)}-${value}`}
        checked={((demographics[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${String(fieldName)}-${value}`}>{label}</Label>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographic Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender Identity</Label>
            <Input id="gender" name="gender" value={demographics.gender || ""} onChange={handleInputChange} placeholder="Specify gender identity" />
          </div>

          <div className="space-y-3 rounded-md border p-4">
            <Label className="font-semibold">Pronouns (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {renderCheckboxOption('pronouns', 'she_her', 'She/Her')}
              {renderCheckboxOption('pronouns', 'he_him', 'He/Him')}
              {renderCheckboxOption('pronouns', 'they_them', 'They/Them')}
              {renderCheckboxOption('pronouns', 'other', 'Other (Specify)')}
            </div>
            {((demographics.pronouns as string[]) || []).includes('other') && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="pronounsOther">Other Pronouns:</Label>
                <Input
                  id="pronounsOther"
                  name="pronounsOther"
                  value={demographics.pronounsOther || ""}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                />
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-md border p-4">
            <Label className="font-semibold">Race/Ethnicity (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {renderCheckboxOption('raceEthnicity', 'white', 'White')}
              {renderCheckboxOption('raceEthnicity', 'black_african_american', 'Black/African American')}
              {renderCheckboxOption('raceEthnicity', 'hispanic_latino', 'Hispanic/Latino')}
              {renderCheckboxOption('raceEthnicity', 'asian', 'Asian')}
              {renderCheckboxOption('raceEthnicity', 'native_american', 'Native American')}
              {renderCheckboxOption('raceEthnicity', 'pacific_islander', 'Pacific Islander')}
              {renderCheckboxOption('raceEthnicity', 'other', 'Other (Specify)')}
            </div>
            {((demographics.raceEthnicity as string[]) || []).includes('other') && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="raceEthnicityOther">Other Race/Ethnicity:</Label>
                <Input
                  id="raceEthnicityOther"
                  name="raceEthnicityOther"
                  value={demographics.raceEthnicityOther || ""}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                />
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Marital/Relationship Status</Label>
              <RadioGroup
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

            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">Primary Language</Label>
              <Input id="primaryLanguage" name="primaryLanguage" value={demographics.primaryLanguage || ""} onChange={handleInputChange} placeholder="e.g., English, Spanish" />
            </div>

            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Interpreter Needed?</Label>
              <RadioGroup
                value={demographics.interpreterNeeded || ''}
                onValueChange={(value) => handleRadioChange('interpreterNeeded', value)}
                className="space-y-2"
              >
                {renderRadioOption('interpreterNeeded', 'yes', 'Yes')}
                {renderRadioOption('interpreterNeeded', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-3 rounded-md border p-4">
              <Label className="font-semibold">Preferred Contact Method (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-4">
                 {renderCheckboxOption('preferredContactMethod', 'phone', 'Phone')}
                 {renderCheckboxOption('preferredContactMethod', 'email', 'Email')}
                 {renderCheckboxOption('preferredContactMethod', 'text', 'Text')}
                 {renderCheckboxOption('preferredContactMethod', 'mail', 'Mail')}
              </div>
            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">
             <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input id="insuranceProvider" name="insuranceProvider" value={demographics.insuranceProvider || ""} onChange={handleInputChange} placeholder="Enter provider name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurancePolicyNumber">Insurance Policy Number</Label>
              <Input id="insurancePolicyNumber" name="insurancePolicyNumber" value={demographics.insurancePolicyNumber || ""} onChange={handleInputChange} placeholder="Enter policy number" />
            </div>
          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
        {onNext && <Button onClick={onNext}>Next</Button>}
      </CardFooter>
    </Card>
  );
};