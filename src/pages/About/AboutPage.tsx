import { Container, Eyebrow, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button, TextLink } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { useReveal } from '../../components/ui/useReveal';
import PersonCard from '../../components/visuals/PersonCard';
import CTASection from '../../components/CTASection';
import { directors, advisors, values } from '../../content/team';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * AboutPage
 *
 * The firm's position, its values, and the people. Portraits are visual at
 * rest and disclose each biography on hover or focus.
 *
 * The partnerships and press block is not repeated here — it belongs to the
 * homepage. This page links to it instead.
 * ------------------------------------------------------------------------- */

export default function AboutPage() {
  usePageMeta({
    title: 'About | Poorna Global Strategies',
    description:
      'Poorna Global Strategies brings strategy, operations and delivery into one team. Meet the board of directors and the mentor and advisory group.',
  });

  const story = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHeader
        eyebrow="About the firm"
        title="Visionary strategy, proven execution"
        intro="Poorna Global Strategies Pvt Ltd identifies, conceptualises, facilitates and implements projects across renewables, hydrogen, solar and derivatives, healthcare, policy planning for governments, business development and technology transfer."
      >
        <Button to="/contact" size="lg" withArrow>
          Get in touch
        </Button>
      </PageHeader>

      {/* Our story */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div ref={story.ref} style={story.style} className={story.className}>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="display-lg mt-6 max-w-xl">
                The gap we were built to close
              </h2>

              <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-soft)]">
                <p>
                  Most technology consulting firms deliver against problems the client has
                  already defined. But many businesses struggle to identify their core
                  challenge in the first place. So they engage a strategy firm for direction,
                  an audit or operations firm for process detail, and only then a technology
                  firm to implement what has been recommended.
                </p>
                <p>
                  That fragmentation loses information at every handoff. Insights are diluted,
                  alignment slips, and the inefficiency shows up in the outcome and in the
                  cost.
                </p>
                <p>
                  Ideally one firm would carry the full lifecycle — discovering and defining
                  the problem, developing strategy, analysing operations and delivering the
                  solution. Extreme specialisation has meant few firms do.
                </p>
                <p className="text-[var(--color-ink)]">
                  This is where Poorna Global Strategies comes in. We bring strategy,
                  operations and technology expertise together so problems are identified,
                  analysed and solved by one accountable team.
                </p>
              </div>
            </div>

            {/* Values */}
            <div>
              <figure>
                <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-mist)]">
                  <img
                    src="/media/operations-review.jpg"
                    alt="Poorna Global Strategies advisers during an operations review"
                    width={1600}
                    height={728}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              </figure>

              <dl className="mt-10 divide-y divide-[var(--color-line-strong)] border-t border-[var(--color-line-strong)]">
                {values.map((value, index) => (
                  <Reveal key={value.title} delay={index * 60} className="py-6">
                    <dt className="heading-sm">{value.title}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                      {value.body}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* People */}
      <Section className="bg-[var(--color-mist)]" aria-labelledby="people-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The people</Eyebrow>
            <h2 id="people-heading" className="display-lg mt-6">
              Senior practitioners, not a pyramid
            </h2>
            <p className="lead mt-5">
              Thirteen directors and advisers — former ambassadors, a retired senior banker,
              an economist inside the GTAP network, and operators from Siemens, Medtronic and
              AkzoNobel.{' '}
              <span className="hidden md:inline text-[var(--color-ink-soft)]">
                Hover a portrait to read their background.
              </span>
            </p>
          </div>

          <h3 className="mt-16 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
            Board of directors
          </h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((member, index) => (
              <Reveal key={member.id} delay={index * 55}>
                <PersonCard member={member} index={index} />
              </Reveal>
            ))}
          </div>

          <h3 className="mt-20 border-t border-[var(--color-line-strong)] pt-14 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
            Mentor & advisory group
          </h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((member, index) => (
              <Reveal key={member.id} delay={index * 45}>
                <PersonCard member={member} index={index} />
              </Reveal>
            ))}
          </div>

          {/* Points to the partnerships block rather than repeating it. */}
          <p className="mt-16 border-t border-[var(--color-line-strong)] pt-8 text-[0.9375rem] text-[var(--color-muted)]">
            Our institutional collaborations and press coverage are listed on the{' '}
            <TextLink to="/" className="align-baseline">
              home page
            </TextLink>
          </p>
        </Container>
      </Section>

      <CTASection variant="about" />
    </>
  );
}
