import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { logoutAction } from '@/lib/admin/actions';
import { LogoMark } from '@/components/brand/Logo';

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="container-site py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" className="flex items-center gap-3">
          <LogoMark className="size-9" />
          <span className="font-display text-lg font-bold text-navy-950">Lead-Verwaltung</span>
        </Link>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="hidden sm:inline">{email}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-white px-3 text-sm font-semibold text-navy-900 hover:border-navy-300"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Abmelden
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
