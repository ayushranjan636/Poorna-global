import type { ElementType, ReactNode } from 'react';
import { useReveal } from './useReveal';

/* ---------------------------------------------------------------------------
 * Reveal
 * Wrapper for the common scroll-reveal case. See `useReveal` for the hook.
 * ------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const reveal = useReveal<HTMLDivElement>(delay);

  return (
    <Tag ref={reveal.ref} style={reveal.style} className={`${reveal.className} ${className}`}>
      {children}
    </Tag>
  );
}
