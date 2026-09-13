import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { labelFor, leadStatusLabels, leadStatusValues, type LeadStatus } from '@/lib/leads/schema';
import type { LeadRecord } from '@/lib/leads/types';
import { requireAdminUser } from '@/lib/supabase/auth';
import { cn, formatDateTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type LeadRow = Pick<
  LeadRecord,
  | 'id'
  | 'created_at'
  | 'company'
  | 'contact_name'
  | 'service'
  | 'area_size'
  | 'frequency'
  | 'status'
>;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { supabase, user } = await requireAdminUser();
  const { status } = await searchParams;
  const filter = leadStatusValues.includes(status as LeadStatus) ? (status as LeadStatus) : null;

  let query = supabase
    .from('leads')
    .select('id, created_at, company, contact_name, service, area_size, frequency, status')
    .order('created_at', { ascending: false })
    .limit(200);
  if (filter) query = query.eq('status', filter);

  const { data, error } = await query.returns<LeadRow[]>();
  const leads = data ?? [];

  return (
    <AdminShell email={user.email ?? ''}>
      <div className="mb-4 flex flex-wrap gap-2">
        <FilterChip href="/admin" active={!filter}>
          Alle
        </FilterChip>
        {leadStatusValues.map((value) => (
          <FilterChip key={value} href={`/admin?status=${value}`} active={filter === value}>
            {leadStatusLabels[value]}
          </FilterChip>
        ))}
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-2xl border border-danger-500/20 bg-danger-50 p-4 text-sm text-danger-600"
        >
          Leads konnten nicht geladen werden. Ist Ihr Nutzer in <code>admin_users</code>{' '}
          eingetragen?
        </p>
      ) : leads.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-8 text-center text-sm text-muted">
          Keine Anfragen vorhanden.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="bg-surface text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Datum</th>
                <th className="px-4 py-3 font-semibold">Firma</th>
                <th className="px-4 py-3 font-semibold">Kontakt</th>
                <th className="px-4 py-3 font-semibold">Leistung</th>
                <th className="px-4 py-3 font-semibold">Fläche</th>
                <th className="px-4 py-3 font-semibold">Frequenz</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface/60">
                  <td className="px-4 py-3 whitespace-nowrap text-muted">
                    {formatDateTime(lead.created_at)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-950">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:text-brand-600">
                      {lead.company}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{lead.contact_name}</td>
                  <td className="px-4 py-3">{labelFor.service(lead.service)}</td>
                  <td className="px-4 py-3">{labelFor.area(lead.area_size)}</td>
                  <td className="px-4 py-3">{labelFor.frequency(lead.frequency)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-9 items-center rounded-full px-3.5 text-sm font-semibold ring-1 transition-colors ring-inset',
        active
          ? 'bg-navy-950 text-white ring-navy-950'
          : 'bg-white text-navy-800 ring-line hover:bg-surface',
      )}
    >
      {children}
    </Link>
  );
}
