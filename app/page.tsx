"use client"; // Required for using hooks like useState

import { useState } from "react"; // Import useState
import { PatientIntakeFlow } from "@/components/patient/PatientIntakeFlow"
// Make sure the import path matches if you kept the original filename
// If you renamed the file, use the new filename:
// import { EmailCaptureForm } from "@/components/EmailCaptureForm"; 
import { EmailCaptureForm } from "@/components/email-capture-form"; // Import the (renamed) component

export default function HomePage() {
  const [patientEmail, setPatientEmail] = useState<string | null>(null); // State to hold the submitted email
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading indication

  // This function will be passed to EmailCaptureForm and called on submit
  const handleEmailSubmit = (email: string) => {
    setIsLoading(true); 
    // You could add checks here (e.g., see if email already exists)
    // For now, just simulate a slight delay
    setTimeout(() => { 
      setPatientEmail(email); // Update state with the email
      setIsLoading(false);
    }, 300); // Short delay
  };

  return (
    <div className="min-h-screen bg-background"> 
      {!patientEmail ? (
        // If no email is set yet, show the email capture form
        <EmailCaptureForm 
          onSubmitEmail={handleEmailSubmit} 
          isLoading={isLoading} 
        />
      ) : (
        // Once email is set, show the patient intake flow
        <PatientIntakeFlow
          patientId={patientEmail} // Pass the captured email here
        />
      )}
    </div>
  )
}