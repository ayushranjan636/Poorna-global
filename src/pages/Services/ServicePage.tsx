import { Container, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import Approach from '../../components/Approach';
import CTASection from '../../components/CTASection';
import { services } from '../../content/site';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * ServicePage
 * Full detail for each practice: the problem, the value, capabilities.
 * Anchored sections with a sticky index on large screens.
 * ------------------------------------------------------------------------- */

export default function ServicePage() {
  usePageMeta({
    title: 'Services | Poorna Global Strategies',
    description:
      'Project conceptualization and management, cross-border transactions, joint ventures, government and policy advisory, global energy transitions and investment facilitation.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="How each practice works"
        intro="For every practice: the problem it exists to solve, what we actually deliver, and the capabilities involved."
      >
        <Button to="/contact" size="lg" withArrow>
          Discuss your project
        </Button>
      </PageHeader>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
            {/* Sticky index */}
            <nav aria-label="Services index" className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                Practices
              </h2>
              <ol className="mt-4 space-y-1">
                {services.map((service, index) => (
                  <li key={service.id}>
                    <a
                      href={`#${service.id}`}
                      className="group flex gap-3 rounded-[var(--radius-xs)] py-2 text-[0.875rem] leading-snug text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      <span className="numeric text-[var(--color-muted)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="underline-offset-4 group-hover:underline">
                        {service.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Detail */}
            <div className="space-y-16">
              {services.map((service, index) => (
                <Reveal
                  as="article"
                  key={service.id}
                  delay={index * 40}
                  className="scroll-mt-32 border-t border-[var(--color-line-strong)] pt-8"
                >
                  <div id={service.id} className="scroll-mt-32">
                    <p className="numeric text-[0.8125rem] font-medium text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    <h2 className="display-md mt-3 max-w-2xl">{service.title}</h2>

                    <div className="mt-6 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                          The problem
                        </h3>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-soft)]">
                          {service.problem}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                          What we deliver
                        </h3>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-ink-soft)]">
                          {service.value}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 rounded-[var(--radius-md)] bg-[var(--color-mist)] p-6">
                      <h3 className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                        Capabilities
                      </h3>
                      <ul className="mt-3.5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex gap-2.5 text-[0.9375rem] text-[var(--color-ink-soft)]"
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 16 16"
                              className="mt-[0.4rem] h-3 w-3 shrink-0 text-[var(--color-accent)]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2.5 8.5 6 12l7.5-8" />
                            </svg>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <div className="bg-[var(--color-mist)]">
        <Approach />
      </div>

      <CTASection variant="services" />    </>
  );
}
