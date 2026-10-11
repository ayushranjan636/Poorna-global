import { useRef } from 'react';
import type { TeamMember } from '../../content/team';

/* ---------------------------------------------------------------------------
 * PersonCard
 *
 * At rest the card is purely visual: a portrait with the name and focus set
 * over the lower edge. Hovering or focusing lifts a glass panel up over the
 * photograph carrying the biography and the LinkedIn link.
 *
 * Accessibility:
 *   - the biography is always in the DOM for screen readers
 *   - the card is focusable, and keyboard focus reveals the same panel
 *   - `@media (hover: none)` opens the panel on touch, so nothing is
 *     reachable only by hovering
 *   - the LinkedIn anchor is a real link, independently focusable
 * ------------------------------------------------------------------------- */

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.2H2.4v12.3Zm7.7-12.3h4.94v1.68h.07c.69-1.24 2.37-2.05 4.1-2.05 3.46 0 4.39 2.1 4.39 5.37v7.3h-5.15v-6.47c0-1.54-.3-3.08-2.17-3.08-1.84 0-2.08 1.35-2.08 2.98v6.57H10.1V9.2Z" />
    </svg>
  );
}

export default function PersonCard({
  member,
  index = 0,
}: {
  member: TeamMember;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* Track the pointer so the glass panel catches light where the cursor is. */
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      tabIndex={0}
      className="group relative isolate block overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-mist)] outline-none transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(23_26_23/0.28)] focus-visible:-translate-y-1"
      style={{ transitionDelay: `${index * 25}ms` }}
    >
      {/* Portrait */}
      <img
        src={member.image}
        alt={`${member.name}, ${member.focus}`}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[750ms] ease-[var(--ease-glass)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
      />

      {/* Scrim so the resting name stays legible on any portrait. */}
      <span
        aria-hidden="true"
        className="person-rest pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[rgb(23_26_23/0.78)] via-[rgb(23_26_23/0.3)] to-transparent transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
      />

      {/* Resting state — name and focus only. */}
      <div className="person-rest pointer-events-none absolute inset-x-0 bottom-0 p-5 transition-all duration-500 ease-[var(--ease-glass)] group-hover:translate-y-2 group-hover:opacity-0 group-focus-visible:translate-y-2 group-focus-visible:opacity-0">
        <h3 className="font-[var(--font-display)] text-[1.15rem] leading-tight tracking-[-0.012em] text-white">
          {member.name}
        </h3>
        <p className="mt-1 text-[0.8125rem] leading-snug text-white/80">{member.focus}</p>
      </div>

      {/* Revealed detail — glass panel rising over the portrait. */}
      <div className="person-panel glass-clear-dense pointer-events-none absolute inset-0 flex translate-y-3 flex-col justify-end p-5 opacity-0 transition-all duration-[550ms] ease-[var(--ease-glass)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {/* Pointer-tracked highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(15rem 15rem at var(--px, 50%) var(--py, 50%), rgb(221 243 223 / 0.55), transparent 72%)',
          }}
        />

        <h3 className="font-[var(--font-display)] text-[1.15rem] leading-tight tracking-[-0.012em] text-[var(--color-ink)]">
          {member.name}
        </h3>
        <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-[var(--color-accent)]">
          {member.focus}
        </p>

        <p className="person-bio mt-3 overflow-y-auto text-[0.8125rem] leading-relaxed text-[var(--color-ink-soft)]">
          {member.bio}
        </p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-[var(--radius-sm)] border border-white/70 bg-white/60 px-3 py-1.5 text-[0.8125rem] font-medium text-[var(--color-ink)] transition-colors hover:bg-white/90 hover:text-[var(--color-accent)]"
          >
            <LinkedInIcon />
            LinkedIn
            <span className="sr-only"> profile for {member.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
