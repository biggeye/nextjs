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
  updateData: (newData: Partial<PatientData>) => void;
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    substanceName?: string, // Optional: For identifying which substance detail to update
    field?: keyof SubstanceDetail // Optional: For identifying the field within substance detail
  ) => {
    const { name, value } = e.target;

    if (substanceName && field) {
      // Update nested substance detail
      const updatedDetails = substance.substancesDetails.map((detail) =>
        detail.substance === substanceName ? { ...detail, [field]: value } : detail
      );
      updateData({
        substance: {
          ...substance,
          substancesDetails: updatedDetails,
        },
      });
    } else {
      // Update top-level substance fields
      updateData({
        substance: {
          ...substance,
          [name]: value,
        },
      });
    }
  };

  // Handler for RadioGroup changes
  const handleRadioChange = (name: keyof SubstanceUseData, value: string) => {
    updateData({
      substance: {
        ...substance,
        [name]: value,
      },
    });
  };

  // Handler for Checkbox changes (specifically for usedSubstancesPastYear)
  const handleCheckboxChange = (checked: boolean | 'indeterminate', substanceValue: string) => {
    let updatedSubstances: string[];
    let updatedDetails: SubstanceDetail[];

    if (checked === true) {
      updatedSubstances = [...substance.usedSubstancesPastYear, substanceValue];
      // Add a new detail object if it doesn't exist
      if (!substance.substancesDetails.some(detail => detail.substance === substanceValue)) {
        updatedDetails = [
          ...substance.substancesDetails,
          {
            substance: substanceValue,
            ageFirstUse: '',
            lastUseDate: '',
            frequency: '',
            method: '',
            amount: '',
            longestAbstinence: '',
            previousTreatment: '',
          }
        ];
      } else {
        updatedDetails = [...substance.substancesDetails]; // No change if detail exists
      }
    } else {
      updatedSubstances = substance.usedSubstancesPastYear.filter((s) => s !== substanceValue);
      // Remove the corresponding detail object
      updatedDetails = substance.substancesDetails.filter(detail => detail.substance !== substanceValue);
    }

    updateData({
      substance: {
        ...substance,
        usedSubstancesPastYear: updatedSubstances,
        substancesDetails: updatedDetails,
      },
    });
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
                    onCheckedChange={(checked) => handleCheckboxChange(checked, substanceOption.value)}
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
                            onChange={(e) => handleChange(e, substanceName, 'ageFirstUse')}
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
                            onChange={(e) => handleChange(e, substanceName, 'lastUseDate')}
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
                            onChange={(e) => handleChange(e, substanceName, 'frequency')}
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
                             onChange={(e) => handleChange(e, substanceName, 'method')}
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
                             onChange={(e) => handleChange(e, substanceName, 'amount')}
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
                            onChange={(e) => handleChange(e, substanceName, 'longestAbstinence')}
                            placeholder="e.g., 6 months, 2 years"
                          />
                        </div>

                        {/* Previous Treatment for this substance */}
                        <div className="space-y-1 md:col-span-2">
                           <Label>Received previous treatment specifically for {substanceName}?</Label>
                            <RadioGroup
                                name={`${substanceName}-previousTreatment`} // Unique name per substance
                                value={detail.previousTreatment}
                                // Need a dedicated handler or modification to handleRadioChange
                                // For now, using handleChange but might need adjustment
                                onValueChange={(value) => updateData({
                                    substance: {
                                        ...substance,
                                        substancesDetails: substance.substancesDetails.map(d =>
                                            d.substance === substanceName ? { ...d, previousTreatment: value as 'Yes' | 'No' | '' } : d
                                        )
                                    }
                                })}
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
                                    onChange={(e) => handleChange(e, substanceName, 'treatmentType')}
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
              onChange={handleChange}
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
              onChange={handleChange}
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