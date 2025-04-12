// c:\source\biggeye\repos\nextjs\components\patient\steps\SubstanceUseStep.tsx
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button'; // Added import for Button
import { PatientData } from '../PatientIntakeFlow'; 

// --- Types defined inline for now, consider moving to /types/steps.ts ---
export interface SubstanceDetail {
  substance: string; // Name of the substance (e.g., 'Alcohol', 'Marijuana')
  ageFirstUse: string;
  lastUseDate: string;
  frequency: string; // e.g., 'Daily', 'Weekly', 'Monthly', 'Less than monthly'
  method: string; // e.g., 'Oral', 'Smoked', 'Injected', 'Snorted'
  amount: string; // Quantity per use occasion
  longestAbstinence: string; // Duration
  previousTreatment: 'Yes' | 'No' | '';
  treatmentType?: string; // Optional: details if previousTreatment is 'Yes'
}

export interface SubstanceUseData {
  everUsed: 'Yes' | 'No' | '';
  usedSubstancesPastYear: string[]; // Array of substance names
  substancesDetails: SubstanceDetail[]; // Details for each substance checked above
  everReceivedTreatment: 'Yes' | 'No' | '';
  treatmentHistory?: {
    type: string; // e.g., 'Inpatient', 'Outpatient', 'Detox', 'Sober Living'
    facilityName: string;
    dates: string; // e.g., 'MM/YYYY - MM/YYYY' or 'MM/YYYY'
    completed: 'Yes' | 'No' | 'Ongoing' | '';
  }[];
  readinessToChange: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | ''; // Scale 1-10
  additionalComments?: string;
}

interface SubstanceUseStepProps {
  substance: SubstanceUseData;
  updateData: (field: keyof SubstanceUseData, value: any) => void;
  onNext?: () => void; // Added navigation prop
  onBack?: () => void; // Added navigation prop
}
// --- End Types ---

// TODO: Move substanceOptions to a shared location like /lib/options.ts
const substanceOptions = [
  { value: 'Alcohol', label: 'Alcohol' },
  { value: 'Cannabis', label: 'Cannabis (Marijuana, THC)' },
  { value: 'Cocaine', label: 'Cocaine / Crack' },
  { value: 'Stimulants', label: 'Stimulants (e.g., Adderall, Ritalin, Meth)' },
  { value: 'Benzodiazepines', label: 'Benzodiazepines (e.g., Xanax, Valium, Klonopin)' },
  { value: 'Opioids', label: 'Opioids (e.g., Heroin, Fentanyl, Oxycodone, Vicodin)' },
  { value: 'Hallucinogens', label: 'Hallucinogens (e.g., LSD, Psilocybin, MDMA)' },
  { value: 'Inhalants', label: 'Inhalants' },
  // Note: 'Other' checkbox is handled separately below
];

export const SubstanceUseStep: React.FC<SubstanceUseStepProps> = ({
  substance,
  updateData,
  onNext, // Destructure added props
  onBack, // Destructure added props
}) => {

  // Handler for general input changes (text, textarea, etc.)
  // Handles nested changes within substancesDetails array
  const handleChange = (field: keyof SubstanceUseData, value: any) => {
    // Conditional logic: If 'everUsed' is 'No', clear related fields
    if (field === 'everUsed' && value === 'No') {
      updateData('usedSubstancesPastYear', []);
      updateData('substancesDetails', []);
      updateData('everReceivedTreatment', ''); // Example: Clear this too
    }
    
    // Conditional logic: If 'everReceivedTreatment' is 'No', clear history
    if (field === 'everReceivedTreatment' && value === 'No') {
      updateData('treatmentHistory', []);
    }

    // Update the primary field
    updateData(field, value);
  };

  // Handler for RadioGroup changes
  const handleRadioChange = (field: keyof SubstanceUseData, value: string) => {
    handleChange(field, value);
  };

  // Handler for Checkbox changes (specifically for usedSubstancesPastYear)
  const handleCheckboxChange = (field: Extract<keyof SubstanceUseData, 'usedSubstancesPastYear'>, value: string, checked: boolean) => {
    const currentValues = (substance[field] as string[]) || [];
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item) => item !== value);
    }

    // Call updateData directly for the checkbox group
    updateData(field, newValues);

    // Add/Remove detail section based on checkbox
    if (field === 'usedSubstancesPastYear') {
      const currentDetails = [...substance.substancesDetails];
      if (checked) {
        const newDetail = {
          substance: value,
          ageFirstUse: '',
          lastUseDate: '',
          frequency: '',
          method: '',
          amount: '',
          longestAbstinence: '',
          previousTreatment: '',
        };
        const updatedDetails = [...currentDetails, newDetail];
        updateData('substancesDetails', updatedDetails);
      } else {
        const updatedDetails = currentDetails.filter(detail => detail.substance !== value);
        updateData('substancesDetails', updatedDetails);
      }
    }
  };

  // Handler for substance detail changes
  const handleSubstanceDetailChange = (substanceName: string, field: keyof SubstanceDetail, value: any) => {
    const currentDetails = [...substance.substancesDetails];
    const updatedDetails = currentDetails.map(detail => {
      if (detail.substance === substanceName) {
        return { ...detail, [field]: value };
      }
      return detail;
    });
    updateData('substancesDetails', updatedDetails);
  };

  // Handler for adding a new substance detail
  const addEmptySubstanceDetail = (substanceName: string) => {
    const newDetail = {
      substance: substanceName,
      ageFirstUse: '',
      lastUseDate: '',
      frequency: '',
      method: '',
      amount: '',
      longestAbstinence: '',
      previousTreatment: '',
    };
    const newDetails = [...substance.substancesDetails, newDetail];
    updateData('substancesDetails', newDetails);
  };

  // Handler for removing a substance detail
  const removeSubstanceDetail = (index: number) => {
    const currentDetails = [...substance.substancesDetails];
    currentDetails.splice(index, 1);
    updateData('substancesDetails', currentDetails);
  };

  // Handler for treatment history changes
  const handleTreatmentHistoryChange = (index: number, field: keyof SubstanceUseData['treatmentHistory'][0], value: any) => {
    const currentHistory = [...(substance.treatmentHistory || [])];
    const updatedHistory = currentHistory.map((entry, i) => {
      if (i === index) {
        return { ...entry, [field]: value };
      }
      return entry;
    });
    updateData('treatmentHistory', updatedHistory);
  };

  // Handler for adding a new treatment history entry
  const addTreatmentHistory = () => {
    const newEntry = {
      type: '',
      facilityName: '',
      dates: '',
      completed: '',
    };
    const newHistory = [...(substance.treatmentHistory || []), newEntry];
    updateData('treatmentHistory', newHistory);
  };

  // Handler for removing a treatment history entry
  const removeTreatmentHistory = (index: number) => {
    const currentHistory = [...(substance.treatmentHistory || [])];
    currentHistory.splice(index, 1);
    updateData('treatmentHistory', currentHistory);
  };

  // --- JSX Structure ---
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Substance Use History</h2>

      {/* Ever Used Substances? */}
      <div className="space-y-2">
        <Label>Have you ever used alcohol or other drugs?</Label>
        <RadioGroup
          name="everUsed" // Make sure name matches the state key
          value={substance.everUsed}
          onValueChange={(value) => handleRadioChange('everUsed', value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="everUsedYes" />
            <Label htmlFor="everUsedYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="everUsedNo" />
            <Label htmlFor="everUsedNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Conditional Rendering based on 'everUsed' */}
      {substance.everUsed === 'Yes' && (
        <>
          {/* Substances Used in Past Year */}
          <div className="space-y-2">
            <Label>Which substances have you used in the past year? (Check all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {substanceOptions.map((substanceOption) => (
                <div key={substanceOption.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`substance-${substanceOption.value}`}
                    checked={substance.usedSubstancesPastYear.includes(substanceOption.value)}
                    onCheckedChange={(checked) => handleCheckboxChange('usedSubstancesPastYear', substanceOption.value, checked)}
                  />
                  <Label htmlFor={`substance-${substanceOption.value}`} className="font-normal">
                    {substanceOption.label}
                  </Label>
                </div>
              ))}
               <div className="flex items-center space-x-2">
                   <Checkbox
                    id="substance-other"
                    // Logic needed here if 'Other' needs specific handling
                    // checked={...}
                    // onCheckedChange={...}
                  />
                   <Label htmlFor="substance-other" className="font-normal">Other</Label>
               </div>
            </div>
             {/* Add Input for 'Other' if needed */}
          </div>

          {/* Detailed Questions for Each Checked Substance */}
          {substance.usedSubstancesPastYear.length > 0 && (
            <div className="space-y-6 border-t pt-6 mt-6">
              <h3 className="text-lg font-medium">Substance Use Details</h3>
              {substance.usedSubstancesPastYear.map((substanceName: string) => {
                 // Find the corresponding detail object
                const detail = substance.substancesDetails.find(d => d.substance === substanceName);
                // If detail is somehow undefined (shouldn't happen with current logic), skip rendering
                if (!detail) return null;

                return (
                    <div key={substanceName} className="space-y-4 border p-4 rounded-md shadow-sm">
                      <h4 className="font-semibold text-md">{substanceName}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Age of First Use */}
                        <div className="space-y-1">
                          <Label htmlFor={`${substanceName}-ageFirstUse`}>Age of First Use</Label>
                          <Input
                            id={`${substanceName}-ageFirstUse`}
                            name={`${substanceName}-ageFirstUse`} // Use unique name if needed, but handler uses substanceName/field
                            value={detail.ageFirstUse}
                            onChange={(e) => handleSubstanceDetailChange(substanceName, 'ageFirstUse', e.target.value)}
                            placeholder="e.g., 16"
                            type="number"
                          />
                        </div>

                        {/* Last Use Date */}
                        <div className="space-y-1">
                          <Label htmlFor={`${substanceName}-lastUseDate`}>Last Use Date</Label>
                          <Input
                            id={`${substanceName}-lastUseDate`}
                            name={`${substanceName}-lastUseDate`}
                            value={detail.lastUseDate}
                            onChange={(e) => handleSubstanceDetailChange(substanceName, 'lastUseDate', e.target.value)}
                            placeholder="e.g., MM/DD/YYYY or 'Yesterday'"
                            type="text" // Consider type="date" if strict format needed
                          />
                        </div>

                        {/* Frequency */}
                        <div className="space-y-1">
                          <Label htmlFor={`${substanceName}-frequency`}>Frequency</Label>
                          <Input // Consider Select component if options are predefined
                            id={`${substanceName}-frequency`}
                            name={`${substanceName}-frequency`}
                            value={detail.frequency}
                            onChange={(e) => handleSubstanceDetailChange(substanceName, 'frequency', e.target.value)}
                            placeholder="e.g., Daily, 3x/week, Weekends"
                          />
                        </div>

                        {/* Method/Route */}
                         <div className="space-y-1">
                           <Label htmlFor={`${substanceName}-method`}>Method/Route</Label>
                           <Input // Consider Select
                             id={`${substanceName}-method`}
                             name={`${substanceName}-method`}
                             value={detail.method}
                             onChange={(e) => handleSubstanceDetailChange(substanceName, 'method', e.target.value)}
                             placeholder="e.g., Smoked, Injected, Oral"
                           />
                         </div>

                        {/* Amount */}
                        <div className="space-y-1">
                           <Label htmlFor={`${substanceName}-amount`}>Amount (per use)</Label>
                           <Input
                             id={`${substanceName}-amount`}
                             name={`${substanceName}-amount`}
                             value={detail.amount}
                             onChange={(e) => handleSubstanceDetailChange(substanceName, 'amount', e.target.value)}
                             placeholder="e.g., 1 gram, 6-pack, 1 pint"
                           />
                         </div>

                        {/* Longest Period of Abstinence */}
                        <div className="space-y-1">
                          <Label htmlFor={`${substanceName}-longestAbstinence`}>Longest Period of Abstinence</Label>
                          <Input
                            id={`${substanceName}-longestAbstinence`}
                            name={`${substanceName}-longestAbstinence`}
                            value={detail.longestAbstinence}
                            onChange={(e) => handleSubstanceDetailChange(substanceName, 'longestAbstinence', e.target.value)}
                            placeholder="e.g., 6 months, 2 years"
                          />
                        </div>

                        {/* Previous Treatment for this substance */}
                        <div className="space-y-1 md:col-span-2">
                           <Label>Received previous treatment specifically for {substanceName}?</Label>
                            <RadioGroup
                                name={`${substanceName}-previousTreatment`} // Unique name per substance
                                value={detail.previousTreatment}
                                onValueChange={(value) => handleSubstanceDetailChange(substanceName, 'previousTreatment', value)}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Yes" id={`${substanceName}-prevTreatYes`} />
                                    <Label htmlFor={`${substanceName}-prevTreatYes`}>Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="No" id={`${substanceName}-prevTreatNo`} />
                                    <Label htmlFor={`${substanceName}-prevTreatNo`}>No</Label>
                                </div>
                           </RadioGroup>
                        </div>

                        {/* Treatment Type (Conditional) */}
                        {detail.previousTreatment === 'Yes' && (
                            <div className="space-y-1 md:col-span-2">
                                <Label htmlFor={`${substanceName}-treatmentType`}>If Yes, type of treatment?</Label>
                                <Input
                                    id={`${substanceName}-treatmentType`}
                                    name={`${substanceName}-treatmentType`}
                                    value={detail.treatmentType || ''}
                                    onChange={(e) => handleSubstanceDetailChange(substanceName, 'treatmentType', e.target.value)}
                                    placeholder="e.g., Inpatient, Outpatient, Detox"
                                />
                            </div>
                        )}
                      </div>
                    </div>
                  );
              })}
            </div>
          )}


          {/* Overall Treatment History */}
          <div className="space-y-2 border-t pt-6 mt-6">
            <Label>Have you ever received treatment for substance use (e.g., detox, rehab, outpatient)?</Label>
            <RadioGroup
              name="everReceivedTreatment"
              value={substance.everReceivedTreatment}
              onValueChange={(value) => handleRadioChange('everReceivedTreatment', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="treatHistYes" />
                <Label htmlFor="treatHistYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="treatHistNo" />
                <Label htmlFor="treatHistNo">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Treatment History Details (Conditional) */}
          {substance.everReceivedTreatment === 'Yes' && (
             <div className="space-y-4 border p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-md">Treatment History Details</h4>
                 {/* Needs logic to add/remove/edit treatment entries */}
                 {/* Placeholder for now */}
                 <p className="text-sm text-muted-foreground">
                    [Dynamic fields for Treatment Type, Facility Name, Dates, Completed will go here]
                 </p>
             </div>
          )}


          {/* Readiness to Change */}
          <div className="space-y-2 border-t pt-6 mt-6">
            <Label htmlFor="readinessToChange">
              On a scale of 1 to 10, how ready are you to make changes to your substance use?
              <br /> (1 = Not ready at all, 10 = Extremely ready)
            </Label>
            <Input // Consider using a Slider component here
              id="readinessToChange"
              name="readinessToChange"
              type="number"
              min="1"
              max="10"
              value={substance.readinessToChange}
              onChange={(e) => handleChange('readinessToChange', e.target.value)}
              className="w-24"
            />
          </div>

          {/* Additional Comments */}
          <div className="space-y-2 border-t pt-6 mt-6">
            <Label htmlFor="additionalComments">Additional comments about your substance use history:</Label>
            <Textarea
              id="additionalComments"
              name="additionalComments"
              value={substance.additionalComments || ''}
              onChange={(e) => handleChange('additionalComments', e.target.value)}
              placeholder="Any other relevant information..."
              rows={4}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} disabled={!onBack}>
              Back
            </Button>
            <Button onClick={onNext} disabled={!onNext}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};