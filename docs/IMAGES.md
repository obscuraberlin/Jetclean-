# Bilder & Assets

Alle Bilder liegen unter `public/images/` und werden über `next/image` ausgeliefert (AVIF/WebP, responsive Größen).
Die aktuell enthaltenen Dateien sind **generierte, abstrakte Platzhalter** (`npm run images:placeholders`).
Sie sollen vor Livegang durch echte Fotografie ersetzt werden – **gleicher Dateiname, gleiches Seitenverhältnis**,
dann ist nichts weiter anzupassen.

Empfohlene Ausgangsqualität: JPG/WebP, sRGB, ausreichend Auflösung (siehe Tabelle). Next.js erzeugt daraus alle
kleineren Varianten automatisch.

| Datei | Verwendung | Seitenverhältnis | Mindestgröße | Bildbrief |
| --- | --- | --- | --- | --- |
| `hero/hero.webp` | Startseite Hero (Mobile 16:10-Crop, Desktop XL Hochformat) | ~7:8 (Hochformat, Hauptmotiv mittig) | 1400 × 1600 px | Reinigungskraft in JETCLEAN-Kleidung in modernem Berliner Büro, große Fensterfront, Fernsehturm dezent im Hintergrund. Ruhig, hell, hochwertig. |
| `hero/team.webp` | Über uns | 4:3 | 1600 × 1200 px | Team/Objektleitung vor einem Bürogebäude oder im Objekt. Authentisch, freundlich. |
| `hero/sustainability.webp` | Nachhaltigkeit | 4:3 | 1600 × 1200 px | Umweltschonende Reinigungsmittel, Mikrofaser, Dosiersystem oder Reinwassertechnik. |
| `hero/contact.webp` | reserviert (Kontakt) | 4:3 | 1600 × 1200 px | Büro/Empfang JETCLEAN oder Ansprechpartner. |
| `services/bueroreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Helles Großraumbüro nach der Reinigung. |
| `services/unterhaltsreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Reinigungskraft bei der Unterhaltsreinigung (Boden/Oberflächen). |
| `services/glasreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Glasreinigung an großer Fensterfront, Skyline im Hintergrund. |
| `services/treppenhausreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Gepflegtes Treppenhaus (Altbau oder modern). |
| `services/grundreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Maschinelle Bodenreinigung (Scheuersaugmaschine). |
| `services/sonderreinigung.webp` | Service-Card + Detailseite | 4:3 | 1200 × 900 px | Sondereinsatz, z. B. Bauendreinigung oder Fassade. |
| `cases/office.webp` | Referenzen – Case 1 | 16:10 | 1600 × 1000 px | Bürogebäude in Berlin-Mitte (Fassade oder Empfang). |
| `cases/medical.webp` | Referenzen – Case 2 | 16:10 | 1600 × 1000 px | Moderne Praxisräume. |
| `cases/property.webp` | Referenzen – Case 3 | 16:10 | 1600 × 1000 px | Treppenhaus/Wohnhaus einer Hausverwaltung. |
| `before-after/before.webp` | Vorher/Nachher-Slider (links) | 16:10 | 1600 × 1000 px | **Exakt gleiche Perspektive** wie `after.webp`, vor der Reinigung. |
| `before-after/after.webp` | Vorher/Nachher-Slider (rechts) | 16:10 | 1600 × 1000 px | **Exakt gleiche Perspektive** wie `before.webp`, nach der Reinigung. |

## Logo

Die Bildmarke (Haus mit Fenster, Blatt, Swoosh) ist als Vektor-Nachbau des Originallogos von
jetclean-berlin.de umgesetzt und liegt an zwei Stellen:

- `src/components/brand/Logo.tsx` – Inline-SVG (`LogoMark`) plus Wortmarke „JETCLEAN / Gebäudeservice GmbH“ als Text
- `public/images/brand/jetclean-mark.svg` – eigenständige Datei (z. B. für E-Mails, Drucksachen)

Favicon (`src/app/icon.svg`), Touch-Icon (`src/app/apple-icon.png`, wird vom Script erzeugt) und das
Social-Preview-Bild (`src/app/opengraph-image.tsx`) nutzen dieselbe Marke.

Liegt die **offizielle Vektordatei** (SVG/AI/PDF) vor, kann sie die Nachbildung ersetzen: Pfade in
`LogoMark` bzw. `jetclean-mark.svg` austauschen (viewBox 300 × 220 beibehalten) – alle Einbindungen
aktualisieren sich automatisch. Die Wortmarke verwendet die Display-Schrift Manrope; soll exakt die
Originalschrift erscheinen, das komplette Logo als SVG unter `public/images/brand/logo.svg` ablegen und in
`Logo.tsx` per `<Image>` einbinden.

## Kundenlogos

Kundenlogos werden in `src/content/references.ts` (`clientLogos`) gepflegt. Für jedes Logo `src`
(z. B. `/images/logos/kunde.svg`, ca. 140 × 40 px, einfarbig) angeben und `isPlaceholder: false` setzen –
**nur mit schriftlicher Freigabe des Kunden**.

## Testimonial-Fotos (optional)

`avatar: '/images/testimonials/name.webp'` (quadratisch, 200 × 200 px) in `src/content/testimonials.ts`. Ohne Foto werden Initialen gezeigt.
