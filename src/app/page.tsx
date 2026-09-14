import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { CinematicScene } from '@/components/sections/CinematicScene';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { Experience } from '@/components/sections/Experience';
import { FaqSection } from '@/components/sections/FaqSection';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { ImageMoment } from '@/components/sections/ImageMoment';
import { LogoStrip } from '@/components/sections/LogoStrip';
import { ServicesCarousel } from '@/components/sections/ServicesCarousel';
import { Statement } from '@/components/sections/Statement';
import { Testimonials } from '@/components/sections/Testimonials';
import { faqs, homepageFaqCount } from '@/content/faqs';
import { siteConfig } from '@/content/site';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: '/',
  absoluteTitle: true,
});

/**
 * Startseite als inszenierte Reise:
 * Hero → Vertrauen → Leistungen → Wow-Moment → Statement → Ergebnis → Erfahrung → Bildmoment → Arbeit → Vertrauen → FAQ → Abschluss
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <ServicesCarousel />
      <CinematicScene />
      <Statement />
      <BeforeAfterSection />
      <Experience />
      <ImageMoment />
      <Gallery />
      <Testimonials />
      <FaqSection variant="quiet" />
      <ClosingCta />
      {siteConfig.seo.enableFaqSchema ? (
        <JsonLd data={faqJsonLd(faqs.slice(0, homepageFaqCount))} />
      ) : null}
    </>
  );
}
