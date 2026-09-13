import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { isSupabaseConfigured, supabaseEnv } from './env';

/**
 * Supabase-Client für Server Components, Server Actions und Route Handler mit
 * Cookie-basierter Session (Admin-Bereich). Unterliegt RLS.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // In Server Components darf nicht geschrieben werden – die Session wird
          // dann in proxy.ts (Request-Ebene) aktualisiert.
        }
      },
    },
  });
}
