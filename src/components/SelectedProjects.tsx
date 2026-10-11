import { Container, Eyebrow, Section } from './ui/Layout';
import { TextLink } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { projects, type Project } from '../content/site';

/* ---------------------------------------------------------------------------
 * SelectedProjects
 * Editorial portfolio. Each entry links to the LinkedIn post published by the
 * firm, opening in a new tab with safe rel attributes.
 *
 * Layout: one featured project, two supporting projects, then a balanced
 * four-up grid. Entries without a confidently matched photograph render a
 * typographic plate instead of borrowing an unrelated image.
 * ------------------------------------------------------------------------- */

type CardProps = {
  project: Project;
  /** Controls image proportion and type scale. */
  size?: 'featured' | 'medium' | 'compact';
};

const aspects = {
  featured: 'aspect-[16/9]',
  medium: 'aspect-[4/3]',
  compact: 'aspect-[3/2]',
} as const;

function ExternalMark() {
  return (
    <span
      aria-hidden="true"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] bg-white text-[var(--color-ink)] transition-all duration-300 ease-[var(--ease-soft)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-px group-hover:-translate-y-px"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </span>
  );
}

/* Typographic plate for projects with no matching photograph. */
function Plate({ project }: { project: Project }) {
  /* Use only the leading term of the meta line so the plate never overflows. */
  const label = project.meta.split(' · ')[0];

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 bg-[var(--color-mist)] p-6">
      <span className="numeric text-[0.8125rem] font-medium text-[var(--color-accent)]">
        {String(project.id).padStart(2, '0')}
      </span>
      <span
        className="pr-2 font-[var(--font-display)] text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-[1.15] tracking-[-0.014em] text-[var(--color-ink)]/80"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, size = 'medium' }: CardProps) {
  const titleClass = size === 'featured' ? 'display-md' : 'heading-sm';

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
    >
      {/* Media */}
      <div
        className={`${aspects[size]} relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-mist)]`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[750ms] ease-[var(--ease-glass)] group-hover:scale-[1.05]"
          />
        ) : (
          <Plate project={project} />
        )}

        {/* Glass sheen travelling across the image on hover. */}
        <span
          aria-hidden="true"
          className="glass-sheen group-hover:[background-position:-40%_0] group-hover:opacity-100"
        />
      </div>

      {/* Caption — title and meta at rest, summary disclosed on hover. */}
      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="flex-1">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[var(--color-muted)]">
            {project.meta}
          </p>

          <h3
            className={`${titleClass} mt-2.5 underline-offset-[5px] transition-colors duration-200 group-hover:text-[var(--color-accent)] group-hover:underline`}
          >
            {project.title}
          </h3>

          {/* The featured card always shows its summary; the smaller cards
              disclose it on hover at pointer widths, and show it by default
              on touch. */}
          <div
            className={
              size === 'featured'
                ? ''
                : 'disclose grid grid-rows-[1fr] transition-[grid-template-rows] duration-[600ms] ease-[var(--ease-glass)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]'
            }
          >
            <div className="overflow-hidden">
              <p
                className={[
                  'leading-relaxed text-[var(--color-muted)]',
                  size === 'featured'
                    ? 'mt-3 max-w-2xl text-[1.0625rem]'
                    : 'mt-3 text-[0.9375rem] disclose-body md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100 md:group-hover:delay-100 md:group-focus-visible:opacity-100',
                ].join(' ')}
              >
                {project.summary}
              </p>
            </div>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--color-accent)] underline-offset-4 group-hover:underline">
            View project
            <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
          </span>
        </div>

        <ExternalMark />
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------------- */

export default function SelectedProjects() {
  const head = useReveal<HTMLDivElement>();

  /* Homepage shows a featured engagement and two others. The complete record
     of seven lives on the Projects page, so the two pages never present the
     same grid twice. */
  const [featured, second, third] = projects;

  return (
    <Section id="projects" className="bg-[var(--color-mist)]" aria-labelledby="projects-heading">
      <Container>
        <div
          ref={head.ref}
          style={head.style}
          className={`${head.className} max-w-2xl`}
        >
          <Eyebrow>Selected projects</Eyebrow>
          <h2 id="projects-heading" className="display-lg mt-6">
            Where the work has taken us
          </h2>
          <p className="lead mt-5">
            Engagements led by our directors — in Jakarta, Reykjavík, New Delhi and closer
            to home.
          </p>
        </div>

        {/* Featured */}
        <Reveal className="mt-14">
          <ProjectCard project={featured} size="featured" />
        </Reveal>

        {/* Two more */}
        <div className="mt-16 grid gap-10 sm:gap-12 md:grid-cols-2">
          {[second, third].map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <ProjectCard project={project} size="medium" />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--color-line-strong)] pt-8">
          <TextLink to="/projects">
            All {projects.length} projects, including policy and institutional work
          </TextLink>
        </div>
      </Container>
    </Section>
  );
}

export { ProjectCard };
