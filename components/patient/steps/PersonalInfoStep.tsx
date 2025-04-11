// components/patient/steps/PersonalInfoStep.tsx
"use client"

import React from 'react';
import { PatientData } from '../PatientIntakeFlow'; // Import PatientData
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types defined inline for now, consider moving to /types/steps.ts ---
// TODO: Move this type to /types/steps.ts or similar (Ref MEMORY[172bf59a])
export interface PersonalInfoData { // Defined and Exported
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface PersonalInfoStepProps { // Defined props interface
  personalInfo: PersonalInfoData; // Expect 'personalInfo' prop
  updateData: (newData: Partial<PatientData>) => void; // Expect correct updateData signature
  onNext?: () => void;
}
// --- End Types ---

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  personalInfo, // Destructure correct prop
  updateData,
  onNext,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({
      personalInfo: { // Update using the correct key
        ...personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={personalInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={personalInfo.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={personalInfo.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="zip">Zip</Label>
              <Input
                id="zip"
                name="zip"
                value={personalInfo.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={personalInfo.emergencyContact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                value={personalInfo.emergencyPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-6">
        <Button onClick={onNext} disabled={!onNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};