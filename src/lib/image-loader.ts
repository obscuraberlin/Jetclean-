/**
 * Bild-Loader für den statischen Export: liefert die Originaldatei mit vorangestelltem
 * Basis-Pfad (z. B. /Jetclean- auf GitHub Pages). Im normalen Betrieb (Vercel) wird der
 * Standard-Optimierer von Next.js verwendet – siehe next.config.ts.
 */
export default function staticImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return src.startsWith('/') ? `${basePath}${src}` : src;
}
