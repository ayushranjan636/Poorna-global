import { Container, Eyebrow, Section } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { strengths } from '../content/site';

/* ---------------------------------------------------------------------------
 * WhyUs
 * Two-column editorial list. Each statement is traceable to the team and
 * partnership information already published by the firm.
 * ------------------------------------------------------------------------- */

export default function WhyUs() {
  const head = useReveal<HTMLDivElement>();
  const media = useReveal<HTMLDivElement>(120);

  return (
    <Section className="bg-[var(--color-mist)]" aria-labelledby="why-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div>
            <div ref={head.ref} style={head.style} className={head.className}>
              <Eyebrow>Why work with us</Eyebrow>
              <h2 id="why-heading" className="display-lg mt-6">
                What you are actually buying
              </h2>
            </div>

            <div ref={media.ref} style={media.style} className={`${media.className} mt-10`}>
              <figure>
                <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white">
                  <img
                    src="/media/field-visit-dairy.jpg"
                    alt="A Poorna Global Strategies adviser during a field visit to a livestock facility"
                    width={1500}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3.5 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
                  Project work takes us to the site, not only the boardroom.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Strengths */}
          <dl className="divide-y divide-[var(--color-line-strong)] border-t border-[var(--color-line-strong)]">
            {strengths.map((item, index) => (
              <Reveal key={item.title} delay={index * 70} className="py-7">
                <dt className="heading-sm">{item.title}</dt>
                <dd className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                  {item.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
