import { MapPin } from 'lucide-react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

/** Die zwölf Berliner Bezirke – JETCLEAN ist stadtweit tätig. */
export const berlinDistricts = [
  'Mitte',
  'Charlottenburg-Wilmersdorf',
  'Friedrichshain-Kreuzberg',
  'Pankow',
  'Tempelhof-Schöneberg',
  'Neukölln',
  'Steglitz-Zehlendorf',
  'Treptow-Köpenick',
  'Lichtenberg',
  'Marzahn-Hellersdorf',
  'Reinickendorf',
  'Spandau',
] as const;

type ServiceAreaProps = { className?: string; id?: string; withCta?: boolean };

export function ServiceArea({ className, id = 'einsatzgebiet', withCta = true }: ServiceAreaProps) {
  return (
    <section
      className={cn('bg-surface section-y-sm', className)}
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            id={`${id}-title`}
            eyebrow="Einsatzgebiet"
            title="In ganz Berlin für Sie da."
            text={`Unsere Teams sind objektnah eingeteilt – in allen zwölf Bezirken und auf Anfrage im Umland (${company.serviceArea.label}).`}
          />
          {withCta ? (
            <div className="mt-6">
              <QuoteButton source="service-area" size="md" />
            </div>
          ) : null}
        </div>
        <Reveal className="lg:col-span-7">
          <ul className="flex flex-wrap gap-2.5" aria-label="Berliner Bezirke">
            {berlinDistricts.map((district) => (
              <li
                key={district}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-navy-800 shadow-soft ring-1 ring-line"
              >
                <MapPin className="size-3.5 text-brand-500" aria-hidden="true" />
                {district}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
