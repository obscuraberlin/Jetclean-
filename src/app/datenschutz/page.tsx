import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { LegalNotice } from '@/components/ui/LegalNotice';
import { Prose } from '@/components/ui/Prose';
import { company, fullAddress } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Datenschutzerklärung',
  description: `Datenschutzerklärung der ${company.name}: Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.`,
  path: '/datenschutz',
});

/**
 * Datenschutzerklärung – STRUKTURELLE VORLAGE.
 * Die Abschnitte spiegeln die tatsächlich eingesetzte Technik wider (Hosting, Kontaktformular/Leads,
 * optionale E-Mail-Benachrichtigung, optionales cookiefreies Plausible-Analytics, Google Fonts via next/font
 * = self-hosted, keine Marketing-Cookies). Vor Veröffentlichung juristisch prüfen lassen.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Datenschutzerklärung"
        breadcrumbs={[{ name: 'Datenschutz', path: '/datenschutz' }]}
        compact
      />
      <section className="section-y-sm">
        <div className="container-site">
          <LegalNotice />
          <Prose>
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              <br />
              {company.name}, {fullAddress}
              <br />
              Telefon: {company.contact.phoneDisplay}, E-Mail:{' '}
              <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
            </p>

            <h2>2. Allgemeine Hinweise</h2>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften (DSGVO, BDSG, TDDDG) sowie dieser Datenschutzerklärung. Diese
              Website verwendet keine Marketing-Cookies und kein Tracking, das eine Einwilligung
              erfordert.
            </p>

            <h2>3. Hosting und Server-Logfiles</h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Hosting-Anbieter:{' '}
              <em>
                [Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA – bitte prüfen und
                ggf. anpassen]
              </em>
              ). Beim Aufruf der Website werden automatisch Informationen in Server-Logfiles
              verarbeitet (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp,
              Betriebssystem, Referrer-URL). Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs.
              1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der
              Website). Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung.
            </p>

            <h2>4. Anfrageformular („Kostenloses Angebot“)</h2>
            <p>
              Wenn Sie uns über das Anfrageformular kontaktieren, verarbeiten wir die von Ihnen
              eingegebenen Daten (Firma, Name, E-Mail-Adresse, Telefonnummer, Postleitzahl, Angaben
              zum Reinigungsobjekt sowie optional Ihre Nachricht) zur Bearbeitung Ihrer Anfrage und
              für eventuelle Anschlussfragen. Zusätzlich speichern wir technische Angaben zur
              Herkunft der Anfrage (z. B. aufgerufene Seite, Kampagnenparameter, Browsertyp), um
              unsere Website zu verbessern.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
              Maßnahmen) sowie Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Die Daten werden
              in einer Datenbank unseres Auftragsverarbeiters gespeichert (
              <em>[Supabase Inc. – Region und Vertragsdetails eintragen]</em>) und – sofern
              eingerichtet – per E-Mail an uns weitergeleitet (<em>[Resend – ggf. eintragen]</em>).
              Die Daten werden gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr
              erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>

            <h2>5. Kontaktaufnahme per E-Mail oder Telefon</h2>
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben zur Bearbeitung
              der Anfrage bei uns gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw.
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h2>6. Schriftarten</h2>
            <p>
              Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Server
              ausgeliefert. Es findet keine Verbindung zu Servern von Google statt.
            </p>

            <h2>7. Reichweitenmessung</h2>
            <p>
              <em>[Nur relevant, wenn Plausible aktiviert ist:]</em> Wir nutzen den
              datenschutzfreundlichen Analysedienst Plausible Analytics ohne Cookies und ohne
              Speicherung personenbezogener Daten. IP-Adressen werden nicht gespeichert.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Ist Plausible nicht aktiviert, findet
              keine Reichweitenmessung statt.
            </p>

            <h2>8. Ihre Rechte</h2>
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul>
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
              <li>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p>
              Zuständige Aufsichtsbehörde: Berliner Beauftragte für Datenschutz und
              Informationsfreiheit, Alt-Moabit 59–61, 10555 Berlin.
            </p>

            <h2>9. Datensicherheit</h2>
            <p>
              Diese Website nutzt eine SSL-/TLS-Verschlüsselung. Daten, die Sie an uns übermitteln,
              können von Dritten nicht mitgelesen werden.
            </p>

            <h2>10. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
              aktuellen rechtlichen Anforderungen entspricht. Stand: <em>[Datum eintragen]</em>.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
