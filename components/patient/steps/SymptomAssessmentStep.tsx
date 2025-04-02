"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"

interface Symptom {
  symptom: string
  severity: number
  duration: string
}

interface Symptoms {
  currentSymptoms: Symptom[]
  painLevel: number
  painLocations: string[]
  additionalNotes: string
}

interface SymptomAssessmentStepProps {
  data: Symptoms
  updateData: (data: Partial<Symptoms>) => void
}

export function SymptomAssessmentStep({ data, updateData }: SymptomAssessmentStepProps) {
  const [formState, setFormState] = useState<Symptoms>(data)
  const [newSymptom, setNewSymptom] = useState({ symptom: "", severity: 5, duration: "" })

  // Common body locations for pain
  const bodyLocations = [
    "Head",
    "Neck",
    "Shoulder - Left",
    "Shoulder - Right",
    "Arm - Left",
    "Arm - Right",
    "Elbow - Left",
    "Elbow - Right",
    "Wrist - Left",
    "Wrist - Right",
    "Hand - Left",
    "Hand - Right",
    "Chest",
    "Upper Back",
    "Lower Back",
    "Abdomen",
    "Hip - Left",
    "Hip - Right",
    "Leg - Left",
    "Leg - Right",
    "Knee - Left",
    "Knee - Right",
    "Ankle - Left",
    "Ankle - Right",
    "Foot - Left",
    "Foot - Right",
  ]

  // Update local state when data prop changes
  useEffect(() => {
    setFormState(data)
  }, [data])

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setFormState((prev) => ({ ...prev, additionalNotes: value }))
    updateData({ additionalNotes: value })
  }

  const handlePainLevelChange = (value: number[]) => {
    const painLevel = value[0]
    setFormState((prev) => ({ ...prev, painLevel }))
    updateData({ painLevel })
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    let updatedLocations

    if (checked) {
      updatedLocations = [...formState.painLocations, location]
    } else {
      updatedLocations = formState.painLocations.filter((loc) => loc !== location)
    }

    setFormState((prev) => ({ ...prev, painLocations: updatedLocations }))
    updateData({ painLocations: updatedLocations })
  }

  const handleNewSymptomChange = (field: keyof Symptom, value: string | number) => {
    setNewSymptom((prev) => ({ ...prev, [field]: value }))
  }

  const addSymptom = () => {
    if (!newSymptom.symptom.trim() || !newSymptom.duration.trim()) return

    const updatedSymptoms = [...formState.currentSymptoms, { ...newSymptom }]
    setFormState((prev) => ({ ...prev, currentSymptoms: updatedSymptoms }))
    updateData({ currentSymptoms: updatedSymptoms })
    setNewSymptom({ symptom: "", severity: 5, duration: "" })
  }

  const removeSymptom = (index: number) => {
    const updatedSymptoms = formState.currentSymptoms.filter((_, i) => i !== index)
    setFormState((prev) => ({ ...prev, currentSymptoms: updatedSymptoms }))
    updateData({ currentSymptoms: updatedSymptoms })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Symptom Assessment</h2>
        <p className="text-muted-foreground mb-6">
          Please describe your current symptoms and pain levels to help us understand your condition.
        </p>
      </div>

      {/* Current Symptoms */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Current Symptoms</Label>
        <p className="text-sm text-muted-foreground">List any symptoms you are currently experiencing.</p>

        <div className="space-y-4 p-4 border rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="symptom">Symptom</Label>
              <Input
                id="symptom"
                value={newSymptom.symptom}
                onChange={(e) => handleNewSymptomChange("symptom", e.target.value)}
                placeholder="e.g., Headache, Cough"
              />
            </div>

            <div>
              <Label htmlFor="severity">Severity (1-10)</Label>
              <div className="pt-2">
                <Slider
                  id="severity"
                  min={1}
                  max={10}
                  step={1}
                  value={[newSymptom.severity]}
                  onValueChange={(value) => handleNewSymptomChange("severity", value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newSymptom.duration}
                onChange={(e) => handleNewSymptomChange("duration", e.target.value)}
                placeholder="e.g., 2 days, 1 week"
              />
            </div>
          </div>

          <Button type="button" onClick={addSymptom} className="mt-2">
            <Plus className="h-4 w-4 mr-1" /> Add Symptom
          </Button>
        </div>

        <div className="space-y-2">
          {formState.currentSymptoms.length > 0 ? (
            formState.currentSymptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <span className="font-medium">Symptom:</span> {symptom.symptom}
                  </div>
                  <div>
                    <span className="font-medium">Severity:</span> {symptom.severity}/10
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {symptom.duration}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeSymptom(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No symptoms added</p>
          )}
        </div>
      </div>

      {/* Pain Level */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Overall Pain Level</Label>
        <p className="text-sm text-muted-foreground">
          Rate your overall pain level on a scale from 1 (minimal) to 10 (severe).
        </p>

        <div className="py-4">
          <Slider min={0} max={10} step={1} value={[formState.painLevel]} onValueChange={handlePainLevelChange} />
          <div className="flex justify-between text-sm mt-2">
            <span>0 - No Pain</span>
            <span>5 - Moderate</span>
            <span>10 - Severe</span>
          </div>
          <div className="text-center mt-4">
            <span className="text-lg font-medium">Current pain level: {formState.painLevel}/10</span>
          </div>
        </div>
      </div>

      {/* Pain Locations */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Pain Locations</Label>
        <p className="text-sm text-muted-foreground">Select all areas where you are experiencing pain.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {bodyLocations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={formState.painLocations.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
              />
              <Label htmlFor={`location-${location}`} className="text-sm font-normal">
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <Label htmlFor="additionalNotes" className="text-lg font-medium">
          Additional Notes
        </Label>
        <p className="text-sm text-muted-foreground">
          Please provide any additional information about your symptoms or concerns.
        </p>

        <Textarea
          id="additionalNotes"
          value={formState.additionalNotes}
          onChange={handleNotesChange}
          placeholder="Describe any other symptoms or concerns not covered above..."
          rows={4}
        />
      </div>
    </div>
  )
}

