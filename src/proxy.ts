import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Schützt den Admin-Bereich: ohne gültige Supabase-Session -> /admin/login.
 * Aktualisiert außerdem die Auth-Cookies (Token-Refresh) auf Request-Ebene.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = request.nextUrl.pathname.startsWith('/admin/login');

  if (!url || !anonKey) {
    if (isLogin) return NextResponse.next();
    return NextResponse.redirect(new URL('/admin/login?reason=not-configured', request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet)
          response.cookies.set(name, value, options);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (user && isLogin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
