/**
 * Erzeugt hochwertige, abstrakte Platzhalterbilder (WebP) für alle Bildpositionen der Website.
 * Ausführen: `npm run images:placeholders`
 *
 * Die Bilder sind bewusst ruhig gestaltet (Verläufe, Glasflächen, Lichtkante, dezente
 * Berlin-Silhouette) und sollen vor Livegang durch echte Fotos ersetzt werden.
 * Welche Datei wo verwendet wird, steht in docs/IMAGES.md.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => join(root, 'public', p);

const palettes = {
  bright: { a: '#f8fafc', b: '#dfe6f0', c: '#b8c6da', accent: '#ee6212', ink: '#0b1329' },
  navy: { a: '#e9eef6', b: '#c3d0e3', c: '#8ea3c4', accent: '#ee6212', ink: '#0b1329' },
  warm: { a: '#fbf7f3', b: '#ecdfd3', c: '#d3bfae', accent: '#ee6212', ink: '#0b1329' },
  glass: { a: '#eef4fb', b: '#cfe0f2', c: '#9dbbdc', accent: '#ee6212', ink: '#0b1329' },
  green: { a: '#f2f8f3', b: '#d5e8d9', c: '#a9c9b1', accent: '#16a34a', ink: '#0b1329' },
  dull: { a: '#dcdcdc', b: '#bdbdbd', c: '#8e8e8e', accent: '#9a9a9a', ink: '#1c1c1c' },
};

function skyline(w, h, ink, opacity = 0.16) {
  // Ruhige Berlin-Silhouette (Horizontlinie mit Fernsehturm) am unteren Rand
  const base = h;
  const towerX = w * 0.7;
  const towerTop = h * 0.36;
  // [x-Anteil, Breite-Anteil, Höhe-Anteil]
  const buildings = [
    [0.0, 0.09, 0.76],
    [0.08, 0.05, 0.7],
    [0.12, 0.1, 0.8],
    [0.21, 0.07, 0.74],
    [0.27, 0.12, 0.68],
    [0.38, 0.06, 0.78],
    [0.43, 0.09, 0.72],
    [0.51, 0.11, 0.82],
    [0.61, 0.07, 0.75],
    [0.75, 0.08, 0.77],
    [0.82, 0.1, 0.7],
    [0.91, 0.09, 0.79],
  ];
  let d = `M0 ${base}`;
  for (const [x, bw, y] of buildings) {
    const bx = x * w;
    const by = y * h;
    d += ` L${bx} ${base} L${bx} ${by} L${bx + bw * w} ${by} L${bx + bw * w} ${base}`;
  }
  d += ` L${w} ${base} Z`;
  const tower = `
    <rect x="${towerX - w * 0.004}" y="${towerTop + h * 0.06}" width="${w * 0.008}" height="${base - towerTop - h * 0.06}" fill="${ink}" />
    <circle cx="${towerX}" cy="${towerTop + h * 0.055}" r="${w * 0.022}" fill="${ink}" />
    <rect x="${towerX - w * 0.0015}" y="${towerTop - h * 0.05}" width="${w * 0.003}" height="${h * 0.1}" fill="${ink}" />
    <path d="M${towerX - w * 0.018} ${base} L${towerX - w * 0.01} ${base - h * 0.16} L${towerX + w * 0.01} ${base - h * 0.16} L${towerX + w * 0.018} ${base} Z" fill="${ink}" />`;
  return `<g opacity="${opacity * 0.6}"><path d="${d}" fill="${ink}" />${tower}</g>`;
}

function panes(w, h, ink, cols = 6, rows = 4, opacity = 0.05) {
  const pw = w / cols;
  const ph = h / rows;
  let s = `<g opacity="${opacity}">`;
  for (let c = 0; c <= cols; c++)
    s += `<rect x="${c * pw - 2}" y="0" width="4" height="${h}" fill="${ink}" />`;
  for (let r = 0; r <= rows; r++)
    s += `<rect x="0" y="${r * ph - 2}" width="${w}" height="4" fill="${ink}" />`;
  s += '</g>';
  return s;
}

function lightStreak(w, h, angle = -18, opacity = 0.55) {
  return `<g transform="rotate(${angle} ${w / 2} ${h / 2})" opacity="${opacity}">
    <rect x="${-w * 0.2}" y="${h * 0.18}" width="${w * 1.4}" height="${h * 0.16}" fill="url(#streak)" />
    <rect x="${-w * 0.2}" y="${h * 0.48}" width="${w * 1.4}" height="${h * 0.07}" fill="url(#streak)" opacity="0.6" />
  </g>`;
}

function blob(cx, cy, r, color, opacity) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}" filter="url(#blur)" />`;
}

function smudges(w, h, ink) {
  let s = '';
  const seeds = [
    [0.22, 0.42, 0.1],
    [0.55, 0.62, 0.14],
    [0.78, 0.35, 0.09],
    [0.4, 0.78, 0.12],
    [0.66, 0.2, 0.07],
  ];
  for (const [x, y, r] of seeds) s += blob(x * w, y * h, r * w, ink, 0.14);
  return s;
}

function svg({ w, h, palette, variant }) {
  const p = palettes[palette];
  const body = [];
  body.push(`<rect width="${w}" height="${h}" fill="url(#bg)" />`);
  body.push(`<rect width="${w}" height="${h}" fill="url(#vignette)" />`);
  // große weiche Lichtflächen
  body.push(blob(w * 0.25, h * 0.2, w * 0.35, '#ffffff', 0.55));
  body.push(blob(w * 0.85, h * 0.75, w * 0.3, p.c, 0.35));
  if (variant !== 'dull')
    body.push(blob(w * 0.8, h * 0.15, w * 0.12, p.accent, variant === 'green' ? 0.12 : 0.1));

  switch (variant) {
    case 'office':
      body.push(panes(w, h, p.ink, 6, 4));
      body.push(lightStreak(w, h, -18, 0.5));
      body.push(skyline(w, h, p.ink, 0.12));
      break;
    case 'glass':
      body.push(panes(w, h, p.ink, 8, 5, 0.06));
      body.push(lightStreak(w, h, -28, 0.7));
      body.push(skyline(w, h, p.ink, 0.18));
      break;
    case 'stairs': {
      let steps = '';
      for (let i = 0; i < 7; i++) {
        const x = w * 0.1 + i * w * 0.11;
        const y = h * 0.85 - i * h * 0.09;
        steps += `<rect x="${x}" y="${y}" width="${w * 0.6}" height="${h * 0.09}" fill="${p.ink}" opacity="${0.05 + i * 0.012}" />`;
      }
      body.push(steps);
      body.push(lightStreak(w, h, -12, 0.45));
      break;
    }
    case 'floor':
      body.push(
        `<rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="url(#floor)" />`,
      );
      body.push(panes(w, h * 0.62, p.ink, 5, 3, 0.07));
      body.push(lightStreak(w, h, -10, 0.5));
      body.push(skyline(w, h * 0.62, p.ink, 0.12));
      break;
    case 'portrait':
      body.push(panes(w, h, p.ink, 4, 6, 0.08));
      body.push(lightStreak(w, h, -24, 0.55));
      body.push(skyline(w, h, p.ink, 0.16));
      break;
    case 'green':
      body.push(lightStreak(w, h, -16, 0.5));
      body.push(`<g opacity="0.14" fill="${p.accent}">
        <ellipse cx="${w * 0.2}" cy="${h * 0.75}" rx="${w * 0.14}" ry="${h * 0.22}" transform="rotate(-25 ${w * 0.2} ${h * 0.75})" />
        <ellipse cx="${w * 0.3}" cy="${h * 0.9}" rx="${w * 0.1}" ry="${h * 0.18}" transform="rotate(20 ${w * 0.3} ${h * 0.9})" />
      </g>`);
      break;
    case 'dull':
      body.push(panes(w, h, p.ink, 6, 4, 0.1));
      body.push(smudges(w, h, p.ink));
      body.push(skyline(w, h, p.ink, 0.1));
      break;
    default:
      body.push(lightStreak(w, h, -18, 0.5));
      body.push(skyline(w, h, p.ink, 0.12));
  }

  // dezente Markenlinie unten
  if (variant !== 'dull') {
    body.push(
      `<rect x="0" y="${h - Math.max(6, h * 0.006)}" width="${w}" height="${Math.max(6, h * 0.006)}" fill="${p.accent}" opacity="0.85" />`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.a}" />
      <stop offset="0.55" stop-color="${p.b}" />
      <stop offset="1" stop-color="${p.c}" />
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.6" stop-color="${p.ink}" stop-opacity="0" />
      <stop offset="1" stop-color="${p.ink}" stop-opacity="0.12" />
    </radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.7" />
      <stop offset="1" stop-color="${p.c}" stop-opacity="0.9" />
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${Math.round(w * 0.06)}" />
    </filter>
  </defs>
  ${body.join('\n')}
</svg>`;
}

const jobs = [
  { file: 'images/hero/hero.webp', w: 1400, h: 1600, palette: 'glass', variant: 'portrait' },
  { file: 'images/hero/team.webp', w: 1600, h: 1200, palette: 'navy', variant: 'office' },
  { file: 'images/hero/sustainability.webp', w: 1600, h: 1200, palette: 'green', variant: 'green' },
  { file: 'images/hero/contact.webp', w: 1600, h: 1200, palette: 'bright', variant: 'office' },
  {
    file: 'images/services/bueroreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'bright',
    variant: 'office',
  },
  {
    file: 'images/services/unterhaltsreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'warm',
    variant: 'floor',
  },
  {
    file: 'images/services/glasreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'glass',
    variant: 'glass',
  },
  {
    file: 'images/services/treppenhausreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'warm',
    variant: 'stairs',
  },
  {
    file: 'images/services/grundreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'navy',
    variant: 'floor',
  },
  {
    file: 'images/services/sonderreinigung.webp',
    w: 1200,
    h: 900,
    palette: 'navy',
    variant: 'default',
  },
  { file: 'images/cases/office.webp', w: 1600, h: 1000, palette: 'bright', variant: 'office' },
  { file: 'images/cases/medical.webp', w: 1600, h: 1000, palette: 'glass', variant: 'default' },
  { file: 'images/cases/property.webp', w: 1600, h: 1000, palette: 'warm', variant: 'stairs' },
  { file: 'images/before-after/before.webp', w: 1600, h: 1000, palette: 'dull', variant: 'dull' },
  { file: 'images/before-after/after.webp', w: 1600, h: 1000, palette: 'glass', variant: 'office' },
];

for (const job of jobs) {
  const target = out(job.file);
  await mkdir(dirname(target), { recursive: true });
  await sharp(Buffer.from(svg(job)))
    .webp({ quality: 82, effort: 5 })
    .toFile(target);
  console.log('✓', job.file);
}

// Apple Touch Icon aus dem App-Icon
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="180" height="180"><rect width="40" height="40" fill="#0b1329"/><path d="M11 20.5 20 12l9 8.5" fill="none" stroke="#ee6212" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.5 19v8.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V19" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="m16.75 23.5 2.3 2.3 4.5-4.6" fill="none" stroke="#ee6212" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
await sharp(Buffer.from(iconSvg)).png().toFile(join(root, 'src/app/apple-icon.png'));
console.log('✓ src/app/apple-icon.png');
