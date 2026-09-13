import type { NextConfig } from 'next';

/**
 * Content-Security-Policy: erlaubt ausschließlich eigene Ressourcen. Externe Dienste
 * (Fonts, Tracker, Embeds) werden vom Browser blockiert. Plausible wird nur freigegeben,
 * wenn es per ENV aktiviert ist. `unsafe-inline` ist für die Inline-Scripts/-Styles von
 * Next.js erforderlich.
 */
const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? ' https://plausible.io' : '';
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${plausible}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${plausible}`,
  // Unternehmensfilm: YouTube im erweiterten Datenschutzmodus, geladen erst nach Klick (2-Klick-Lösung)
  'frame-src https://www.youtube-nocookie.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

/**
 * Statischer Export (z. B. Vorschau auf GitHub Pages): `STATIC_EXPORT=1 npm run build`.
 * Server-Funktionen (Lead-Speicherung, Admin) stehen dort nicht zur Verfügung –
 * siehe .github/workflows/pages.yml.
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80, 90],
    deviceSizes: [390, 430, 640, 768, 1024, 1280, 1536, 1920],
    ...(isStaticExport
      ? { loader: 'custom' as const, loaderFile: './src/lib/image-loader.ts' }
      : {}),
  },
  async headers() {
    if (isStaticExport) return [];
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
