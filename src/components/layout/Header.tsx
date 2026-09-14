'use client';

import { Menu, Star, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { company } from '@/content/company';
import { mainNavigation } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';
import { cn, telHref } from '@/lib/utils';
import { MobileNav } from './MobileNav';

/**
 * Schwebender Header: beim Laden transparent auf Warmweiß, beim Scrollen kompakter,
 * mit milchigem Hintergrund und sehr weichem Schatten.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const reviews = siteConfig.reviews;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-(--ease-premium)',
        scrolled || menuOpen
          ? 'bg-[#fdfcfa]/80 shadow-[0_12px_40px_-24px_rgb(20_18_14/0.35)] backdrop-blur-xl'
          : 'bg-[#fdfcfa]/0',
      )}
      data-scrolled={scrolled ? 'true' : 'false'}
    >
      <div
        className={cn(
          'container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-(--ease-premium)',
          scrolled ? 'h-16' : 'h-[4.5rem] lg:h-[5.5rem]',
        )}
      >
        <Logo compact={scrolled} />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative inline-flex h-9 items-center text-[0.9rem] font-medium whitespace-nowrap transition-colors',
                      active ? 'text-navy-950' : 'text-navy-600 hover:text-navy-950',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-navy-950 transition-transform duration-400 ease-(--ease-premium)',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          {reviews ? (
            <a
              href={reviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-navy-600 transition-colors hover:text-navy-950 xl:inline-flex"
              aria-label={`${reviews.rating.toFixed(1).replace('.', ',')} von 5 Sternen bei ${reviews.count} Bewertungen auf ${reviews.platform}`}
            >
              <span className="flex items-center gap-px text-brand-500" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              <span className="font-medium capitalize">{reviews.platform}</span>
            </a>
          ) : null}
          <a
            href={telHref(company.contact.phoneE164)}
            onClick={() => track('phone_click', { source: 'header' })}
            className="hidden text-sm font-semibold whitespace-nowrap text-navy-950 transition-colors hover:text-brand-600 lg:inline-flex"
          >
            {company.contact.phoneDisplay}
          </a>
          <QuoteButton source="header" size="sm" className="hidden sm:inline-flex" withIcon={false}>
            Angebot anfragen
          </QuoteButton>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-navy-950 transition-colors hover:bg-surface lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setMenuOpen((open) => !open)}
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
  );
}
