import { leadStatusLabels, type LeadStatus } from '@/lib/leads/schema';
import { cn } from '@/lib/utils';

const tones: Record<LeadStatus, string> = {
  new: 'bg-brand-50 text-brand-700 ring-brand-100',
  contacted: 'bg-navy-50 text-navy-700 ring-navy-100',
  qualified: 'bg-success-50 text-success-700 ring-success-100',
  won: 'bg-success-100 text-success-700 ring-success-100',
  lost: 'bg-surface-strong text-muted ring-line',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        tones[status],
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
}
