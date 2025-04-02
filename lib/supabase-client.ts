import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create the client if both URL and key are available
let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// Export a function that safely gets the client
export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.")
  }
  return supabase
}

// For backward compatibility
export { supabase }

