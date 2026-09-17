import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { Benefits } from '@/components/sections/Benefits';
import { BerlinIntro } from '@/components/sections/BerlinIntro';
import { CtaSection } from '@/components/sections/CtaSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Hero } from '@/components/sections/Hero';
import { LogoStrip } from '@/components/sections/LogoStrip';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { QuickFacts } from '@/components/sections/QuickFacts';
import { ServicesCarousel } from '@/components/sections/ServicesCarousel';
import { TrustBar } from '@/components/sections/TrustBar';
import { Testimonials } from '@/components/sections/Testimonials';
import { VideoTrailer } from '@/components/sections/VideoTrailer';
import { faqs, homepageFaqCount } from '@/content/faqs';
import { siteConfig } from '@/content/site';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <LogoStrip />
      <TrustBar />
      <ServicesCarousel />
      <BeforeAfterSection />
      <Benefits />
      <BerlinIntro />
      <VideoTrailer />
      <ProcessSteps />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      {siteConfig.seo.enableFaqSchema ? (
        <JsonLd data={faqJsonLd(faqs.slice(0, homepageFaqCount))} />
      ) : null}
    </>
  );
}
