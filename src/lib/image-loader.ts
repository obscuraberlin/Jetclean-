/**
 * Bild-Loader für den statischen Export: liefert die Originaldatei mit vorangestelltem
 * Basis-Pfad (z. B. /Jetclean- auf GitHub Pages). Im normalen Betrieb (Vercel) wird der
 * Standard-Optimierer von Next.js verwendet – siehe next.config.ts.
 *
 * Für Einzeldatei-Vorschauen kann `window.__JC_IMG` Pfade auf eingebettete
 * data-URIs abbilden (wird nur gesetzt, wenn die Vorschau so gepackt wurde).
 */
type ImageMap = Record<string, string>;

export default function staticImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const inlined = (globalThis as { __JC_IMG?: ImageMap }).__JC_IMG;
  if (inlined?.[src]) return inlined[src];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return src.startsWith('/') ? `${basePath}${src}` : src;
}
