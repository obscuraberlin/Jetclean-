import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { company, fullAddress } from '@/content/company';
import { footerNavigation } from '@/content/navigation';
import { services } from '@/content/services';
import { telHref } from '@/lib/utils';
import { SocialIcon } from './SocialIcon';

const socialLabels: Record<(typeof company.social)[number]['platform'], string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  xing: 'Xing',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="border-t border-line bg-surface" data-testid="footer">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Professionelle Gebäudereinigung für Unternehmen in {company.address.city} – seit über{' '}
              {company.yearsOfExperience} Jahren.
            </p>
            {company.social.length > 0 ? (
              <ul className="mt-5 flex gap-2" aria-label="Social Media">
                {company.social.map((profile) => (
                  <li key={profile.platform}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-navy-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                      aria-label={`${company.shortName} auf ${socialLabels[profile.platform]}`}
                    >
                      <SocialIcon platform={profile.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <FooterColumn title="Leistungen">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/leistungen/${service.slug}`}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Unternehmen">
            {footerNavigation.company.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Rechtliches">
            {footerNavigation.legal.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Kontakt" className="col-span-2 sm:col-span-1 lg:col-span-1">
            <li>
              <a
                href={telHref(company.contact.phoneE164)}
                className="group inline-flex items-start gap-2.5 text-navy-800 hover:text-brand-600"
              >
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{company.contact.phoneDisplay}</span>
                  {company.openingHours ? (
                    <span className="block text-xs text-muted">{company.openingHours.display}</span>
                  ) : null}
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.contact.email}`}
                className="inline-flex items-center gap-2.5 text-navy-800 hover:text-brand-600"
              >
                <Mail className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                {company.contact.email}
              </a>
            </li>
            <li>
              <address className="inline-flex items-start gap-2.5 text-navy-800 not-italic">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span>
                  {company.name}
                  <br />
                  {fullAddress}
                </span>
              </address>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Alle Rechte vorbehalten.
          </p>
          <p>Gebäudereinigung in {company.serviceArea.label}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="mb-3 text-xs font-semibold tracking-[0.14em] text-navy-950 uppercase">
        {title}
      </h2>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-navy-700 transition-colors hover:text-brand-600">
        {children}
      </Link>
    </li>
  );
}
