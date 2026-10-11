import { Container } from './ui/Layout';
import { Button } from './ui/Button';
import { useReveal } from './ui/useReveal';
import { invitations } from '../content/site';
import Logo from './ui/Logo';

/* ---------------------------------------------------------------------------
 * CTASection
 *
 * Closing invitation. The copy is supplied per page from `invitations`, so no
 * two pages end on the same words.
 * ------------------------------------------------------------------------- */

export default function CTASection({ variant = 'home' }: { variant?: keyof typeof invitations }) {
  const reveal = useReveal<HTMLDivElement>();
  const invitation = invitations[variant] ?? invitations.home;

  return (
    <section className="pb-24 pt-4 sm:pb-28" aria-labelledby={`cta-${variant}`}>
      <Container>
        <div
          ref={reveal.ref}
          style={reveal.style}
          className={`${reveal.className} relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-mist)] px-7 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20`}
        >
          {/* Soft green glow, white and light green only. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[var(--color-sage)] blur-[90px]"
          />

          {/* Oversized monogram as a watermark, clipped by the panel edge. */}
          <Logo
            variant="mark"
            tone="dark"
            height={300}
            decorative
            className="pointer-events-none absolute -bottom-16 -right-12 hidden opacity-[0.06] sm:block"
          />

          <div className="relative max-w-2xl">
            <h2 id={`cta-${variant}`} className="display-lg">
              {invitation.title}
            </h2>

            <p className="lead mt-5 max-w-xl">{invitation.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button to={invitation.primary.to} size="lg" withArrow>
                {invitation.primary.label}
              </Button>

              {invitation.secondary && (
                <Button to={invitation.secondary.to} variant="secondary" size="lg">
                  {invitation.secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
