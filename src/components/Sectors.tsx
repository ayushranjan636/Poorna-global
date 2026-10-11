import { useRef } from 'react';
import { Container, Eyebrow, Section } from './ui/Layout';
import { TextLink } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';
import { sectors, type Sector } from '../content/site';

/* ---------------------------------------------------------------------------
 * Sectors
 *
 * Glass tiles showing only the sector name at rest. Hover or focus lifts the
 * tile, tracks a highlight to the pointer and discloses the summary and focus
 * areas. Detail is expanded by default on touch widths.
 * ------------------------------------------------------------------------- */

function SectorTile({ sector, index }: { sector: Sector; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Reveal delay={index * 60} className="h-full">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        tabIndex={0}
        className="group glass relative isolate flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] p-6 outline-none transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgb(255_255_255/1),0_22px_48px_-22px_rgb(23_26_23/0.24)] focus-visible:-translate-y-1 sm:p-7"
      >
        {/* Pointer-tracked highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            background:
              'radial-gradient(16rem 16rem at var(--px, 50%) var(--py, 0%), rgb(221 243 223 / 0.8), transparent 72%)',
          }}
        />

        {/* Travelling sheen */}
        <span
          aria-hidden="true"
          className="glass-sheen group-hover:[background-position:-40%_0] group-hover:opacity-100 group-focus-visible:[background-position:-40%_0] group-focus-visible:opacity-100"
        />

        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[var(--font-display)] text-[clamp(1.2rem,1.05rem+0.5vw,1.5rem)] leading-tight tracking-[-0.014em] text-[var(--color-ink)]">
            {sector.title}
          </h3>

          <span
            aria-hidden="true"
            className="numeric mt-1 shrink-0 text-[0.75rem] font-medium text-[var(--color-accent)]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Disclosed detail — the one-line teaser only. The full summary and
            focus areas live on the Sectors page. */}
        <div className="disclose grid grid-rows-[1fr] transition-[grid-template-rows] duration-[600ms] ease-[var(--ease-glass)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="disclose-body md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100 md:group-hover:delay-100 md:group-focus-visible:opacity-100">
              <p className="pt-3 text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                {sector.teaser}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Sectors() {
  const head = useReveal<HTMLDivElement>();

  return (
    <Section
      id="sectors"
      aria-labelledby="sectors-heading"
      className="relative overflow-hidden"
    >
      {/* Quiet pale-green field so the glass tiles have something to refract. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(44rem_26rem_at_82%_8%,var(--color-sage)_0%,transparent_60%),linear-gradient(180deg,var(--color-canvas)_0%,var(--color-mist)_55%,var(--color-canvas)_100%)]"
      />

      <Container>
        <div ref={head.ref} style={head.style} className={`${head.className} max-w-2xl`}>
          <Eyebrow>Industries</Eyebrow>
          <h2 id="sectors-heading" className="display-lg mt-6">
            Where we have depth
          </h2>
          <p className="lead mt-5">
            Sectors where innovation, business and policy have to move together.{' '}
            <span className="hidden md:inline text-[var(--color-ink-soft)]">
              Hover a sector for detail.
            </span>
          </p>
          <div className="mt-7">
            <TextLink to="/sectors">Explore all sectors</TextLink>
          </div>
        </div>

        <div className="mt-14 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <SectorTile key={sector.id} sector={sector} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
