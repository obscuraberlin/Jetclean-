import Image from 'next/image';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';

/** Die Erfahrung bekommt einen eigenen Moment – groß, ruhig, mit einem Detailfoto. */
export function Experience() {
  return (
    <section className="bg-surface py-20 sm:py-28 lg:py-36" aria-labelledby="experience-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-display text-[7rem] leading-[0.85] font-extrabold tracking-[-0.06em] text-navy-950 sm:text-[10rem] lg:text-[13rem]">
              <AnimatedNumber value={company.yearsOfExperience} suffix="+" durationMs={1400} />
            </p>
            <h2 id="experience-title" className="mt-4 text-3xl sm:text-4xl">
              Jahre Erfahrung.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-700">
              Über zwei Jahrzehnte Erfahrung in der professionellen Gebäudereinigung für Berliner
              Unternehmen – familiengeführt, in allen zwölf Bezirken.
            </p>
          </Reveal>
        </div>
        <Reveal variant="image" className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:aspect-[16/11]">
            <Image
              src="/images/services/glasreinigung.webp"
              alt="JETCLEAN Mitarbeiterin bei der Glasreinigung vor der Berliner Skyline"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
