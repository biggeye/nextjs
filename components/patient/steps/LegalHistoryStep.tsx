"use client"

import React from 'react';
import { PatientData } from '@/types/patient'; 
import { LegalHistoryData } from '@/types/steps';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface LegalHistoryStepProps { 
  legalHistory: LegalHistoryData; 
  updateData: (field: keyof LegalHistoryData, value: any) => void; 
  onNext?: () => void;
  onBack?: () => void;
}

export const LegalHistoryStep: React.FC<LegalHistoryStepProps> = ({
  legalHistory = {}, // Initialize with empty object if undefined
  updateData,
  onNext,
  onBack,
}) => {

  const handleChange = (field: string, value: any) => {
    const fieldKey = field as keyof LegalHistoryData;
    // Update the primary field that changed
    updateData(fieldKey, value);

    // --- Auto-clear conditional fields --- 
    // Arrests
    if (field === 'everArrested' && value !== 'yes') {
      updateData('arrestsRelatedToSubstanceUse', '');
      updateData('mostSeriousOffense', '');
      updateData('mostSeriousOffenseOther', '');
    }
    if (field === 'mostSeriousOffense' && value !== 'other') {
       updateData('mostSeriousOffenseOther', '');
    }
    // Incarceration
    if (field === 'everIncarcerated' && value !== 'yes') {
      updateData('incarcerationCount', '');
      updateData('mostRecentReleaseYear', '');
      updateData('releasedPast12Months', '');
    }
    // Court Ordered Program
    if (field === 'everCourtOrderedProgram' && value !== 'yes') {
       updateData('courtOrderedProgramType', []);
       updateData('courtOrderedProgramTypeOther', '');
       updateData('courtOrderedProgramCompleted', '');
    }
    if (field === 'courtOrderedProgramType' && !value.includes('other')) {
       updateData('courtOrderedProgramTypeOther', '');
    }
    // Probation/Parole
    if (field === 'onProbationOrParole' && value !== 'yes') {
       updateData('probationOrParoleOfficerName', '');
       updateData('probationOrParoleOfficerPhone', '');
    }
    // Current Legal Issues
    if (field === 'currentLegalIssues' && !value.includes('other')) {
       updateData('currentLegalIssuesOther', '');
    }
    // Civil Issues
    if (field === 'hasCivilLegalIssues' && value !== 'yes') {
      updateData('civilLegalIssuesDescription', '');
    }
    // --- End Auto-clear --- 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const handleRadioChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  // Updated Checkbox handler for string arrays
  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const currentValues = (legalHistory[field] as string[]) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
      // Auto-clear 'Other' text if 'Other' checkbox is unchecked
      if (value === 'other' && `${field}Other` in legalHistory) {
         handleChange(`${field}Other`, ''); // Clear the 'Other' text field
      }
    }
    handleChange(field, newValues);
  };

  // Helper to render Radio Options (no changes needed)
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
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* --- Arrests/Charges Section --- */}
          <div className="space-y-4 rounded-md border p-4">
            <h3 className="mb-2 text-lg font-semibold">Arrests & Charges</h3>
            <div className="space-y-2">
              <Label className="font-medium">Have you ever been arrested or charged with a crime?</Label>
              <RadioGroup
                value={legalHistory.everArrested || ''}
                onValueChange={(value) => handleRadioChange('everArrested', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('everArrested', 'yes', 'Yes')}
                {renderRadioOption('everArrested', 'no', 'No')}
              </RadioGroup>
            </div>

            {legalHistory.everArrested === 'yes' && (
              <div className="mt-4 space-y-4 border-l-2 pl-6"> 
                <div className="space-y-2">
                  <Label>Were any charges related to substance use (e.g. DUI, drug possession)?</Label>
                  <RadioGroup
                    value={legalHistory.arrestsRelatedToSubstanceUse || ''}
                    onValueChange={(value) => handleRadioChange('arrestsRelatedToSubstanceUse', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('arrestsRelatedToSubstanceUse', 'yes', 'Yes')}
                    {renderRadioOption('arrestsRelatedToSubstanceUse', 'no', 'No')}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Most serious offense charged:</Label>
                  <RadioGroup
                    value={legalHistory.mostSeriousOffense || ''}
                    onValueChange={(value) => handleRadioChange('mostSeriousOffense', value)}
                    className="grid grid-cols-2 gap-2 md:grid-cols-3"
                  >
                    {renderRadioOption('mostSeriousOffense', 'misdemeanor', 'Misdemeanor')}
                    {renderRadioOption('mostSeriousOffense', 'felony', 'Felony')}
                    {renderRadioOption('mostSeriousOffense', 'dui_dwi', 'DUI/DWI')}
                    {renderRadioOption('mostSeriousOffense', 'drug_related', 'Drug-related')}
                    {renderRadioOption('mostSeriousOffense', 'other', 'Other')}
                  </RadioGroup>
                </div>
                {legalHistory.mostSeriousOffense === 'other' && (
                  <div className="space-y-1">
                    <Label htmlFor="mostSeriousOffenseOther">Specify "Other" offense:</Label>
                    <Input id="mostSeriousOffenseOther" name="mostSeriousOffenseOther" value={legalHistory.mostSeriousOffenseOther || ''} onChange={handleInputChange} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Conditionally render the rest of the sections only if everArrested is 'yes' */}
          {legalHistory.everArrested === 'yes' && (
            <>
              {/* --- Incarceration Section --- */}
              <div className="space-y-4 rounded-md border p-4">
                 <h3 className="mb-2 text-lg font-semibold">Incarceration History</h3>
                 <div className="space-y-2">
                  <Label className="font-medium">Have you ever spent time in jail or prison?</Label>
                  <RadioGroup
                    value={legalHistory.everIncarcerated || ''}
                    onValueChange={(value) => handleRadioChange('everIncarcerated', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('everIncarcerated', 'yes', 'Yes')}
                    {renderRadioOption('everIncarcerated', 'no', 'No')}
                  </RadioGroup>
                </div>

                {legalHistory.everIncarcerated === 'yes' && (
                  <div className="space-y-4 border-l-2 pl-6">
                    <div className="space-y-2">
                      <Label>Total number of times incarcerated:</Label>
                      <RadioGroup
                        value={legalHistory.incarcerationCount || ''}
                        onValueChange={(value) => handleRadioChange('incarcerationCount', value)}
                        className="flex space-x-4"
                      >
                        {renderRadioOption('incarcerationCount', '1', '1')}
                        {renderRadioOption('incarcerationCount', '2-5', '2-5')}
                        {renderRadioOption('incarcerationCount', '>5', '>5')}
                      </RadioGroup>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="mostRecentReleaseYear">Most recent release year:</Label>
                      <Input id="mostRecentReleaseYear" name="mostRecentReleaseYear" type="number" value={legalHistory.mostRecentReleaseYear || ''} onChange={handleInputChange} placeholder="YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label>Was your most recent release within the last 12 months?</Label>
                       <RadioGroup
                        value={legalHistory.releasedPast12Months || ''}
                        onValueChange={(value) => handleRadioChange('releasedPast12Months', value)}
                        className="flex space-x-4"
                      >
                        {renderRadioOption('releasedPast12Months', 'yes', 'Yes (Flagged)')}
                        {renderRadioOption('releasedPast12Months', 'no', 'No')}
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>

              {/* --- Current Legal Status Section --- */}
              <div className="space-y-4 rounded-md border p-4">
                <h3 className="mb-2 text-lg font-semibold">Current Legal Status</h3>
                <div className="space-y-2">
                  <Label className="font-medium">Are you currently on probation, parole, awaiting trial/sentencing, or have other current legal involvement?</Label>
                  <p className="text-sm text-muted-foreground">Select all that apply:</p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                     {renderCheckboxOption('currentLegalStatus', 'probation', 'Probation')}
                     {renderCheckboxOption('currentLegalStatus', 'parole', 'Parole')}
                     {renderCheckboxOption('currentLegalStatus', 'pretrial', 'Pre-trial / Awaiting Sentencing')}
                     {renderCheckboxOption('currentLegalStatus', 'other', 'Other')}
                  </div>
                </div>

                {(legalHistory.currentLegalStatus || []).includes('other') && (
                  <div className="space-y-1">
                    <Label htmlFor="currentLegalStatusOther">Specify "Other" status:</Label>
                    <Input id="currentLegalStatusOther" name="currentLegalStatusOther" value={legalHistory.currentLegalStatusOther || ''} onChange={handleInputChange} />
                  </div>
                )}

               { (legalHistory.currentLegalStatus || []).some(s => ['probation', 'parole'].includes(s)) && (
                 <div className="space-y-1 border-l-2 pl-6 mt-4">
                   <Label htmlFor="probationOfficer">Probation/Parole Officer Name & Contact:</Label>
                   <Input id="probationOfficer" name="probationOfficer" value={legalHistory.probationOfficer || ''} onChange={handleInputChange} />
                 </div>
                )}

               { (legalHistory.currentLegalStatus || []).includes('pretrial') && (
                 <div className="space-y-1 border-l-2 pl-6 mt-4">
                   <Label htmlFor="pendingChargesDetails">Describe Pending Charges (Type, Court, Date):</Label>
                   <Textarea id="pendingChargesDetails" name="pendingChargesDetails" value={legalHistory.pendingChargesDetails || ''} onChange={handleInputChange} rows={2} />
                 </div>
                )}
              </div>

             {/* --- Court Orders & Legal/Treatment Links --- */}
              <div className="space-y-4 rounded-md border p-4">
                <h3 className="mb-2 text-lg font-semibold">Court Orders & Links to Treatment</h3>
                <div className="space-y-2">
                  <Label className="font-medium">Is your current treatment court-ordered or mandated?</Label>
                  <RadioGroup
                    value={legalHistory.isCourtOrderedTreatment || ''}
                    onValueChange={(value) => handleRadioChange('isCourtOrderedTreatment', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('isCourtOrderedTreatment', 'yes', 'Yes')}
                    {renderRadioOption('isCourtOrderedTreatment', 'no', 'No')}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Have you ever been court-ordered to attend treatment or educational programs?</Label>
                   <RadioGroup
                    value={legalHistory.everCourtOrderedProgram || ''}
                    onValueChange={(value) => handleRadioChange('everCourtOrderedProgram', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('everCourtOrderedProgram', 'yes', 'Yes')}
                    {renderRadioOption('everCourtOrderedProgram', 'no', 'No')}
                  </RadioGroup>
                </div>

                {legalHistory.everCourtOrderedProgram === 'yes' && (
                  <div className="space-y-4 border-l-2 pl-6">
                     <Label>What type of program(s)? Select all that apply:</Label>
                     <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                       {renderCheckboxOption('courtOrderedProgramType', 'substance_abuse_dui', 'Substance Abuse / DUI')}
                       {renderCheckboxOption('courtOrderedProgramType', 'mental_health', 'Mental Health Counseling')}
                       {renderCheckboxOption('courtOrderedProgramType', 'dv_anger', 'DV / Anger Management')}
                       {renderCheckboxOption('courtOrderedProgramType', 'other', 'Other')}
                     </div>
                    {(legalHistory.courtOrderedProgramType || []).includes('other') && (
                      <div className="space-y-1">
                        <Label htmlFor="courtOrderedProgramTypeOther">Specify "Other" program:</Label>
                        <Input id="courtOrderedProgramTypeOther" name="courtOrderedProgramTypeOther" value={legalHistory.courtOrderedProgramTypeOther || ''} onChange={handleInputChange} />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="font-medium">Do you believe any legal troubles are related to mental health or substance use?</Label>
                   <RadioGroup
                    value={legalHistory.legalTroublesRelatedToMHSubstance || ''}
                    onValueChange={(value) => handleRadioChange('legalTroublesRelatedToMHSubstance', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('legalTroublesRelatedToMHSubstance', 'yes', 'Yes')}
                    {renderRadioOption('legalTroublesRelatedToMHSubstance', 'no', 'No')}
                  </RadioGroup>
                </div>
              </div>

              {/* --- Other Legal Matters Section --- */}
              <div className="space-y-4 rounded-md border p-4">
                <h3 className="mb-2 text-lg font-semibold">Other Legal Matters</h3>
                <div className="space-y-2">
                  <Label className="font-medium">Any other legal issues (e.g., custody, restraining orders, civil lawsuits)?</Label>
                  <RadioGroup
                    value={legalHistory.hasCivilLegalIssues || ''}
                    onValueChange={(value) => handleRadioChange('hasCivilLegalIssues', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('hasCivilLegalIssues', 'yes', 'Yes')}
                    {renderRadioOption('hasCivilLegalIssues', 'no', 'No')}
                  </RadioGroup>
                </div>
                {legalHistory.hasCivilLegalIssues === 'yes' && (
                  <div className="space-y-1 border-l-2 pl-6">
                    <Label htmlFor="civilLegalIssuesDescription">Briefly describe:</Label>
                    <Textarea id="civilLegalIssuesDescription" name="civilLegalIssuesDescription" value={legalHistory.civilLegalIssuesDescription || ''} onChange={handleInputChange} rows={2} />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="font-medium">Has legal history impacted employment or housing?</Label>
                   <RadioGroup
                    value={legalHistory.legalImpactOnEmploymentHousing || ''}
                    onValueChange={(value) => handleRadioChange('legalImpactOnEmploymentHousing', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('legalImpactOnEmploymentHousing', 'yes', 'Yes')}
                    {renderRadioOption('legalImpactOnEmploymentHousing', 'no', 'No')}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Are you concerned about upcoming court dates or deadlines?</Label>
                   <RadioGroup
                    value={legalHistory.concernedAboutUpcomingCourt || ''}
                    onValueChange={(value) => handleRadioChange('concernedAboutUpcomingCourt', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('concernedAboutUpcomingCourt', 'yes', 'Yes')}
                    {renderRadioOption('concernedAboutUpcomingCourt', 'no', 'No')}
                  </RadioGroup>
                </div>

                 <div className="space-y-2">
                  <Label className="font-medium">Do you have an attorney or legal case manager?</Label>
                   <RadioGroup
                    value={legalHistory.hasAttorney || ''}
                    onValueChange={(value) => handleRadioChange('hasAttorney', value)}
                    className="grid grid-cols-1 gap-2 md:grid-cols-3"
                  >
                    {renderRadioOption('hasAttorney', 'yes_public', 'Yes (Public Defender)')}
                    {renderRadioOption('hasAttorney', 'yes_private', 'Yes (Private)')}
                    {renderRadioOption('hasAttorney', 'no', 'No')}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Have you been the victim of a crime impacting your mental health? (Optional)</Label>
                   <RadioGroup
                    value={legalHistory.isVictimOfCrime || ''}
                    onValueChange={(value) => handleRadioChange('isVictimOfCrime', value)}
                    className="flex space-x-4"
                  >
                    {renderRadioOption('isVictimOfCrime', 'yes', 'Yes')}
                    {renderRadioOption('isVictimOfCrime', 'no', 'No')}
                  </RadioGroup>
                </div>
              </div>

              {/* --- Additional Information Section --- */}
              <div className="space-y-2 rounded-md border p-4">
                 <Label htmlFor="additionalLegalInfo" className="font-semibold">Additional Legal Information</Label>
                 <p className="text-sm text-muted-foreground">Provide any other details about your legal history or involvement you feel are important:</p>
                 <Textarea id="additionalLegalInfo" name="additionalLegalInfo" value={legalHistory.additionalLegalInfo || ''} onChange={handleInputChange} rows={3} />
              </div>
            </> 
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
        {onNext && <Button onClick={onNext}>Next</Button>}
      </CardFooter>
    </Card>
  );
};