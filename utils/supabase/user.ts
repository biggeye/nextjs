'use client';

import { createClient } from '@/utils/supabase/client';

/**
 * Gets the current user ID from Supabase auth
 * @returns The user ID or 'anonymous' if no user is logged in
 */
export async function getCurrentUserId(): Promise<string> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data?.user?.id || 'anonymous';
}
