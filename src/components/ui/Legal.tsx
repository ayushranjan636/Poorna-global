import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section } from './Layout';
import { PageHeader } from './PageHeader';
import { TextLink } from './Button';
import { company } from '../../content/site';

/* ---------------------------------------------------------------------------
 * Legal document primitives
 * Shared layout and typography for the policy pages, at a readable measure.
 * ------------------------------------------------------------------------- */

export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="display-md mt-12 first:mt-0">{children}</h2>;
}

export function LegalText({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[var(--color-ink-soft)]">{children}</p>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 text-[1.0625rem] leading-[1.7] text-[var(--color-ink-soft)]"
        >
          <span
            aria-hidden="true"
            className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-sage-deep)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalPage({
  title,
  intro,
  children,
  otherDocument,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  otherDocument: { label: string; to: string };
}) {
  const updated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={intro} />

      <Section>
        <Container width="narrow">
          <p className="text-[0.875rem] text-[var(--color-muted)]">Last updated: {updated}</p>

          <div className="mt-10">{children}</div>

          {/* Contact — no postal address or telephone number is published,
              because none is verified in the firm's existing material. */}
          <div className="mt-14 rounded-[var(--radius-md)] bg-[var(--color-mist)] p-7">
            <h2 className="heading-sm">Questions about this document</h2>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
              Please get in touch and we will direct your enquiry to the right person at{' '}
              {company.legalName}.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <TextLink to="/contact">Contact us</TextLink>
              <TextLink href={company.linkedin}>{company.name} on LinkedIn</TextLink>
            </div>
          </div>

          <div className="mt-10 border-t border-[var(--color-line-strong)] pt-6">
            <Link
              to={otherDocument.to}
              className="text-[0.9375rem] font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              {otherDocument.label}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
