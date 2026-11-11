import { Container, Eyebrow, Section } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { organisationGroups } from '../content/site';

/* ---------------------------------------------------------------------------
 * Organisations
 *
 * Partners, collaborators and clients, set typographically in three columns.
 *
 * Deliberately not a logo wall: we hold permission for only a handful of the
 * marks, and a grid of mismatched, low-resolution logos reads as weaker
 * evidence than the names themselves. Names with a supplied website become
 * links; the rest are plain text rather than dead links.
 * ------------------------------------------------------------------------- */

export default function Organisations() {
  const head = useReveal<HTMLDivElement>();

  return (
    <Section aria-labelledby="organisations-heading" className="bg-[var(--color-mist)]">
      <Container>
        <div ref={head.ref} style={head.style} className={`${head.className} max-w-2xl`}>
          <Eyebrow>Partners, collaborators & clients</Eyebrow>
          <h2 id="organisations-heading" className="display-lg mt-6">
            The organisations around our work
          </h2>
          <p className="lead mt-5">
            We deliver alongside partner firms, collaborate with research and modelling
            institutions, and work for clients across energy, agriculture, robotics and
            financial services.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line-strong)] bg-[var(--color-line-strong)] lg:grid-cols-3">
          {organisationGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 80} className="bg-white">
              <div className="flex h-full flex-col p-7 sm:p-8">
                <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-[var(--color-brand)]">
                  {group.heading}
                </h3>

                <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--color-muted)]">
                  {group.blurb}
                </p>

                <ul className="mt-6 space-y-0.5 border-t border-[var(--color-line)] pt-2">
                  {group.items.map((item) => (
                    <li key={`${group.id}-${item.name}`}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-[var(--radius-xs)] py-2 text-[0.9375rem] text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]"
                        >
                          <span className="underline-offset-4 group-hover:underline">
                            {item.name}
                          </span>
                          {/* Outbound indicator, so a linked name is
                              distinguishable from a plain one at a glance. */}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-brand)]"
                          >
                            <path d="M5.5 10.5 10.5 5.5M6 5.5h4.5V10" />
                          </svg>
                        </a>
                      ) : (
                        <span className="block py-2 text-[0.9375rem] text-[var(--color-ink-soft)]">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
