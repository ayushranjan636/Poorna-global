import type { ReactNode } from 'react';
import { Container, Eyebrow } from './Layout';
import { useReveal } from './useReveal';

/* ---------------------------------------------------------------------------
 * PageHeader
 * Shared opening block for inner pages. Keeps the pale-green wash, type scale
 * and navbar clearance consistent everywhere.
 * ------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <header className="hero-wash border-b border-[var(--color-line)] pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <div ref={reveal.ref} style={reveal.style} className={reveal.className}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display-xl mt-6 max-w-3xl">{title}</h1>
          {intro && <p className="lead mt-7 max-w-2xl">{intro}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
