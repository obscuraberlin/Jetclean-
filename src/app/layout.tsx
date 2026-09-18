import type { Metadata, Viewport } from 'next';
import { Caveat, Inter, Manrope } from 'next/font/google';
import Script from 'next/script';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { AssistantWidget } from '@/components/assistant/AssistantWidget';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SkipLink } from '@/components/layout/SkipLink';
import { QuoteModal } from '@/components/quote/QuoteModal';
import { QuoteProvider } from '@/components/quote/QuoteProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { company } from '@/content/company';
import { siteConfig } from '@/content/site';
import { analyticsConfig } from '@/lib/analytics';
import { localBusinessJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-manrope',
});

/** Handschrift für die Unterschrift des Geschäftsführers – ebenfalls lokal ausgeliefert */
const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  applicationName: company.shortName,
  authors: [{ name: company.name }],
  creator: company.name,
  keywords: [
    'Gebäudereinigung Berlin',
    'Büroreinigung Berlin',
    'Unterhaltsreinigung Berlin',
    'Glasreinigung Berlin',
    'Treppenhausreinigung Berlin',
    'Gebäudeservice Berlin',
    'Gewerbereinigung Berlin',
  ],
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: company.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={cn(
        inter.variable,
        manrope.variable,
        caveat.variable,
        process.env.NEXT_PUBLIC_FORCE_MOTION === '1' && 'force-motion',
      )}
    >
      <body className="pb-mobile-cta">
        <QuoteProvider>
          <div
            id="app-root"
            className="relative flex min-h-dvh w-full max-w-full flex-col overflow-x-clip"
          >
            <SkipLink />
            <ScrollProgress />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <MobileCTA />
            <WhatsAppButton />
            <AssistantWidget />
          </div>
          <QuoteModal />
        </QuoteProvider>
        <JsonLd data={localBusinessJsonLd()} />
        {analyticsConfig.enabled ? (
          <Script
            defer
            data-domain={analyticsConfig.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
