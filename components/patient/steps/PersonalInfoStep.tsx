"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  emergencyContact: string
  emergencyPhone: string
}

interface PersonalInfoStepProps {
  data: PersonalInfo
  updateData: (data: Partial<PersonalInfo>) => void
}

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const [formState, setFormState] = useState<PersonalInfo>(data)

  // Update local state when data prop changes
  useEffect(() => {
    setFormState(data)
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    updateData({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Please provide your basic personal information. This helps us identify you and contact you if needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formState.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formState.address} onChange={handleChange} rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            value={formState.emergencyContact}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
          <Input
            id="emergencyPhone"
            name="emergencyPhone"
            type="tel"
            value={formState.emergencyPhone}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

