import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cn, initials } from '@/lib/utils';

export type AvatarTone = 'navy' | 'brand' | 'success';

type AvatarProps = {
  name: string;
  /** Echtes Foto (optional). Ohne Foto werden Initialen auf farbigem Verlauf gezeigt. */
  src?: string | null;
  tone?: AvatarTone;
  className?: string;
  /** Pixelgröße für das Foto (sizes-Attribut) */
  sizes?: string;
  style?: CSSProperties;
};

const tones: Record<AvatarTone, string> = {
  navy: 'bg-gradient-to-br from-navy-700 to-navy-950 text-white',
  brand: 'bg-gradient-to-br from-brand-400 to-brand-600 text-white',
  success: 'bg-gradient-to-br from-success-500 to-success-700 text-white',
};

/** Runder Avatar: Foto oder Initialen – wie bei Bewertungsplattformen ohne Profilbild. */
export function Avatar({
  name,
  src,
  tone = 'navy',
  className,
  sizes = '56px',
  style,
}: AvatarProps) {
  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold select-none',
        !src && tones[tone],
        className,
      )}
      aria-hidden="true"
      style={style}
    >
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="text-[0.85em] tracking-wide">{initials(name)}</span>
      )}
    </span>
  );
}
