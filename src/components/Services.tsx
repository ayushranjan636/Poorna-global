import { Container, Eyebrow, Section } from './ui/Layout';
import { TextLink } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { services } from '../content/site';

/* ---------------------------------------------------------------------------
 * Services — homepage overview
 *
 * Deliberately a teaser, not a duplicate. Each row carries a title and a
 * single distinct line; the problem statement, deliverables and capability
 * list live only on the Services page, which is where a visitor goes next.
 *
 * Minimal at rest: hovering slides the row and reveals its one-line summary.
 * ------------------------------------------------------------------------- */

export default function Services() {
  const head = useReveal<HTMLDivElement>();

  return (
    <Section id="services" aria-labelledby="services-heading">
      <Container>
        <div ref={head.ref} style={head.style} className={`${head.className} max-w-2xl`}>
          <Eyebrow>What we do</Eyebrow>
          <h2 id="services-heading" className="display-lg mt-6">
            Six practices, one engagement
          </h2>
          <p className="lead mt-5">
            Each addresses a specific point where projects stall. Most engagements draw on
            more than one.
          </p>
        </div>

        <ul className="mt-14 border-t border-[var(--color-line-strong)]">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 50}>
              <article
                tabIndex={0}
                className="group relative isolate block border-b border-[var(--color-line)] px-3 py-5 outline-none transition-colors duration-500 ease-[var(--ease-glass)] sm:px-5"
              >
                {/* Wash sweeping in from the leading edge. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-[var(--radius-sm)] bg-gradient-to-r from-[var(--color-mist)] via-[var(--color-mist)] to-transparent transition-transform duration-[650ms] ease-[var(--ease-glass)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />

                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="numeric text-[0.8125rem] font-medium text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="flex-1 font-[var(--font-display)] text-[clamp(1.3rem,1.1rem+0.8vw,1.85rem)] leading-tight tracking-[-0.016em] text-[var(--color-ink)] transition-transform duration-500 ease-[var(--ease-glass)] group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    {service.title}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="mt-1 hidden h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-accent)] transition-all duration-500 ease-[var(--ease-glass)] group-hover:border-[var(--color-sage-deep)] group-hover:bg-[var(--color-sage)]/60 group-hover:rotate-90 md:grid"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    >
                      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
                    </svg>
                  </span>
                </div>

                {/* One-line summary, disclosed on hover. */}
                <div className="disclose grid grid-rows-[1fr] transition-[grid-template-rows] duration-[600ms] ease-[var(--ease-glass)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="disclose-body pt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-muted)] md:pl-[2.9rem] md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100 md:group-hover:delay-100 md:group-focus-visible:opacity-100">
                      {service.teaser}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10">
          <TextLink to="/services">How each practice works</TextLink>
        </div>
      </Container>
    </Section>
  );
}
