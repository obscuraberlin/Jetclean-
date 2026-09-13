'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowRight, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useQuote } from '@/components/quote/QuoteProvider';
import { company } from '@/content/company';
import { track } from '@/lib/analytics';
import { telHref } from '@/lib/utils';

/**
 * Sticky CTA am unteren Rand (nur Mobile/Tablet). Erscheint nach dem Hero,
 * verschwindet, sobald der Footer sichtbar ist oder ein Dialog offen ist.
 */
export function MobileCTA() {
  const { open, isOpen } = useQuote();
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(Boolean(entry?.isIntersecting)),
      {
        rootMargin: '0px 0px -40px 0px',
      },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !footerVisible && !isOpen;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          initial={reduce ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          data-testid="mobile-cta"
        >
          <div className="container-site flex h-[var(--mobile-cta-height)] items-center gap-3">
            <button
              type="button"
              onClick={() => {
                track('cta_click', { source: 'sticky-mobile' });
                open('sticky-mobile');
              }}
              className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 text-[0.9375rem] font-semibold text-white shadow-brand transition-colors hover:bg-brand-600"
            >
              Kostenloses Angebot
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <a
              href={telHref(company.contact.phoneE164)}
              onClick={() => track('phone_click', { source: 'sticky-mobile' })}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-navy-900"
              aria-label={`Anrufen: ${company.contact.phoneDisplay}`}
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
