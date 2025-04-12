// components/patient/steps/EmploymentStep.tsx
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EmploymentData } from '@/types/steps';
import { PatientData } from '@/types/patient';

interface EmploymentStepProps {
  employment?: EmploymentData;
  updateData: (field: keyof EmploymentData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EmploymentStep: React.FC<EmploymentStepProps> = ({ employment = {}, updateData, onNext, onBack }) => {
  const [localData, setLocalData] = useState<EmploymentData>(employment);

  useEffect(() => {
    setLocalData(employment);
  }, [employment]);

  // Basic handler for simple inputs/textareas
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    updateData(name as keyof EmploymentData, value);
  }, [localData, updateData]);

  // Handler for radio button groups
  const handleRadioChange = useCallback((name: keyof EmploymentData, value: string) => {
    // Clear conflicting conditional data when status changes
    let updatedData: EmploymentData = { ...localData, [name]: value };

    // Basic reset logic (can be refined)
    if (name === 'currentEmploymentStatus') {
      // Reset fields related to other statuses
      // This is a simplified example; more granular reset might be needed
      updatedData = { currentEmploymentStatus: value }; 
    }

    setLocalData(updatedData);
    updateData(name, value);

    // If conditional resets happened, update those fields too (this logic might need refinement)
    if (name === 'currentEmploymentStatus') {
        // Example: Reset fields when switching status. Adjust as needed.
        if (value !== 'employed') updateData('currentJobs' as keyof EmploymentData, []);
        if (value !== 'unemployed') updateData('unemploymentReason' as keyof EmploymentData, '');
        // Add other resets based on your specific logic
    }
  }, [localData, updateData]);

  // Handler for checkbox groups (string array fields)
  const handleCheckboxChange = useCallback((groupName: keyof EmploymentData, value: string, checked: boolean) => {
    setLocalData(prevData => {
      const currentValues = (prevData[groupName] as string[] | undefined) || [];
      let newValues: string[];

      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(item => item !== value);
      }

      const updatedData = { ...prevData, [groupName]: newValues };
      updateData(groupName as keyof EmploymentData, newValues);
      return updatedData;
    });
  }, [updateData]);

  // Helper to check if a checkbox is checked
  const isChecked = (groupName: keyof EmploymentData, value: string): boolean => {
    const values = localData[groupName] as string[] | undefined;
    return values?.includes(value) || false;
  };

  // Flags for conditional rendering (will add more later)
  const isEmployed = ['employed_full_time', 'employed_part_time', 'self_employed'].includes(localData.currentEmploymentStatus || '');
  const isUnemployed = localData.currentEmploymentStatus === 'unemployed';
  const isStudent = localData.currentEmploymentStatus === 'student';
  const isRetired = localData.currentEmploymentStatus === 'retired';
  const isDisabled = localData.currentEmploymentStatus === 'not_in_labor_force';
  const isHomemaker = localData.currentEmploymentStatus === 'homemaker';

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Employment & Financial Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Employment Status */}
        <div className="space-y-2">
          <Label className="font-semibold">Current Employment Status: (Select one that best applies)</Label>
          <RadioGroup
            name="currentEmploymentStatus"
            value={localData.currentEmploymentStatus}
            onValueChange={(value) => handleRadioChange('currentEmploymentStatus', value)}
            className="grid grid-cols-2 gap-x-4 gap-y-2" // Could also use flex-wrap
          >
            {/* Static items for debugging */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Employed (Full-Time)" id="employed-full-time" />
              <Label htmlFor="employed-full-time">Employed (Full-Time)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Employed (Part-Time)" id="employed-part-time" />
              <Label htmlFor="employed-part-time">Employed (Part-Time)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Self-Employed" id="self-employed" />
              <Label htmlFor="self-employed">Self-Employed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Unemployed" id="unemployed" />
              <Label htmlFor="unemployed">Unemployed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Student" id="student" />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Retired" id="retired" />
              <Label htmlFor="retired">Retired</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Disabled/Unable to work" id="disabled-unable-to-work" />
              <Label htmlFor="disabled-unable-to-work">Disabled/Unable to work</Label>
            </div>
          </RadioGroup>
        </div>

        {/* --- If Employed --- */}
        {isEmployed && (
          <div className="border p-4 rounded space-y-4">
            <h3 className="font-semibold">Employment Details</h3>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation/Job Title (optional):</Label>
              <Input id="occupation" name="occupation" value={localData.occupation || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">How long in current job?</Label>
              <RadioGroup name="currentJobDuration" value={localData.currentJobDuration} onValueChange={(v) => handleRadioChange('currentJobDuration', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="<3 months" id="j1" /><Label htmlFor="j1">{'<3 months'}</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="3–6 months" id="j2" /><Label htmlFor="j2">3–6 months</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="6–12 months" id="j3" /><Label htmlFor="j3">6–12 months</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="1–3 years" id="j4" /><Label htmlFor="j4">1–3 years</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="3–5 years" id="j5" /><Label htmlFor="j5">3–5 years</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value=">5 years" id="j6" /><Label htmlFor="j6">{'>5 years'}</Label></div>
              </RadioGroup>
            </div>
            {localData.currentJobDuration === '<3 months' && (
              <div className="space-y-2">
                <Label className="font-semibold">What happened with your last job?</Label>
                <RadioGroup name="reasonForLeavingLastJob" value={localData.reasonForLeavingLastJob} onValueChange={(v) => handleRadioChange('reasonForLeavingLastJob', v)} className="space-y-1">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Laid off" id="lj1" /><Label htmlFor="lj1">Laid off or position ended</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Quit" id="lj2" /><Label htmlFor="lj2">Quit (voluntarily left)</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Fired" id="lj3" /><Label htmlFor="lj3">Fired/Terminated</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Temp/contract ended" id="lj4" /><Label htmlFor="lj4">Temp/contract job ended</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="lj5" /><Label htmlFor="lj5">Other</Label></div>
                </RadioGroup>
                {localData.reasonForLeavingLastJob === 'Other' && (
                  <Input name="reasonForLeavingLastJobOther" value={localData.reasonForLeavingLastJobOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
                )}
              </div>
            )}
            {(localData.reasonForLeavingLastJob === 'Fired' || localData.reasonForLeavingLastJob === 'Quit') && (
              <div className="space-y-2">
                <Label className="font-semibold">Was it related to substance use or mental health issues?</Label>
                <RadioGroup name="lastJobEndRelatedToIssues" value={localData.lastJobEndRelatedToIssues} onValueChange={(v) => handleRadioChange('lastJobEndRelatedToIssues', v)} className="space-y-1">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ljr1" /><Label htmlFor="ljr1">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ljr2" /><Label htmlFor="ljr2">No</Label></div>
                </RadioGroup>
                {localData.lastJobEndRelatedToIssues === 'yes' && (
                  <div className="pl-6 mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="font-semibold">Did your employer know about the issue?</Label>
                      <RadioGroup name="employerAwareOfIssues" value={localData.employerAwareOfIssues} onValueChange={(v) => handleRadioChange('employerAwareOfIssues', v)} className="space-y-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ea1" /><Label htmlFor="ea1">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ea2" /><Label htmlFor="ea2">No</Label></div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Were you offered assistance (EAP)?</Label>
                      <RadioGroup name="employerOfferedAssistance" value={localData.employerOfferedAssistance} onValueChange={(v) => handleRadioChange('employerOfferedAssistance', v)} className="space-y-1">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="eo1" /><Label htmlFor="eo1">Yes</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="eo2" /><Label htmlFor="eo2">No</Label></div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label className="font-semibold">Work Schedule:</Label>
              <RadioGroup name="workSchedule" value={localData.workSchedule} onValueChange={(v) => handleRadioChange('workSchedule', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="Daytime" id="ws1" /><Label htmlFor="ws1">Daytime</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Night shifts" id="ws2" /><Label htmlFor="ws2">Night shifts</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Varies" id="ws3" /><Label htmlFor="ws3">Varies</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="N/A" id="ws4" /><Label htmlFor="ws4">N/A</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Does your current job accommodate any mental health or medical needs?</Label>
              <RadioGroup name="jobAccommodatesNeeds" value={localData.jobAccommodatesNeeds} onValueChange={(v) => handleRadioChange('jobAccommodatesNeeds', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ja1" /><Label htmlFor="ja1">Yes</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ja2" /><Label htmlFor="ja2">No</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="n/a" id="ja3" /><Label htmlFor="ja3">N/A</Label></div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* --- If Unemployed --- */}
        {isUnemployed && (
          <div className="border p-4 rounded space-y-4">
            <h3 className="font-semibold">Unemployment Details</h3>
            <div className="space-y-2">
              <Label className="font-semibold">How long since regular employment?</Label>
              <RadioGroup name="unemployedDuration" value={localData.unemployedDuration} onValueChange={(v) => handleRadioChange('unemployedDuration', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="<1 month" id="ud1" /><Label htmlFor="ud1">{'<1 month'}</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="1–6 months" id="ud2" /><Label htmlFor="ud2">1–6 months</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="6–12 months" id="ud3" /><Label htmlFor="ud3">6–12 months</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="1–3 years" id="ud4" /><Label htmlFor="ud4">1–3 years</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value=">3 years" id="ud5" /><Label htmlFor="ud5">{'>3 years'}</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Never held a regular job" id="ud6" /><Label htmlFor="ud6">Never held a regular job</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Primary reason for unemployment:</Label>
              <RadioGroup name="unemploymentReason" value={localData.unemploymentReason} onValueChange={(v) => handleRadioChange('unemploymentReason', v)} className="space-y-1">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Laid off/economy" id="ur1" /><Label htmlFor="ur1">Laid off/economy</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Choosing to stay home" id="ur2" /><Label htmlFor="ur2">Choosing to stay home (caregiving)</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Disability/health issues" id="ur3" /><Label htmlFor="ur3">Disability/health issues</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Unable to find work" id="ur4" /><Label htmlFor="ur4">Unable to find work</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="ur5" /><Label htmlFor="ur5">Other</Label></div>
              </RadioGroup>
              {localData.unemploymentReason === 'Other' && (
                  <Input name="unemploymentReasonOther" value={localData.unemploymentReasonOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
              )}
            </div>

            {localData.unemployedDuration === 'Never held a regular job' && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <Label className="font-semibold">How have you supported yourself financially? (Check all that apply)</Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw1" checked={isChecked('financialSupportSourcesNeverWorked', 'Family/friends support')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Family/friends support', !!c)} /><Label htmlFor="fsnw1">Family/friends support</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw2" checked={isChecked('financialSupportSourcesNeverWorked', 'Government assistance')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Government assistance', !!c)} /><Label htmlFor="fsnw2">Government assistance (e.g. SSI, unemployment)</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw3" checked={isChecked('financialSupportSourcesNeverWorked', 'Informal work')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Informal work', !!c)} /><Label htmlFor="fsnw3">Informal work “under the table”</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw4" checked={isChecked('financialSupportSourcesNeverWorked', 'Illegal activities')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Illegal activities', !!c)} /><Label htmlFor="fsnw4">Illegal activities</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw5" checked={isChecked('financialSupportSourcesNeverWorked', 'Charities/shelters')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Charities/shelters', !!c)} /><Label htmlFor="fsnw5">Charities/shelters</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="fsnw6" checked={isChecked('financialSupportSourcesNeverWorked', 'Other')} onCheckedChange={(c) => handleCheckboxChange('financialSupportSourcesNeverWorked', 'Other', !!c)} /><Label htmlFor="fsnw6">Other</Label></div>
                </div>
                {isChecked('financialSupportSourcesNeverWorked', 'Other') && (
                   <Input name="financialSupportSourcesNeverWorkedOther" value={localData.financialSupportSourcesNeverWorkedOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
                )}

                {isChecked('financialSupportSourcesNeverWorked', 'Family/friends support') && (
                   <div className="space-y-2 pl-6 mt-4">
                      <Label className="font-semibold">Were there periods when that support was not available?</Label>
                      <RadioGroup name="familySupportGaps" value={localData.familySupportGaps} onValueChange={(v) => handleRadioChange('familySupportGaps', v)} className="space-y-1">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="fsg1" /><Label htmlFor="fsg1">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="fsg2" /><Label htmlFor="fsg2">No</Label></div>
                      </RadioGroup>
                      {localData.familySupportGaps === 'yes' && (
                          <div className="space-y-4 pl-6 mt-4">
                              <Label className="font-semibold">How did you manage during those times? (Check all that apply)</Label>
                              <div className="space-y-1">
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm1" checked={isChecked('familySupportGapManagement', 'Borrowed money')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Borrowed money', !!c)} /><Label htmlFor="fsgm1">Borrowed money/took loans</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm2" checked={isChecked('familySupportGapManagement', 'Sold personal items')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Sold personal items', !!c)} /><Label htmlFor="fsgm2">Sold personal items</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm3" checked={isChecked('familySupportGapManagement', 'Illegal activities')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Illegal activities', !!c)} /><Label htmlFor="fsgm3">Engaged in illegal activities for income</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm4" checked={isChecked('familySupportGapManagement', 'Relied on charity')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Relied on charity', !!c)} /><Label htmlFor="fsgm4">Relied on charity or shelters</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm5" checked={isChecked('familySupportGapManagement', 'Went without basic needs')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Went without basic needs', !!c)} /><Label htmlFor="fsgm5">Went without basic needs (food, etc.)</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="fsgm6" checked={isChecked('familySupportGapManagement', 'Other')} onCheckedChange={(c) => handleCheckboxChange('familySupportGapManagement', 'Other', !!c)} /><Label htmlFor="fsgm6">Other</Label></div>
                              </div>
                              {isChecked('familySupportGapManagement', 'Other') && (
                                  <Input name="familySupportGapManagementOther" value={localData.familySupportGapManagementOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
                              )}
                              {isChecked('familySupportGapManagement', 'Illegal activities') && (
                                  <div className="space-y-2 pl-6 mt-4">
                                      <Label className="font-semibold">Did that result in legal consequences?</Label>
                                      <RadioGroup name="illegalActivitiesLegalConsequences" value={localData.illegalActivitiesLegalConsequences} onValueChange={(v) => handleRadioChange('illegalActivitiesLegalConsequences', v)} className="space-y-1">
                                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ialc1" /><Label htmlFor="ialc1">Yes</Label></div>
                                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ialc2" /><Label htmlFor="ialc2">No</Label></div>
                                      </RadioGroup>
                                  </div>
                              )}
                              {isChecked('familySupportGapManagement', 'Went without basic needs') && (
                                  <div className="space-y-4 pl-6 mt-4">
                                      <Label className="font-semibold">Which necessities most often? (Check all that apply)</Label>
                                      <div className="space-y-1">
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn1" checked={isChecked('skippedBasicNecessities', 'Food')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Food', !!c)} /><Label htmlFor="sbn1">Food</Label></div>
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn2" checked={isChecked('skippedBasicNecessities', 'Housing')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Housing', !!c)} /><Label htmlFor="sbn2">Housing (rent)</Label></div>
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn3" checked={isChecked('skippedBasicNecessities', 'Healthcare')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Healthcare', !!c)} /><Label htmlFor="sbn3">Healthcare/medications</Label></div>
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn4" checked={isChecked('skippedBasicNecessities', 'Hygiene')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Hygiene', !!c)} /><Label htmlFor="sbn4">Hygiene</Label></div>
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn5" checked={isChecked('skippedBasicNecessities', 'Transportation')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Transportation', !!c)} /><Label htmlFor="sbn5">Transportation</Label></div>
                                          <div className="flex items-center space-x-2"><Checkbox id="sbn6" checked={isChecked('skippedBasicNecessities', 'Utilities')} onCheckedChange={(c) => handleCheckboxChange('skippedBasicNecessities', 'Utilities', !!c)} /><Label htmlFor="sbn6">Utilities</Label></div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      )}
                   </div>
                )}
                {isChecked('financialSupportSourcesNeverWorked', 'Government assistance') && (
                  <div className="space-y-2 pl-6 mt-4">
                      <Label className="font-semibold">Have you ever lost benefits or been denied assistance?</Label>
                      <RadioGroup name="lostGovernmentAssistance" value={localData.lostGovernmentAssistance} onValueChange={(v) => handleRadioChange('lostGovernmentAssistance', v)} className="space-y-1">
                          <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="lga1" /><Label htmlFor="lga1">Yes</Label></div>
                          <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="lga2" /><Label htmlFor="lga2">No</Label></div>
                      </RadioGroup>
                      {localData.lostGovernmentAssistance === 'yes' && (
                          <div className="space-y-4 pl-6 mt-4">
                              <Label className="font-semibold">Why? (Check all that apply)</Label>
                              <div className="space-y-1">
                                  <div className="flex items-center space-x-2"><Checkbox id="rla1" checked={isChecked('reasonLostAssistance', 'Missed paperwork/renewal')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'Missed paperwork/renewal', !!c)} /><Label htmlFor="rla1">Missed paperwork/renewal</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="rla2" checked={isChecked('reasonLostAssistance', 'Missed required appointments')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'Missed required appointments', !!c)} /><Label htmlFor="rla2">Missed required appointments</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="rla3" checked={isChecked('reasonLostAssistance', 'Substance use non-compliance')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'Substance use non-compliance', !!c)} /><Label htmlFor="rla3">Substance use non-compliance</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="rla4" checked={isChecked('reasonLostAssistance', 'Incarceration')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'Incarceration', !!c)} /><Label htmlFor="rla4">Incarceration</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="rla5" checked={isChecked('reasonLostAssistance', 'No longer eligible')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'No longer eligible', !!c)} /><Label htmlFor="rla5">No longer eligible</Label></div>
                                  <div className="flex items-center space-x-2"><Checkbox id="rla6" checked={isChecked('reasonLostAssistance', 'Other')} onCheckedChange={(c) => handleCheckboxChange('reasonLostAssistance', 'Other', !!c)} /><Label htmlFor="rla6">Other</Label></div>
                              </div>
                              {isChecked('reasonLostAssistance', 'Other') && (
                                  <Input name="reasonLostAssistanceOther" value={localData.reasonLostAssistanceOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
                              )}
                          </div>
                      )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-semibold">Are you actively seeking work?</Label>
              <RadioGroup name="activelySeekingWork" value={localData.activelySeekingWork} onValueChange={(v) => handleRadioChange('activelySeekingWork', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="asw1" /><Label htmlFor="asw1">Yes</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="asw2" /><Label htmlFor="asw2">No</Label></div>
              </RadioGroup>
              {localData.activelySeekingWork === 'no' && (
                <Textarea name="reasonNotSeekingWork" value={localData.reasonNotSeekingWork || ''} onChange={handleChange} placeholder="If no, why not?" className="mt-2" />
              )}
            </div>
          </div>
        )}

        {/* --- If Student --- */}
        {isStudent && (
          <div className="border p-4 rounded space-y-4">
            <h3 className="font-semibold">Student Status Details</h3>
            <div className="space-y-2">
              <Label className="font-semibold">Are you currently working (part-time or full-time) while studying?</Label>
              <RadioGroup name="studentWorkingStatus" value={localData.studentWorkingStatus} onValueChange={(v) => handleRadioChange('studentWorkingStatus', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sws1" /><Label htmlFor="sws1">Yes</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sws2" /><Label htmlFor="sws2">No</Label></div>
              </RadioGroup>
            </div>

            {localData.studentWorkingStatus === 'yes' && (
              <div className="space-y-4 pl-6 mt-4 border-l-2">
                <div className="space-y-2">
                  <Label className="font-semibold">What is your occupation?</Label>
                  <Input name="studentOccupation" value={localData.studentOccupation || ''} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Average hours worked per week?</Label>
                  <Input name="studentHoursPerWeek" type="number" value={localData.studentHoursPerWeek || ''} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Does this job relate to your field of study?</Label>
                  <RadioGroup name="studentJobRelatedToStudy" value={localData.studentJobRelatedToStudy} onValueChange={(v) => handleRadioChange('studentJobRelatedToStudy', v)} className="space-y-1">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="sjrts1" /><Label htmlFor="sjrts1">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="sjrts2" /><Label htmlFor="sjrts2">No</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="somewhat" id="sjrts3" /><Label htmlFor="sjrts3">Somewhat</Label></div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-semibold">How are your studies primarily funded? (Check all that apply)</Label>
              <div className="space-y-1">
                <div className="flex items-center space-x-2"><Checkbox id="sf1" checked={isChecked('studentFundingSources', 'Personal savings/work')} onCheckedChange={(c) => handleCheckboxChange('studentFundingSources', 'Personal savings/work', !!c)} /><Label htmlFor="sf1">Personal savings / work income</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sf2" checked={isChecked('studentFundingSources', 'Family support')} onCheckedChange={(c) => handleCheckboxChange('studentFundingSources', 'Family support', !!c)} /><Label htmlFor="sf2">Family support</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sf3" checked={isChecked('studentFundingSources', 'Financial aid/loans')} onCheckedChange={(c) => handleCheckboxChange('studentFundingSources', 'Financial aid/loans', !!c)} /><Label htmlFor="sf3">Financial aid / Loans</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sf4" checked={isChecked('studentFundingSources', 'Scholarships/grants')} onCheckedChange={(c) => handleCheckboxChange('studentFundingSources', 'Scholarships/grants', !!c)} /><Label htmlFor="sf4">Scholarships / Grants</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="sf5" checked={isChecked('studentFundingSources', 'Other')} onCheckedChange={(c) => handleCheckboxChange('studentFundingSources', 'Other', !!c)} /><Label htmlFor="sf5">Other</Label></div>
              </div>
              {isChecked('studentFundingSources', 'Other') && (
                <Input name="studentFundingSourcesOther" value={localData.studentFundingSourcesOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
              )}
            </div>
          </div>
        )}

        {/* --- If Retired --- */}
        {isRetired && (
          <div className="border p-4 rounded space-y-4">
            <h3 className="font-semibold">Retirement Details</h3>
            <div className="space-y-2">
              <Label className="font-semibold">What is your primary source of income in retirement?</Label>
              <RadioGroup name="retirementIncomeSource" value={localData.retirementIncomeSource} onValueChange={(v) => handleRadioChange('retirementIncomeSource', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="Social Security" id="ris1" /><Label htmlFor="ris1">Social Security</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Pension" id="ris2" /><Label htmlFor="ris2">Pension</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="401(k) or other retirement accounts" id="ris3" /><Label htmlFor="ris3">401(k) or other retirement accounts</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="Other" id="ris4" /><Label htmlFor="ris4">Other</Label></div>
              </RadioGroup>
              {localData.retirementIncomeSource === 'Other' && (
                <Input name="retirementIncomeSourceOther" value={localData.retirementIncomeSourceOther || ''} onChange={handleChange} placeholder="Please specify" className="mt-2" />
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-semibold">Do you have any dependents (e.g. spouse, children) that you financially support?</Label>
              <RadioGroup name="retirementDependents" value={localData.retirementDependents} onValueChange={(v) => handleRadioChange('retirementDependents', v)} className="space-y-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="rd1" /><Label htmlFor="rd1">Yes</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="rd2" /><Label htmlFor="rd2">No</Label></div>
              </RadioGroup>
              {localData.retirementDependents === 'yes' && (
                <div className="space-y-2 pl-6 mt-4">
                  <Label className="font-semibold">How many dependents do you support?</Label>
                  <Input name="retirementDependentsCount" type="number" value={localData.retirementDependentsCount || ''} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other conditional sections will be added here */}

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};