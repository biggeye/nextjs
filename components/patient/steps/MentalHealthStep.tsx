"use client"

import type React from "react"
import { MentalHealthData } from '@/types/steps';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface MentalHealthStepProps { 
  mentalHealth: MentalHealthData; 
  updateData: (field: keyof MentalHealthData, value: any) => void; 
  onNext?: () => void;
  onBack?: () => void;
}

export function MentalHealthStep({ mentalHealth, updateData, onBack, onNext }: MentalHealthStepProps) {
  // Placeholder handler - adjust based on actual MentalHealthData fields
  const handleChange = (field: string, value: any) => {
    updateData(field as keyof MentalHealthData, value); 
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
    const currentValues = (mentalHealth[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...new Set([...currentValues, value])];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    updateData(field as keyof MentalHealthData, newValues);
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
        checked={((mentalHealth[fieldName] as string[]) || []).includes(value)}
        onCheckedChange={(checked) => handleCheckboxChange(fieldName, value, checked as boolean)}
      />
      <Label htmlFor={`${fieldName}-${value}`}>{label}</Label>
    </div>
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* --- Past Diagnoses & Treatment --- */}
        <div className="space-y-6 rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">Past Diagnoses & Treatment</h3>
           <div className="space-y-2">
            <Label className="font-medium">Have you ever been diagnosed with any mental health conditions by a professional?</Label>
            <p className="text-sm text-muted-foreground">Select all that apply:</p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {renderCheckboxOption('pastDiagnoses', 'depression', 'Depression')}
              {renderCheckboxOption('pastDiagnoses', 'anxiety', 'Anxiety Disorder (e.g., GAD, Panic)')}
              {renderCheckboxOption('pastDiagnoses', 'bipolar', 'Bipolar Disorder')}
              {renderCheckboxOption('pastDiagnoses', 'schizophrenia', 'Schizophrenia/Psychosis')}
              {renderCheckboxOption('pastDiagnoses', 'ptsd', 'PTSD')}
              {renderCheckboxOption('pastDiagnoses', 'ocd', 'OCD')}
              {renderCheckboxOption('pastDiagnoses', 'adhd', 'ADHD')}
              {renderCheckboxOption('pastDiagnoses', 'eating_disorder', 'Eating Disorder')}
              {renderCheckboxOption('pastDiagnoses', 'personality_disorder', 'Personality Disorder')}
              {renderCheckboxOption('pastDiagnoses', 'other', 'Other')}
            </div>
            { (mentalHealth.pastDiagnoses || []).includes('other') && (
              <div className="mt-2 space-y-1">
                <Label htmlFor="pastDiagnosesOther">Please specify "Other":</Label>
                <Input id="pastDiagnosesOther" name="pastDiagnosesOther" value={mentalHealth.pastDiagnosesOther || ''} onChange={handleInputChange} />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Have you received outpatient mental health therapy/counseling in the past?</Label>
            <RadioGroup
              value={mentalHealth.pastOutpatientTreatment || ''}
              onValueChange={(value) => handleRadioChange('pastOutpatientTreatment', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastOutpatientTreatment', 'yes', 'Yes')}
              {renderRadioOption('pastOutpatientTreatment', 'no', 'No')}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Have you ever been hospitalized for psychiatric (mental health) reasons?</Label>
             <RadioGroup
              value={mentalHealth.pastPsychiatricHospitalization || ''}
              onValueChange={(value) => handleRadioChange('pastPsychiatricHospitalization', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastPsychiatricHospitalization', 'yes', 'Yes')}
              {renderRadioOption('pastPsychiatricHospitalization', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.pastPsychiatricHospitalization === 'yes' && (
             <div className="space-y-2 border-l-2 border-muted pl-6">
               <Label htmlFor="hospitalizationDetails">Please provide details (approx. number of times, lengths of stay, locations if comfortable):</Label>
               <Textarea id="hospitalizationDetails" name="hospitalizationDetails" value={mentalHealth.hospitalizationDetails || ''} onChange={handleInputChange} />
             </div>
          )}

          <div className="space-y-2">
            <Label className="font-medium">Have you taken psychiatric medications in the past?</Label>
             <RadioGroup
              value={mentalHealth.pastMedications || ''}
              onValueChange={(value) => handleRadioChange('pastMedications', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastMedications', 'yes', 'Yes')}
              {renderRadioOption('pastMedications', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.pastMedications === 'yes' && (
             <div className="space-y-2 border-l-2 border-muted pl-6">
               <Label htmlFor="medicationDetails">Please list medications tried, effectiveness, and any significant side effects:</Label>
               <Textarea id="medicationDetails" name="medicationDetails" value={mentalHealth.medicationDetails || ''} onChange={handleInputChange} placeholder="e.g., Prozac - helped somewhat, caused insomnia; Seroquel - too sedating..." />
             </div>
          )}
        </div>

        {/* --- Current Symptoms & Status --- */}
        <div className="space-y-6 rounded-md border p-4">
           <h3 className="mb-4 text-lg font-semibold">Current Symptoms & Status</h3>
           <div className="space-y-2">
             <Label htmlFor="currentMentalHealthConcerns">Please describe your main mental health concerns or reasons for seeking help now:</Label>
             <Textarea id="currentMentalHealthConcerns" name="currentMentalHealthConcerns" value={mentalHealth.currentMentalHealthConcerns || ''} onChange={handleInputChange} />
           </div>
           <div className="space-y-2">
            <Label className="font-medium">Are these symptoms currently impacting your daily life (work, school, relationships, self-care)?</Label>
             <RadioGroup
              value={mentalHealth.symptomsImpactDailyLife || ''}
              onValueChange={(value) => handleRadioChange('symptomsImpactDailyLife', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('symptomsImpactDailyLife', 'yes', 'Yes')}
              {renderRadioOption('symptomsImpactDailyLife', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.symptomsImpactDailyLife === 'yes' && (
             <div className="space-y-2 border-l-2 border-muted pl-6">
               <Label htmlFor="symptomsImpactDetails">How are they impacting your life?</Label>
               <Textarea id="symptomsImpactDetails" name="symptomsImpactDetails" value={mentalHealth.symptomsImpactDetails || ''} onChange={handleInputChange} />
             </div>
          )}
        </div>

        {/* --- Suicidality & Self-Harm --- */}
        <div className="space-y-6 rounded-md border bg-warning/10 p-4">
          <h3 className="mb-4 text-lg font-semibold text-warning-foreground">Safety Assessment: Suicidality & Self-Harm</h3>
          <p className="text-sm text-warning-foreground/80">Please answer these questions honestly. Your safety is our priority.</p>

           <div className="space-y-2">
            <Label className="font-medium">Have you had thoughts of ending your life in the past?</Label>
            <RadioGroup
              value={mentalHealth.pastSuicidalThoughts || ''}
              onValueChange={(value) => handleRadioChange('pastSuicidalThoughts', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastSuicidalThoughts', 'yes', 'Yes')}
              {renderRadioOption('pastSuicidalThoughts', 'no', 'No')}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Have you ever made a suicide attempt?</Label>
            <RadioGroup
              value={mentalHealth.pastSuicideAttempt || ''}
              onValueChange={(value) => handleRadioChange('pastSuicideAttempt', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastSuicideAttempt', 'yes', 'Yes')}
              {renderRadioOption('pastSuicideAttempt', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.pastSuicideAttempt === 'yes' && (
             <div className="space-y-2 border-l-2 border-warning/50 pl-6">
               <Label htmlFor="attemptDetails">Please describe (approx. number of attempts, methods, severity):</Label>
               <Textarea id="attemptDetails" name="attemptDetails" value={mentalHealth.attemptDetails || ''} onChange={handleInputChange} />
             </div>
          )}

          <div className="space-y-2">
            <Label className="font-medium">In the past month, how often have you had thoughts of ending your life?</Label>
            <RadioGroup
              value={mentalHealth.currentSuicidalThoughts || ''}
              onValueChange={(value) => handleRadioChange('currentSuicidalThoughts', value)}
              className="grid grid-cols-2 gap-2 md:grid-cols-4"
            >
              {renderRadioOption('currentSuicidalThoughts', 'frequently', 'Frequently')}
              {renderRadioOption('currentSuicidalThoughts', 'sometimes', 'Sometimes')}
              {renderRadioOption('currentSuicidalThoughts', 'rarely', 'Rarely')}
              {renderRadioOption('currentSuicidalThoughts', 'never', 'Never')}
            </RadioGroup>
          </div>

          {mentalHealth.currentSuicidalThoughts && mentalHealth.currentSuicidalThoughts !== 'never' && (
            <div className="space-y-4 border-l-2 border-warning/50 pl-6">
              <div className="space-y-2">
                <Label className="font-medium">Do you currently have a specific plan to end your life?</Label>
                <RadioGroup
                  value={mentalHealth.currentSuicidalPlan || ''}
                  onValueChange={(value) => handleRadioChange('currentSuicidalPlan', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('currentSuicidalPlan', 'yes', 'Yes')}
                  {renderRadioOption('currentSuicidalPlan', 'no', 'No')}
                </RadioGroup>
              </div>
              {mentalHealth.currentSuicidalPlan === 'yes' && (
                <div className="space-y-2">
                  <Label htmlFor="planDetails">Please describe the plan and your intent:</Label>
                  <Textarea id="planDetails" name="planDetails" value={mentalHealth.planDetails || ''} onChange={handleInputChange} />
                </div>
              )}
              <div className="space-y-2">
                <Label className="font-medium">Do you have access to the means to carry out this plan?</Label>
                <RadioGroup
                  value={mentalHealth.accessToMeans || ''}
                  onValueChange={(value) => handleRadioChange('accessToMeans', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('accessToMeans', 'yes', 'Yes')}
                  {renderRadioOption('accessToMeans', 'no', 'No')}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="reasonsForLiving">What are some reasons for living or things that stop you from acting on these thoughts?</Label>
                  <Textarea id="reasonsForLiving" name="reasonsForLiving" value={mentalHealth.reasonsForLiving || ''} onChange={handleInputChange} placeholder="e.g., family, future goals, fear..." />
                </div>
            </div>
          )}

           <div className="space-y-2">
            <Label className="font-medium">Have you ever intentionally harmed yourself without intending to die (e.g., cutting, burning)?</Label>
            <RadioGroup
              value={mentalHealth.pastSelfHarm || ''}
              onValueChange={(value) => handleRadioChange('pastSelfHarm', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastSelfHarm', 'yes', 'Yes')}
              {renderRadioOption('pastSelfHarm', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.pastSelfHarm === 'yes' && (
             <div className="space-y-2 border-l-2 border-warning/50 pl-6">
               <Label htmlFor="selfHarmDetails">Please describe (type, frequency, triggers):</Label>
               <Textarea id="selfHarmDetails" name="selfHarmDetails" value={mentalHealth.selfHarmDetails || ''} onChange={handleInputChange} />
             </div>
          )}
           <div className="space-y-2">
            <Label className="font-medium">In the past month, how often have you had urges to harm yourself?</Label>
            <RadioGroup
              value={mentalHealth.currentSelfHarmUrges || ''}
              onValueChange={(value) => handleRadioChange('currentSelfHarmUrges', value)}
              className="grid grid-cols-2 gap-2 md:grid-cols-4"
            >
              {renderRadioOption('currentSelfHarmUrges', 'frequently', 'Frequently')}
              {renderRadioOption('currentSelfHarmUrges', 'sometimes', 'Sometimes')}
              {renderRadioOption('currentSelfHarmUrges', 'rarely', 'Rarely')}
              {renderRadioOption('currentSelfHarmUrges', 'never', 'Never')}
            </RadioGroup>
          </div>
        </div>

        {/* --- Homicidality (Handle with Care) --- */}
        <div className="space-y-6 rounded-md border border-destructive/50 bg-destructive/10 p-4">
           <h3 className="mb-4 text-lg font-semibold text-destructive-foreground">Safety Assessment: Homicidality</h3>
           <p className="text-sm text-destructive-foreground/80">These questions help assess risk. Please answer honestly.</p>
           <div className="space-y-2">
            <Label className="font-medium">Have you ever had thoughts of seriously harming or killing someone else?</Label>
            <RadioGroup
              value={mentalHealth.pastHomicidalThoughts || ''}
              onValueChange={(value) => handleRadioChange('pastHomicidalThoughts', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('pastHomicidalThoughts', 'yes', 'Yes')}
              {renderRadioOption('pastHomicidalThoughts', 'no', 'No')}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Are you currently having thoughts of harming or killing someone?</Label>
            <RadioGroup
              value={mentalHealth.currentHomicidalThoughts || ''}
              onValueChange={(value) => handleRadioChange('currentHomicidalThoughts', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('currentHomicidalThoughts', 'yes', 'Yes')}
              {renderRadioOption('currentHomicidalThoughts', 'no', 'No')}
            </RadioGroup>
          </div>
          {mentalHealth.currentHomicidalThoughts === 'yes' && (
            <div className="space-y-4 border-l-2 border-destructive/50 pl-6">
               <div className="space-y-2">
                 <Label className="font-medium">Do you have a specific plan or intent?</Label>
                 <RadioGroup
                  value={mentalHealth.homicidalPlanIntent || ''}
                  onValueChange={(value) => handleRadioChange('homicidalPlanIntent', value)}
                  className="flex space-x-4"
                 >
                  {renderRadioOption('homicidalPlanIntent', 'yes', 'Yes')}
                  {renderRadioOption('homicidalPlanIntent', 'no', 'No')}
                 </RadioGroup>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="homicidalTarget">Is there a specific person you are thinking of harming?</Label>
                 <Input id="homicidalTarget" name="homicidalTarget" value={mentalHealth.homicidalTarget || ''} onChange={handleInputChange} placeholder="Describe if applicable" />
               </div>
            </div>
          )}
        </div>

        {/* --- Psychotic Symptoms --- */}
         <div className="space-y-6 rounded-md border p-4">
           <h3 className="mb-4 text-lg font-semibold">Experiences</h3>
           <div className="space-y-2">
            <Label className="font-medium">Have you ever had experiences like hearing voices or seeing things that others do not?</Label>
             <RadioGroup
              value={mentalHealth.experiencedHallucinations || ''}
              onValueChange={(value) => handleRadioChange('experiencedHallucinations', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('experiencedHallucinations', 'yes', 'Yes')}
              {renderRadioOption('experiencedHallucinations', 'no', 'No')}
            </RadioGroup>
          </div>
           <div className="space-y-2">
            <Label className="font-medium">Have you ever had strong beliefs that others thought were strange or untrue (e.g., being watched, special powers)?</Label>
             <RadioGroup
              value={mentalHealth.experiencedDelusions || ''}
              onValueChange={(value) => handleRadioChange('experiencedDelusions', value)}
              className="flex space-x-4"
            >
              {renderRadioOption('experiencedDelusions', 'yes', 'Yes')}
              {renderRadioOption('experiencedDelusions', 'no', 'No')}
            </RadioGroup>
          </div>
          {(mentalHealth.experiencedHallucinations === 'yes' || mentalHealth.experiencedDelusions === 'yes') && (
             <div className="space-y-2 border-l-2 border-muted pl-6">
               <Label htmlFor="psychoticSymptomDetails">Please describe these experiences:</Label>
               <Textarea id="psychoticSymptomDetails" name="psychoticSymptomDetails" value={mentalHealth.psychoticSymptomDetails || ''} onChange={handleInputChange} />
             </div>
          )}
         </div>

         {/* --- Trauma History Screen --- */}
          <div className="space-y-6 rounded-md border p-4">
            <h3 className="mb-4 text-lg font-semibold">Trauma Screen</h3>
             <div className="space-y-2">
              <Label className="font-medium">Have you experienced any highly stressful or traumatic events (e.g., abuse, neglect, violence, serious accident, disaster, combat)?</Label>
              <RadioGroup
                value={mentalHealth.experiencedTrauma || ''}
                onValueChange={(value) => handleRadioChange('experiencedTrauma', value)}
                className="flex space-x-4"
              >
                {renderRadioOption('experiencedTrauma', 'yes', 'Yes')}
                {renderRadioOption('experiencedTrauma', 'no', 'No')}
              </RadioGroup>
             </div>
             {mentalHealth.experiencedTrauma === 'yes' && (
               <div className="space-y-2 border-l-2 border-muted pl-6">
                <Label className="font-medium">Do these past events still affect you today (e.g., nightmares, flashbacks, avoidance)?</Label>
                <RadioGroup
                  value={mentalHealth.traumaImpactToday || ''}
                  onValueChange={(value) => handleRadioChange('traumaImpactToday', value)}
                  className="flex space-x-4"
                >
                  {renderRadioOption('traumaImpactToday', 'yes', 'Yes')}
                  {renderRadioOption('traumaImpactToday', 'no', 'No')}
                </RadioGroup>
               </div>
             )}
             <p className="text-sm text-muted-foreground">If yes, we may explore this further in the Trauma History section.</p>
          </div>


        {/* --- Other Concerns --- */}
        <div className="space-y-6 rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">Other Concerns</h3>
           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
             <div className="space-y-2">
               <Label className="font-medium">Trouble concentrating or paying attention?</Label>
                <RadioGroup value={mentalHealth.troubleConcentrating || ''} onValueChange={(v) => handleRadioChange('troubleConcentrating', v)} className="flex space-x-4">
                    {renderRadioOption('troubleConcentrating', 'yes', 'Yes')}
                    {renderRadioOption('troubleConcentrating', 'no', 'No')}
                </RadioGroup>
             </div>
             <div className="space-y-2">
               <Label className="font-medium">Significant mood swings?</Label>
                <RadioGroup value={mentalHealth.significantMoodSwings || ''} onValueChange={(v) => handleRadioChange('significantMoodSwings', v)} className="flex space-x-4">
                    {renderRadioOption('significantMoodSwings', 'yes', 'Yes')}
                    {renderRadioOption('significantMoodSwings', 'no', 'No')}
                </RadioGroup>
             </div>
             <div className="space-y-2">
               <Label className="font-medium">Excessive worry or anxiety?</Label>
                <RadioGroup value={mentalHealth.excessiveWorry || ''} onValueChange={(v) => handleRadioChange('excessiveWorry', v)} className="flex space-x-4">
                    {renderRadioOption('excessiveWorry', 'yes', 'Yes')}
                    {renderRadioOption('excessiveWorry', 'no', 'No')}
                </RadioGroup>
             </div>
             <div className="space-y-2">
               <Label className="font-medium">Panic attacks?</Label>
                <RadioGroup value={mentalHealth.panicAttacks || ''} onValueChange={(v) => handleRadioChange('panicAttacks', v)} className="flex space-x-4">
                    {renderRadioOption('panicAttacks', 'yes', 'Yes')}
                    {renderRadioOption('panicAttacks', 'no', 'No')}
                </RadioGroup>
             </div>
           </div>
           <div className="space-y-2">
             <Label className="font-medium">Sleep Problems (select all that apply):</Label>
             <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
               {renderCheckboxOption('sleepProblems', 'difficulty_falling', 'Difficulty falling asleep')}
               {renderCheckboxOption('sleepProblems', 'difficulty_staying', 'Difficulty staying asleep')}
               {renderCheckboxOption('sleepProblems', 'sleeping_too_much', 'Sleeping too much')}
               {renderCheckboxOption('sleepProblems', 'nightmares', 'Nightmares')}
               {renderCheckboxOption('sleepProblems', 'none', 'None')}
             </div>
           </div>
           <div className="space-y-2">
             <Label className="font-medium">Appetite Changes (select all that apply):</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {renderCheckboxOption('appetiteChanges', 'increased', 'Increased appetite')}
                {renderCheckboxOption('appetiteChanges', 'decreased', 'Decreased appetite')}
                {renderCheckboxOption('appetiteChanges', 'no_change', 'No significant change')}
              </div>
           </div>
        </div>


        {/* --- Strengths & Goals --- */}
        <div className="space-y-6 rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">Strengths & Goals</h3>
          <div className="space-y-2">
            <Label htmlFor="mentalHealthStrengths">What are some of your strengths or coping skills when dealing with mental health challenges?</Label>
            <Textarea id="mentalHealthStrengths" name="mentalHealthStrengths" value={mentalHealth.mentalHealthStrengths || ''} onChange={handleInputChange} placeholder="e.g., Supportive friends, journaling, exercise..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="treatmentGoals">What are your main goals for seeking mental health support or treatment at this time?</Label>
            <Textarea id="treatmentGoals" name="treatmentGoals" value={mentalHealth.treatmentGoals || ''} onChange={handleInputChange} placeholder="e.g., Reduce anxiety, improve mood, develop coping skills..." />
          </div>
        </div>


        {/* --- Additional Notes --- */}
        <div className="space-y-2">
          <Label htmlFor="additionalMentalHealthNotes">Additional Notes on Mental Health:</Label>
          <Textarea id="additionalMentalHealthNotes" name="additionalMentalHealthNotes" value={mentalHealth.additionalMentalHealthNotes || ''} onChange={handleInputChange} placeholder="Any other relevant information..." />
        </div>

      </CardContent>
      <CardFooter className="flex justify-between">
        {onBack && <Button variant="outline" onClick={onBack}>Back</Button>}
        {onNext && <Button onClick={onNext}>Next</Button>}
      </CardFooter>
    </Card>
  )
}
