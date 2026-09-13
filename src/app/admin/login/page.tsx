import { LoginForm } from '@/components/admin/LoginForm';
import { LogoMark } from '@/components/brand/Logo';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const configured = isSupabaseConfigured();
  return (
    <section className="section-y">
      <div className="container-site max-w-md">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <div>
              <h1 className="text-xl">Admin-Login</h1>
              <p className="text-sm text-muted">Lead-Verwaltung</p>
            </div>
          </div>
          {!configured || reason === 'not-configured' ? (
            <p className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
              Supabase ist nicht konfiguriert. Bitte <code>NEXT_PUBLIC_SUPABASE_URL</code> und{' '}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code> hinterlegen.
            </p>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </section>
  );
}
