"use client"

import { PatientIntakeFlow } from "./PatientIntakeFlow"

interface PatientIntakeFlowWrapperProps {
  patientId?: string;
}

export function PatientIntakeFlowWrapper({ patientId }: PatientIntakeFlowWrapperProps) {
  return <PatientIntakeFlow patientId={patientId} />
}
