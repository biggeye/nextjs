// components/patient/DynamicIntakeLoader.tsx
"use client"; // Mark this as a Client Component

import dynamic from 'next/dynamic';

// Define props for the loader
interface DynamicIntakeLoaderProps {
  patientId?: string; // Accept patientId (optional based on usage)
}

// Dynamically import the wrapper component, disabling SSR
const PatientIntakeFlowClient = dynamic(
  () => import("@/components/patient/PatientIntakeFlowWrapper").then(mod => mod.PatientIntakeFlowWrapper),
  { ssr: false }
);

// This component now accepts props and passes them down
export function DynamicIntakeLoader({ patientId }: DynamicIntakeLoaderProps) {
  // Pass the patientId prop to the client component
  return <PatientIntakeFlowClient patientId={patientId} />;
}
