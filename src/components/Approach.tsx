import { Container, Eyebrow, Section } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { approach } from '../content/site';

/* ---------------------------------------------------------------------------
 * Approach
 * Horizontal five-stage process on desktop with a thin connecting rule;
 * vertical timeline on mobile. Numbers, typography and one line — no cards.
 * ------------------------------------------------------------------------- */

export default function Approach() {
  const head = useReveal<HTMLDivElement>();

  return (
    <Section id="approach" aria-labelledby="approach-heading">
      <Container>
        <div ref={head.ref} style={head.style} className={`${head.className} max-w-2xl`}>
          <Eyebrow>How we work</Eyebrow>
          <h2 id="approach-heading" className="display-lg mt-6">
            From first conversation to delivery
          </h2>
          <p className="lead mt-5">
            The same team carries an engagement through all five stages. Nothing is handed
            to a different firm halfway.
          </p>
        </div>

        {/* Desktop: horizontal with a connecting rule.
            Mobile: vertical timeline with a left spine. */}
        <ol className="relative mt-14 grid gap-y-8 lg:grid-cols-5 lg:gap-x-8">
          {/* Horizontal rule behind the desktop markers */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-[var(--color-line-strong)] lg:block"
          />
          {/* Vertical spine for mobile */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--color-line-strong)] lg:hidden"
          />

          {approach.map((stage, index) => (
            <Reveal as="li" key={stage.step} delay={index * 80} className="relative pl-9 lg:pl-0">
              {/* Marker */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-[var(--color-sage-deep)] bg-white lg:static lg:mb-6"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-[var(--color-accent)]" />
              </span>

              <p className="numeric text-[0.8125rem] font-medium text-[var(--color-accent)]">
                {stage.step}
              </p>
              <h3 className="heading-sm mt-2">{stage.title}</h3>
              <p className="mt-2.5 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--color-muted)] lg:max-w-none">
                {stage.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
