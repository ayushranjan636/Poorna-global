import { Link } from 'react-router-dom';
import { Container, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Reveal } from '../../components/ui/Reveal';
import CTASection from '../../components/CTASection';
import { insights } from '../../content/insights';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * BlogPage — Insights index
 * A short editorial list. Three articles, so no filtering UI is warranted.
 * ------------------------------------------------------------------------- */

export default function BlogPage() {
  usePageMeta({
    title: 'Insights | Poorna Global Strategies',
    description:
      'Writing from the directors and advisory group of Poorna Global Strategies on partnerships, cross-border expansion and project conceptualization.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Writing from our directors"
        intro="Notes on partnerships, cross-border expansion and getting projects properly defined before they begin."
      />

      <Section>
        <Container>
          <ul className="border-t border-[var(--color-line-strong)]">
            {insights.map((insight, index) => (
              <Reveal as="li" key={insight.slug} delay={index * 70}>
                <article className="border-b border-[var(--color-line)]">
                  <Link
                    to={`/blog/${insight.slug}`}
                    className="group grid gap-x-12 gap-y-5 px-2 py-9 transition-colors duration-300 hover:bg-[var(--color-mist)] sm:px-4 lg:grid-cols-[1fr_1.6fr]"
                  >
                    <div>
                      <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[var(--color-accent)]">
                        {insight.category}
                      </p>
                      <p className="mt-2 text-[0.875rem] text-[var(--color-muted)]">
                        {insight.date} · {insight.readTime}
                      </p>
                    </div>

                    <div>
                      <h2 className="display-md max-w-2xl underline-offset-[6px] transition-colors group-hover:text-[var(--color-accent)] group-hover:underline">
                        {insight.title}
                      </h2>

                      <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                        {insight.excerpt}
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <img
                          src={insight.author.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-9 w-9 rounded-full border border-[var(--color-line)] object-cover object-top"
                        />
                        <p className="text-[0.875rem] text-[var(--color-ink-soft)]">
                          {insight.author.name}
                          <span className="text-[var(--color-muted)]"> · {insight.author.role}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection variant="insights" />
    </>
  );
}
