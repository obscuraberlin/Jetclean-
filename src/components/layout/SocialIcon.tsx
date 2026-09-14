import type { SVGProps } from 'react';

type Platform = 'linkedin' | 'instagram' | 'youtube' | 'xing' | 'facebook' | 'tiktok' | 'whatsapp';

/** Markenicons als schlanke Inline-SVGs (Lucide führt keine Brand-Icons mehr). */
export function SocialIcon({
  platform,
  ...props
}: { platform: Platform } & SVGProps<SVGSVGElement>) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: false,
    ...props,
  } as const;
  switch (platform) {
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          {...common}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M16.6 2h-3.2v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.3a6.2 6.2 0 1 0 5.2 6.1V8.6a7.4 7.4 0 0 0 4.4 1.4V6.8A4.4 4.4 0 0 1 16.6 2Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.2 4.3c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.5 0 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.4-.5-.6-.5h-.5Z" />
        </svg>
      );
    case 'xing':
      return (
        <svg {...common}>
          <path d="M18.19 0c-.4 0-.58.25-.73.51 0 0-5.87 10.4-6.06 10.75l3.87 7.1c.14.26.36.51.77.51h2.72c.16 0 .29-.06.36-.17.07-.12.07-.28-.01-.43l-3.84-7.02 6.03-10.66c.08-.15.08-.31.01-.43-.07-.11-.2-.16-.36-.16h-2.76ZM5.4 5.33c-.16 0-.3.06-.37.17-.07.12-.06.28.02.43l1.85 3.19-2.9 5.11c-.08.15-.08.31-.01.43.07.11.2.17.36.17h2.72c.4 0 .6-.27.74-.52l2.94-5.2-1.88-3.27c-.14-.25-.34-.51-.75-.51H5.4Z" />
        </svg>
      );
  }
}
