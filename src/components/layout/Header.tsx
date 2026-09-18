'use client';

import { ChevronRight, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { useQuote } from '@/components/quote/QuoteProvider';
import { company } from '@/content/company';
import { mainNavigation } from '@/content/navigation';
import { track } from '@/lib/analytics';
import { cn, telHref } from '@/lib/utils';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openQuote } = useQuote();
  const headerRef = useRef<HTMLElement>(null);
  /**
   * Bei offenem Menü fixiert die Scroll-Sperre den Body (position: fixed, top: -scrollY).
   * Ein sticky Header würde dabei aus dem Bild rutschen – deshalb wird er solange
   * selbst fixiert und ein Platzhalter hält das Layout dahinter stabil.
   */
  const [lockedHeight, setLockedHeight] = useState(0);
  const toggleMenu = () => {
    if (!menuOpen) setLockedHeight(headerRef.current?.offsetHeight ?? 0);
    setMenuOpen((open) => !open);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menü bei Navigation schließen (State-Abgleich während des Renderns statt Effekt)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {menuOpen ? <div aria-hidden="true" style={{ height: lockedHeight }} /> : null}
      <header
        ref={headerRef}
        className={cn(
          'top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
          menuOpen ? 'fixed' : 'sticky',
          scrolled || menuOpen
            ? 'border-line bg-white/85 shadow-[0_1px_0_rgb(11_19_41/0.02),0_8px_24px_-16px_rgb(11_19_41/0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/75'
            : 'border-transparent bg-white lg:bg-white/0',
        )}
        data-scrolled={scrolled ? 'true' : 'false'}
      >
        {/* Mobil/Tablet: schmale Leiste – Telefon links, Angebot als klarer Block rechts */}
        <div className="relative z-50 flex h-11 items-stretch justify-between border-b border-line bg-white lg:hidden">
          <a
            href={telHref(company.contact.phoneE164)}
            onClick={() => track('phone_click', { source: 'header-mobile' })}
            className="flex items-center gap-2 pl-5 text-[0.8125rem] font-semibold whitespace-nowrap text-navy-900 sm:pl-6"
          >
            <Phone className="size-4 text-brand-500" aria-hidden="true" />
            {company.contact.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              track('cta_click', { source: 'header-mobile' });
              openQuote('header-mobile');
            }}
            className="flex items-center gap-1 bg-brand-500 pr-4 pl-5 text-[0.8125rem] font-bold tracking-[0.06em] text-white uppercase transition-colors hover:bg-brand-600"
            data-quote-source="header-mobile"
            data-testid="header-quote-mobile"
          >
            Angebot anfordern
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div
          className={cn(
            'relative z-50 container-site flex items-center justify-between gap-4 bg-white transition-[height] duration-300 ease-(--ease-premium) lg:bg-transparent 2xl:gap-10',
            scrolled ? 'h-14 lg:h-[4.75rem]' : 'h-[4.25rem] lg:h-24 2xl:h-28',
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Hauptnavigation" className="hidden xl:block">
            <ul className="flex items-center gap-1 2xl:gap-4">
              {mainNavigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative inline-flex h-10 items-center rounded-full px-2.5 text-sm font-medium whitespace-nowrap transition-colors 2xl:px-4 2xl:text-base',
                        active ? 'text-navy-950' : 'text-navy-700 hover:text-navy-950',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-2 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-300 ease-(--ease-premium) 2xl:inset-x-3',
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 2xl:gap-5">
            <a
              href={telHref(company.contact.phoneE164)}
              onClick={() => track('phone_click', { source: 'header' })}
              className="hidden items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold whitespace-nowrap text-navy-900 transition-colors hover:text-brand-600 xl:inline-flex"
            >
              <Phone className="size-4 text-brand-500" aria-hidden="true" />
              {company.contact.phoneDisplay}
            </a>
            <a
              href={telHref(company.contact.phoneE164)}
              onClick={() => track('phone_click', { source: 'header-tablet' })}
              className="hidden size-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-surface lg:inline-flex xl:hidden"
              aria-label={`Anrufen: ${company.contact.phoneDisplay}`}
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <QuoteButton
              source="header"
              size="sm"
              className="hidden shrink-0 px-4 lg:inline-flex"
              withIcon={false}
            >
              Kostenloses Angebot
            </QuoteButton>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-surface xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              onClick={toggleMenu}
              data-testid="menu-toggle"
            >
              {menuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      </header>
    </>
  );
}
