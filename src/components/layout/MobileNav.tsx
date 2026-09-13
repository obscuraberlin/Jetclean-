'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useRef } from 'react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { company } from '@/content/company';
import { mainNavigation } from '@/content/navigation';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn, telHref } from '@/lib/utils';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

/** Kompaktes Mobile-Menü unterhalb des Headers – Fokus-Trap, Escape, Scroll-Lock. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useScrollLock(open);
  useFocusTrap(panelRef, open, { onEscape: onClose, inertRootId: 'main' });

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Menü schließen"
            tabIndex={-1}
            className="fixed inset-0 top-16 z-40 bg-navy-950/40 xl:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-white shadow-lift xl:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-nav"
          >
            <nav aria-label="Mobile Navigation" className="container-site py-3">
              <ul className="divide-y divide-line">
                {mainNavigation.map((item) => {
                  const active =
                    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between py-3.5 text-[0.9375rem] font-semibold transition-colors',
                          active ? 'text-brand-600' : 'text-navy-900 hover:text-brand-600',
                        )}
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-navy-300" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 grid gap-3 pb-2">
                <QuoteButton source="mobile-nav" className="w-full" />
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a
                    href={telHref(company.contact.phoneE164)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line-strong font-semibold text-navy-900"
                  >
                    <Phone className="size-4 text-brand-500" aria-hidden="true" />
                    Anrufen
                  </a>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line-strong font-semibold text-navy-900"
                  >
                    <Mail className="size-4 text-brand-500" aria-hidden="true" />
                    E-Mail
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
