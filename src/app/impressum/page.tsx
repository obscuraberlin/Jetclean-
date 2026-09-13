import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { LegalNotice } from '@/components/ui/LegalNotice';
import { Prose } from '@/components/ui/Prose';
import { company, fullAddress } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Impressum',
  description: `Impressum der ${company.name}, ${fullAddress}.`,
  path: '/impressum',
  noIndex: false,
});

/**
 * Impressum – STRUKTURELLE VORLAGE (§ 5 DDG, § 18 MStV).
 * Alle Angaben stammen aus src/content/company.ts und sind dort als PLACEHOLDER markiert,
 * bis die echten Unternehmensdaten eingetragen und juristisch geprüft wurden.
 */
export default function ImprintPage() {
  return (
    <>
      <PageHero
        title="Impressum"
        breadcrumbs={[{ name: 'Impressum', path: '/impressum' }]}
        compact
      />
      <section className="section-y-sm">
        <div className="container-site">
          <LegalNotice />
          <Prose>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              {company.name}
              <br />
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
              <br />
              {company.address.countryName}
            </p>

            <h3>Vertreten durch</h3>
            <p>Geschäftsführung: {company.legal.managingDirector}</p>

            <h3>Kontakt</h3>
            <p>
              Telefon:{' '}
              <a href={`tel:${company.contact.phoneE164}`}>{company.contact.phoneDisplay}</a>
              <br />
              E-Mail: <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
            </p>

            <h3>Registereintrag</h3>
            <p>
              Eintragung im Handelsregister.
              <br />
              Registergericht: {company.legal.registerCourt}
              <br />
              Registernummer: {company.legal.registerNumber}
            </p>

            <h3>Umsatzsteuer-ID</h3>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              {company.legal.vatId}
            </p>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              {company.legal.managingDirector}
              <br />
              {fullAddress}
            </p>

            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2>Bildnachweise</h2>
            <p>
              Die verwendeten Bilder sind Eigentum der {company.name} bzw. lizenzierte Aufnahmen.
              Bildnachweise für Stockmaterial werden hier ergänzt.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
