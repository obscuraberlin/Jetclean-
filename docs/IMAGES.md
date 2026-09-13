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

Die Wortmarke wird aktuell als Inline-SVG/HTML in `src/components/brand/Logo.tsx` nachgebaut
(Platzhalter nach Vorlage). Sobald die offizielle Logodatei vorliegt:

1. Datei als `public/images/logo.svg` (und optional `logo-white.svg` für dunkle Flächen) ablegen.
2. In `Logo.tsx` das Markup durch `<Image src="/images/logo.svg" alt="JETCLEAN Gebäudeservice GmbH" width={…} height={…} priority />` ersetzen.
3. `src/app/icon.svg` und `src/app/apple-icon.png` (Favicon/Touch-Icon) auf Basis des echten Logos neu erzeugen.
4. `src/app/opengraph-image.tsx` (Social-Preview) ggf. mit dem echten Logo anpassen.

## Kundenlogos

Kundenlogos werden in `src/content/references.ts` (`clientLogos`) gepflegt. Für jedes Logo `src`
(z. B. `/images/logos/kunde.svg`, ca. 140 × 40 px, einfarbig) angeben und `isPlaceholder: false` setzen –
**nur mit schriftlicher Freigabe des Kunden**.

## Testimonial-Fotos (optional)

`avatar: '/images/testimonials/name.webp'` (quadratisch, 200 × 200 px) in `src/content/testimonials.ts`. Ohne Foto werden Initialen gezeigt.
