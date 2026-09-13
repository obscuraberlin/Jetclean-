import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { LegalNotice } from '@/components/ui/LegalNotice';
import { Prose } from '@/components/ui/Prose';
import { company, fullAddress } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  description: `Allgemeine Geschäftsbedingungen der ${company.name} für Reinigungs- und Gebäudeserviceleistungen gegenüber Unternehmen in Berlin.`,
  path: '/agb',
});

/**
 * AGB – STRUKTURELLE VORLAGE für B2B-Reinigungsdienstleistungen.
 * Muss vor Veröffentlichung juristisch geprüft und an die tatsächlichen Vertragsbedingungen
 * (Preise, Laufzeiten, Kündigungsfristen, Haftungssummen, Versicherung) angepasst werden.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Allgemeine Geschäftsbedingungen"
        breadcrumbs={[{ name: 'AGB', path: '/agb' }]}
        compact
      />
      <section className="section-y-sm">
        <div className="container-site">
          <LegalNotice />
          <Prose>
            <h2>§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Reinigungs- und
              Gebäudeserviceleistungen zwischen der {company.name}, {fullAddress} (nachfolgend
              „JETCLEAN“) und ihren Auftraggebern. Sie gelten ausschließlich gegenüber Unternehmern
              im Sinne des § 14 BGB, juristischen Personen des öffentlichen Rechts und
              öffentlich-rechtlichen Sondervermögen. Entgegenstehende oder abweichende Bedingungen
              des Auftraggebers werden nicht anerkannt, es sei denn, JETCLEAN stimmt ihrer Geltung
              ausdrücklich schriftlich zu.
            </p>

            <h2>§ 2 Vertragsschluss</h2>
            <p>
              Angebote von JETCLEAN sind freibleibend. Ein Vertrag kommt durch schriftliche
              Auftragsbestätigung von JETCLEAN oder durch Beginn der Leistungserbringung zustande.
              Anfragen über das Online-Formular sind unverbindlich und stellen kein Angebot im
              Rechtssinne dar.
            </p>

            <h2>§ 3 Leistungsumfang</h2>
            <p>
              Art, Umfang und Intervalle der Leistungen ergeben sich aus dem individuellen
              Leistungsverzeichnis, das Vertragsbestandteil ist. Änderungen des Leistungsumfangs
              bedürfen der Schriftform. JETCLEAN ist berechtigt, sich zur Erfüllung ihrer Pflichten
              geeigneter Erfüllungsgehilfen und Nachunternehmer zu bedienen.
            </p>

            <h2>§ 4 Mitwirkungspflichten des Auftraggebers</h2>
            <p>
              Der Auftraggeber stellt unentgeltlich Wasser, Strom, verschließbare Räume für
              Materialien sowie den erforderlichen Zugang zum Objekt zur Verfügung. Besonderheiten
              der zu reinigenden Flächen (empfindliche Materialien, Gefahrstoffe,
              Sicherheitsvorschriften) sind JETCLEAN vor Beginn der Leistung mitzuteilen.
            </p>

            <h2>§ 5 Preise und Zahlung</h2>
            <p>
              Es gelten die im Angebot bzw. in der Auftragsbestätigung vereinbarten Preise zuzüglich
              der gesetzlichen Umsatzsteuer. Regelmäßige Leistungen werden monatlich abgerechnet.
              Rechnungen sind innerhalb von <em>[14] Tagen</em> ohne Abzug zahlbar. Bei Änderungen
              der Lohn- und Materialkosten, insbesondere durch Tarifabschlüsse, ist JETCLEAN
              berechtigt, die Preise mit einer Ankündigungsfrist von <em>[vier Wochen]</em>{' '}
              entsprechend anzupassen.
            </p>

            <h2>§ 6 Vertragslaufzeit und Kündigung</h2>
            <p>
              Verträge über wiederkehrende Leistungen werden auf unbestimmte Zeit geschlossen und
              können von beiden Seiten mit einer Frist von <em>[drei Monaten]</em> zum Monatsende
              gekündigt werden, sofern nichts anderes vereinbart ist. Das Recht zur
              außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen bedürfen
              der Schriftform.
            </p>

            <h2>§ 7 Gewährleistung und Reklamationen</h2>
            <p>
              Beanstandungen der Reinigungsleistung sind JETCLEAN unverzüglich, spätestens innerhalb
              von <em>[24 Stunden]</em> nach Leistungserbringung, mitzuteilen. JETCLEAN ist zunächst
              Gelegenheit zur Nachbesserung zu geben. Für nicht rechtzeitig gerügte Mängel ist die
              Gewährleistung ausgeschlossen.
            </p>

            <h2>§ 8 Haftung</h2>
            <p>
              JETCLEAN haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden
              aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei leichter
              Fahrlässigkeit haftet JETCLEAN nur bei Verletzung wesentlicher Vertragspflichten und
              begrenzt auf den vertragstypischen, vorhersehbaren Schaden. JETCLEAN unterhält eine
              Betriebshaftpflichtversicherung mit einer Deckungssumme von{' '}
              <em>[Betrag eintragen]</em>.
            </p>

            <h2>§ 9 Personal</h2>
            <p>
              Das eingesetzte Personal steht ausschließlich in einem Vertragsverhältnis zu JETCLEAN.
              Der Auftraggeber verpflichtet sich, während der Vertragslaufzeit und{' '}
              <em>[sechs Monate]</em> danach keine Mitarbeitenden von JETCLEAN abzuwerben.
            </p>

            <h2>§ 10 Datenschutz</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
              <Link href="/datenschutz">Datenschutzerklärung</Link>. Soweit JETCLEAN im Rahmen der
              Leistungserbringung Zugang zu personenbezogenen Daten des Auftraggebers erhält,
              schließen die Parteien bei Bedarf eine Vereinbarung zur Auftragsverarbeitung nach Art.
              28 DSGVO.
            </p>

            <h2>§ 11 Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle
              Streitigkeiten ist Berlin, sofern der Auftraggeber Kaufmann ist. Sollten einzelne
              Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
              unberührt.
            </p>
            <p>
              Stand: <em>[Datum eintragen]</em>
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
