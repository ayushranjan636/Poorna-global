import { company } from '../../content/site';

/* ---------------------------------------------------------------------------
 * Logo
 *
 * Single source of truth for the brand artwork so every surface draws from the
 * same files and the same sizing rules.
 *
 *   variant="lockup"  mark + "POORNA / GLOBAL STRATEGIES"  — headers, footers
 *   variant="mark"    the PG monogram alone                — tight spaces
 *
 *   tone="dark"       ink + brand green, for white/mist surfaces
 *   tone="light"      solid white, for the brand green surface and photography
 *
 * `height` is the rendered height in CSS pixels. The source PNGs are supplied
 * well above 2x for every size used here, so they stay crisp on retina.
 * ------------------------------------------------------------------------- */

type LogoVariant = 'lockup' | 'mark';
type LogoTone = 'dark' | 'light';

/* Intrinsic aspect ratios of the generated artwork, used to reserve layout
   space so the logo never causes a reflow while the image decodes. */
const ART = {
  'lockup-dark': { src: '/brand/poorna-logo.png', ratio: 760 / 222 },
  'lockup-light': { src: '/brand/poorna-logo-light.png', ratio: 760 / 217 },
  'mark-dark': { src: '/brand/poorna-mark.png', ratio: 1 },
  'mark-light': { src: '/brand/poorna-mark-light.png', ratio: 1 },
} as const;

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Rendered height in pixels. */
  height?: number;
  className?: string;
  /** Set when the logo sits next to the company name in text. */
  decorative?: boolean;
  priority?: boolean;
};

export default function Logo({
  variant = 'lockup',
  tone = 'dark',
  height = 32,
  className = '',
  decorative = false,
  priority = false,
}: LogoProps) {
  const { src, ratio } = ART[`${variant}-${tone}`];

  return (
    <img
      src={src}
      alt={decorative ? '' : `${company.legalName} logo`}
      aria-hidden={decorative || undefined}
      width={Math.round(height * ratio)}
      height={height}
      style={{ height, width: 'auto' }}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={`block select-none ${className}`}
      draggable={false}
    />
  );
}
