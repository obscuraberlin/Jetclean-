/** Zentrale Prüfung der Supabase-Umgebungsvariablen (keine Werte loggen!). */
export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
};

export const isSupabaseConfigured = () =>
  supabaseEnv.url.length > 0 && supabaseEnv.anonKey.length > 0;

export const isSupabaseAdminConfigured = () =>
  supabaseEnv.url.length > 0 && supabaseEnv.serviceRoleKey.length > 0;
