// components/patient/steps/EducationStep.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PatientData } from '@/types/patient';
import { EducationData } from '@/types/steps';

interface EducationStepProps {
  education?: Partial<EducationData>;
  updateData: (field: keyof EducationData, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export const EducationStep: React.FC<EducationStepProps> = ({ education = {}, updateData, onNext, onBack }) => {
  const [localData, setLocalData] = useState<Partial<EducationData>>(education);

  useEffect(() => {
    setLocalData(education);
  }, [education]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    updateData(name as keyof EducationData, value);
  };

  const handleRadioChange = (name: keyof EducationData, value: string) => {
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    updateData(name, value);
  };

  const handleCheckboxChange = (name: keyof EducationData, checkedValue: string) => {
    const currentValues = (localData[name] as string[] || []) as string[];
    let newValues:
      | string[]
      | null = currentValues.includes(checkedValue)
      ? currentValues.filter((v) => v !== checkedValue)
      : [...currentValues, checkedValue];

    // Handle 'none' exclusivity for checkboxes
    if (checkedValue === 'none') {
      newValues = checkedValue === 'none' && !currentValues.includes('none') ? ['none'] : [];
    } else {
      newValues = newValues.filter((v) => v !== 'none'); // Remove 'none' if other options selected
    }

    const updatedData = { ...localData, [name]: newValues };
    setLocalData(updatedData);
    updateData(name, newValues);
  };

  const isChecked = (name: keyof EducationData, value: string): boolean => {
     const currentValues = localData[name] as string[];
     return Array.isArray(currentValues) && currentValues.includes(value);
   };

  // Helper to render RadioGroup options
  const renderRadioOption = (name: keyof EducationData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${name}-${value}`} />
      <Label htmlFor={`${name}-${value}`} className="font-normal">{label}</Label>
    </div>
  );

  // Helper to render Checkbox options
  const renderCheckboxOption = (name: keyof EducationData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`${name}-${value}`}
        checked={isChecked(name, value)}
        onCheckedChange={() => handleCheckboxChange(name, value)}
      />
      <Label htmlFor={`${name}-${value}`} className="font-normal">{label}</Label>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education & Cognitive Functioning</CardTitle>
        <p className="text-sm text-muted-foreground pt-2">
          This section covers your educational background, learning history, and any cognitive difficulties to understand strengths and support needs.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">

          {/* --- Educational Background Section --- */}
          <div className="space-y-4 rounded-md border p-4">
            <h3 className="mb-2 text-lg font-semibold">Educational Background</h3>

            <div className="space-y-2">
              <Label className="font-medium">Highest Level of Education Completed</Label>
              <RadioGroup
                value={localData.highestEducationLevel || ''}
                onValueChange={(value) => handleRadioChange('highestEducationLevel', value)}
                className="grid grid-cols-2 gap-2 md:grid-cols-3"
              >
                {renderRadioOption('highestEducationLevel', 'no_hs', 'Did not complete high school')}
                {renderRadioOption('highestEducationLevel', 'hs_diploma', 'High school diploma')}
                {renderRadioOption('highestEducationLevel', 'ged', 'GED (High school equivalency)')}
                {renderRadioOption('highestEducationLevel', 'some_college', 'Some college (no degree)')}
                {renderRadioOption('highestEducationLevel', 'associate', 'Associate degree (2-year)')}
                {renderRadioOption('highestEducationLevel', 'bachelor', 'Bachelor’s degree (4-year)')}
                {renderRadioOption('highestEducationLevel', 'master', 'Master’s degree')}
                {renderRadioOption('highestEducationLevel', 'doctoral', 'Doctoral or professional degree')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Currently Enrolled in School</Label>
              <RadioGroup
                value={localData.currentlyEnrolled || ''}
                onValueChange={(value) => handleRadioChange('currentlyEnrolled', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('currentlyEnrolled', 'yes', 'Yes')}
                {renderRadioOption('currentlyEnrolled', 'no', 'No')}
              </RadioGroup>
            </div>

            {localData.currentlyEnrolled === 'yes' && (
              <div className="space-y-4 border-l-2 pl-6">
                <div className="space-y-2">
                  <Label className="font-medium">Current Educational Setting</Label>
                  <RadioGroup
                    value={localData.currentEducationalSetting || ''}
                    onValueChange={(value) => handleRadioChange('currentEducationalSetting', value)}
                    className="grid grid-cols-2 gap-2 md:grid-cols-3"
                  >
                    {renderRadioOption('currentEducationalSetting', 'high_school', 'High School')}
                    {renderRadioOption('currentEducationalSetting', 'ged_program', 'GED program')}
                    {renderRadioOption('currentEducationalSetting', 'trade_school', 'Trade/Vocational School')}
                    {renderRadioOption('currentEducationalSetting', 'community_college', 'Community College')}
                    {renderRadioOption('currentEducationalSetting', 'undergrad', 'University (undergraduate)')}
                    {renderRadioOption('currentEducationalSetting', 'grad_professional', 'Graduate/Professional school')}
                    {renderRadioOption('currentEducationalSetting', 'other', 'Other')}
                  </RadioGroup>
                </div>
                {localData.currentEducationalSetting === 'other' && (
                  <div className="space-y-1">
                    <Label htmlFor="currentEducationalSettingOther">Specify "Other" setting:</Label>
                    <Input id="currentEducationalSettingOther" name="currentEducationalSettingOther" value={localData.currentEducationalSettingOther || ''} onChange={handleChange} />
                  </div>
                )}

                {(['community_college', 'undergrad', 'grad_professional'].includes(localData.currentEducationalSetting || '')) && (
                  <div className="space-y-4 mt-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label className="font-medium">Has your mental health or substance use affected your academics?</Label>
                      <RadioGroup
                        value={localData.academicsAffected || ''}
                        onValueChange={(value) => handleRadioChange('academicsAffected', value)}
                        className="flex space-x-4"
                      >
                        {renderRadioOption('academicsAffected', 'yes', 'Yes')}
                        {renderRadioOption('academicsAffected', 'no', 'No')}
                      </RadioGroup>
                    </div>

                    {localData.academicsAffected === 'yes' && (
                       <div className="space-y-4 border-l-2 pl-6">
                         <div className="space-y-2">
                           <Label>In what ways? (Check all that apply)</Label>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                              {renderCheckboxOption('academicImpacts', 'grades', 'Lower grades')}
                              {renderCheckboxOption('academicImpacts', 'attendance_dropped', 'Poor attendance or dropped classes')}
                              {renderCheckboxOption('academicImpacts', 'concentration', 'Trouble concentrating')}
                              {renderCheckboxOption('academicImpacts', 'conflict', 'Conflict with professors/peers')}
                              {renderCheckboxOption('academicImpacts', 'missed_assignments', 'Missed assignments/deadlines')}
                              {renderCheckboxOption('academicImpacts', 'other', 'Other')}
                            </div>
                          </div>
                          {isChecked('academicImpacts', 'other') && (
                           <div className="space-y-1">
                              <Label htmlFor="academicImpactsOther">Specify "Other" impact:</Label>
                              <Input id="academicImpactsOther" name="academicImpactsOther" value={localData.academicImpactsOther || ''} onChange={handleChange} />
                           </div>
                          )}

                          {(isChecked('academicImpacts', 'attendance_dropped')) && (
                             <div className="space-y-4 mt-4 border-t pt-4">
                               <div className="space-y-2">
                                 <Label className="font-medium">Have you ever been put on academic probation or suspended due to these issues?</Label>
                                 <RadioGroup
                                   value={localData.academicProbationSuspension || ''}
                                   onValueChange={(value) => handleRadioChange('academicProbationSuspension', value)}
                                   className="flex space-x-4"
                                 >
                                   {renderRadioOption('academicProbationSuspension', 'yes', 'Yes')}
                                   {renderRadioOption('academicProbationSuspension', 'no', 'No')}
                                 </RadioGroup>
                               </div>

                               {localData.academicProbationSuspension === 'yes' && (
                                 <div className="space-y-2 border-l-2 pl-6">
                                   <Label className="font-medium">Did you seek any help from student support services (counseling, disability services)?</Label>
                                   <RadioGroup
                                     value={localData.soughtStudentSupport || ''}
                                     onValueChange={(value) => handleRadioChange('soughtStudentSupport', value)}
                                     className="flex space-x-4"
                                   >
                                     {renderRadioOption('soughtStudentSupport', 'yes', 'Yes')}
                                     {renderRadioOption('soughtStudentSupport', 'no', 'No')}
                                   </RadioGroup>
                                 </div>
                               )}

                               {localData.soughtStudentSupport === 'no' && localData.academicProbationSuspension === 'yes' && (
                                  <div className="space-y-4 border-l-2 pl-6">
                                     <Label className="font-medium">Why not? (Check all that apply)</Label>
                                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                        {renderCheckboxOption('reasonNoSupport', 'stigma', 'Concern about stigma')}
                                        {renderCheckboxOption('reasonNoSupport', 'unaware', 'Unaware of services')}
                                        {renderCheckboxOption('reasonNoSupport', 'handle_myself', 'Tried to handle myself')}
                                        {renderCheckboxOption('reasonNoSupport', 'privacy', 'Privacy concerns')}
                                        {renderCheckboxOption('reasonNoSupport', 'schedule', 'Schedule conflicts')}
                                        {renderCheckboxOption('reasonNoSupport', 'other', 'Other')}
                                      </div>
                                      {isChecked('reasonNoSupport', 'other') && (
                                        <div className="space-y-1">
                                          <Label htmlFor="reasonNoSupportOther">Specify "Other" reason:</Label>
                                          <Input id="reasonNoSupportOther" name="reasonNoSupportOther" value={localData.reasonNoSupportOther || ''} onChange={handleChange} />
                                        </div>
                                      )}
                                  </div>
                                )}
                             </div>
                           )}
                       </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-medium">Academic Achievements (Check all degrees/credentials earned)</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('academicAchievements', 'hs_diploma', 'High school diploma')}
                {renderCheckboxOption('academicAchievements', 'ged', 'GED certificate')}
                {renderCheckboxOption('academicAchievements', 'associate', 'Associate degree')}
                {renderCheckboxOption('academicAchievements', 'bachelor', 'Bachelor’s degree')}
                {renderCheckboxOption('academicAchievements', 'master', 'Master’s degree')}
                {renderCheckboxOption('academicAchievements', 'doctorate', 'Doctorate or professional degree')}
                {renderCheckboxOption('academicAchievements', 'vocational', 'Vocational or trade certificate')}
                {renderCheckboxOption('academicAchievements', 'other_cert', 'Other certification')}
              </div>
              {isChecked('academicAchievements', 'other_cert') && (
                <div className="space-y-1 mt-2">
                  <Label htmlFor="academicAchievementsOther">Specify "Other" certification:</Label>
                  <Input id="academicAchievementsOther" name="academicAchievementsOther" value={localData.academicAchievementsOther || ''} onChange={handleChange} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Learning Difficulties in School</Label>
              <RadioGroup
                value={localData.learningDifficulties || ''}
                onValueChange={(value) => handleRadioChange('learningDifficulties', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('learningDifficulties', 'yes', 'Yes')}
                {renderRadioOption('learningDifficulties', 'no', 'No')}
              </RadioGroup>
              {localData.learningDifficulties === 'yes' && (
                <div className="space-y-4 border-l-2 pl-6">
                   <Label>In which area? (Check all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {renderCheckboxOption('learningDifficultiesArea', 'reading', 'Reading')}
                      {renderCheckboxOption('learningDifficultiesArea', 'writing', 'Writing')}
                      {renderCheckboxOption('learningDifficultiesArea', 'math', 'Math')}
                      {renderCheckboxOption('learningDifficultiesArea', 'attention', 'Attention')}
                      {renderCheckboxOption('learningDifficultiesArea', 'other', 'Other')}
                    </div>
                    {isChecked('learningDifficultiesArea', 'other') && (
                      <div className="space-y-1">
                        <Label htmlFor="learningDifficultiesAreaOther">Specify "Other" area:</Label>
                        <Input id="learningDifficultiesAreaOther" name="learningDifficultiesAreaOther" value={localData.learningDifficultiesAreaOther || ''} onChange={handleChange} />
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Special Education/IEP</Label>
              <RadioGroup
                value={localData.specialEducationIEP || ''}
                onValueChange={(value) => handleRadioChange('specialEducationIEP', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('specialEducationIEP', 'yes', 'Yes')}
                {renderRadioOption('specialEducationIEP', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Repeated a Grade</Label>
              <RadioGroup
                value={localData.repeatedGrade || ''}
                onValueChange={(value) => handleRadioChange('repeatedGrade', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('repeatedGrade', 'yes', 'Yes')}
                {renderRadioOption('repeatedGrade', 'no', 'No')}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Dropped Out of School</Label>
              <RadioGroup
                value={localData.droppedOut || ''}
                onValueChange={(value) => handleRadioChange('droppedOut', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('droppedOut', 'yes', 'Yes')}
                {renderRadioOption('droppedOut', 'no', 'No')}
              </RadioGroup>
              {localData.droppedOut === 'yes' && (
                <div className="space-y-4 border-l-2 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="highestGradeReached">Highest grade level reached:</Label>
                    <Input id="highestGradeReached" name="highestGradeReached" value={localData.highestGradeReached || ''} onChange={handleChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="reasonDroppedOut">Reason for dropping out:</Label>
                    <Input id="reasonDroppedOut" name="reasonDroppedOut" value={localData.reasonDroppedOut || ''} onChange={handleChange} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-medium">School Discipline History (Check any that apply)</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('schoolDisciplineHistory', 'none', 'None')}
                {renderCheckboxOption('schoolDisciplineHistory', 'detention', 'Detention')}
                {renderCheckboxOption('schoolDisciplineHistory', 'suspension', 'Suspension')}
                {renderCheckboxOption('schoolDisciplineHistory', 'expulsion', 'Expulsion')}
                {renderCheckboxOption('schoolDisciplineHistory', 'other', 'Other')}
              </div>
              {isChecked('schoolDisciplineHistory', 'other') && (
                <div className="space-y-1 mt-2">
                  <Label htmlFor="schoolDisciplineHistoryOther">Specify "Other" discipline:</Label>
                  <Input id="schoolDisciplineHistoryOther" name="schoolDisciplineHistoryOther" value={localData.schoolDisciplineHistoryOther || ''} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>

          {/* --- Cognitive Functioning Section --- */}
          <div className="space-y-4 rounded-md border p-4">
            <h3 className="mb-2 text-lg font-semibold">Cognitive Functioning</h3>

            <div className="space-y-2">
              <Label className="font-medium">Current Cognitive Difficulties (Check all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('currentCognitiveDifficulties', 'concentration', 'Difficulty concentrating')}
                {renderCheckboxOption('currentCognitiveDifficulties', 'memory', 'Memory problems')}
                {renderCheckboxOption('currentCognitiveDifficulties', 'processing', 'Trouble understanding/processing info')}
                {renderCheckboxOption('currentCognitiveDifficulties', 'expression', 'Difficulty expressing thoughts')}
                {renderCheckboxOption('currentCognitiveDifficulties', 'slow_thinking', 'Slowed thinking or confusion')}
                {renderCheckboxOption('currentCognitiveDifficulties', 'none', 'None of the above')}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Diagnosed Developmental/Intellectual Disorders (Check all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('diagnosedDisorders', 'asd', 'Autism Spectrum Disorder (ASD)')}
                {renderCheckboxOption('diagnosedDisorders', 'intellectual_disability', 'Intellectual Disability')}
                {renderCheckboxOption('diagnosedDisorders', 'speech_language', 'Speech or language impairment')}
                {renderCheckboxOption('diagnosedDisorders', 'learning_disorder', 'Specific learning disorder (e.g. dyslexia)')}
                {renderCheckboxOption('diagnosedDisorders', 'other_dev', 'Other developmental disorder')}
                {renderCheckboxOption('diagnosedDisorders', 'none', 'None of the above')}
              </div>
              {isChecked('diagnosedDisorders', 'other_dev') && (
                <div className="space-y-1 mt-2">
                  <Label htmlFor="diagnosedDisordersOther">Specify "Other" disorder:</Label>
                  <Input id="diagnosedDisordersOther" name="diagnosedDisordersOther" value={localData.diagnosedDisordersOther || ''} onChange={handleChange} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Neuropsychological or Cognitive Testing</Label>
              <RadioGroup
                value={localData.neuropsychEvaluation || ''}
                onValueChange={(value) => handleRadioChange('neuropsychEvaluation', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('neuropsychEvaluation', 'yes', 'Yes')}
                {renderRadioOption('neuropsychEvaluation', 'no', 'No')}
              </RadioGroup>
              {localData.neuropsychEvaluation === 'yes' && (
                <div className="space-y-4 border-l-2 pl-6">
                  <div className="space-y-1">
                    <Label htmlFor="neuropsychEvalYear">Year of testing:</Label>
                    <Input id="neuropsychEvalYear" name="neuropsychEvalYear" type="number" value={localData.neuropsychEvalYear || ''} onChange={handleChange} placeholder="YYYY" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="neuropsychEvalFindings">Any significant findings?</Label>
                    <Textarea id="neuropsychEvalFindings" name="neuropsychEvalFindings" value={localData.neuropsychEvalFindings || ''} onChange={handleChange} rows={3} />
                  </div>
                </div>
              )}
            </div>

             <div className="space-y-2">
              <Label className="font-medium">Need Assistance with Daily Tasks (due to cognitive/learning issues)</Label>
              <RadioGroup
                value={localData.needsAssistanceDailyTasks || ''}
                onValueChange={(value) => handleRadioChange('needsAssistanceDailyTasks', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('needsAssistanceDailyTasks', 'yes', 'Yes')}
                {renderRadioOption('needsAssistanceDailyTasks', 'no', 'No')}
              </RadioGroup>
              {localData.needsAssistanceDailyTasks === 'yes' && (
                <div className="space-y-4 border-l-2 pl-6">
                   <Label>Which areas? (Check all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {renderCheckboxOption('assistanceAreas', 'money', 'Managing money')}
                      {renderCheckboxOption('assistanceAreas', 'reading_forms', 'Reading forms')}
                      {renderCheckboxOption('assistanceAreas', 'transportation', 'Transportation')}
                      {renderCheckboxOption('assistanceAreas', 'other', 'Other')}
                    </div>
                    {isChecked('assistanceAreas', 'other') && (
                      <div className="space-y-1">
                        <Label htmlFor="assistanceAreasOther">Specify "Other" area:</Label>
                        <Input id="assistanceAreasOther" name="assistanceAreasOther" value={localData.assistanceAreasOther || ''} onChange={handleChange} />
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="additionalComments">Additional Comments – Education/Cognitive</Label>
              <Textarea id="additionalComments" name="additionalComments" value={localData.additionalComments || ''} onChange={handleChange} rows={3} />
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