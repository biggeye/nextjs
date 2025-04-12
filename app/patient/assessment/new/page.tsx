//import PatientPreAssessment from "@/components/patient/PatientPreAssessment"
import { Suspense } from "react"
import { DynamicIntakeLoader } from "@/components/patient/DynamicIntakeLoader"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading assessment...</div>}>
        <DynamicIntakeLoader patientId="patient_123" />
      </Suspense>
    </div>
  )
}
