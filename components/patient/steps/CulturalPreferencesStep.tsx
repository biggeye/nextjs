// components/patient/steps/CulturalPreferencesStep.tsx
"use client"

import React from 'react';
import { CulturalPreferencesData } from '@/types/steps';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CulturalPreferencesStepProps {
  culturalPreferences: Partial<CulturalPreferencesData>;
  updateData: (field: keyof CulturalPreferencesData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CulturalPreferencesStep: React.FC<CulturalPreferencesStepProps> = ({ culturalPreferences, updateData, onNext, onBack }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData(e.target.name as keyof CulturalPreferencesData, e.target.value);
  };

  const handleRadioChange = (name: keyof CulturalPreferencesData, value: string) => {
    updateData(name, value);
  };

  const handleCheckboxChange = (name: keyof CulturalPreferencesData, checked: boolean | string, value: string) => {
    const currentValues = culturalPreferences[name] as string[] || [];
    let newValues;
    if (checked) {
        newValues = [...currentValues, value];
    } else {
        newValues = currentValues.filter((v) => v !== value);
    }
    updateData(name, newValues);
  };

  // Helper to render RadioGroup options for brevity
  const renderRadioOption = (name: keyof CulturalPreferencesData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={`${name}-${value}`} />
      <Label htmlFor={`${name}-${value}`}>{label}</Label>
    </div>
  );

  // Helper to render Checkbox options for brevity
  const renderCheckboxOption = (name: keyof CulturalPreferencesData, value: string, label: string) => (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={`${name}-${value}`} 
        value={value} 
        checked={(culturalPreferences[name] as string[] || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(name, checked, value)} 
      />
      <Label htmlFor={`${name}-${value}`}>{label}</Label>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 6: Cultural & Spiritual Preferences</CardTitle>
        <CardDescription>Please tell us about your cultural background and spiritual beliefs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">

          {/* Religious/Spiritual Identification */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Religious/Spiritual Identification</Label>
            <Label>Do you consider yourself religious or spiritual in any way?</Label>
            <RadioGroup 
              name="considersSelfReligiousSpiritual"
              value={culturalPreferences.considersSelfReligiousSpiritual || ''} 
              onValueChange={(v) => handleRadioChange('considersSelfReligiousSpiritual', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('considersSelfReligiousSpiritual', 'yes', 'Yes')}
              {renderRadioOption('considersSelfReligiousSpiritual', 'no', 'No')}
            </RadioGroup>

            {culturalPreferences.considersSelfReligiousSpiritual === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                <Label>Describe or specify your faith/religion or spiritual practice:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {renderCheckboxOption('faithDescriptionSpecify', 'christianity', 'Christianity')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'islam', 'Islam')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'judaism', 'Judaism')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'hinduism', 'Hinduism')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'buddhism', 'Buddhism')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'indigenous', 'Indigenous/Traditional spirituality')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'other', 'Other')}
                  {renderCheckboxOption('faithDescriptionSpecify', 'spiritual_not_religious', 'Spiritual but not religious')}
                </div>
                {(culturalPreferences.faithDescriptionSpecify || []).includes('christianity') && (
                    <div className="mt-2 space-y-1">
                        <Label htmlFor="christianityDenomination">Christianity Denomination:</Label>
                        <Input id="christianityDenomination" name="christianityDenomination" value={culturalPreferences.christianityDenomination || ''} onChange={handleInputChange} />
                    </div>
                )}
                 {(culturalPreferences.faithDescriptionSpecify || []).includes('other') && (
                    <div className="mt-2 space-y-1">
                        <Label htmlFor="faithDescriptionOther">Other Faith/Practice:</Label>
                        <Input id="faithDescriptionOther" name="faithDescriptionOther" value={culturalPreferences.faithDescriptionOther || ''} onChange={handleInputChange} />
                    </div>
                )}
              </div>
            )}
          </div>

          {/* Importance of Spirituality */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Importance of Spirituality</Label>
            <Label>How important are spiritual or religious beliefs in your daily life?</Label>
            <RadioGroup 
              name="spiritualityImportance"
              value={culturalPreferences.spiritualityImportance || ''} 
              onValueChange={(v) => handleRadioChange('spiritualityImportance', v)} 
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {renderRadioOption('spiritualityImportance', 'not_at_all', 'Not at all important')}
              {renderRadioOption('spiritualityImportance', 'somewhat', 'Somewhat important')}
              {renderRadioOption('spiritualityImportance', 'very', 'Very important')}
              {renderRadioOption('spiritualityImportance', 'central', 'Central to my life (most important)')}
            </RadioGroup>
          </div>

          {/* Community */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Community</Label>
            <Label>Are you a member of a spiritual or religious community?</Label>
             <RadioGroup 
              name="memberOfSpiritualCommunity"
              value={culturalPreferences.memberOfSpiritualCommunity || ''} 
              onValueChange={(v) => handleRadioChange('memberOfSpiritualCommunity', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('memberOfSpiritualCommunity', 'yes', 'Yes')}
              {renderRadioOption('memberOfSpiritualCommunity', 'no', 'No')}
            </RadioGroup>

            {culturalPreferences.memberOfSpiritualCommunity === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                 <Label>Does it provide you with support?</Label>
                 <RadioGroup 
                  name="communityProvidesSupport"
                  value={culturalPreferences.communityProvidesSupport || ''} 
                  onValueChange={(v) => handleRadioChange('communityProvidesSupport', v)} 
                  className="flex space-x-4"
                >
                  {renderRadioOption('communityProvidesSupport', 'yes_alot', 'Yes, a lot')}
                  {renderRadioOption('communityProvidesSupport', 'yes_somewhat', 'Yes, somewhat')}
                  {renderRadioOption('communityProvidesSupport', 'not_much', 'Not much')}
                </RadioGroup>
              </div>
            )}
          </div>

          {/* Spiritual Practices */}
           <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Spiritual Practices</Label>
            <Label>Do you have personal spiritual practices? (Check all that apply)</Label>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {renderCheckboxOption('personalSpiritualPractices', 'prayer', 'Prayer')}
                {renderCheckboxOption('personalSpiritualPractices', 'meditation', 'Meditation')}
                {renderCheckboxOption('personalSpiritualPractices', 'yoga', 'Yoga')}
                {renderCheckboxOption('personalSpiritualPractices', 'scripture', 'Reading scripture')}
                {renderCheckboxOption('personalSpiritualPractices', 'services', 'Attending services regularly')}
                {renderCheckboxOption('personalSpiritualPractices', 'other', 'Other')}
              </div>
               {(culturalPreferences.personalSpiritualPractices || []).includes('other') && (
                  <div className="mt-2 space-y-1">
                      <Label htmlFor="spiritualPracticesOther">Other Practice:</Label>
                      <Input id="spiritualPracticesOther" name="spiritualPracticesOther" value={culturalPreferences.spiritualPracticesOther || ''} onChange={handleInputChange} />
                  </div>
              )}
          </div>

          {/* Spiritual Concerns */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Spiritual Concerns</Label>
            <Label>Are you facing any spiritual or existential concerns related to your mental health or life situation?</Label>
             <RadioGroup 
              name="hasSpiritualConcerns"
              value={culturalPreferences.hasSpiritualConcerns || ''} 
              onValueChange={(v) => handleRadioChange('hasSpiritualConcerns', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('hasSpiritualConcerns', 'yes', 'Yes')}
              {renderRadioOption('hasSpiritualConcerns', 'no', 'No')}
            </RadioGroup>

             {culturalPreferences.hasSpiritualConcerns === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                <Label htmlFor="spiritualConcernsDescription">Please describe:</Label>
                <Textarea id="spiritualConcernsDescription" name="spiritualConcernsDescription" value={culturalPreferences.spiritualConcernsDescription || ''} onChange={handleInputChange} rows={3} />
              </div>
            )}
          </div>

          {/* Integration into Treatment */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Integration into Treatment</Label>
            <Label>Would you like your spiritual/religious beliefs to be incorporated into your treatment plan?</Label>
             <RadioGroup 
              name="integrateSpiritualBeliefsTreatment"
              value={culturalPreferences.integrateSpiritualBeliefsTreatment || ''} 
              onValueChange={(v) => handleRadioChange('integrateSpiritualBeliefsTreatment', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('integrateSpiritualBeliefsTreatment', 'yes', 'Yes')}
              {renderRadioOption('integrateSpiritualBeliefsTreatment', 'no', 'No')}
              {renderRadioOption('integrateSpiritualBeliefsTreatment', 'not_sure', 'Not Sure')}
            </RadioGroup>
          </div>

          {/* Religious Restrictions */}
          <div className="space-y-2 border p-4 rounded-md">
             <Label className="text-lg font-semibold">Religious Restrictions</Label>
             <Label>Do you have any religious or cultural restrictions we should be aware of in your care?</Label>
             <RadioGroup 
              name="hasReligiousRestrictions"
              value={culturalPreferences.hasReligiousRestrictions || ''} 
              onValueChange={(v) => handleRadioChange('hasReligiousRestrictions', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('hasReligiousRestrictions', 'yes', 'Yes')}
              {renderRadioOption('hasReligiousRestrictions', 'no', 'No')}
            </RadioGroup>

             {culturalPreferences.hasReligiousRestrictions === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                <Label htmlFor="religiousRestrictionsDescription">Please describe:</Label>
                <Textarea id="religiousRestrictionsDescription" name="religiousRestrictionsDescription" value={culturalPreferences.religiousRestrictionsDescription || ''} onChange={handleInputChange} rows={3} />
              </div>
            )}
          </div>

          {/* Previous Counseling and Spirituality */}
          <div className="space-y-2 border p-4 rounded-md">
             <Label className="text-lg font-semibold">Previous Counseling and Spirituality</Label>
             <Label>Have you ever felt uncomfortable in a counseling or medical setting due to your religious/spiritual beliefs not being understood?</Label>
             <RadioGroup 
              name="feltUncomfortablePastCounseling"
              value={culturalPreferences.feltUncomfortablePastCounseling || ''} 
              onValueChange={(v) => handleRadioChange('feltUncomfortablePastCounseling', v)} 
              className="flex space-x-4"
            >
              {renderRadioOption('feltUncomfortablePastCounseling', 'yes', 'Yes')}
              {renderRadioOption('feltUncomfortablePastCounseling', 'no', 'No')}
            </RadioGroup>

             {culturalPreferences.feltUncomfortablePastCounseling === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                <Label htmlFor="uncomfortableCounselingDetails">What would you want us to know?</Label>
                <Textarea id="uncomfortableCounselingDetails" name="uncomfortableCounselingDetails" value={culturalPreferences.uncomfortableCounselingDetails || ''} onChange={handleInputChange} rows={3} />
              </div>
            )}
          </div>

           {/* Additional Comments – Spiritual */}
          <div className='space-y-2'>
             <Label htmlFor="additionalSpiritualComments">Additional Comments – Spiritual:</Label>
             <Textarea id="additionalSpiritualComments" name="additionalSpiritualComments" value={culturalPreferences.additionalSpiritualComments || ''} onChange={handleInputChange} rows={4} />
          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};