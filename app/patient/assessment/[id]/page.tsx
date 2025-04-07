import { Suspense } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { PatientIntakeFlow } from "@/components/patient/PatientIntakeFlow"

interface PatientAssessmentPageProps {
  params: {
    id: string
  }
}

export default function PatientAssessmentPage({ params }: PatientAssessmentPageProps) {
  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            Supabase environment variables are not properly configured. Please check your environment setup.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<AssessmentLoading />}>
        <PatientIntakeFlow
          patientId="patient_123" // This would typically come from authentication
        />
      </Suspense>
    </div>
  )
}

function AssessmentLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="h-2 w-full bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="space-y-6">
          <div className="h-40 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-40 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="h-40 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

