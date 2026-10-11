import { Container, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import CTASection from '../../components/CTASection';
import { sectors } from '../../content/site';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * SectorsPage
 * Alternating editorial rows — one sector per row, with its focus areas in a
 * two-column list. No icons, no coloured cards.
 * ------------------------------------------------------------------------- */

export default function SectorsPage() {
  usePageMeta({
    title: 'Sectors | Poorna Global Strategies',
    description:
      'Green energy, business services and investment banking, healthcare and allied health, global trade and economic policy, technology transfers, and cross-border joint ventures.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Sector depth, in detail"
        intro="What we know in each sector and the specific areas we are asked to work on — because a technical answer alone rarely clears the regulatory and commercial path."
      >
        <Button to="/contact" size="lg" withArrow>
          Discuss your sector
        </Button>
      </PageHeader>

      <Section>
        <Container>
          <div className="divide-y divide-[var(--color-line-strong)] border-t border-[var(--color-line-strong)]">
            {sectors.map((sector, index) => (
              <Reveal
                as="article"
                key={sector.id}
                delay={index * 50}
                className="grid gap-x-12 gap-y-6 py-12 lg:grid-cols-[auto_1fr_1fr]"
              >
                <p
                  aria-hidden="true"
                  className="numeric text-[0.8125rem] font-medium text-[var(--color-muted)] lg:pt-2"
                >
                  {String(index + 1).padStart(2, '0')}
                </p>

                <div>
                  <h2 className="display-md max-w-sm">{sector.title}</h2>
                </div>

                <div>
                  <p className="text-[1.0625rem] leading-relaxed text-[var(--color-ink-soft)]">
                    {sector.summary}
                  </p>

                  <h3 className="mt-7 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Focus areas
                  </h3>
                  <ul className="mt-3.5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {sector.focus.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[0.9375rem] leading-snug text-[var(--color-ink-soft)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-sage-deep)]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection variant="sectors" />
    </>
  );
}
