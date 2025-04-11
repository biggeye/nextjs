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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SocialFamilyHistoryData { 
  [key: string]: any;
}

interface SocialFamilyHistoryStepProps { 
  socialFamilyHistory: SocialFamilyHistoryData; 
  updateData: (newData: Partial<PatientData>) => void; 
  onNext?: () => void;
  onBack?: () => void;
}

export const SocialFamilyHistoryStep: React.FC<SocialFamilyHistoryStepProps> = ({
  socialFamilyHistory, 
  updateData,
  onNext,
  onBack,
}) => {

  const handleChange = (field: string, value: any) => {
    updateData({ socialFamilyHistory: { ...socialFamilyHistory, [field]: value } }); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleRadioChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  const handleSelectChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = (socialFamilyHistory[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData({ socialFamilyHistory: { ...socialFamilyHistory, [field]: newValues } }); 
  };

  const renderRadioOption = (groupName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${groupName}-${value}`} />
      <Label htmlFor={`${groupName}-${value}`}>{label}</Label>
    </div>
  );

  const renderCheckboxOption = (fieldName: string, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${fieldName}-${value}`}
        checked={((socialFamilyHistory[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social & Family History</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <p className='text-center text-muted-foreground'>Social and family history form fields will go here.</p>
          <div className='space-y-2'>
             <Label htmlFor="childhoodDescription">Describe your childhood environment:</Label>
             <Textarea id="childhoodDescription" name="childhoodDescription" value={socialFamilyHistory.childhoodDescription || ''} onChange={handleInputChange} rows={3} />
          </div>
          <div className='space-y-2'>
            <Label>Family History of Substance Use or Mental Health Issues?</Label>
            <RadioGroup
              name="familyHistoryIssues"
              value={socialFamilyHistory.familyHistoryIssues || ''}
              onValueChange={(value) => handleRadioChange('familyHistoryIssues', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('familyHistoryIssues', 'yes', 'Yes')}
              {renderRadioOption('familyHistoryIssues', 'no', 'No')}
              {renderRadioOption('familyHistoryIssues', 'unsure', 'Unsure')}
            </RadioGroup>
          </div>
           {socialFamilyHistory.familyHistoryIssues === 'yes' && (
              <div className="mt-2 space-y-2">
                <Label htmlFor="familyHistoryDetails">Please provide details (who, what issues):</Label>
                <Textarea id="familyHistoryDetails" name="familyHistoryDetails" value={socialFamilyHistory.familyHistoryDetails || ''} onChange={handleInputChange} rows={3} />
              </div>
            )}
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
