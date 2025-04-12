"use client"

import React from 'react';
import { PatientData } from '@/types/patient'; 
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
  updateData: (field: keyof SocialFamilyHistoryData, value: any) => void; 
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
    updateData(field as keyof SocialFamilyHistoryData, value); 
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
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item) => item !== value);
    }
    updateData(field as keyof SocialFamilyHistoryData, newValues);
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
        <div className="space-y-8"> 
          {/* Current Living Situation */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Current Living Situation</Label>
            <p className="text-sm text-muted-foreground">(Check the one that best describes where you live now)</p>
            <RadioGroup
              name="currentLivingSituation"
              value={socialFamilyHistory.currentLivingSituation || ''}
              onValueChange={(value) => handleRadioChange('currentLivingSituation', value)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4"
            >
              {renderRadioOption('currentLivingSituation', 'alone', 'Living alone')}
              {renderRadioOption('currentLivingSituation', 'spouse_partner', 'With spouse/partner')}
              {renderRadioOption('currentLivingSituation', 'parents_family', 'With parent(s) or family')}
              {renderRadioOption('currentLivingSituation', 'friends_roommates', 'With friends/roommates')}
              {renderRadioOption('currentLivingSituation', 'supervised', 'Supervised setting (group home, halfway house)')}
              {renderRadioOption('currentLivingSituation', 'homeless_unstable', 'Homeless or no stable housing')}
              {renderRadioOption('currentLivingSituation', 'other', 'Other')}
            </RadioGroup>
            {socialFamilyHistory.currentLivingSituation === 'other' && (
              <Input
                name="currentLivingSituationOther"
                value={socialFamilyHistory.currentLivingSituationOther || ''}
                onChange={handleInputChange}
                placeholder="Please specify other living situation"
                className="mt-2"
              />
            )}

            {/* Conditional: Homeless/Unstable */}
            {socialFamilyHistory.currentLivingSituation === 'homeless_unstable' && (
              <div className="mt-4 pt-4 border-t space-y-4 pl-4 border-l-2">
                <h4 className="font-medium">Homeless/Unstable Housing Details</h4>
                {/* FLAG: Critical Need */}
                <div className="space-y-2">
                  <Label>How long without stable housing?</Label>
                  <RadioGroup name="homelessDuration" value={socialFamilyHistory.homelessDuration || ''} onValueChange={(v) => handleRadioChange('homelessDuration', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('homelessDuration', '<1m', '<1 month')}
                    {renderRadioOption('homelessDuration', '1-6m', '1–6 months')}
                    {renderRadioOption('homelessDuration', '6-12m', '6–12 months')}
                    {renderRadioOption('homelessDuration', '1-3y', '1–3 years')}
                    {renderRadioOption('homelessDuration', '>3y', '>3 years')}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Main cause of homelessness/instability:</Label>
                  <RadioGroup name="homelessnessCause" value={socialFamilyHistory.homelessnessCause || ''} onValueChange={(v) => handleRadioChange('homelessnessCause', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('homelessnessCause', 'financial', 'Financial')}
                    {renderRadioOption('homelessnessCause', 'family_conflict', 'Family conflict')}
                    {renderRadioOption('homelessnessCause', 'eviction', 'Eviction')}
                    {renderRadioOption('homelessnessCause', 'substance_use', 'Substance use')}
                    {renderRadioOption('homelessnessCause', 'mental_health', 'Mental health')}
                    {renderRadioOption('homelessnessCause', 'other', 'Other')}
                  </RadioGroup>
                  {socialFamilyHistory.homelessnessCause === 'other' && (
                    <Input name="homelessnessCauseOther" value={socialFamilyHistory.homelessnessCauseOther || ''} onChange={handleInputChange} placeholder="Please specify cause" className="mt-2" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Do you use shelters or housing resources?</Label>
                  <RadioGroup name="homelessShelterUse" value={socialFamilyHistory.homelessShelterUse || ''} onValueChange={(v) => handleRadioChange('homelessShelterUse', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('homelessShelterUse', 'regularly', 'Regularly')}
                    {renderRadioOption('homelessShelterUse', 'occasionally', 'Occasionally')}
                    {renderRadioOption('homelessShelterUse', 'past', 'Have in past')}
                    {renderRadioOption('homelessShelterUse', 'no', 'No (access barriers or refusal)')}
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Have you been exposed to violence/harm due to housing situation?</Label>
                  <RadioGroup name="homelessViolenceExposure" value={socialFamilyHistory.homelessViolenceExposure || ''} onValueChange={(v) => handleRadioChange('homelessViolenceExposure', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('homelessViolenceExposure', 'frequently', 'Frequently')}
                    {renderRadioOption('homelessViolenceExposure', 'occasionally', 'Occasionally')}
                    {renderRadioOption('homelessViolenceExposure', 'rarely', 'Rarely')}
                    {renderRadioOption('homelessViolenceExposure', 'never', 'Never')}
                  </RadioGroup>
                </div>
                 <div className="space-y-2">
                  <Label>Is finding stable housing an immediate goal for you?</Label>
                  <RadioGroup name="homelessSeekingHousingGoal" value={socialFamilyHistory.homelessSeekingHousingGoal || ''} onValueChange={(v) => handleRadioChange('homelessSeekingHousingGoal', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('homelessSeekingHousingGoal', 'urgent', 'Yes, urgently')}
                    {renderRadioOption('homelessSeekingHousingGoal', 'possible', 'Possibly')}
                    {renderRadioOption('homelessSeekingHousingGoal', 'not_now', 'Not right now (managing as is)')}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Conditional: Living with family/friends */}
            {(socialFamilyHistory.currentLivingSituation === 'parents_family' || socialFamilyHistory.currentLivingSituation === 'friends_roommates') && (
              <div className="mt-4 pt-4 border-t space-y-4 pl-4 border-l-2">
                 <Label className="font-medium">How stable is this arrangement?</Label>
                  <RadioGroup name="livingArrangementStability" value={socialFamilyHistory.livingArrangementStability || ''} onValueChange={(v) => handleRadioChange('livingArrangementStability', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderRadioOption('livingArrangementStability', 'very_stable', 'Very stable')}
                    {renderRadioOption('livingArrangementStability', 'somewhat_stable', 'Somewhat stable')}
                    {renderRadioOption('livingArrangementStability', 'unstable_short_term', 'Unstable/short-term')}
                  </RadioGroup>
              </div>
            )}
          </div>

          {/* Family Composition */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Family Composition</Label>
            <div className="space-y-2">
              <Label>Relationship status:</Label>
              <RadioGroup
                name="relationshipStatus"
                value={socialFamilyHistory.relationshipStatus || ''}
                onValueChange={(value) => handleRadioChange('relationshipStatus', value)}
                className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4"
              >
                {renderRadioOption('relationshipStatus', 'single', 'Single')}
                {renderRadioOption('relationshipStatus', 'in_relationship', 'In a relationship')}
                {renderRadioOption('relationshipStatus', 'married', 'Married')}
                {renderRadioOption('relationshipStatus', 'separated', 'Separated')}
                {renderRadioOption('relationshipStatus', 'divorced', 'Divorced')}
                {renderRadioOption('relationshipStatus', 'widowed', 'Widowed')}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Do you have children?</Label>
              <RadioGroup name="hasChildren" value={socialFamilyHistory.hasChildren || ''} onValueChange={(v) => handleRadioChange('hasChildren', v)} className="flex space-x-4">
                {renderRadioOption('hasChildren', 'yes', 'Yes')}
                {renderRadioOption('hasChildren', 'no', 'No')}
              </RadioGroup>
            </div>
            {/* Conditional: hasChildren === 'yes' */}
            {socialFamilyHistory.hasChildren === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-4 pl-4 border-l-2">
                <div className="space-y-2">
                  <Label htmlFor="numberOfChildren">Number of children:</Label>
                  <Input id="numberOfChildren" name="numberOfChildren" type="number" value={socialFamilyHistory.numberOfChildren || ''} onChange={handleInputChange} className="w-24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childrenAges">Ages:</Label>
                  <Input id="childrenAges" name="childrenAges" value={socialFamilyHistory.childrenAges || ''} onChange={handleInputChange} placeholder="e.g., 5, 12, 18"/>
                </div>
                 <div className="space-y-2">
                    <Label>Do any minor children live with you?</Label>
                    <RadioGroup name="minorChildrenLivingWith" value={socialFamilyHistory.minorChildrenLivingWith || ''} onValueChange={(v) => handleRadioChange('minorChildrenLivingWith', v)} className="flex space-x-4">
                      {renderRadioOption('minorChildrenLivingWith', 'yes', 'Yes (full or part-time)')}
                      {renderRadioOption('minorChildrenLivingWith', 'no', 'No')}
                    </RadioGroup>
                  </div>
                  {/* Conditional: minorChildrenLivingWith === 'no' */}
                  {socialFamilyHistory.minorChildrenLivingWith === 'no' && (
                    <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                      <Label>Do you have visitation/custody arrangements?</Label>
                      <RadioGroup name="visitationCustodyArrangements" value={socialFamilyHistory.visitationCustodyArrangements || ''} onValueChange={(v) => handleRadioChange('visitationCustodyArrangements', v)} className="flex space-x-4">
                        {renderRadioOption('visitationCustodyArrangements', 'yes', 'Yes')}
                        {renderRadioOption('visitationCustodyArrangements', 'no', 'No')}
                        {renderRadioOption('visitationCustodyArrangements', 'na', 'N/A')}
                      </RadioGroup>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Any current involvement with child protective services (CPS)?</Label>
                    <RadioGroup name="cpsInvolvement" value={socialFamilyHistory.cpsInvolvement || ''} onValueChange={(v) => handleRadioChange('cpsInvolvement', v)} className="flex space-x-4">
                      {renderRadioOption('cpsInvolvement', 'yes', 'Yes')}
                      {renderRadioOption('cpsInvolvement', 'no', 'No')}
                    </RadioGroup>
                  </div>
                  {/* Conditional: cpsInvolvement === 'yes' */}
                  {socialFamilyHistory.cpsInvolvement === 'yes' && (
                    <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                      <Label>Is reunification a goal?</Label>
                       <RadioGroup name="cpsReunificationGoal" value={socialFamilyHistory.cpsReunificationGoal || ''} onValueChange={(v) => handleRadioChange('cpsReunificationGoal', v)} className="flex space-x-4">
                        {renderRadioOption('cpsReunificationGoal', 'yes', 'Yes')}
                        {renderRadioOption('cpsReunificationGoal', 'no', 'No')}
                        {renderRadioOption('cpsReunificationGoal', 'na', 'N/A')}
                      </RadioGroup>
                    </div>
                  )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="otherHouseholdMembers">Other Household Members (if not mentioned):</Label>
              <Textarea id="otherHouseholdMembers" name="otherHouseholdMembers" value={socialFamilyHistory.otherHouseholdMembers || ''} onChange={handleInputChange} rows={2} />
            </div>
          </div>

          {/* Family of Origin */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Family of Origin</Label>
            <div className="space-y-2">
               <Label>Who did you grow up with primarily?</Label>
               <RadioGroup name="grewUpWith" value={socialFamilyHistory.grewUpWith || ''} onValueChange={(v) => handleRadioChange('grewUpWith', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {renderRadioOption('grewUpWith', 'both_parents', 'Both parents')}
                {renderRadioOption('grewUpWith', 'single_parent', 'Single parent')}
                {renderRadioOption('grewUpWith', 'grandparents_relatives', 'Grandparents/relatives')}
                {renderRadioOption('grewUpWith', 'foster_care', 'Foster care')}
                {renderRadioOption('grewUpWith', 'other', 'Other')}
              </RadioGroup>
              {socialFamilyHistory.grewUpWith === 'other' && (
                <Input name="grewUpWithOther" value={socialFamilyHistory.grewUpWithOther || ''} onChange={handleInputChange} placeholder="Please specify" className="mt-2" />
              )}
            </div>
             <div className="space-y-2">
               <Label>Any significant family issues in childhood (e.g. abuse, parental substance use)?</Label>
               <RadioGroup name="childhoodFamilyIssues" value={socialFamilyHistory.childhoodFamilyIssues || ''} onValueChange={(v) => handleRadioChange('childhoodFamilyIssues', v)} className="flex space-x-4">
                {renderRadioOption('childhoodFamilyIssues', 'yes', 'Yes')}
                {renderRadioOption('childhoodFamilyIssues', 'no', 'No')}
              </RadioGroup>
               <p className="text-sm text-muted-foreground">(If yes, see Trauma History section for details.)</p>
            </div>
          </div>

          {/* Current Family Relationships */}
          <div className="space-y-4 border p-4 rounded-md">
             <Label className="text-lg font-semibold">Current Family Relationships</Label>
             <div className="space-y-2">
                <Label>How would you describe your relationship with your family now?</Label>
                 <RadioGroup name="currentFamilyRelationshipQuality" value={socialFamilyHistory.currentFamilyRelationshipQuality || ''} onValueChange={(v) => handleRadioChange('currentFamilyRelationshipQuality', v)} className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                    {renderRadioOption('currentFamilyRelationshipQuality', 'very_positive', 'Very positive/supportive')}
                    {renderRadioOption('currentFamilyRelationshipQuality', 'mostly_good', 'Mostly good/minor conflicts')}
                    {renderRadioOption('currentFamilyRelationshipQuality', 'neutral_distant', 'Neutral/distant')}
                    {renderRadioOption('currentFamilyRelationshipQuality', 'strained', 'Strained')}
                    {renderRadioOption('currentFamilyRelationshipQuality', 'estranged', 'Estranged (no contact)')}
                    {renderRadioOption('currentFamilyRelationshipQuality', 'none', 'Family not living/not in life')}
                 </RadioGroup>
             </div>
              {/* Conditional: strained/estranged */}
             {(socialFamilyHistory.currentFamilyRelationshipQuality === 'strained' || socialFamilyHistory.currentFamilyRelationshipQuality === 'estranged') && (
                <div className="mt-4 pt-4 border-t space-y-4 pl-4 border-l-2">
                   <Label>Main reason?</Label>
                    <RadioGroup name="familyConflictReason" value={socialFamilyHistory.familyConflictReason || ''} onValueChange={(v) => handleRadioChange('familyConflictReason', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {renderRadioOption('familyConflictReason', 'my_issues', 'My substance use/mental health')}
                      {renderRadioOption('familyConflictReason', 'their_issues', 'Their substance use/mental health')}
                      {renderRadioOption('familyConflictReason', 'abuse_trauma', 'Abuse/trauma history')}
                      {renderRadioOption('familyConflictReason', 'financial_conflict', 'Financial/conflict')}
                      {renderRadioOption('familyConflictReason', 'cultural_values', 'Cultural or value differences')}
                      {renderRadioOption('familyConflictReason', 'other', 'Other')}
                    </RadioGroup>
                    {socialFamilyHistory.familyConflictReason === 'other' && (
                      <Input name="familyConflictReasonOther" value={socialFamilyHistory.familyConflictReasonOther || ''} onChange={handleInputChange} placeholder="Please specify" className="mt-2" />
                    )}
                </div>
             )}
              <div className="space-y-2">
                <Label>Do family conflicts or dynamics currently affect your recovery?</Label>
                 <RadioGroup name="familyConflictAffectsRecovery" value={socialFamilyHistory.familyConflictAffectsRecovery || ''} onValueChange={(v) => handleRadioChange('familyConflictAffectsRecovery', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                   {renderRadioOption('familyConflictAffectsRecovery', 'significantly', 'Yes, significantly')}
                   {renderRadioOption('familyConflictAffectsRecovery', 'somewhat', 'Somewhat')}
                   {renderRadioOption('familyConflictAffectsRecovery', 'very_little', 'Very little')}
                   {renderRadioOption('familyConflictAffectsRecovery', 'not_at_all', 'Not at all')}
                 </RadioGroup>
             </div>
          </div>

          {/* Social Support */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Social Support</Label>
             <div className="space-y-2">
                <Label>Do you have close friends or relatives you can rely on for help or emotional support?</Label>
                 <RadioGroup name="hasReliableSupport" value={socialFamilyHistory.hasReliableSupport || ''} onValueChange={(v) => handleRadioChange('hasReliableSupport', v)} className="flex space-x-4">
                   {renderRadioOption('hasReliableSupport', 'yes', 'Yes')}
                   {renderRadioOption('hasReliableSupport', 'no', 'No')}
                 </RadioGroup>
             </div>
             {/* Conditional: hasReliableSupport === 'yes' */}
             {socialFamilyHistory.hasReliableSupport === 'yes' && (
                 <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                    <Label>About how many?</Label>
                    <RadioGroup name="supportNetworkSize" value={socialFamilyHistory.supportNetworkSize || ''} onValueChange={(v) => handleRadioChange('supportNetworkSize', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {renderRadioOption('supportNetworkSize', '1-2', '1–2 people')}
                       {renderRadioOption('supportNetworkSize', '3-5', 'A few (3–5)')}
                       {renderRadioOption('supportNetworkSize', '>5', 'A large support network (>5)')}
                     </RadioGroup>
                 </div>
             )}
             {/* Conditional: hasReliableSupport === 'no' */}
             {socialFamilyHistory.hasReliableSupport === 'no' && (
                <div className="mt-4 pt-4 border-t space-y-4 pl-4 border-l-2">
                   <div className="space-y-2">
                      <Label>Do you feel socially isolated much of the time?</Label>
                      <RadioGroup name="socialIsolationFrequency" value={socialFamilyHistory.socialIsolationFrequency || ''} onValueChange={(v) => handleRadioChange('socialIsolationFrequency', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         {renderRadioOption('socialIsolationFrequency', 'frequently', 'Frequently')}
                         {renderRadioOption('socialIsolationFrequency', 'occasionally', 'Occasionally')}
                         {renderRadioOption('socialIsolationFrequency', 'rarely', 'Rarely')}
                         {renderRadioOption('socialIsolationFrequency', 'never', 'Never')}
                      </RadioGroup>
                   </div>
                   <div className="space-y-2">
                      <Label>Would you like help connecting to social support (peer support groups, activities)?</Label>
                       <RadioGroup name="wantsHelpConnectingSupport" value={socialFamilyHistory.wantsHelpConnectingSupport || ''} onValueChange={(v) => handleRadioChange('wantsHelpConnectingSupport', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         {renderRadioOption('wantsHelpConnectingSupport', 'definitely', 'Definitely')}
                         {renderRadioOption('wantsHelpConnectingSupport', 'possibly', 'Possibly')}
                         {renderRadioOption('wantsHelpConnectingSupport', 'not_really', 'Not really')}
                         {renderRadioOption('wantsHelpConnectingSupport', 'no', 'No')}
                       </RadioGroup>
                   </div>
                </div>
             )}
             <div className="space-y-2">
                <Label>Do your friends/family know you are seeking treatment?</Label>
                 <RadioGroup name="friendsFamilyAwareOfTreatment" value={socialFamilyHistory.friendsFamilyAwareOfTreatment || ''} onValueChange={(v) => handleRadioChange('friendsFamilyAwareOfTreatment', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                   {renderRadioOption('friendsFamilyAwareOfTreatment', 'most_all', 'Yes, most/all know')}
                   {renderRadioOption('friendsFamilyAwareOfTreatment', 'few', 'A few know')}
                   {renderRadioOption('friendsFamilyAwareOfTreatment', 'none', 'No, I’ve kept it private')}
                 </RadioGroup>
             </div>
             <div className="space-y-2">
                <Label>Has your mental health or substance use caused you to lose friends or significant relationships?</Label>
                 <RadioGroup name="issuesCausedRelationshipLoss" value={socialFamilyHistory.issuesCausedRelationshipLoss || ''} onValueChange={(v) => handleRadioChange('issuesCausedRelationshipLoss', v)} className="flex space-x-4">
                   {renderRadioOption('issuesCausedRelationshipLoss', 'yes', 'Yes')}
                   {renderRadioOption('issuesCausedRelationshipLoss', 'no', 'No')}
                 </RadioGroup>
             </div>
              {/* Conditional: issuesCausedRelationshipLoss === 'yes' */}
             {socialFamilyHistory.issuesCausedRelationshipLoss === 'yes' && (
                 <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                    <Label>Severity of loss:</Label>
                    <RadioGroup name="relationshipLossSeverity" value={socialFamilyHistory.relationshipLossSeverity || ''} onValueChange={(v) => handleRadioChange('relationshipLossSeverity', v)} className="space-y-1">
                       {renderRadioOption('relationshipLossSeverity', 'multiple', 'Multiple relationships lost')}
                       {renderRadioOption('relationshipLossSeverity', 'one_two', 'One or two important relationships')}
                       {renderRadioOption('relationshipLossSeverity', 'conflicts_not_loss', 'Only caused conflicts, not outright loss')}
                     </RadioGroup>
                 </div>
             )}
          </div>

          {/* Community Involvement */}
          <div className="space-y-2 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Community Involvement</Label>
            <Label>Are you involved in any community, social, or religious groups or activities?</Label>
            <RadioGroup name="communityGroupInvolvement" value={socialFamilyHistory.communityGroupInvolvement || ''} onValueChange={(v) => handleRadioChange('communityGroupInvolvement', v)} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {renderRadioOption('communityGroupInvolvement', 'actively', 'Yes, actively')}
              {renderRadioOption('communityGroupInvolvement', 'occasionally', 'Occasionally')}
              {renderRadioOption('communityGroupInvolvement', 'no_interested', 'No, but interested')}
              {renderRadioOption('communityGroupInvolvement', 'no_not_interested', 'No, not interested')}
            </RadioGroup>
          </div>

          {/* History of Domestic Violence */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">History of Domestic Violence</Label>
            <div className="space-y-2">
              <Label>Have you ever been in an intimate relationship with domestic violence (physical, emotional, or sexual abuse)?</Label>
              <RadioGroup name="domesticViolenceHistory" value={socialFamilyHistory.domesticViolenceHistory || ''} onValueChange={(v) => handleRadioChange('domesticViolenceHistory', v)} className="flex space-x-4">
                {renderRadioOption('domesticViolenceHistory', 'yes', 'Yes')}
                {renderRadioOption('domesticViolenceHistory', 'no', 'No')}
              </RadioGroup>
            </div>
            {/* Conditional: domesticViolenceHistory === 'yes' */}
            {socialFamilyHistory.domesticViolenceHistory === 'yes' && (
              <div className="mt-4 pt-4 border-t space-y-2 pl-4 border-l-2">
                <Label className="font-semibold">Are you currently safe from that situation?</Label>
                <RadioGroup name="currentlySafeFromDV" value={socialFamilyHistory.currentlySafeFromDV || ''} onValueChange={(v) => handleRadioChange('currentlySafeFromDV', v)} className="flex space-x-4">
                  {renderRadioOption('currentlySafeFromDV', 'yes', 'Yes')}
                  {renderRadioOption('currentlySafeFromDV', 'no', 'No')}
                </RadioGroup>
                {socialFamilyHistory.currentlySafeFromDV === 'no' && (
                  <p className="text-sm font-medium text-red-600">* Critical Concern: Clinician will provide resources immediately.</p>
                )}
              </div>
            )}
          </div>

          {/* Social Determinants */}
          <div className="space-y-4 border p-4 rounded-md">
            <Label className="text-lg font-semibold">Social Determinants</Label>
            <p className="text-sm text-muted-foreground">(Some items may reiterate earlier questions for emphasis)</p>
            <div className="space-y-2">
              <Label>Housing Stability: Are you currently homeless or at risk?</Label>
              <RadioGroup name="isHomelessOrAtRisk" value={socialFamilyHistory.isHomelessOrAtRisk || ''} onValueChange={(v) => handleRadioChange('isHomelessOrAtRisk', v)} className="flex space-x-4">
                {renderRadioOption('isHomelessOrAtRisk', 'yes', 'Yes')}
                {renderRadioOption('isHomelessOrAtRisk', 'no', 'No')}
              </RadioGroup>
              {socialFamilyHistory.isHomelessOrAtRisk === 'yes' && (
                <p className="text-sm font-medium text-orange-600">* Critical Need: Flagged for immediate attention/resources.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Food Security: Do you have enough food regularly?</Label>
              <RadioGroup name="hasEnoughFood" value={socialFamilyHistory.hasEnoughFood || ''} onValueChange={(v) => handleRadioChange('hasEnoughFood', v)} className="flex space-x-4">
                {renderRadioOption('hasEnoughFood', 'yes', 'Yes')}
                {renderRadioOption('hasEnoughFood', 'no', 'No')}
              </RadioGroup>
              {socialFamilyHistory.hasEnoughFood === 'no' && (
                <p className="text-sm text-muted-foreground">* Referral: Provide food resource information.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Transportation: Do you have reliable transportation?</Label>
              <RadioGroup name="hasReliableTransportation" value={socialFamilyHistory.hasReliableTransportation || ''} onValueChange={(v) => handleRadioChange('hasReliableTransportation', v)} className="flex space-x-4">
                {renderRadioOption('hasReliableTransportation', 'yes', 'Yes')}
                {renderRadioOption('hasReliableTransportation', 'no', 'No')}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Legal Issues: Are current legal issues creating stress?</Label>
              <RadioGroup name="currentLegalIssuesStress" value={socialFamilyHistory.currentLegalIssuesStress || ''} onValueChange={(v) => handleRadioChange('currentLegalIssuesStress', v)} className="flex space-x-4">
                {renderRadioOption('currentLegalIssuesStress', 'yes', 'Yes')}
                {renderRadioOption('currentLegalIssuesStress', 'no', 'No')}
                {renderRadioOption('currentLegalIssuesStress', 'na', 'N/A')}
              </RadioGroup>
            </div>
          </div>

          {/* Additional Comments */}
          <div className='space-y-2'>
            <Label htmlFor="additionalSocialFamilyComments">Additional Comments – Social/Family:</Label>
            <Textarea id="additionalSocialFamilyComments" name="additionalSocialFamilyComments" value={socialFamilyHistory.additionalSocialFamilyComments || ''} onChange={handleInputChange} rows={4} />
          </div>

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
