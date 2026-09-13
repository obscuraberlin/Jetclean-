'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { leadStatusValues } from '@/lib/leads/schema';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type LoginState = { error?: string };

const loginSchema = z.object({
  email: z.string().trim().email('Bitte eine gültige E-Mail-Adresse eingeben.'),
  password: z.string().min(8, 'Bitte Ihr Passwort eingeben.'),
});

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Ungültige Eingabe.' };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Supabase ist nicht konfiguriert.' };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: 'Anmeldung fehlgeschlagen. Bitte prüfen Sie E-Mail und Passwort.' };

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(leadStatusValues),
});

export type StatusState = { error?: string; ok?: boolean };

export async function updateLeadStatusAction(
  _previous: StatusState,
  formData: FormData,
): Promise<StatusState> {
  const parsed = statusSchema.safeParse({ id: formData.get('id'), status: formData.get('status') });
  if (!parsed.success) return { error: 'Ungültige Eingabe.' };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: 'Supabase ist nicht konfiguriert.' };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Nicht angemeldet.' };

  // RLS stellt sicher, dass nur Admins aktualisieren dürfen.
  const { error } = await supabase
    .from('leads')
    .update({ status: parsed.data.status })
    .eq('id', parsed.data.id);
  if (error) return { error: 'Status konnte nicht gespeichert werden.' };

  revalidatePath('/admin');
  revalidatePath(`/admin/leads/${parsed.data.id}`);
  return { ok: true };
}
