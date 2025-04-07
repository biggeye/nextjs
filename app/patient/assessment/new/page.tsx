//import PatientPreAssessment from "@/components/patient/PatientPreAssessment"
import { PatientIntakeFlow } from "@/components/patient/PatientIntakeFlow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50">
      <PatientIntakeFlow
        patientId="patient_123" // This would typically come from authentication
      />
    </div>
  )
}

