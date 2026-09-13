import type { LeadStatus } from './schema';

/** Datensatz, wie er in der Tabelle `leads` gespeichert wird. */
export type LeadRecord = {
  id: string;
  created_at: string;
  status: LeadStatus;
  service: string;
  area_size: string;
  frequency: string;
  postal_code: string;
  district: string | null;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string | null;
  referrer: string | null;
  user_agent: string | null;
  consent_privacy: boolean;
};

export type NewLead = Omit<LeadRecord, 'id' | 'created_at' | 'status'>;
