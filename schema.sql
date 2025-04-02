-- Create patient_assessments table
CREATE TABLE IF NOT EXISTS patient_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id TEXT NOT NULL,
  assessment_data JSONB NOT NULL,
  last_completed_step INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on patient_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_patient_assessments_patient_id ON patient_assessments(patient_id);

-- Add row level security policies
ALTER TABLE patient_assessments ENABLE ROW LEVEL SECURITY;

-- Policy to allow patients to view only their own assessments
CREATE POLICY patient_select_own_assessments ON patient_assessments
  FOR SELECT
  USING (auth.uid()::text = patient_id);

-- Policy to allow patients to insert their own assessments
CREATE POLICY patient_insert_own_assessments ON patient_assessments
  FOR INSERT
  WITH CHECK (auth.uid()::text = patient_id);

-- Policy to allow patients to update only their own assessments
CREATE POLICY patient_update_own_assessments ON patient_assessments
  FOR UPDATE
  USING (auth.uid()::text = patient_id);

-- Policy to allow patients to delete only their own assessments
CREATE POLICY patient_delete_own_assessments ON patient_assessments
  FOR DELETE
  USING (auth.uid()::text = patient_id);

