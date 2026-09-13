'use client';

import { Check, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { updateLeadStatusAction, type StatusState } from '@/lib/admin/actions';
import { leadStatusLabels, leadStatusValues, type LeadStatus } from '@/lib/leads/schema';
import { Button } from '@/components/ui/Button';

export function StatusForm({ id, status }: { id: string; status: LeadStatus }) {
  const [state, action, pending] = useActionState<StatusState, FormData>(
    updateLeadStatusAction,
    {},
  );
  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="id" value={id} />
      <div className="space-y-1.5">
        <label htmlFor="status" className="text-sm font-semibold text-navy-800">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="block h-11 rounded-xl border border-line-strong bg-white px-3 text-sm text-navy-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none"
        >
          {leadStatusValues.map((value) => (
            <option key={value} value={value}>
              {leadStatusLabels[value]}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" size="sm" disabled={pending} aria-busy={pending} className="h-11">
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Check className="size-4" aria-hidden="true" />
        )}
        Speichern
      </Button>
      {state.ok ? <p className="text-sm text-success-600">Gespeichert.</p> : null}
      {state.error ? (
        <p role="alert" className="text-sm text-danger-600">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
