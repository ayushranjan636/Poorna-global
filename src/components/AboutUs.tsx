import { Container, Eyebrow, Section } from './ui/Layout';
import { TextLink } from './ui/Button';
import { useReveal } from './ui/useReveal';
import Logo from './ui/Logo';

/* ---------------------------------------------------------------------------
 * AboutUs — homepage introduction
 * Editorial two-column: the firm's position on the left, a photograph and
 * core strengths on the right. No portrait-and-three-icons pattern.
 * ------------------------------------------------------------------------- */

const strengths = [
  'Expertise in high-impact industries',
  'Cross-border transactions & strategic partnerships',
  'Robust government & private sector relationships',
  'Tailored solutions for global business expansion',
];

export default function AboutUs() {
  const copy = useReveal<HTMLDivElement>();
  const media = useReveal<HTMLDivElement>(120);

  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* Position */}
          <div ref={copy.ref} style={copy.style} className={copy.className}>
            <Eyebrow>Who we are</Eyebrow>

            <h2 id="about-heading" className="display-lg mt-6 max-w-xl">
              One team, from diagnosis to delivery
            </h2>

            <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-soft)]">
              <p>
                Conventional consulting splits the work three ways — one firm sets
                direction, another examines process, a third implements. We do all three,
                so the people who diagnose a problem are accountable for solving it.
              </p>
              <p className="text-[var(--color-muted)]">
                Renewables, hydrogen, solar and derivatives, healthcare, policy planning for
                governments at local, state and federal level, business development, and
                technology transfer.
              </p>
            </div>

            <div className="mt-8">
              <TextLink to="/about">Why the firm was founded</TextLink>
            </div>
          </div>

          {/* Photograph and strengths */}
          <div ref={media.ref} style={media.style} className={media.className}>
            <figure>
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-mist)]">
                <img
                  src="/media/working-meeting.jpg"
                  alt="Poorna Global Strategies colleagues in a working discussion"
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </figure>

            <div className="mt-8 rounded-[var(--radius-md)] bg-[var(--color-mist)] p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="heading-sm">Core strengths</h3>
                {/* Quiet brand presence — the monogram as a mark of authorship. */}
                <Logo variant="mark" tone="dark" height={26} decorative className="shrink-0 opacity-25" />
              </div>
              <ul className="mt-4 space-y-3">
                {strengths.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
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
                    <span className="text-[var(--color-ink-soft)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
