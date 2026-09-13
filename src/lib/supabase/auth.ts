import 'server-only';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

/** Liefert den eingeloggten Nutzer oder leitet zum Login um. */
export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin/login?reason=not-configured');
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return { supabase, user };
}
