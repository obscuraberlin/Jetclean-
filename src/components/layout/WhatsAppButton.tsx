'use client';

import { useQuote } from '@/components/quote/QuoteProvider';
import { company } from '@/content/company';
import { track } from '@/lib/analytics';
import { SocialIcon } from './SocialIcon';

/** Runder WhatsApp-Button unten rechts – über der mobilen Sticky-Leiste. */
export function WhatsAppButton() {
  const { isOpen } = useQuote();
  if (!company.contact.whatsapp || isOpen) return null;
  const href = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent('Guten Tag, ich interessiere mich für ein Reinigungsangebot.')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('cta_click', { source: 'whatsapp' })}
      className="fixed right-4 bottom-[calc(var(--mobile-cta-height)+1rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lift transition-transform duration-300 ease-(--ease-premium) hover:scale-105 lg:right-6 lg:bottom-6"
      aria-label="Per WhatsApp schreiben"
      data-testid="whatsapp"
    >
      <SocialIcon platform="whatsapp" className="size-7" />
    </a>
  );
}
