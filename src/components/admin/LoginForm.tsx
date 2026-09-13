'use client';

import { Loader2, LogIn } from 'lucide-react';
import { useActionState } from 'react';
import { loginAction, type LoginState } from '@/lib/admin/actions';
import { Button } from '@/components/ui/Button';
import { FieldWrapper, Input } from '@/components/ui/Field';

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <FieldWrapper label="E-Mail" htmlFor="email">
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </FieldWrapper>
      <FieldWrapper label="Passwort" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
        />
      </FieldWrapper>
      {state.error ? (
        <p role="alert" className="rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending} aria-busy={pending}>
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="size-4" aria-hidden="true" />
        )}
        Anmelden
      </Button>
    </form>
  );
}
