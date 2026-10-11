import type { ElementType, ReactNode } from 'react';

/* ---------------------------------------------------------------------------
 * Layout primitives
 * A single container + section rhythm used by every page, so gutters,
 * max-widths and vertical spacing stay consistent across the site.
 * ------------------------------------------------------------------------- */

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** `wide` for full editorial grids, `narrow` for long-form reading. */
  width?: 'default' | 'narrow' | 'wide';
};

const widths = {
  narrow: 'max-w-3xl',
  default: 'max-w-[76rem]',
  wide: 'max-w-[86rem]',
} as const;

export function Container({ children, className = '', width = 'default' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  /** Vertical rhythm. `tight` for adjacent related blocks. */
  spacing?: 'tight' | 'default' | 'loose';
  'aria-labelledby'?: string;
};

const spacings = {
  tight: 'py-14 sm:py-16',
  default: 'py-20 sm:py-24 lg:py-28',
  loose: 'py-24 sm:py-32 lg:py-36',
} as const;

export function Section({
  children,
  className = '',
  id,
  as: Tag = 'section',
  spacing = 'default',
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={`${spacings[spacing]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
 * Eyebrow — small uppercase label that opens a section.
 * Uses a short rule rather than a pill badge to stay editorial.
 * ------------------------------------------------------------------------- */

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-[var(--color-accent)]/45" />
      {children}
    </p>
  );
}
