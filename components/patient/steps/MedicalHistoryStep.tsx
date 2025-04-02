"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface MedicalHistory {
  previousConditions: string[]
  surgeries: string[]
  allergies: string[]
  familyHistory: string[]
}

interface MedicalHistoryStepProps {
  data: MedicalHistory
  updateData: (data: Partial<MedicalHistory>) => void
}

export function MedicalHistoryStep({ data, updateData }: MedicalHistoryStepProps) {
  const [formState, setFormState] = useState<MedicalHistory>(data)
  const [newCondition, setNewCondition] = useState("")
  const [newSurgery, setNewSurgery] = useState("")
  const [newAllergy, setNewAllergy] = useState("")
  const [newFamilyHistory, setNewFamilyHistory] = useState("")

  // Update local state when data prop changes
  useEffect(() => {
    setFormState(data)
  }, [data])

  const addItem = (
    field: keyof MedicalHistory,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (!value.trim()) return

    const updatedList = [...formState[field], value.trim()]
    const update = { [field]: updatedList }

    setFormState((prev) => ({ ...prev, ...update }))
    updateData(update)
    setter("")
  }

  const removeItem = (field: keyof MedicalHistory, index: number) => {
    const updatedList = formState[field].filter((_, i) => i !== index)
    const update = { [field]: updatedList }

    setFormState((prev) => ({ ...prev, ...update }))
    updateData(update)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Medical History</h2>
        <p className="text-muted-foreground mb-6">
          Please provide information about your medical history. This helps us understand your health background.
        </p>
      </div>

      {/* Previous Medical Conditions */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Previous Medical Conditions</Label>
        <p className="text-sm text-muted-foreground">
          List any diagnosed medical conditions you have or have had in the past.
        </p>

        <div className="flex gap-2">
          <Input
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            placeholder="Add a medical condition"
            className="flex-1"
          />
          <Button type="button" onClick={() => addItem("previousConditions", newCondition, setNewCondition)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {formState.previousConditions.length > 0 ? (
            formState.previousConditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{condition}</span>
                <Button variant="ghost" size="sm" onClick={() => removeItem("previousConditions", index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No conditions added</p>
          )}
        </div>
      </div>

      {/* Surgeries */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Previous Surgeries</Label>
        <p className="text-sm text-muted-foreground">List any surgeries you have had, including the year if known.</p>

        <div className="flex gap-2">
          <Input
            value={newSurgery}
            onChange={(e) => setNewSurgery(e.target.value)}
            placeholder="Add a surgery (e.g., Appendectomy 2018)"
            className="flex-1"
          />
          <Button type="button" onClick={() => addItem("surgeries", newSurgery, setNewSurgery)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {formState.surgeries.length > 0 ? (
            formState.surgeries.map((surgery, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{surgery}</span>
                <Button variant="ghost" size="sm" onClick={() => removeItem("surgeries", index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No surgeries added</p>
          )}
        </div>
      </div>

      {/* Allergies */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Allergies</Label>
        <p className="text-sm text-muted-foreground">
          List any allergies you have, including medications, foods, or environmental factors.
        </p>

        <div className="flex gap-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Add an allergy (e.g., Penicillin, Peanuts)"
            className="flex-1"
          />
          <Button type="button" onClick={() => addItem("allergies", newAllergy, setNewAllergy)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {formState.allergies.length > 0 ? (
            formState.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{allergy}</span>
                <Button variant="ghost" size="sm" onClick={() => removeItem("allergies", index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No allergies added</p>
          )}
        </div>
      </div>

      {/* Family History */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Family Medical History</Label>
        <p className="text-sm text-muted-foreground">
          List any significant medical conditions that run in your family.
        </p>

        <div className="flex gap-2">
          <Input
            value={newFamilyHistory}
            onChange={(e) => setNewFamilyHistory(e.target.value)}
            placeholder="Add family history (e.g., Heart disease - father)"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => addItem("familyHistory", newFamilyHistory, setNewFamilyHistory)}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {formState.familyHistory.length > 0 ? (
            formState.familyHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <span>{item}</span>
                <Button variant="ghost" size="sm" onClick={() => removeItem("familyHistory", index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No family history added</p>
          )}
        </div>
      </div>
    </div>
  )
}

