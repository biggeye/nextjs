// components/patient/steps/MilitaryServiceStep.tsx
"use client"

import React from 'react';
import { MilitaryServiceData } from '@/types/steps';
import { PatientData } from '@/types/patient';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface MilitaryServiceStepProps {
  militaryService: MilitaryServiceData;
  updateData: (field: keyof MilitaryServiceData, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
}

const dischargeTypesTriggeringReason = ['oth', 'bad_conduct', 'dishonorable'];

export function MilitaryServiceStep({ militaryService, updateData, onNext, onBack }: MilitaryServiceStepProps) {

  const handleChange = (field: keyof MilitaryServiceData, value: any) => {
    // Update the primary field that changed
    updateData(field, value);

    // --- Auto-clear conditional fields --- 
    if (field === 'servedInMilitary' && value === 'no') {
      // Clear all other military fields if servedInMilitary is 'no'
      // This might be extensive, consider which fields *specifically* need clearing
      const fieldsToClear: (keyof MilitaryServiceData)[] = ['branchOfService', 'lengthOfService', 'combatExposure', 'combatConflict', 'combatConflictOther', 'combatTroubledByExperience', 'rankAtDischarge', 'jobMOS', 'dischargeType', 'dischargeReason', 'dischargeReasonOther', 'dischargeImpactOnBenefits', 'dischargeTriedUpgrade', 'dischargeEmotionalImpact', 'injuredDuringService', 'militarySexualTrauma', 'mstType', 'mstReported', 'mstReportTakenSeriously', 'mstRetaliation', 'mstImpactToday', 'mstWantSupport', 'experiencedLossDuringService', 'lossRelatedPtsd', 'receivedMHServicesDuringService', 'receivingVAServices', 'substanceUseIncrease', 'postServiceSubstances', 'substanceUseAffectedCareer', 'soughtSubstanceTreatmentPostService', 'substanceUseContributedIssues', 'additionalMilitaryInfo'];
      fieldsToClear.forEach(f => updateData(f, undefined)); // Or appropriate default values
    }

    if (field === 'combatExposure' && value === 'no') {
      updateData('combatConflict', []);
      updateData('combatConflictOther', undefined);
      updateData('combatTroubledByExperience', undefined);
    }

    if (field === 'combatConflict' && !value.includes('other')) {
      updateData('combatConflictOther', undefined);
    }

    if (field === 'dischargeType' && !dischargeTypesTriggeringReason.includes(value)) {
      updateData('dischargeReason', []);
      updateData('dischargeReasonOther', undefined);
    }

    if (field === 'dischargeReason' && !value.includes('other')) {
      updateData('dischargeReasonOther', undefined);
    }

    if (field === 'dischargeImpactOnBenefits' && value !== 'yes') {
      updateData('dischargeTriedUpgrade', undefined);
    }

    if (field === 'militarySexualTrauma' && value === 'no') {
      updateData('mstType', []);
      updateData('mstReported', undefined);
      updateData('mstReportTakenSeriously', undefined);
      updateData('mstRetaliation', undefined);
      updateData('mstImpactToday', undefined);
      updateData('mstWantSupport', undefined);
    }

    if (field === 'mstReported' && value === 'no') {
      updateData('mstReportTakenSeriously', undefined);
      updateData('mstRetaliation', undefined); // Also clear retaliation if not reported
    }

    if (field === 'experiencedLossDuringService' && value === 'no') {
      updateData('lossRelatedPtsd', undefined);
    }

    if (field === 'substanceUseIncrease' && value === 'no') {
      updateData('postServiceSubstances', []);
      updateData('substanceUseAffectedCareer', undefined);
      updateData('soughtSubstanceTreatmentPostService', undefined);
      updateData('substanceUseContributedIssues', undefined);
    }
    // --- End Auto-clear --- 
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
    handleChange(field, newValues);
  };

  const renderRadioOption = (groupName: keyof MilitaryServiceData, value: string, label: string, disabled: boolean = false) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${groupName}-${value}`} disabled={disabled} />
      <Label htmlFor={`${groupName}-${value}`} className={disabled ? 'text-muted-foreground' : ''}>{label}</Label>
    </div>
  );

  const renderCheckboxOption = (fieldName: keyof MilitaryServiceData, value: string, label: string, disabled: boolean = false) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${fieldName}-${value}`}
        checked={((militaryService[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
        disabled={disabled}
      />
      <Label htmlFor={`${fieldName}-${value}`} className={disabled ? 'text-muted-foreground' : ''}>{label}</Label>
    </div>
  );

  const served = militaryService.servedInMilitary === 'yes';
  const hadCombatExposure = served && militaryService.combatExposure === 'yes';
  const showCombatConflictOther = hadCombatExposure && militaryService.combatConflict?.includes('other');
  const showDischargeReason = served && dischargeTypesTriggeringReason.includes(militaryService.dischargeType || '');
  const showDischargeReasonOther = showDischargeReason && militaryService.dischargeReason?.includes('other');
  const showDischargeUpgrade = served && militaryService.dischargeImpactOnBenefits === 'yes';
  const experiencedMST = served && militaryService.militarySexualTrauma === 'yes';
  const reportedMST = experiencedMST && militaryService.mstReported === 'yes';
  const experiencedLoss = served && militaryService.experiencedLossDuringService === 'yes';
  const hadSubstanceIncrease = served && militaryService.substanceUseIncrease === 'yes';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Military Service History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">

        <div className="space-y-2">
          <Label className="font-medium">Have you ever served in the military (Armed Forces, Reserves, or National Guard)?</Label>
          <RadioGroup
            value={militaryService.servedInMilitary || ''}
            onValueChange={(value) => handleRadioChange('servedInMilitary', value)}
            className="flex space-x-4"
          >
            {renderRadioOption('servedInMilitary', 'yes', 'Yes')}
            {renderRadioOption('servedInMilitary', 'no', 'No')}
          </RadioGroup>
        </div>

        {served && (
          <div className="space-y-6 rounded-md border p-4 animate-fadeIn">

            <div className="space-y-2">
              <Label className="font-medium">Branch of Service:</Label>
              <p className="text-sm text-muted-foreground">Select all that apply:</p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('branchOfService', 'army', 'Army')}
                {renderCheckboxOption('branchOfService', 'navy', 'Navy')}
                {renderCheckboxOption('branchOfService', 'air_force', 'Air Force')}
                {renderCheckboxOption('branchOfService', 'marines', 'Marines')}
                {renderCheckboxOption('branchOfService', 'coast_guard', 'Coast Guard')}
                {renderCheckboxOption('branchOfService', 'national_guard_reserves', 'National Guard/Reserves')}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Length of Service:</Label>
              <RadioGroup
                value={militaryService.lengthOfService || ''}
                onValueChange={(value) => handleRadioChange('lengthOfService', value)}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
              >
                {renderRadioOption('lengthOfService', '<1', '<1 year')}
                {renderRadioOption('lengthOfService', '1-3', '1–3 years')}
                {renderRadioOption('lengthOfService', '3-5', '3–5 years')}
                {renderRadioOption('lengthOfService', '5-10', '5–10 years')}
                {renderRadioOption('lengthOfService', '10-20', '10–20 years')}
                {renderRadioOption('lengthOfService', '>20', '>20 years')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Did you serve in a combat zone or experience hostile fire?</Label>
              <RadioGroup
                value={militaryService.combatExposure || ''}
                onValueChange={(value) => handleRadioChange('combatExposure', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('combatExposure', 'yes', 'Yes')}
                {renderRadioOption('combatExposure', 'no', 'No')}
              </RadioGroup>
            </div>

            {hadCombatExposure && (
              <div className="ml-6 space-y-4 border-l-2 pl-4 border-dashed">
                <div className="space-y-2">
                  <Label className="font-medium">Which conflict/war?</Label>
                   <p className="text-sm text-muted-foreground">Select all that apply:</p>
                   <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {renderCheckboxOption('combatConflict', 'vietnam', 'Vietnam')}
                      {renderCheckboxOption('combatConflict', 'gulf_war', 'Gulf War')}
                      {renderCheckboxOption('combatConflict', 'iraq_afghanistan', 'Iraq/Afghanistan')}
                      {renderCheckboxOption('combatConflict', 'other', 'Other')}
                    </div>
                    {showCombatConflictOther && (
                       <Input name="combatConflictOther" value={militaryService.combatConflictOther || ''} onChange={handleInputChange} placeholder="Specify other conflict" className="mt-2" />
                    )}
                </div>
                 <div className="space-y-2">
                    <Label className="font-medium">Are you currently troubled by experiences from combat (e.g. nightmares, flashbacks)?</Label>
                    <RadioGroup
                      value={militaryService.combatTroubledByExperience || ''}
                      onValueChange={(value) => handleRadioChange('combatTroubledByExperience', value)}
                      className="flex space-x-4"
                    >
                        {renderRadioOption('combatTroubledByExperience', 'yes', 'Yes')}
                        {renderRadioOption('combatTroubledByExperience', 'no', 'No')}
                    </RadioGroup>
                 </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="rankAtDischarge">Rank at Discharge:</Label>
                    <Input id="rankAtDischarge" name="rankAtDischarge" value={militaryService.rankAtDischarge || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobMOS">Job/MOS:</Label>
                    <Input id="jobMOS" name="jobMOS" value={militaryService.jobMOS || ''} onChange={handleInputChange} />
                </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Discharge Type:</Label>
              <RadioGroup
                value={militaryService.dischargeType || ''}
                onValueChange={(value) => handleRadioChange('dischargeType', value)}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
              >
                {renderRadioOption('dischargeType', 'honorable', 'Honorable')}
                {renderRadioOption('dischargeType', 'general', 'General')}
                {renderRadioOption('dischargeType', 'oth', 'Other-than-honorable (OTH)')}
                {renderRadioOption('dischargeType', 'bad_conduct', 'Bad conduct')}
                {renderRadioOption('dischargeType', 'dishonorable', 'Dishonorable')}
                {renderRadioOption('dischargeType', 'active_reserve', 'Still Active/Reserve')}
              </RadioGroup>
            </div>
 
            {showDischargeReason && (
                 <div className="ml-6 space-y-4 border-l-2 pl-4 border-dashed">
                    <Label className="font-medium">Was your discharge related to any of the following?</Label>
                    <p className="text-sm text-muted-foreground">Select all that apply:</p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {renderCheckboxOption('dischargeReason', 'substance_use', 'Substance use')}
                        {renderCheckboxOption('dischargeReason', 'mental_health', 'Mental health')}
                        {renderCheckboxOption('dischargeReason', 'misconduct', 'Misconduct')}
                        {renderCheckboxOption('dischargeReason', 'legal_issues', 'Legal issues')}
                        {renderCheckboxOption('dischargeReason', 'medical', 'Medical reasons')}
                        {renderCheckboxOption('dischargeReason', 'other', 'Other')}
                    </div>
                    {showDischargeReasonOther && (
                        <Input name="dischargeReasonOther" value={militaryService.dischargeReasonOther || ''} onChange={handleInputChange} placeholder="Specify other reason" className="mt-2" />
                    )}
                 </div>
            )}

            <div className="space-y-2">
              <Label className="font-medium">Did your discharge status impact your benefits (e.g. VA benefits eligibility)?</Label>
              <RadioGroup
                value={militaryService.dischargeImpactOnBenefits || ''}
                onValueChange={(value) => handleRadioChange('dischargeImpactOnBenefits', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('dischargeImpactOnBenefits', 'yes', 'Yes')}
                {renderRadioOption('dischargeImpactOnBenefits', 'no', 'No')}
                {renderRadioOption('dischargeImpactOnBenefits', 'na', 'N/A')}
              </RadioGroup>
            </div>

            {showDischargeUpgrade && (
                 <div className="ml-6 space-y-2 border-l-2 pl-4 border-dashed">
                    <Label className="font-medium">Have you tried to get a discharge upgrade or appeal?</Label>
                    <RadioGroup
                        value={militaryService.dischargeTriedUpgrade || ''}
                        onValueChange={(value) => handleRadioChange('dischargeTriedUpgrade', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('dischargeTriedUpgrade', 'yes', 'Yes')}
                        {renderRadioOption('dischargeTriedUpgrade', 'no', 'No')}
                    </RadioGroup>
                 </div>
            )}

            <div className="space-y-2">
              <Label className="font-medium">Did the circumstances of your discharge cause you emotional difficulty or distress?</Label>
              <RadioGroup
                value={militaryService.dischargeEmotionalImpact || ''}
                onValueChange={(value) => handleRadioChange('dischargeEmotionalImpact', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('dischargeEmotionalImpact', 'yes', 'Yes')}
                {renderRadioOption('dischargeEmotionalImpact', 'no', 'No')}
              </RadioGroup>
            </div>

            <h3 className="text-lg font-semibold pt-4 border-t mt-4">Service-Related Stressors</h3>

             <div className="space-y-2">
              <Label className="font-medium">Were you ever injured during service?</Label>
              <RadioGroup
                value={militaryService.injuredDuringService || ''}
                onValueChange={(value) => handleRadioChange('injuredDuringService', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('injuredDuringService', 'yes', 'Yes')}
                {renderRadioOption('injuredDuringService', 'no', 'No')}
              </RadioGroup>
            </div>

             <div className="space-y-2">
              <Label className="font-medium">Did you experience any form of harassment or unwanted sexual attention in the service (military sexual trauma)?</Label>
              <RadioGroup
                value={militaryService.militarySexualTrauma || ''}
                onValueChange={(value) => handleRadioChange('militarySexualTrauma', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('militarySexualTrauma', 'yes', 'Yes')}
                {renderRadioOption('militarySexualTrauma', 'no', 'No')}
              </RadioGroup>
            </div>

            {experiencedMST && (
              <div className="ml-6 space-y-4 border-l-2 pl-4 border-dashed">
                 <div className="space-y-2">
                  <Label className="font-medium">Type of harassment/trauma:</Label>
                  <p className="text-sm text-muted-foreground">Select all that apply:</p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {renderCheckboxOption('mstType', 'sexual', 'Sexual')}
                        {renderCheckboxOption('mstType', 'racial_ethnic', 'Racial/Ethnic')}
                        {renderCheckboxOption('mstType', 'hazing_bullying', 'Hazing/Bullying')}
                        {renderCheckboxOption('mstType', 'physical_assault', 'Physical assault')}
                        {renderCheckboxOption('mstType', 'other', 'Other')}
                        {/* TODO: Add 'Other' text input if 'other' selected */} 
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-medium">Did you report the incident(s)?</Label>
                    <RadioGroup
                        value={militaryService.mstReported || ''}
                        onValueChange={(value) => handleRadioChange('mstReported', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('mstReported', 'yes', 'Yes')}
                        {renderRadioOption('mstReported', 'no', 'No')}
                    </RadioGroup>
                </div>
 
                {reportedMST && (
                    <div className="ml-6 space-y-2 border-l-2 pl-4 border-dashed">
                        <Label className="font-medium">Were the reports taken seriously?</Label>
                        <RadioGroup
                            value={militaryService.mstReportTakenSeriously || ''}
                            onValueChange={(value) => handleRadioChange('mstReportTakenSeriously', value)}
                            className="flex space-x-4"
                        >
                            {renderRadioOption('mstReportTakenSeriously', 'yes', 'Yes')}
                            {renderRadioOption('mstReportTakenSeriously', 'no', 'No')}
                            {renderRadioOption('mstReportTakenSeriously', 'na', 'N/A')}
                        </RadioGroup>
                    </div>
                 )}

                 <div className="space-y-2">
                    <Label className="font-medium">Did you experience any retaliation or negative consequences after reporting?</Label>
                    <RadioGroup
                        value={militaryService.mstRetaliation || ''}
                        onValueChange={(value) => handleRadioChange('mstRetaliation', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('mstRetaliation', 'yes', 'Yes', !reportedMST)} 
                        {renderRadioOption('mstRetaliation', 'no', 'No', !reportedMST)}
                        {renderRadioOption('mstRetaliation', 'na', 'N/A', !reportedMST)}
                    </RadioGroup>
                 </div>

                 <div className="space-y-2">
                    <Label className="font-medium">Do these experiences impact your mental health today?</Label>
                    <RadioGroup
                        value={militaryService.mstImpactToday || ''}
                        onValueChange={(value) => handleRadioChange('mstImpactToday', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('mstImpactToday', 'yes', 'Yes')}
                        {renderRadioOption('mstImpactToday', 'no', 'No')}
                    </RadioGroup>
                 </div>

                 <div className="space-y-2">
                    <Label className="font-medium">Would you like counseling or support for these experiences now?</Label>
                    <RadioGroup
                        value={militaryService.mstWantSupport || ''}
                        onValueChange={(value) => handleRadioChange('mstWantSupport', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('mstWantSupport', 'yes', 'Yes')}
                        {renderRadioOption('mstWantSupport', 'no', 'No')}
                    </RadioGroup>
                 </div>
              </div>
            )}

            <div className="space-y-2 pt-4 border-t mt-4">
              <Label className="font-medium">Did you lose any close comrades or experience other significant trauma/loss during service?</Label>
              <RadioGroup
                value={militaryService.experiencedLossDuringService || ''}
                onValueChange={(value) => handleRadioChange('experiencedLossDuringService', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('experiencedLossDuringService', 'yes', 'Yes')}
                {renderRadioOption('experiencedLossDuringService', 'no', 'No')}
              </RadioGroup>
            </div>

            {experiencedLoss && (
                 <div className="ml-6 space-y-2 border-l-2 pl-4 border-dashed">
                    <Label className="font-medium">Do you have PTSD symptoms related to those events (e.g. intrusive memories, hypervigilance)?</Label>
                    <RadioGroup
                        value={militaryService.lossRelatedPtsd || ''}
                        onValueChange={(value) => handleRadioChange('lossRelatedPtsd', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('lossRelatedPtsd', 'yes', 'Yes')}
                        {renderRadioOption('lossRelatedPtsd', 'no', 'No')}
                    </RadioGroup>
                 </div>
            )}

            <h3 className="text-lg font-semibold pt-4 border-t mt-4">Health Services</h3>

            <div className="space-y-2">
              <Label className="font-medium">Did you receive any mental health services during your military service?</Label>
              <RadioGroup
                value={militaryService.receivedMHServicesDuringService || ''}
                onValueChange={(value) => handleRadioChange('receivedMHServicesDuringService', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('receivedMHServicesDuringService', 'yes', 'Yes')}
                {renderRadioOption('receivedMHServicesDuringService', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Are you currently receiving any services through the VA (Veterans Affairs) for mental health or substance use?</Label>
              <RadioGroup
                value={militaryService.receivingVAServices || ''}
                onValueChange={(value) => handleRadioChange('receivingVAServices', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('receivingVAServices', 'yes', 'Yes')}
                {renderRadioOption('receivingVAServices', 'no', 'No')}
              </RadioGroup>
            </div>

            <h3 className="text-lg font-semibold pt-4 border-t mt-4">Substance Use in Military</h3>

             <div className="space-y-2">
              <Label className="font-medium">Did your alcohol or substance use increase during or after your service?</Label>
              <RadioGroup
                value={militaryService.substanceUseIncrease || ''}
                onValueChange={(value) => handleRadioChange('substanceUseIncrease', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('substanceUseIncrease', 'yes', 'Yes')}
                {renderRadioOption('substanceUseIncrease', 'no', 'No')}
              </RadioGroup>
            </div>

            {hadSubstanceIncrease && (
              <div className="ml-6 space-y-4 border-l-2 pl-4 border-dashed">
                 <div className="space-y-2">
                  <Label className="font-medium">Substances involved (post-service):</Label>
                  <p className="text-sm text-muted-foreground">Select all that apply:</p>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                        {renderCheckboxOption('postServiceSubstances', 'alcohol', 'Alcohol')}
                        {renderCheckboxOption('postServiceSubstances', 'cannabis', 'Cannabis')}
                        {renderCheckboxOption('postServiceSubstances', 'opioids', 'Opioids')}
                        {renderCheckboxOption('postServiceSubstances', 'stimulants', 'Stimulants')}
                        {renderCheckboxOption('postServiceSubstances', 'prescription_misuse', 'Prescription misuse')}
                        {renderCheckboxOption('postServiceSubstances', 'other', 'Other')}
                         {/* TODO: Add 'Other' text input if 'other' selected */} 
                    </div>
                </div>

                 <div className="space-y-2">
                    <Label className="font-medium">Did substance use affect your military career or lead to disciplinary actions?</Label>
                    <RadioGroup
                        value={militaryService.substanceUseAffectedCareer || ''}
                        onValueChange={(value) => handleRadioChange('substanceUseAffectedCareer', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('substanceUseAffectedCareer', 'yes', 'Yes')}
                        {renderRadioOption('substanceUseAffectedCareer', 'no', 'No')}
                    </RadioGroup>
                 </div>

                 <div className="space-y-2">
                    <Label className="font-medium">Since discharge, have you sought treatment for substance use (through the VA or elsewhere)?</Label>
                    <RadioGroup
                        value={militaryService.soughtSubstanceTreatmentPostService || ''}
                        onValueChange={(value) => handleRadioChange('soughtSubstanceTreatmentPostService', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('soughtSubstanceTreatmentPostService', 'yes', 'Yes')}
                        {renderRadioOption('soughtSubstanceTreatmentPostService', 'no', 'No')}
                    </RadioGroup>
                 </div>

                 <div className="space-y-2">
                    <Label className="font-medium">Did substance use contribute to any legal or family issues post-service?</Label>
                    <RadioGroup
                        value={militaryService.substanceUseContributedIssues || ''}
                        onValueChange={(value) => handleRadioChange('substanceUseContributedIssues', value)}
                        className="flex space-x-4"
                    >
                        {renderRadioOption('substanceUseContributedIssues', 'yes', 'Yes')}
                        {renderRadioOption('substanceUseContributedIssues', 'no', 'No')}
                    </RadioGroup>
                 </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-2 pt-4 border-t mt-4">
              <Label htmlFor="additionalMilitaryInfo">Additional Information – Military:</Label>
              <p className="text-sm text-muted-foreground">Is there anything else about your military service or veteran status that you’d like to mention?</p>
              <Textarea
                id="additionalMilitaryInfo"
                name="additionalMilitaryInfo"
                value={militaryService.additionalMilitaryInfo || ''}
                onChange={handleInputChange}
              />
            </div>

          </div> // End conditional 'served' section
        )}

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
}
