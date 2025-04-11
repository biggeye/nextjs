//import PatientPreAssessment from "@/components/patient/PatientPreAssessment"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
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
