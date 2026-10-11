import { useState } from 'react';
import { Container, Eyebrow, Section } from './ui/Layout';
import { TextLink } from './ui/Button';
import { useReveal } from './ui/useReveal';

/* ---------------------------------------------------------------------------
 * FaqSection
 * Accessible accordion. Uses buttons with aria-expanded and a grid-rows
 * transition so the answer height animates without a hard-coded max-height.
 * ------------------------------------------------------------------------- */

const faqs = [
  {
    id: 'sectors',
    question: 'Which sectors do you work in?',
    answer:
      'Green energy — including hydrogen, solar and storage — healthcare and allied health services, business services and investment banking, global trade and economic policy, technology transfer, and cross-border joint ventures.',
  },
  {
    id: 'process',
    question: 'How does an engagement usually begin?',
    answer:
      'With a conversation about what you are trying to achieve and what is currently in the way. From there we agree a scope covering diagnosis, strategy and the delivery support required, so expectations on both sides are explicit before work starts.',
  },
  {
    id: 'governments',
    question: 'Do you work with governments as well as companies?',
    answer:
      'Yes. We advise national and sub-national governments on clean energy roadmaps, policy design and regulatory reform, and we operate across G2G, B2B, B2G and G2B engagements.',
  },
  {
    id: 'international',
    question: 'How do you support international expansion?',
    answer:
      'Through cross-border transactions, technology transfer and investment structuring. Our advisory group includes former ambassadors and trade specialists with direct experience of the regulatory and cultural context in the markets concerned.',
  },
  {
    id: 'evidence',
    question: 'What sits behind your policy and energy recommendations?',
    answer:
      'Economic modelling, global benchmarks and scenario planning. Our collaborator Infisum Modelling, based in Seattle, is a member of the Global Trade Analysis Project alongside institutions such as the World Bank and IMF.',
  },
  {
    id: 'measurement',
    question: 'How is progress measured?',
    answer:
      'We agree the success measures at the start of the engagement, aligned to your objectives, and report against them as the work proceeds rather than only at the end.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);
  const head = useReveal<HTMLDivElement>();

  return (
    <Section className="edge-fade-b" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-16">
          <div ref={head.ref} style={head.style} className={head.className}>
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-heading" className="display-lg mt-6">
              Before you get in touch
            </h2>
            <p className="lead mt-5 max-w-sm">
              If something here is not covered, ask us directly — we would rather answer it
              properly.
            </p>
            <div className="mt-7">
              <TextLink to="/contact">Start a conversation</TextLink>
            </div>
          </div>

          <div className="border-t border-[var(--color-line-strong)]">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div key={faq.id} className="border-b border-[var(--color-line)]">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      className="group flex w-full items-start justify-between gap-6 rounded-[var(--radius-xs)] py-5 text-left transition-colors hover:text-[var(--color-accent)]"
                    >
                      <span className="heading-sm transition-colors group-hover:text-[var(--color-accent)]">
                        {faq.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className="relative mt-1.5 grid h-5 w-5 shrink-0 place-items-center"
                      >
                        <span className="absolute h-[1.5px] w-3.5 rounded-full bg-[var(--color-muted)] transition-colors group-hover:bg-[var(--color-accent)]" />
                        <span
                          className={`absolute h-[1.5px] w-3.5 rounded-full bg-[var(--color-muted)] transition-all duration-300 ease-[var(--ease-soft)] group-hover:bg-[var(--color-accent)] ${
                            isOpen ? 'rotate-0 opacity-0' : 'rotate-90'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-soft)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 pr-8 text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
