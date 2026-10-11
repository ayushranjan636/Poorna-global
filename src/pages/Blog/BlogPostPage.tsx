import { Link, useParams } from 'react-router-dom';
import { Container, Section } from '../../components/ui/Layout';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import CTASection from '../../components/CTASection';
import { findInsight, insights } from '../../content/insights';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * BlogPostPage
 * Long-form reading column at a comfortable measure. Content is rendered from
 * structured blocks, so no dangerouslySetInnerHTML is required.
 * ------------------------------------------------------------------------- */

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const insight = findInsight(slug);

  usePageMeta({
    title: insight
      ? `${insight.title} | Poorna Global Strategies`
      : 'Article not found | Poorna Global Strategies',
    description: insight?.excerpt,
  });

  if (!insight) {
    return (
      <Section className="pt-40">
        <Container width="narrow">
          <h1 className="display-lg">We could not find that article</h1>
          <p className="lead mt-5">
            The link may be out of date. All published writing is listed on the insights page.
          </p>
          <div className="mt-8">
            <Button to="/blogs" withArrow>
              View all insights
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  const related = insights.filter((item) => item.slug !== insight.slug);

  return (
    <>
      <article>
        {/* Header */}
        <header className="hero-wash border-b border-[var(--color-line)] pt-32 pb-14 sm:pt-40 sm:pb-16">
          <Container width="narrow">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 8H4M7.5 4.5 4 8l3.5 3.5" />
              </svg>
              All insights
            </Link>

            <p className="eyebrow mt-8">{insight.category}</p>

            <h1 className="display-lg mt-5">{insight.title}</h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[var(--color-line-strong)] pt-6">
              <img
                src={insight.author.image}
                alt=""
                loading="eager"
                decoding="async"
                className="h-11 w-11 rounded-full border border-[var(--color-line)] object-cover object-top"
              />
              <div>
                <p className="text-[0.9375rem] font-medium text-[var(--color-ink)]">
                  {insight.author.name}
                </p>
                <p className="text-[0.875rem] text-[var(--color-muted)]">
                  {insight.author.role} · {insight.date} · {insight.readTime}
                </p>
              </div>
            </div>
          </Container>
        </header>

        {/* Body */}
        <Section>
          <Container width="narrow">
            <div className="space-y-6">
              {insight.body.map((block, index) =>
                block.type === 'heading' ? (
                  <h2 key={index} className="display-md pt-6">
                    {block.text}
                  </h2>
                ) : (
                  <p
                    key={index}
                    className="text-[1.0625rem] leading-[1.75] text-[var(--color-ink-soft)]"
                  >
                    {block.text}
                  </p>
                ),
              )}
            </div>
          </Container>
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section spacing="tight" className="border-t border-[var(--color-line)]">
            <Container width="narrow">
              <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
                Continue reading
              </h2>

              <ul className="mt-6 divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
                {related.map((item, index) => (
                  <Reveal as="li" key={item.slug} delay={index * 70}>
                    <Link
                      to={`/blog/${item.slug}`}
                      className="group block py-6 transition-colors hover:text-[var(--color-accent)]"
                    >
                      <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[var(--color-muted)]">
                        {item.category}
                      </p>
                      <h3 className="heading-sm mt-2 underline-offset-4 transition-colors group-hover:text-[var(--color-accent)] group-hover:underline">
                        {item.title}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </Section>
        )}
      </article>

      <CTASection variant="insights" />
    </>
  );
}
