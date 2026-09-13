import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseAdminConfigured, supabaseEnv } from './env';

let cached: SupabaseClient | null = null;

/**
 * Supabase-Client mit Service-Role-Key. AUSSCHLIESSLICH serverseitig verwenden
 * (Lead-Insert). Umgeht RLS – niemals in Client-Komponenten importieren.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseAdminConfigured()) return null;
  if (cached) return cached;
  cached = createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
