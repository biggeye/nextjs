import { Suspense } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { DynamicIntakeLoader } from "@/components/patient/DynamicIntakeLoader"

interface PatientAssessmentPageProps {
  params: {
    id: string
  }
}

function AssessmentLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Loading assessment...</p>
    </div>
  )
}

export default async function PatientAssessmentPage({ params }: PatientAssessmentPageProps) {
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
        <DynamicIntakeLoader patientId={params.id} />
      </Suspense>
    </div>
  )
}
