// components/patient/steps/MilitaryServiceStep.tsx
"use client"

import React from 'react';
import { PatientData } from '../PatientIntakeFlow'; // Import PatientData
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// --- Types defined inline for now, consider moving to /types/steps.ts ---
// TODO: Define the actual fields for MilitaryServiceData
// TODO: Move this type to /types/steps.ts or similar (Ref MEMORY[172bf59a])
export interface MilitaryServiceData { // Defined and Exported
  servedInMilitary?: 'yes' | 'no';
  branches?: Array<'army' | 'navy' | 'air_force' | 'marines' | 'coast_guard' | 'space_force'>;
  activeDutyLength?: string; 
  dischargeType?: 'honorable' | 'general' | 'other_than_honorable' | 'bad_conduct' | 'dishonorable' | 'uncharacterized' | 'medical' | 'other';
  dischargeReason?: string;

  impactedBenefits?: 'yes' | 'no'; 
  dischargeUpgrade?: 'yes' | 'no' | 'attempted_unsuccessful' | 'in_progress';

  combatExposure?: 'yes' | 'no';
  conflictOrDeployment?: string; 

  serviceInjuryOrCondition?: 'yes' | 'no';
  injuryDetails?: string; 
  receivedPurpleHeart?: 'yes' | 'no';

  experiencedMST?: 'yes' | 'no';
  mstDetails?: string; 

  receivedMHServicesDuring?: 'yes' | 'no';
  receivedMHServicesAfter?: 'yes' | 'no';
  currentlyReceivingVAServices?: 'yes' | 'no';

  difficultiesAdjusting?: 'yes' | 'no';
  adjustmentChallenges?: Array<'employment' | 'relationships' | 'housing' | 'legal' | 'mental_health' | 'substance_use' | 'physical_health' | 'other'>;
  adjustmentChallengesOther?: string;

  increasedSubstanceUseDuringOrAfter?: 'yes' | 'no';

  additionalMilitaryNotes?: string;
}

interface MilitaryServiceStepProps { // Defined props interface
  militaryService: MilitaryServiceData; // Expect 'militaryService' prop
  updateData: (newData: Partial<PatientData>) => void; // Expect correct updateData signature
  onNext?: () => void;
  onBack?: () => void;
}
// --- End Types ---

export function MilitaryServiceStep({ militaryService, updateData, onNext, onBack }: MilitaryServiceStepProps) {
  const handleChange = (field: keyof MilitaryServiceData, value: string | number | boolean) => {
    updateData({ militaryService: { ...militaryService, [field]: value } } as Partial<PatientData>);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof MilitaryServiceData, value);
  };

  const handleRadioChange = (field: keyof MilitaryServiceData, value: string) => {
    handleChange(field, value);
  };

  const handleCheckboxChange = (field: keyof MilitaryServiceData, value: string, checked: boolean) => {
    const currentValues = (militaryService[field] as string[]) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData({ militaryService: { ...militaryService, [field]: newValues } } as Partial<PatientData>);
  };

  const renderRadioOption = (groupName: keyof MilitaryServiceData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${groupName}-${value}`} />
      <Label htmlFor={`${groupName}-${value}`}>{label}</Label>
    </div>
  );

  const renderCheckboxOption = (fieldName: keyof MilitaryServiceData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${fieldName}-${value}`}
        checked={((militaryService[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Military Service History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">

        <div className="space-y-2">
          <Label className="font-medium">Have you ever served in the U.S. Armed Forces (Active Duty, Reserves, or National Guard)?</Label>
          <RadioGroup
            value={militaryService.servedInMilitary || ''}
            onValueChange={(value) => handleRadioChange('servedInMilitary', value)}
            className="flex space-x-4"
          >
            {renderRadioOption('servedInMilitary', 'yes', 'Yes')}
            {renderRadioOption('servedInMilitary', 'no', 'No')}
          </RadioGroup>
        </div>

        {militaryService.servedInMilitary === 'yes' && (
          <div className="space-y-6 rounded-md border p-4">

            <div className="space-y-2">
              <Label className="font-medium">Branch(es) of Service:</Label>
              <p className="text-sm text-muted-foreground">Select all that apply:</p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('branches', 'army', 'Army')}
                {renderCheckboxOption('branches', 'navy', 'Navy')}
                {renderCheckboxOption('branches', 'air_force', 'Air Force')}
                {renderCheckboxOption('branches', 'marines', 'Marine Corps')}
                {renderCheckboxOption('branches', 'coast_guard', 'Coast Guard')}
                {renderCheckboxOption('branches', 'space_force', 'Space Force')}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activeDutyLength">Approximate Length of Active Duty Service:</Label>
              <Input id="activeDutyLength" name="activeDutyLength" value={militaryService.activeDutyLength || ''} onChange={handleInputChange} placeholder="e.g., 4 years, 8 months" />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Type of Discharge:</Label>
              <RadioGroup
                value={militaryService.dischargeType || ''}
                onValueChange={(value) => handleRadioChange('dischargeType', value)}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
              >
                {renderRadioOption('dischargeType', 'honorable', 'Honorable')}
                {renderRadioOption('dischargeType', 'general', 'General (Under Honorable Conditions)')}
                {renderRadioOption('dischargeType', 'other_than_honorable', 'Other Than Honorable (OTH)')}
                {renderRadioOption('dischargeType', 'bad_conduct', 'Bad Conduct')}
                {renderRadioOption('dischargeType', 'dishonorable', 'Dishonorable')}
                {renderRadioOption('dischargeType', 'uncharacterized', 'Uncharacterized (Entry Level)')}
                {renderRadioOption('dischargeType', 'medical', 'Medical')}
                {renderRadioOption('dischargeType', 'other', 'Other/Unknown')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dischargeReason">Reason for Discharge (if known and comfortable sharing):</Label>
              <Textarea id="dischargeReason" name="dischargeReason" value={militaryService.dischargeReason || ''} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Has your discharge status impacted your access to VA benefits (e.g., healthcare, GI Bill)?</Label>
              <RadioGroup
                value={militaryService.impactedBenefits || ''}
                onValueChange={(value) => handleRadioChange('impactedBenefits', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('impactedBenefits', 'yes', 'Yes')}
                {renderRadioOption('impactedBenefits', 'no', 'No')}
                {renderRadioOption('impactedBenefits', 'unsure', 'Unsure')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Have you attempted or are you considering a discharge upgrade?</Label>
              <RadioGroup
                value={militaryService.dischargeUpgrade || ''}
                onValueChange={(value) => handleRadioChange('dischargeUpgrade', value)}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
              >
                {renderRadioOption('dischargeUpgrade', 'yes', 'Yes, successfully')}
                {renderRadioOption('dischargeUpgrade', 'attempted_unsuccessful', 'Yes, attempted unsuccessfully')}
                {renderRadioOption('dischargeUpgrade', 'in_progress', 'Yes, currently in progress')}
                {renderRadioOption('dischargeUpgrade', 'considering', 'Considering it')}
                {renderRadioOption('dischargeUpgrade', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Were you deployed to a combat zone or exposed to hostile fire/events?</Label>
              <RadioGroup
                value={militaryService.combatExposure || ''}
                onValueChange={(value) => handleRadioChange('combatExposure', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('combatExposure', 'yes', 'Yes')}
                {renderRadioOption('combatExposure', 'no', 'No')}
              </RadioGroup>
            </div>
            {militaryService.combatExposure === 'yes' && (
              <div className="space-y-2 border-l-2 border-muted pl-6">
                <Label htmlFor="conflictOrDeployment">Conflict(s) or Deployment Location(s):</Label>
                <Input id="conflictOrDeployment" name="conflictOrDeployment" value={militaryService.conflictOrDeployment || ''} onChange={handleInputChange} placeholder="e.g., OIF/OEF, Vietnam, Persian Gulf" />
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-medium">Did you sustain any significant injuries or develop health conditions during your service (physical or mental)?</Label>
              <RadioGroup
                value={militaryService.serviceInjuryOrCondition || ''}
                onValueChange={(value) => handleRadioChange('serviceInjuryOrCondition', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('serviceInjuryOrCondition', 'yes', 'Yes')}
                {renderRadioOption('serviceInjuryOrCondition', 'no', 'No')}
              </RadioGroup>
            </div>
            {militaryService.serviceInjuryOrCondition === 'yes' && (
              <div className="space-y-4 border-l-2 border-muted pl-6">
                <div className="space-y-2">
                  <Label htmlFor="injuryDetails">Please describe:</Label>
                  <Textarea id="injuryDetails" name="injuryDetails" value={militaryService.injuryDetails || ''} onChange={handleInputChange} placeholder="e.g., TBI, PTSD, chronic back pain, hearing loss" />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Did you receive a Purple Heart?</Label>
                  <RadioGroup
                    value={militaryService.receivedPurpleHeart || ''}
                    onValueChange={(value) => handleRadioChange('receivedPurpleHeart', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('receivedPurpleHeart', 'yes', 'Yes')}
                    {renderRadioOption('receivedPurpleHeart', 'no', 'No')}
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="space-y-2 rounded-md border border-warning/50 bg-warning/10 p-4">
              <Label className="font-medium text-warning-foreground">Did you experience any unwanted sexual contact, sexual harassment, or assault during your military service (Military Sexual Trauma - MST)?</Label>
              <p className="text-sm text-warning-foreground/80">Answering this is optional, but helps us provide appropriate support.</p>
              <RadioGroup
                value={militaryService.experiencedMST || ''}
                onValueChange={(value) => handleRadioChange('experiencedMST', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('experiencedMST', 'yes', 'Yes')}
                {renderRadioOption('experiencedMST', 'no', 'No')}
                {renderRadioOption('experiencedMST', 'prefer_not_to_say', 'Prefer not to say')}
              </RadioGroup>
            </div>
            {militaryService.experiencedMST === 'yes' && (
              <div className="space-y-2 border-l-2 border-warning/50 pl-6">
                <Label htmlFor="mstDetails">If you are comfortable, you may provide brief details (optional):</Label>
                <Textarea id="mstDetails" name="mstDetails" value={militaryService.mstDetails || ''} onChange={handleInputChange} placeholder="Reporting status, type of incident (optional)"/>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-medium">Did you receive any mental health services (counseling, medication) while on active duty?</Label>
                <RadioGroup
                  value={militaryService.receivedMHServicesDuring || ''}
                  onValueChange={(value) => handleRadioChange('receivedMHServicesDuring', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('receivedMHServicesDuring', 'yes', 'Yes')}
                  {renderRadioOption('receivedMHServicesDuring', 'no', 'No')}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="font-medium">Have you received mental health services since leaving the military?</Label>
                <RadioGroup
                  value={militaryService.receivedMHServicesAfter || ''}
                  onValueChange={(value) => handleRadioChange('receivedMHServicesAfter', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('receivedMHServicesAfter', 'yes', 'Yes')}
                  {renderRadioOption('receivedMHServicesAfter', 'no', 'No')}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="font-medium">Are you currently receiving any services from the VA (Veterans Affairs)?</Label>
                <RadioGroup
                  value={militaryService.currentlyReceivingVAServices || ''}
                  onValueChange={(value) => handleRadioChange('currentlyReceivingVAServices', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('currentlyReceivingVAServices', 'yes', 'Yes')}
                  {renderRadioOption('currentlyReceivingVAServices', 'no', 'No')}
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Have you experienced difficulties adjusting to civilian life after your service?</Label>
              <RadioGroup
                value={militaryService.difficultiesAdjusting || ''}
                onValueChange={(value) => handleRadioChange('difficultiesAdjusting', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('difficultiesAdjusting', 'yes', 'Yes')}
                {renderRadioOption('difficultiesAdjusting', 'no', 'No')}
              </RadioGroup>
            </div>
            {militaryService.difficultiesAdjusting === 'yes' && (
              <div className="space-y-2 border-l-2 border-muted pl-6">
                <Label className="font-medium">In which areas have you faced challenges?</Label>
                <p className="text-sm text-muted-foreground">Select all that apply:</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {renderCheckboxOption('adjustmentChallenges', 'employment', 'Finding/Keeping Employment')}
                  {renderCheckboxOption('adjustmentChallenges', 'relationships', 'Relationships (Family/Social)')}
                  {renderCheckboxOption('adjustmentChallenges', 'housing', 'Housing/Homelessness')}
                  {renderCheckboxOption('adjustmentChallenges', 'legal', 'Legal Issues')}
                  {renderCheckboxOption('adjustmentChallenges', 'mental_health', 'Mental Health (e.g., PTSD, depression)')}
                  {renderCheckboxOption('adjustmentChallenges', 'substance_use', 'Substance Use')}
                  {renderCheckboxOption('adjustmentChallenges', 'physical_health', 'Physical Health Issues')}
                  {renderCheckboxOption('adjustmentChallenges', 'other', 'Other')}
                </div>
                { (militaryService.adjustmentChallenges || []).includes('other') && (
                  <div className="mt-2 space-y-1">
                    <Label htmlFor="adjustmentChallengesOther">Please specify "Other":</Label>
                    <Input id="adjustmentChallengesOther" name="adjustmentChallengesOther" value={militaryService.adjustmentChallengesOther || ''} onChange={handleInputChange} />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-medium">Did you notice an increase in your substance use (alcohol or drugs) during or after your military service?</Label>
              <RadioGroup
                value={militaryService.increasedSubstanceUseDuringOrAfter || ''}
                onValueChange={(value) => handleRadioChange('increasedSubstanceUseDuringOrAfter', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('increasedSubstanceUseDuringOrAfter', 'yes', 'Yes')}
                {renderRadioOption('increasedSubstanceUseDuringOrAfter', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="additionalMilitaryNotes">Is there anything else about your military experience you feel is important for your treatment provider to know?</Label>
              <Textarea id="additionalMilitaryNotes" name="additionalMilitaryNotes" value={militaryService.additionalMilitaryNotes || ''} onChange={handleInputChange} rows={3} />
            </div>

          </div>
        )}

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
}
