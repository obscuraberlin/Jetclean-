import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { StatusForm } from '@/components/admin/StatusForm';
import { labelFor } from '@/lib/leads/schema';
import type { LeadRecord } from '@/lib/leads/types';
import { requireAdminUser } from '@/lib/supabase/auth';
import { formatDateTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, user } = await requireAdminUser();
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .maybeSingle<LeadRecord>();
  if (!lead) notFound();

  const rows: [string, string | null][] = [
    ['Eingegangen', formatDateTime(lead.created_at)],
    ['Leistung', labelFor.service(lead.service)],
    ['Fläche', labelFor.area(lead.area_size)],
    ['Häufigkeit', labelFor.frequency(lead.frequency)],
    ['PLZ / Stadtteil', [lead.postal_code, lead.district].filter(Boolean).join(' – ')],
    ['Firma', lead.company],
    ['Ansprechpartner', lead.contact_name],
    ['E-Mail', lead.email],
    ['Telefon', lead.phone],
    ['Nachricht', lead.message],
    ['Quelle', lead.source],
    [
      'UTM',
      [lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term]
        .filter(Boolean)
        .join(' / ') || null,
    ],
    ['Landing Page', lead.landing_page],
    ['Referrer', lead.referrer],
    ['User Agent', lead.user_agent],
  ];

  return (
    <AdminShell email={user.email ?? ''}>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-brand-600"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Zurück zur Übersicht
      </Link>
      <div className="mt-4 grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl">{lead.company}</h1>
            <StatusBadge status={lead.status} />
          </div>
          <dl className="mt-6 divide-y divide-line">
            {rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                <dt className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {label}
                </dt>
                <dd className="text-sm break-words text-navy-900">
                  {label === 'E-Mail' && value ? (
                    <a href={`mailto:${value}`} className="text-brand-600 hover:underline">
                      {value}
                    </a>
                  ) : label === 'Telefon' && value ? (
                    <a
                      href={`tel:${value.replace(/\s/g, '')}`}
                      className="text-brand-600 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    value || '–'
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft lg:col-span-4">
          <h2 className="text-lg">Status ändern</h2>
          <div className="mt-4">
            <StatusForm id={lead.id} status={lead.status} />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
