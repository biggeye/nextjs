"use server";

import { createServer } from '../../utils/supabase/server'; // Import the correct function
import { PatientData } from '@/types/patient'; // Adjust path if needed
import { revalidatePath } from 'next/cache';

export async function submitIntake(intakeData: PatientData, patientId?: string) {
  const supabase = await createServer(); // Await the async function call

  // Optional: Prepare data if linking to a specific patient
  // const dataToInsert = {
  //   intake_data: intakeData,
  //   patient_uuid: patientId // Assuming patientId is the Supabase auth user ID
  // }; 
  // Use this if you uncomment the patient_uuid column

  const dataToInsert = {
    intake_data: intakeData,
    // Add patient_uuid or patient_id here if you added the column to the table
  };

  try {
    const { data, error } = await supabase
      .from('patient_intakes') // Ensure this matches your table name
      .insert([dataToInsert])
      .select(); // '.select()' returns the inserted data (optional)

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`Failed to submit intake: ${error.message}`);
    }

    console.log('Intake submitted successfully:', data);

    // Optional: Revalidate paths if the submission should update other pages
    // revalidatePath('/'); 
    // revalidatePath('/dashboard/intakes');

    return { success: true, data };
  } catch (err) {
    console.error('Error in submitIntake action:', err);
    // Return a serializable error object for the client
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'An unknown error occurred' 
    };
  }
}
