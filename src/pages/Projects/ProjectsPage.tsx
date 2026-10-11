import { Container, Section } from '../../components/ui/Layout';
import { PageHeader } from '../../components/ui/PageHeader';
import { ProjectCard } from '../../components/SelectedProjects';
import CTASection from '../../components/CTASection';
import { Reveal } from '../../components/ui/Reveal';
import { projects } from '../../content/site';
import { usePageMeta } from '../../lib/usePageMeta';

/* ---------------------------------------------------------------------------
 * ProjectsPage
 * The complete project record. Every entry links to the original LinkedIn
 * post published by the firm's directors.
 * ------------------------------------------------------------------------- */

export default function ProjectsPage() {
  usePageMeta({
    title: 'Selected Projects | Poorna Global Strategies',
    description:
      'Engagements, delegations and convenings led by the directors of Poorna Global Strategies — across electric mobility, bilateral trade, industry convening and institutional relations.',
  });

  const [featured, ...rest] = projects;

  return (
    <>
      <PageHeader
        eyebrow="Selected projects"
        title="Seven engagements, in full"
        intro="Delegations, bilateral trade work, industry convening and institutional relations — each entry opens the original post published by the director who led it."
      />

      <Section>
        <Container>
          <Reveal>
            <ProjectCard project={featured} size="featured" />
          </Reveal>

          <div className="mt-16 grid gap-12 border-t border-[var(--color-line-strong)] pt-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectCard project={project} size="medium" />
              </Reveal>
            ))}
          </div>

          <p className="mt-16 max-w-2xl border-t border-[var(--color-line)] pt-8 text-[0.875rem] leading-relaxed text-[var(--color-muted)]">
            Project titles and summaries are drawn from the firm's own published posts.
            Photographs are the firm's own; where no photograph could be matched to a
            specific engagement, a typographic plate is shown rather than an unrelated image.
          </p>
        </Container>
      </Section>

      <CTASection variant="projects" />
    </>
  );
}
