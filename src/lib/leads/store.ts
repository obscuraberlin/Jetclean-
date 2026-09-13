import 'server-only';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import type { LeadRecord, NewLead } from './types';

export type SaveResult =
  { ok: true; id: string } | { ok: false; reason: 'not_configured' | 'error' };

export interface LeadStore {
  readonly name: string;
  save(lead: NewLead): Promise<SaveResult>;
}

/** Produktiver Store: Supabase/PostgreSQL über Service-Role (serverseitig). */
class SupabaseLeadStore implements LeadStore {
  readonly name = 'supabase';

  async save(lead: NewLead): Promise<SaveResult> {
    const client = getSupabaseAdminClient();
    if (!client) return { ok: false, reason: 'not_configured' };

    const { data, error } = await client
      .from('leads')
      .insert({ ...lead, status: 'new' })
      .select('id')
      .single<Pick<LeadRecord, 'id'>>();

    if (error || !data) {
      console.error('[leads] Supabase insert failed:', error?.code ?? 'unknown');
      return { ok: false, reason: 'error' };
    }
    return { ok: true, id: data.id };
  }
}

/**
 * Entwicklungs-Store: schreibt Leads als JSON-Lines in `.data/leads.jsonl`
 * (gitignored). Nur aktiv, wenn Supabase nicht konfiguriert ist und NODE_ENV !== production.
 */
class FileLeadStore implements LeadStore {
  readonly name = 'file';

  async save(lead: NewLead): Promise<SaveResult> {
    const { mkdir, appendFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const dir = join(process.cwd(), '.data');
    const id = crypto.randomUUID();
    const record: LeadRecord = {
      ...lead,
      id,
      created_at: new Date().toISOString(),
      status: 'new',
    };
    try {
      await mkdir(dir, { recursive: true });
      await appendFile(join(dir, 'leads.jsonl'), JSON.stringify(record) + '\n', 'utf8');
      console.info(
        `[leads] Supabase nicht konfiguriert – Lead lokal gespeichert (.data/leads.jsonl): ${id}`,
      );
      return { ok: true, id };
    } catch (error) {
      console.error('[leads] File store failed:', error instanceof Error ? error.message : error);
      return { ok: false, reason: 'error' };
    }
  }
}

/** Store, wenn in Produktion keine Datenbank konfiguriert ist. */
class UnconfiguredLeadStore implements LeadStore {
  readonly name = 'unconfigured';

  async save(): Promise<SaveResult> {
    console.error('[leads] Kein Lead-Store konfiguriert (SUPABASE_SERVICE_ROLE_KEY fehlt).');
    return { ok: false, reason: 'not_configured' };
  }
}

/**
 * Auswahl des Stores:
 *  1. Supabase, sobald der Service-Role-Key gesetzt ist.
 *  2. Datei-Store in der Entwicklung oder wenn `LEAD_STORE=file` explizit gesetzt ist (z. B. E2E-Tests).
 *  3. Andernfalls (Produktion ohne Konfiguration) ein sauberer Fehler statt stiller Datenverluste.
 */
export function getLeadStore(): LeadStore {
  if (getSupabaseAdminClient()) return new SupabaseLeadStore();
  if (process.env.NODE_ENV !== 'production' || process.env.LEAD_STORE === 'file')
    return new FileLeadStore();
  return new UnconfiguredLeadStore();
}
