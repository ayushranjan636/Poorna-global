import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* ---------------------------------------------------------------------------
 * Button
 * Three restrained variants. Renders as <Link>, <a> or <button> depending on
 * the props supplied, so semantics always match behaviour.
 * ------------------------------------------------------------------------- */

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium ' +
  'transition-all duration-200 ease-[var(--ease-soft)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)] ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-ink)] text-white hover:bg-[var(--color-accent)] ' +
    'shadow-[0_1px_2px_rgb(23_26_23/0.1)] hover:shadow-[0_8px_22px_-10px_rgb(47_106_61/0.5)]',
  secondary:
    'border border-[var(--color-line-strong)] bg-white text-[var(--color-ink)] ' +
    'hover:border-[var(--color-sage-deep)] hover:bg-[var(--color-mist)]',
  quiet:
    'text-[var(--color-ink)] hover:bg-[var(--color-mist)] border border-transparent ' +
    'hover:border-[var(--color-line)]',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[0.9375rem]',
  lg: 'px-6 py-3 text-base',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Shows a chevron that nudges right on hover. */
  withArrow?: boolean;
};

type ButtonProps = CommonProps & {
  /** Internal route — renders react-router <Link>. */
  to?: string;
  /** External URL — renders <a> with safe rel attributes. */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
};

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  withArrow = false,
  to,
  href,
  type = 'button',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  );
}

/* ---------------------------------------------------------------------------
 * TextLink — inline link with an arrow that travels on hover.
 * ------------------------------------------------------------------------- */

export function TextLink({
  children,
  to,
  href,
  className = '',
  onClick,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const classes =
    'group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-[var(--color-accent)] ' +
    `underline-offset-4 transition-colors hover:text-[var(--color-accent-hover)] hover:underline ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
        <Arrow />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
      <Arrow />
    </a>
  );
}
