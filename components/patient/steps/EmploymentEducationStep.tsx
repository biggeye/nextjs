// components/patient/steps/EmploymentEducationStep.tsx
"use client"

import React from 'react';
import { PatientData } from '../PatientIntakeFlow'; // Import PatientData
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Types defined inline for now, consider moving to /types/steps.ts ---
// TODO: Define the actual fields for EmploymentEducationData
// TODO: Move this type to /types/steps.ts or similar (Ref MEMORY[172bf59a])
export interface EmploymentEducationData { // Defined and Exported
  // Currently a placeholder - define specific fields as needed
  [key: string]: any;
}

interface EmploymentEducationStepProps { // Defined props interface
  employmentEducation: EmploymentEducationData; // Expect 'employmentEducation' prop
  updateData: (newData: Partial<PatientData>) => void; // Expect correct updateData signature
  onNext?: () => void;
  onBack?: () => void;
}
// --- End Types ---

export const EmploymentEducationStep: React.FC<EmploymentEducationStepProps> = ({
  employmentEducation, // Destructure correct prop
  updateData,
  onNext,
  onBack,
}) => {

  // Placeholder handler - adjust based on actual EmploymentEducationData fields
  const handleChange = (field: string, value: any) => {
    updateData({ employmentEducation: { ...employmentEducation, [field]: value } }); // Corrected updateData call
  };

  // Example input/textarea handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  // Example Radio handler
  const handleRadioChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Example Select handler
  const handleSelectChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Example Checkbox handler (for multiple selections)
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = (employmentEducation[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData({ employmentEducation: { ...employmentEducation, [field]: newValues } }); // Corrected updateData call
  };

  // Helper to render Radio Options
  const renderRadioOption = (groupName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${groupName}-${value}`} />
      <Label htmlFor={`${groupName}-${value}`}>{label}</Label>
    </div>
  );

  // Helper to render Checkbox Options
  const renderCheckboxOption = (fieldName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${fieldName}-${value}`}
        checked={((employmentEducation[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment & Education</CardTitle>
        {/* Add description if needed */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Placeholder Content - Replace with actual employment/education fields */}
          <p className='text-center text-muted-foreground'>Employment and education form fields will go here.</p>
           <div className="space-y-2">
            <Label>Current Employment Status</Label>
            <Select
              name="employmentStatus"
              value={employmentEducation.employmentStatus || ''}
              onValueChange={(value) => handleSelectChange('employmentStatus', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed_full">Employed Full-Time</SelectItem>
                <SelectItem value="employed_part">Employed Part-Time</SelectItem>
                <SelectItem value="self_employed">Self-Employed</SelectItem>
                <SelectItem value="unemployed_seeking">Unemployed, Seeking Work</SelectItem>
                <SelectItem value="unemployed_not_seeking">Unemployed, Not Seeking</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="homemaker">Homemaker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {['employed_full', 'employed_part', 'self_employed'].includes(employmentEducation.employmentStatus) && (
            <div className="space-y-2">
                <Label htmlFor="occupation">Occupation/Job Title:</Label>
                <Input id="occupation" name="occupation" value={employmentEducation.occupation || ''} onChange={handleInputChange} />
            </div>
          )}

          <div className="space-y-2">
            <Label>Highest Level of Education Completed</Label>
             <Select
              name="educationLevel"
              value={employmentEducation.educationLevel || ''}
              onValueChange={(value) => handleSelectChange('educationLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less_high_school">Less than High School</SelectItem>
                <SelectItem value="high_school_ged">High School Diploma or GED</SelectItem>
                <SelectItem value="some_college">Some College, No Degree</SelectItem>
                <SelectItem value="associates">Associate's Degree</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="doctoral">Doctoral Degree (PhD, EdD)</SelectItem>
                <SelectItem value="professional">Professional Degree (MD, JD, DDS)</SelectItem>
                <SelectItem value="vocational">Vocational/Trade School</SelectItem>
              </SelectContent>
            </Select>
          </div>

           {/* Add more fields: Job History, Work Problems, Educational Goals, Skills, etc. */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!onNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};