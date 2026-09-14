# JETCLEAN Website

Produktionsreife Marketing-Website und Lead-Funnel der **JETCLEAN Gebäudeservice GmbH** (Gebäudereinigung in Berlin).
Ziel der Seite: qualifizierte Angebotsanfragen von Berliner Unternehmen (Büros, Praxen, Gewerbe, Hausverwaltungen,
Immobilienunternehmen, Kanzleien, Agenturen).

- Mobile-first, bewusst verdichtete Smartphone-Ansicht (Slider statt Stapel, Bottom-Sheet statt Formularblock, Sticky-CTA)
- Conversion-orientierter Multi-Step-Angebotsflow mit serverseitiger Validierung, Spam-Schutz und Lead-Speicherung
- Vollständiges technisches SEO (Metadata, Canonicals, OpenGraph-Bild, Sitemap, robots, Schema.org)
- Barrierearm (semantisches HTML, Tastaturbedienung, Fokus-Management, `prefers-reduced-motion`)
- Optionaler geschützter Admin-Bereich zur Lead-Verwaltung

---

## Inhalt

1. [Stack](#stack)
2. [Schnellstart](#schnellstart)
3. [Environment-Variablen](#environment-variablen)
4. [Supabase einrichten](#supabase-einrichten)
5. [Scripts & Qualitätssicherung](#scripts--qualitätssicherung)
6. [Projektstruktur](#projektstruktur)
7. [Inhalte ändern](#inhalte-ändern)
8. [Bilder austauschen](#bilder-austauschen)
9. [Formular & Leads](#formular--leads)
10. [Admin-Bereich](#admin-bereich)
11. [Deployment (Vercel)](#deployment-vercel)
12. [GitHub](#github)
13. [Vor dem Livegang](#vor-dem-livegang)

---

## Stack

| Bereich | Technologie |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, React Server Components) |
| Sprache | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (CSS-first Design Tokens in `src/app/globals.css`) |
| Animation | Motion (`motion/react`) – nur Entrance-Reveals, Modal, Menü, Carousel |
| Icons | Lucide |
| Validierung | Zod (Client + Server, geteilte Schemas) |
| Datenbank | Supabase (PostgreSQL) – Zugriff ausschließlich serverseitig |
| E-Mail | Adapter-Struktur, Standard: Resend (HTTP-API, keine Dependency) |
| Analytics | Abstrahiert; optional Plausible (cookiefrei) |
| Tests | ESLint, TypeScript, Playwright E2E |
| Deployment | Vercel |

## Schnellstart

Voraussetzungen: Node.js ≥ 20.9, npm.

```bash
npm install
cp .env.example .env.local        # Werte eintragen (siehe unten) – optional für die lokale Vorschau
npm run dev                       # http://localhost:3000
```

Ohne Supabase-Zugangsdaten funktioniert die Website lokal vollständig; Leads werden dann in
`.data/leads.jsonl` (gitignored) abgelegt und im Terminal protokolliert.

## Environment-Variablen

Siehe [`.env.example`](./.env.example). Niemals Secrets committen.

| Variable | Pflicht | Beschreibung |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ja (Prod) | Öffentliche URL ohne Slash, z. B. `https://www.jetclean.de`. Basis für Canonicals, Sitemap, OG. |
| `NEXT_PUBLIC_SUPABASE_URL` | für DB/Admin | Supabase Projekt-URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | für Admin | Öffentlicher anon key (unterliegt RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | für Lead-Speicherung | **Geheim.** Nur serverseitig für den Lead-Insert. |
| `RESEND_API_KEY` | optional | API-Key von Resend für Lead-Benachrichtigungen |
| `LEAD_NOTIFICATION_EMAIL` | optional | Empfängeradresse für neue Anfragen |
| `LEAD_FROM_EMAIL` | optional | Absender (bei Resend verifizierte Domain), z. B. `website@jetclean.de` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | Aktiviert Plausible-Script, z. B. `jetclean.de` |

Fehlen die E-Mail-Variablen, bleibt der Versand sauber deaktiviert – Leads werden trotzdem gespeichert.

## Supabase einrichten

1. Projekt unter [supabase.com](https://supabase.com) anlegen (Region EU, z. B. Frankfurt).
2. Migration ausführen – entweder per CLI:
   ```bash
   npx supabase login
   npx supabase link --project-ref <project-ref>
   npx supabase db push
   ```
   oder den Inhalt von `supabase/migrations/20260913000000_create_leads.sql` im **SQL-Editor** des Dashboards ausführen.
3. Unter *Settings → API* die Werte `URL`, `anon key` und `service_role key` in `.env.local` bzw. Vercel eintragen.
4. Für den Admin-Bereich: unter *Authentication → Providers* E-Mail/Passwort aktivieren, **Sign-ups deaktivieren**,
   einen Nutzer unter *Authentication → Users* anlegen und dessen ID freischalten:
   ```sql
   insert into public.admin_users (user_id) values ('<uuid des nutzers>');
   ```

Die Migration erstellt:

- Tabelle `leads` mit allen Feldern (Status-Enum `new | contacted | qualified | won | lost`), Längen-Checks und Indizes
- Tabelle `admin_users` + Funktion `is_admin()`
- Row Level Security: Websitebesucher (anon) haben **keinen** Zugriff; nur eingetragene Admins dürfen Leads lesen/aktualisieren;
  Inserts erfolgen ausschließlich serverseitig über den Service-Role-Key.

## Scripts & Qualitätssicherung

```bash
npm run dev            # Entwicklung
npm run build          # Production Build
npm run start          # Production Server
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run format         # Prettier
npm run check          # lint + typecheck + build
npm run test:e2e       # Playwright (startet automatisch `next start` auf Port 3100; vorher `npm run build`)
npm run images:placeholders  # Platzhalterbilder neu erzeugen
```

Playwright-Browser einmalig installieren: `npx playwright install chromium`.

Die E2E-Tests decken ab: Startseite (Struktur, kein horizontaler Overflow, SEO-Tags, Sitemap/robots, FAQ, Footer-Links),
Quote-Modal (Öffnen, `inert`, Escape), Multi-Step-Validierung, kompletter Lead-Flow bis zum Success-State,
Carousel (Buttons + Tastatur), Vorher/Nachher-Slider (Tastatur + Pointer), Mobile-Navigation, Sticky-CTA, Unterseiten + 404.

## Projektstruktur

```
src/
  app/                    Routen (App Router), Metadata, sitemap/robots/OG-Image, Fehlerseiten
    leistungen/[slug]/    SEO-Leistungsseiten (statisch generiert)
    admin/                Geschützter Lead-Bereich (Supabase Auth)
  components/
    ui/                   Button, Container, SectionHeading, Badge, Reveal, Accordion, Field, …
    layout/               Header, MobileNav, Footer, MobileCTA, SkipLink
    sections/             Hero, LogoStrip, ServicesCarousel, BeforeAfterSlider, Benefits, Testimonials, FAQ, CTA, …
    quote/                QuoteProvider (Modal-State), QuoteButton, QuoteForm (Multi-Step), QuoteModal
    admin/                Login, Lead-Tabelle, Status-Formular
  content/                Alle Inhalte & Konfiguration (siehe „Inhalte ändern“)
  lib/
    leads/                Zod-Schema, Server Action, Lead-Store-Adapter, Rate-Limit
    notify/               E-Mail-Adapter (Resend / No-op)
    supabase/             Server-/Admin-Clients, Env-Prüfung
    seo.ts, motion.ts, analytics.ts, tracking.ts, utils.ts
  hooks/                  useScrollLock, useFocusTrap, useMediaQuery
  proxy.ts                Auth-Guard für /admin
supabase/migrations/      SQL-Migrationen
scripts/                  Platzhalter-Generator
tests/e2e/                Playwright-Tests
docs/IMAGES.md            Bildliste mit Formaten und Briefings
```

## Inhalte ändern

Inhalte sind nicht im Markup hartcodiert, sondern liegen in `src/content/`:

| Datei | Inhalt |
| --- | --- |
| `company.ts` | Firmenname, Telefon, E-Mail, Adresse (NAP), Öffnungszeiten, Social-Profile, Impressumsangaben, `yearsOfExperience` |
| `site.ts` | Site-URL, SEO-Defaults, Reaktionszeit-Zusage (`responseTimePromise`), Placeholder-Badges, FAQ-Schema-Schalter |
| `navigation.ts` | Haupt- und Footer-Navigation |
| `services.ts` | Sechs Leistungen inkl. SEO-Texte, Leistungsumfang, Highlights, FAQs; Formular-Optionen |
| `industries.ts` | Branchenseiten-Inhalte |
| `benefits.ts` | Vorteile-Sektion und Hero-Trustpoints |
| `testimonials.ts` | Kundenstimmen (`isPlaceholder` beachten) |
| `references.ts` | Kundenlogos, Referenz-Cases, Vorher/Nachher-Texte |
| `faqs.ts` | FAQ-Liste (`homepageFaqCount` steuert die Startseite) |
| `about.ts` | Über uns, Nachhaltigkeit, Karriere |

Telefonnummer, Adresse und Firmenname werden überall aus `company.ts` bezogen (Header, Footer, Kontakt,
Impressum, Schema.org) – so bleiben NAP-Daten konsistent.

## Bilder austauschen

Alle Bildpositionen, Seitenverhältnisse und Bildbriefings stehen in [`docs/IMAGES.md`](./docs/IMAGES.md).
Die enthaltenen Bilder sind bewusst ruhige, generierte Platzhalter. Echte Fotos einfach unter demselben
Dateinamen ablegen – Größenvarianten und Formate (AVIF/WebP) erzeugt Next.js automatisch.

## Formular & Leads

Ablauf des Angebotsformulars (`src/components/quote/QuoteForm.tsx`):

1. Was soll gereinigt werden? 2. Fläche 3. Häufigkeit 4. PLZ/Stadtteil 5. Kontaktdaten + Datenschutz-Checkbox

- Jeder Schritt wird clientseitig mit demselben Zod-Schema validiert wie serverseitig (`src/lib/leads/schema.ts`).
- Die Server Action `submitLead` (`src/lib/leads/actions.ts`) prüft: Zod, Honeypot (`website`), Mindest-Ausfüllzeit,
  Rate-Limit (5 Anfragen / 10 Min. je IP-Hash, In-Memory), speichert den Lead und versendet optional eine E-Mail.
- Erfasst werden zusätzlich `source` (Einbindungsort), `utm_*`, `landing_page`, `referrer` und der User-Agent.
  Keine IP-Speicherung, kein Fingerprinting.
- Lead-Store-Adapter (`src/lib/leads/store.ts`): Supabase (sobald konfiguriert) → lokale Datei (Entwicklung ohne
  Supabase oder `LEAD_STORE=file`, z. B. für E2E-Tests) → sauberer Fehler (Produktion ohne Konfiguration).

Formular lokal testen: `npm run dev`, Startseite (Anfrage-Karte im Hero: vier Angaben, dann Kontaktdaten im Dialog)
oder `/kontakt`. Ohne Supabase erscheint der Lead in `.data/leads.jsonl`.

Zweiter Weg: **Rückruf anfordern** (`src/components/quote/CallbackForm.tsx`, Server Action `submitCallback`) auf
`/kontakt#rueckruf` und aus jedem CTA-Block verlinkt. Nur Name, Telefon, PLZ und Wunschzeit – der Rückrufwunsch wird als
Lead mit `source = 'callback'` gespeichert und löst dieselbe interne Benachrichtigung aus.

E-Mails (sobald `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL` und `LEAD_FROM_EMAIL` gesetzt sind, `src/lib/notify/email.ts`):

- interne Benachrichtigung an `LEAD_NOTIFICATION_EMAIL` mit allen Angaben (Reply-To = Interessent),
- automatische Eingangsbestätigung an den Interessenten (nur beim Angebotsformular, da nur dort eine E-Mail-Adresse
  erfasst wird). Die Bestätigung nennt die zugesagte Reaktionszeit aus `siteConfig.quote.responseTimePromise`.

## Admin-Bereich

`/admin` (Login unter `/admin/login`) zeigt alle Leads mit Datum, Firma, Kontakt, Leistung, Fläche, Frequenz und Status,
filterbar nach Status. Ein Lead lässt sich öffnen (alle Details, Attribution) und der Status ändern.
Der Zugriff läuft über Supabase Auth + RLS (`admin_users`), Routen werden in `src/proxy.ts` geschützt.
Die Seiten sind `noindex` und in `robots.txt` ausgeschlossen.

## Datenschutz (DSGVO / TDDDG)

Die Website ist so gebaut, dass **kein Cookie-Banner nötig ist**:

- **Keine Cookies, kein Local-/Session-Storage** auf der öffentlichen Website. Nur der Admin-Login setzt
  technisch notwendige Sitzungs-Cookies (Supabase Auth).
- **Schriften self-hosted**: `next/font` lädt Inter und Manrope beim Build herunter und liefert sie vom eigenen
  Server aus – keine Verbindung zu Google Fonts zur Laufzeit.
- **Keine externen Dienste** (keine Karten, Videos, Social-Plugins, Werbe- oder Tracking-Scripte). Eine
  Content-Security-Policy in `next.config.ts` blockiert fremde Domains technisch; Plausible wird nur
  freigegeben, wenn `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` gesetzt ist (cookielos, ohne personenbezogene Daten).
- **Formular**: Einwilligungs-Checkbox mit Link zur Datenschutzerklärung, Datenminimierung (keine
  IP-Speicherung, kein Fingerprinting), UTM-Parameter nur aus der aktuellen URL beim Absenden.
- **Rechtstexte** als strukturierte Vorlagen: `/impressum`, `/datenschutz`, `/agb`. Sie enthalten sichtbare
  Prüfhinweise, bis `company.legal.reviewed = true` gesetzt ist, und müssen juristisch geprüft werden.
- **Empfehlungen**: Supabase-Projekt in der EU-Region (Frankfurt) anlegen, Auftragsverarbeitungsverträge mit
  Vercel, Supabase und ggf. Resend abschließen und in der Datenschutzerklärung eintragen.

## Deployment (Vercel)

1. Repository bei Vercel importieren (Framework wird automatisch erkannt).
2. Environment-Variablen aus `.env.example` im Vercel-Projekt hinterlegen (Production + Preview).
3. `NEXT_PUBLIC_SITE_URL` auf die finale Domain setzen.
4. Deploy. Sitemap: `/sitemap.xml`, robots: `/robots.txt`, OG-Bild: `/opengraph-image`.

Hinweis Rate-Limit: In Serverless-Umgebungen gilt das In-Memory-Limit pro Instanz. Für höhere Anforderungen
kann in `src/lib/leads/rate-limit.ts` ein Redis-/Upstash-Adapter eingehängt werden.

## GitHub

Das Projekt ist ein normales Git-Repository. Neues Remote verbinden und pushen:

```bash
git remote add origin git@github.com:<org>/jetclean-website.git   # oder: git remote set-url origin …
git push -u origin main
```

## Vor dem Livegang

- [ ] `src/content/company.ts`: Adresse (Jonasstraße 69, 12053 Berlin), Telefon (030 805 764 26), Geschäftsführung und HRB wurden aus öffentlichen Quellen übernommen (`PUBLIC_SOURCE`) – bitte bestätigen; E-Mail, USt-IdNr. und Öffnungszeiten sind weiterhin Platzhalter; `legal.reviewed = true` nach juristischer Prüfung
- [ ] `siteConfig.reviews`: Bewertung (aktuell 4,9 bei 43, „Google & weiteren Plattformen“), Link zum Google-Unternehmensprofil und echte Kundenfotos für die Gesichter eintragen; `siteConfig.video` (YouTube-ID) prüfen
- [ ] Impressum, Datenschutz & AGB (`src/app/impressum`, `src/app/datenschutz`, `src/app/agb`) juristisch prüfen und Klammer-Platzhalter ersetzen
- [ ] Testimonials, Kundenlogos und Referenz-Cases durch freigegebene echte Inhalte ersetzen (`isPlaceholder: false`)
- [ ] Bilder gemäß `docs/IMAGES.md` austauschen (Logo ist bereits als Vektor-Nachbau eingebunden, optional durch die offizielle Datei ersetzen)
- [ ] `NEXT_PUBLIC_SITE_URL` und Supabase-/E-Mail-Variablen in Vercel setzen
- [ ] `siteConfig.quote.responseTimePromise` ist auf „innerhalb eines Werktags“ gesetzt (Hero-Karte, Bestätigungsmail, Versprechen-Sektion) – nur lassen, wenn die Zusage eingehalten wird
- [ ] Absenderdomain für Resend verifizieren (`LEAD_FROM_EMAIL`, z. B. `anfragen@jetclean-berlin.de`), sonst bleiben Benachrichtigung und Eingangsbestätigung aus
- [ ] Optional: Plausible aktivieren und Datenschutzerklärung entsprechend anpassen
