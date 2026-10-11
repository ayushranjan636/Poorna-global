import { useEffect, useState } from 'react';
import { Container } from './ui/Layout';
import { Button } from './ui/Button';
import { useReveal } from './ui/useReveal';
import WaterSurface from './visuals/WaterSurface';
import GlassTile from './visuals/GlassTile';

/* ---------------------------------------------------------------------------
 * Hero
 *
 * An editorial masthead rather than the usual headline-left / stock-image-right
 * arrangement. Three ideas carry it:
 *
 *   1. A rotating noun completes the sentence "We move <x> across borders",
 *      cycling through what the firm actually moves. The sentence stays
 *      readable at every frame, and the cycle stops on reduced motion.
 *   2. A reflecting pool anchors the lower edge — the photograph sits above
 *      its own reflection, and the water reacts to the pointer.
 *   3. Liquid-glass tiles hold the proof points: a figure at rest, the
 *      substantiating detail on hover or focus.
 * ------------------------------------------------------------------------- */

const NOUNS = ['capital', 'technology', 'policy', 'partnerships', 'projects'] as const;

const TILES = [
  {
    value: '125+',
    label: 'Man years of experience',
    detail:
      'Combined across finance, technology, public policy and global business strategy.',
  },
  {
    value: 'GTAP',
    label: 'Modelling network',
    detail:
      'Through Infisum Modelling, a member alongside the World Bank and IMF.',
  },
  {
    value: '20+',
    label: 'Countries advised',
    detail: 'Policy formulation work led by our economics practice.',
  },
  {
    value: '4',
    label: 'Engagement models',
    detail: 'G2G, B2B, B2G and G2B — we work on every side of the table.',
  },
];

/* --- Rotating noun -------------------------------------------------------- */

function RotatingNoun() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setAnimate(true);
    const id = setInterval(() => setIndex((current) => (current + 1) % NOUNS.length), 2600);
    return () => clearInterval(id);
  }, []);

  /* Reserve the width of the longest noun so the line never reflows. */
  return (
    <span className="relative inline-grid align-bottom">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 italic">
        partnerships
      </span>

      {NOUNS.map((noun, position) => (
        <span
          key={noun}
          aria-hidden={animate && position !== index}
          className="col-start-1 row-start-1 italic text-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-glass)]"
          style={
            animate
              ? {
                  opacity: position === index ? 1 : 0,
                  transform:
                    position === index
                      ? 'translateY(0) scale(1)'
                      : `translateY(${position < index ? -14 : 14}px) scale(0.97)`,
                  filter: position === index ? 'blur(0)' : 'blur(5px)',
                }
              : /* Reduced motion: render the first noun only. */
                { opacity: position === 0 ? 1 : 0 }
          }
        >
          {noun}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------------- */

export default function Hero() {
  const text = useReveal<HTMLDivElement>();
  const media = useReveal<HTMLDivElement>(160);
  const tiles = useReveal<HTMLDivElement>(280);

  return (
    <section className="relative overflow-hidden pt-32 pb-0 sm:pt-40">
      {/* Background wash — white into pale green, no coloured blobs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hero-wash"
      />

      <Container className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* --- Masthead --- */}
          <div ref={text.ref} style={text.style} className={`${text.className} pb-4`}>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-[var(--color-accent)]/45" />
              Poorna Global Strategies
            </p>

            {/* The live region announces each noun once, without the visual
                duplicates confusing assistive technology. */}
            <h1 className="display-xl mt-6">
              We move
              <br />
              <RotatingNoun />
              <br />
              across borders.
            </h1>
            <span className="sr-only" aria-live="polite">
              We move capital, technology, policy, partnerships and projects across borders.
            </span>

            <p className="lead mt-7 max-w-lg">
              A consulting firm that identifies, conceptualises, facilitates and implements
              projects — then stays through delivery.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/contact" size="lg" withArrow>
                Discuss your project
              </Button>
              <Button to="/projects" variant="secondary" size="lg">
                Explore our work
              </Button>
            </div>
          </div>

          {/* --- Photograph above its reflection --- */}
          <div ref={media.ref} style={media.style} className={media.className}>
            <figure className="relative">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-mist)] shadow-[var(--shadow-card)]">
                <img
                  src="/media/colleagues-chennai.jpg"
                  alt="Directors of Poorna Global Strategies between client engagements in Chennai"
                  width={1400}
                  height={1050}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3.2] w-full object-cover object-[center_28%]"
                />
              </div>

              {/* Mirrored, fading repeat of the photograph sitting on the pool. */}
              <div
                aria-hidden="true"
                className="mt-1 hidden overflow-hidden rounded-b-[var(--radius-lg)] sm:block"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.42), transparent 72%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,0.42), transparent 72%)',
                }}
              >
                <img
                  src="/media/colleagues-chennai.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-full scale-y-[-1] object-cover object-[center_28%] opacity-70 blur-[2px] saturate-[0.8]"
                />
              </div>

              <figcaption className="mt-4 flex items-center gap-2.5 text-[0.8125rem] text-[var(--color-muted)]">
                <span aria-hidden="true" className="h-px w-5 bg-[var(--color-sage-deep)]" />
                Advisory team, Chennai
              </figcaption>
            </figure>
          </div>
        </div>

        {/* --- Glass proof tiles --- */}
        <div
          ref={tiles.ref}
          style={tiles.style}
          className={`${tiles.className} relative z-10 mt-14 grid gap-3 pb-20 sm:grid-cols-2 lg:grid-cols-4`}
        >
          {TILES.map((tile) => (
            <GlassTile key={tile.label} {...tile} />
          ))}
        </div>
      </Container>

      {/* --- Reflecting pool ---
          Sits behind the tiles and spans the full width, so the section ends
          on water rather than a hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 sm:h-80"
      >
        <WaterSurface />
      </div>
    </section>
  );
}
