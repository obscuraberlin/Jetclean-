'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Award, Building2, Star, Users } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { siteConfig } from '@/content/site';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Vertrauensleiste wie im Onlineshop: Gesichter, „+“, Sterne mit Bewertung –
 * dazu drei Fakten mit Zählanimation. Ersetzt die reine Zahlenzeile.
 */
export function TrustBar() {
  const reviews = siteConfig.reviews;
  const reduce = useReducedMotion();
  const facts = [
    {
      icon: Award,
      value: company.yearsOfExperience,
      suffix: '+',
      label: 'Jahre Erfahrung',
      text: `Familienunternehmen seit ${company.foundedYear} in Berlin.`,
    },
    {
      icon: Users,
      value: company.employees,
      suffix: '',
      label: 'Mitarbeitende',
      text: 'Feste, eingearbeitete Teams für Ihr Objekt.',
    },
    {
      icon: Building2,
      value: company.locations,
      suffix: '',
      label: 'Standorte in Deutschland',
      text: 'Zentrale in Berlin-Neukölln.',
    },
  ];
  const rating = reviews?.rating ?? 0;

  return (
    <section className="relative overflow-hidden section-y" aria-label="Bewertungen und Fakten">
      <div aria-hidden="true" className="blob -top-24 right-[10%] size-[22rem] bg-brand-500/15" />
      <div className="relative container-site">
        <Reveal>
          {reviews ? (
            <a
              href={reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl border border-line bg-white/85 px-6 py-6 text-center shadow-card backdrop-blur sm:flex-row sm:justify-center sm:gap-6 sm:px-10"
              aria-label={`${rating.toFixed(1).replace('.', ',')} von 5 Sternen bei ${reviews.count} Bewertungen auf ${reviews.platform} ${reviews.platformsNote}`}
            >
              {/* Gesichter + Plus */}
              <motion.ul
                className="flex items-center"
                variants={reduce ? undefined : staggerContainer(0.12)}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={viewportOnce}
                aria-hidden="true"
              >
                {reviews.avatars.map((avatar, index) => (
                  <motion.li
                    key={avatar.src}
                    variants={reduce ? undefined : popIn}
                    className="relative -ml-3 size-12 overflow-hidden rounded-full border-[3px] border-white bg-surface shadow-soft first:ml-0 sm:size-14"
                    style={{ zIndex: 10 - index }}
                  >
                    <Image src={avatar.src} alt="" fill sizes="56px" className="object-cover" />
                  </motion.li>
                ))}
                <motion.li
                  variants={reduce ? undefined : popIn}
                  className="relative -ml-3 flex size-12 items-center justify-center rounded-full border-[3px] border-white bg-brand-500 font-display text-sm font-bold text-white shadow-brand sm:size-14"
                >
                  +{Math.max(0, reviews.count - reviews.avatars.length)}
                </motion.li>
              </motion.ul>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-navy-950">
                    {rating.toFixed(1).replace('.', ',')}
                  </span>
                  <Stars rating={rating} reduce={reduce} />
                </div>
                <p className="mt-1 text-sm text-muted transition-colors group-hover:text-navy-900">
                  <span className="font-semibold text-navy-900">{reviews.count} Bewertungen</span>{' '}
                  auf {reviews.platform} {reviews.platformsNote}
                </p>
              </div>
            </a>
          ) : null}
        </Reveal>

        {/* Drei Fakten als Karten – angeordnet wie „Ihre Vorteile“ */}
        <motion.ul
          className="mt-6 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-4 lg:gap-5"
          variants={reduce ? undefined : staggerContainer(0.1)}
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
        >
          {facts.map((fact) => (
            <motion.li
              key={fact.label}
              variants={reduce ? undefined : fadeUp}
              className="flex card-hover flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 text-center shadow-soft sm:gap-3 sm:rounded-3xl sm:p-6"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 sm:size-11 sm:rounded-xl">
                <fact.icon className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                <AnimatedNumber value={fact.value} suffix={fact.suffix} />
              </span>
              <span className="text-xs leading-snug font-semibold text-navy-900 sm:text-base">
                {fact.label}
              </span>
              <span className="hidden text-sm leading-relaxed text-muted sm:block">
                {fact.text}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

const popIn = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 22 },
  },
} as const;

/** Sterne, die nacheinander aufleuchten – der letzte Stern wird anteilig gefüllt. */
function Stars({ rating, reduce }: { rating: number; reduce: boolean }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <motion.span
            key={i}
            className="relative block size-5 text-line-strong"
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.25 + i * 0.09, type: 'spring', stiffness: 420, damping: 20 }}
          >
            <Star className="absolute inset-0 size-5 fill-current" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-5 fill-current text-brand-500" />
            </span>
          </motion.span>
        );
      })}
    </span>
  );
}
