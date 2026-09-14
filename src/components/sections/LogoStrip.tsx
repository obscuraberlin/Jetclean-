import Image from 'next/image';
import { clientLogos } from '@/content/references';

/** Ruhige Vertrauenszeile direkt nach dem Hero – kein großer Titel, viel Weißraum. */
export function LogoStrip() {
  const items = [...clientLogos, ...clientLogos];
  return (
    <section className="py-14 sm:py-20 lg:py-24" aria-label="Kunden und Partner">
      <div className="container-site">
        <p className="text-center text-sm text-muted">Vertrauen von Unternehmen in Berlin</p>
        {/* Desktop: eine Zeile */}
        <ul
          className="mt-8 hidden items-center justify-between gap-10 md:flex"
          aria-label="Kundenlogos"
        >
          {clientLogos.map((logo) => (
            <li key={logo.name} className="shrink-0">
              <LogoItem name={logo.name} src={logo.src} />
            </li>
          ))}
        </ul>
        {/* Mobile: sehr langsames Band */}
        <div className="mt-7 scrollbar-none overflow-x-auto mask-fade-x md:hidden">
          <ul
            className="flex w-max items-center gap-10 motion-safe:animate-marquee"
            aria-hidden="true"
          >
            {items.map((logo, index) => (
              <li key={`${logo.name}-${index}`} className="shrink-0">
                <LogoItem name={logo.name} src={logo.src} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name, src }: { name: string; src?: string }) {
  if (!src) {
    return <span className="font-display text-sm font-extrabold text-navy-400">{name}</span>;
  }
  return (
    <Image
      src={src}
      alt={name}
      width={140}
      height={40}
      className="h-10 w-auto opacity-60 grayscale transition-[opacity,filter] duration-500 ease-(--ease-premium) hover:opacity-100 hover:grayscale-0 sm:h-11"
    />
  );
}
