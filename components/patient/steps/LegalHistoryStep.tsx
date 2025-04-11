"use client"

import React from 'react';
import { PatientData } from '../PatientIntakeFlow'; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// --- Types defined inline for now, consider moving to /types/steps.ts ---
// TODO: Define the actual fields for LegalHistoryData
// TODO: Move this type to /types/steps.ts or similar (Ref MEMORY[172bf59a])
export interface LegalHistoryData { 
  // Currently a placeholder - define specific fields as needed
  [key: string]: any;
}

interface LegalHistoryStepProps { 
  legalHistory: LegalHistoryData; 
  updateData: (newData: Partial<PatientData>) => void; 
  onNext?: () => void;
  onBack?: () => void;
}
// --- End Types ---

export const LegalHistoryStep: React.FC<LegalHistoryStepProps> = ({
  legalHistory, 
  updateData,
  onNext,
  onBack,
}) => {

  // Placeholder handler - adjust based on actual LegalHistoryData fields
  const handleChange = (field: string, value: any) => {
    updateData({ legalHistory: { ...legalHistory, [field]: value } }); 
  };

  // Example input/textarea handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  // Example Radio handler
  const handleRadioChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Example Checkbox handler (for multiple selections)
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = (legalHistory[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData({ legalHistory: { ...legalHistory, [field]: newValues } }); 
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
        checked={((legalHistory[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal History</CardTitle>
        {/* Add description if needed */}
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Placeholder Content - Replace with actual legal history fields */}
          <p className='text-center text-muted-foreground'>Legal history form fields will go here.</p>
          <div className="space-y-2">
            <Label>Currently on Probation/Parole?</Label>
            <RadioGroup
              name="probationParoleStatus"
              value={legalHistory.probationParoleStatus || ''}
              onValueChange={(value) => handleRadioChange('probationParoleStatus', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('probationParoleStatus', 'yes', 'Yes')}
              {renderRadioOption('probationParoleStatus', 'no', 'No')}
            </RadioGroup>
          </div>
           {legalHistory.probationParoleStatus === 'yes' && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="probationOfficer">Probation/Parole Officer Name & Contact:</Label>
                <Input id="probationOfficer" name="probationOfficer" value={legalHistory.probationOfficer || ''} onChange={handleInputChange} />
              </div>
            )}
          <div className='space-y-2'>
             <Label htmlFor="pastArrests">History of Arrests/Charges (Briefly describe, include dates if possible)</Label>
             <Textarea id="pastArrests" name="pastArrests" value={legalHistory.pastArrests || ''} onChange={handleInputChange} rows={3} />
          </div>
          {/* Add more fields: Pending Charges, Lawsuits, DUI History, Incarceration History etc. */}
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