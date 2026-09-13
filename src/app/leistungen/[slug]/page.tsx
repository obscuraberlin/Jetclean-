import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { IconBox } from '@/components/ui/IconBox';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';
import { getServiceBySlug, services } from '@/content/services';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import { telHref } from '@/lib/utils';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/leistungen/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title={
          <>
            {service.title} <span className="text-accent">in Berlin.</span>
          </>
        }
        text={service.intro}
        breadcrumbs={[
          { name: 'Leistungen', path: '/leistungen' },
          { name: service.title, path: `/leistungen/${service.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuoteButton source={`service-${service.slug}`} size="lg" />
          <a
            href={telHref(company.contact.phoneE164)}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-2 text-base font-semibold text-navy-900 hover:text-brand-600"
          >
            oder anrufen: {company.contact.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* Bild + Leistungsumfang */}
      <section className="section-y" aria-labelledby="scope-title">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="image" className="lg:col-span-6" as="figure">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              id="scope-title"
              eyebrow="Leistungsumfang"
              title={`Das umfasst unsere ${service.title}.`}
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-navy-800">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-brand-600 uppercase">
                Typische Einsatzbereiche
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {service.audience.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-sm text-navy-800 ring-1 ring-line"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-surface section-y" aria-labelledby="highlights-title">
        <div className="container-site">
          <SectionHeading
            id="highlights-title"
            eyebrow="Warum JETCLEAN"
            title={`${service.title}, auf die Sie sich verlassen können.`}
          />
          <RevealGroup as="ul" className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-12">
            {service.highlights.map((highlight, index) => (
              <RevealItem
                key={highlight.title}
                as="li"
                className="rounded-3xl border border-line bg-white p-6 shadow-soft"
              >
                <span className="font-display text-sm font-bold text-brand-600">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Ablauf */}
      <section className="section-y" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading
            id="process-title"
            eyebrow="So läuft es ab"
            title="In vier Schritten zum passenden Reinigungskonzept."
          />
          <RevealGroup as="ol" className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {[
              {
                title: 'Anfrage',
                text: 'Sie beschreiben Ihr Objekt in 60 Sekunden über das Formular oder telefonisch.',
              },
              {
                title: 'Besichtigung',
                text: 'Wir sehen uns die Flächen an und klären Anforderungen, Zeiten und Besonderheiten.',
              },
              {
                title: 'Angebot',
                text: 'Sie erhalten ein transparentes Angebot mit klarem Leistungsverzeichnis.',
              },
              {
                title: 'Start',
                text: 'Ihr festes Team beginnt – begleitet von Ihrem persönlichen Ansprechpartner.',
              },
            ].map((step, index) => (
              <RevealItem key={step.title} as="li" className="relative pl-14">
                <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-navy-950 font-display text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-base font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ zur Leistung */}
      {service.faqs.length > 0 ? (
        <section className="bg-surface section-y-sm" aria-labelledby="service-faq-title">
          <div className="container-site grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="service-faq-title"
                eyebrow="Häufige Fragen"
                title={`Fragen zur ${service.title}`}
              />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faqs} defaultOpen={0} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Weitere Leistungen */}
      <section className="section-y-sm" aria-labelledby="related-title">
        <div className="container-site">
          <SectionHeading
            id="related-title"
            eyebrow="Weitere Leistungen"
            title="Das könnte ebenfalls passen."
            action={
              <Button href="/leistungen" variant="link">
                Alle Leistungen
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            }
          />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <Link
                  href={`/leistungen/${item.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition-[transform,box-shadow] duration-300 ease-(--ease-premium) hover:shadow-card motion-safe:hover:-translate-y-0.5"
                >
                  <IconBox icon={item.icon} tone="brand" size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold wrap-anywhere hyphens-auto text-navy-950">
                      {item.title}
                    </span>
                    <span className="block truncate text-sm text-muted">{item.teaser}</span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        source={`service-cta-${service.slug}`}
        title={`Angebot für ${service.title} anfragen.`}
        text="Beschreiben Sie uns kurz Ihr Objekt – wir melden uns mit einem kostenlosen, unverbindlichen Angebot."
      />

      <JsonLd
        data={serviceJsonLd({
          name: `${service.title} Berlin`,
          description: service.seoDescription,
          path: `/leistungen/${service.slug}`,
        })}
      />
    </>
  );
}
