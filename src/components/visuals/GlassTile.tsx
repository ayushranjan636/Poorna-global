import { useRef, type ReactNode } from 'react';

/* ---------------------------------------------------------------------------
 * GlassTile
 *
 * A liquid-glass surface that shows a label at rest and discloses its detail
 * on hover or focus. The sheen and the highlight both track the pointer, so
 * the tile behaves like a lens catching light rather than a flat panel.
 *
 * Progressive disclosure, done accessibly:
 *   - the detail is always in the DOM, so screen readers reach it
 *   - keyboard focus reveals the same content as hover
 *   - on touch, where there is no hover, the detail is shown by default
 *     (`md:` prefixes gate the collapsed state to pointer widths)
 * ------------------------------------------------------------------------- */

export default function GlassTile({
  label,
  value,
  detail,
  className = '',
}: {
  label: string;
  value: ReactNode;
  detail: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* Feed pointer position to CSS custom properties for the highlight. */
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      tabIndex={0}
      className={`group glass relative isolate overflow-hidden rounded-[var(--radius-md)] p-5 transition-all duration-500 ease-[var(--ease-glass)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/1),0_18px_40px_-18px_rgb(23_26_23/0.22)] focus-visible:-translate-y-0.5 ${className}`}
    >
      {/* Pointer-tracked highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            'radial-gradient(14rem 14rem at var(--px, 50%) var(--py, 0%), rgb(221 243 223 / 0.75), transparent 70%)',
        }}
      />

      {/* Travelling sheen */}
      <span
        aria-hidden="true"
        className="glass-sheen group-hover:[background-position:-40%_0] group-hover:opacity-100 group-focus-visible:[background-position:-40%_0] group-focus-visible:opacity-100"
      />

      <p className="numeric text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
        {value}
      </p>

      <p className="mt-1 text-[0.8125rem] font-medium leading-snug text-[var(--color-ink-soft)]">
        {label}
      </p>

      {/* Detail — collapsed at pointer widths, always open on touch. */}
      <div className="disclose grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-glass)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="disclose-body pt-2 text-[0.8125rem] leading-relaxed text-[var(--color-muted)] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-hover:delay-150 md:group-focus-visible:opacity-100">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}
