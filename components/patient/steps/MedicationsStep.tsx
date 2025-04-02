"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface Medication {
  name: string
  dosage: string
  frequency: string
}

interface Supplement {
  name: string
  dosage: string
}

interface Medications {
  currentMedications: Medication[]
  supplements: Supplement[]
}

interface MedicationsStepProps {
  data: Medications
  updateData: (data: Partial<Medications>) => void
}

export function MedicationsStep({ data, updateData }: MedicationsStepProps) {
  const [formState, setFormState] = useState<Medications>(data)
  const [newMedication, setNewMedication] = useState<Medication>({ name: "", dosage: "", frequency: "" })
  const [newSupplement, setNewSupplement] = useState<Supplement>({ name: "", dosage: "" })

  // Update local state when data prop changes
  useEffect(() => {
    setFormState(data)
  }, [data])

  const handleMedicationChange = (field: keyof Medication, value: string) => {
    setNewMedication((prev) => ({ ...prev, [field]: value }))
  }

  const handleSupplementChange = (field: keyof Supplement, value: string) => {
    setNewSupplement((prev) => ({ ...prev, [field]: value }))
  }

  const addMedication = () => {
    if (!newMedication.name.trim()) return

    const updatedMedications = [...formState.currentMedications, { ...newMedication }]
    setFormState((prev) => ({ ...prev, currentMedications: updatedMedications }))
    updateData({ currentMedications: updatedMedications })
    setNewMedication({ name: "", dosage: "", frequency: "" })
  }

  const removeMedication = (index: number) => {
    const updatedMedications = formState.currentMedications.filter((_, i) => i !== index)
    setFormState((prev) => ({ ...prev, currentMedications: updatedMedications }))
    updateData({ currentMedications: updatedMedications })
  }

  const addSupplement = () => {
    if (!newSupplement.name.trim()) return

    const updatedSupplements = [...formState.supplements, { ...newSupplement }]
    setFormState((prev) => ({ ...prev, supplements: updatedSupplements }))
    updateData({ supplements: updatedSupplements })
    setNewSupplement({ name: "", dosage: "" })
  }

  const removeSupplement = (index: number) => {
    const updatedSupplements = formState.supplements.filter((_, i) => i !== index)
    setFormState((prev) => ({ ...prev, supplements: updatedSupplements }))
    updateData({ supplements: updatedSupplements })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Medications & Supplements</h2>
        <p className="text-muted-foreground mb-6">
          Please list all medications and supplements you are currently taking.
        </p>
      </div>

      {/* Current Medications */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Current Medications</Label>
        <p className="text-sm text-muted-foreground">
          Include prescription medications, over-the-counter medications, and any other drugs.
        </p>

        <div className="space-y-4 p-4 border rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="medicationName">Medication Name</Label>
              <Input
                id="medicationName"
                value={newMedication.name}
                onChange={(e) => handleMedicationChange("name", e.target.value)}
                placeholder="e.g., Lisinopril, Ibuprofen"
              />
            </div>

            <div>
              <Label htmlFor="medicationDosage">Dosage</Label>
              <Input
                id="medicationDosage"
                value={newMedication.dosage}
                onChange={(e) => handleMedicationChange("dosage", e.target.value)}
                placeholder="e.g., 10mg, 500mg"
              />
            </div>

            <div>
              <Label htmlFor="medicationFrequency">Frequency</Label>
              <Input
                id="medicationFrequency"
                value={newMedication.frequency}
                onChange={(e) => handleMedicationChange("frequency", e.target.value)}
                placeholder="e.g., Once daily, Twice daily"
              />
            </div>
          </div>

          <Button type="button" onClick={addMedication} className="mt-2">
            <Plus className="h-4 w-4 mr-1" /> Add Medication
          </Button>
        </div>

        <div className="space-y-2">
          {formState.currentMedications.length > 0 ? (
            formState.currentMedications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <span className="font-medium">Name:</span> {medication.name}
                  </div>
                  <div>
                    <span className="font-medium">Dosage:</span> {medication.dosage}
                  </div>
                  <div>
                    <span className="font-medium">Frequency:</span> {medication.frequency}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeMedication(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No medications added</p>
          )}
        </div>
      </div>

      {/* Supplements */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">Supplements</Label>
        <p className="text-sm text-muted-foreground">
          Include vitamins, minerals, herbs, and other dietary supplements.
        </p>

        <div className="space-y-4 p-4 border rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supplementName">Supplement Name</Label>
              <Input
                id="supplementName"
                value={newSupplement.name}
                onChange={(e) => handleSupplementChange("name", e.target.value)}
                placeholder="e.g., Vitamin D, Fish Oil"
              />
            </div>

            <div>
              <Label htmlFor="supplementDosage">Dosage</Label>
              <Input
                id="supplementDosage"
                value={newSupplement.dosage}
                onChange={(e) => handleSupplementChange("dosage", e.target.value)}
                placeholder="e.g., 1000 IU, 1000mg"
              />
            </div>
          </div>

          <Button type="button" onClick={addSupplement} className="mt-2">
            <Plus className="h-4 w-4 mr-1" /> Add Supplement
          </Button>
        </div>

        <div className="space-y-2">
          {formState.supplements.length > 0 ? (
            formState.supplements.map((supplement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Name:</span> {supplement.name}
                  </div>
                  <div>
                    <span className="font-medium">Dosage:</span> {supplement.dosage}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeSupplement(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">No supplements added</p>
          )}
        </div>
      </div>
    </div>
  )
}

