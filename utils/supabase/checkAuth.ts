import { createServer } from '@/utils/supabase/server';

const supabase = createServer();

export async function checkAuth() {
  const { data: { user }, error: authError } = await (await supabase).auth.getUser();
  const userId = user?.id;
  if (authError || !user) {
    return new Response(JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return userId; // Return null if authentication is successful
}
