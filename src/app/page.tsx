import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { AboutStory } from '@/components/sections/AboutStory';
import { Benefits } from '@/components/sections/Benefits';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { CtaSection } from '@/components/sections/CtaSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Hero } from '@/components/sections/Hero';
import { LogoStrip } from '@/components/sections/LogoStrip';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { QuickFacts } from '@/components/sections/QuickFacts';
import { ServicesCarousel } from '@/components/sections/ServicesCarousel';
import { TrustBar } from '@/components/sections/TrustBar';
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <LogoStrip />
      <TrustBar />
      <ServicesCarousel />
      <Benefits />
      <AboutStory />
      <ProcessSteps />
      <Testimonials />
      <CtaSection />
      <BlogTeaser />
      <FaqSection />
      {siteConfig.seo.enableFaqSchema ? (
        <JsonLd data={faqJsonLd(faqs.slice(0, homepageFaqCount))} />
      ) : null}
    </>
  );
}
