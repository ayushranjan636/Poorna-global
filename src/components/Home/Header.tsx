import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from '../../content/site';
import Logo from '../ui/Logo';

/* ---------------------------------------------------------------------------
 * Header
 * A floating, translucent rectangular navigation shell. Stays legible over
 * white and over photography, gains opacity and shadow once scrolled, and
 * collapses into an accessible sheet on small screens.
 * ------------------------------------------------------------------------- */

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Projects', to: '/projects' },
] as const;

function Wordmark() {
  return (
    <>
      {/* Full lockup from the sm breakpoint up; the monogram alone on the
          narrowest screens, where the bar also carries the menu toggle. */}
      <Logo variant="lockup" tone="dark" height={30} priority className="hidden sm:block" />
      <Logo variant="mark" tone="dark" height={28} priority className="sm:hidden" />
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Elevate the bar slightly once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close the sheet on navigation. */
  useEffect(() => setMenuOpen(false), [pathname]);

  /* Lock scroll and support Escape while the sheet is open. */
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative rounded-[9px] px-3.5 py-2 text-[0.9375rem]',
      'transition-all duration-300 ease-[var(--ease-glass)]',
      isActive
        ? 'bg-white/70 font-medium text-[var(--color-ink)] shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_3px_-1px_rgb(23_26_23/0.1)] ring-1 ring-[var(--color-sage-deep)]/60'
        : 'text-[var(--color-ink-soft)] hover:bg-white/55 hover:text-[var(--color-ink)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.8)]',
    ].join(' ');

  return (
    <>
      {/* Skip link — first tab stop on every page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:rounded-[var(--radius-sm)] focus:bg-[var(--color-ink)] focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
        <div
          className={[
            'pointer-events-auto mx-auto flex max-w-[76rem] items-center justify-between gap-4',
            'relative isolate overflow-hidden rounded-[var(--radius-md)] px-3 py-2.5 sm:px-4',
            'transition-all duration-500 ease-[var(--ease-glass)]',
            scrolled || menuOpen ? 'glass-clear-dense' : 'glass-clear',
          ].join(' ')}
        >
          {/* Specular arc across the top of the bar — the highlight a curved
              glass edge would catch. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 -top-px -z-10 h-10 rounded-[inherit] bg-[radial-gradient(60%_100%_at_50%_0%,rgb(255_255_255/0.95),transparent_72%)]"
          />

          <Link
            to="/"
            aria-label={`${company.legalName} — home`}
            className="rounded-[8px] px-1.5 py-1 transition-opacity hover:opacity-70"
          >
            <Wordmark />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={itemClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-4 py-2 text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_rgb(23_26_23/0.12)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:shadow-[0_8px_20px_-10px_rgb(47_106_61/0.55)] md:inline-flex"
            >
              Contact
            </Link>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-white/70 bg-white/55 transition-colors hover:bg-white/80 md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-[var(--ease-glass)] ${
                    menuOpen ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-[var(--ease-glass)] ${
                    menuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile sheet — animates height/opacity, stays in the document flow
            below the bar so it never covers the whole viewport. */}
        <div
          id="mobile-navigation"
          className={[
            'pointer-events-auto mx-auto mt-2 max-w-[76rem] overflow-hidden rounded-[var(--radius-md)] md:hidden',
            'transition-all duration-400 ease-[var(--ease-glass)]',
            menuOpen
              ? 'glass-clear-dense max-h-[26rem] opacity-100'
              : 'pointer-events-none max-h-0 border-transparent opacity-0',
          ].join(' ')}
        >
          <nav aria-label="Mobile" className="flex flex-col p-2.5">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-[10px] px-3.5 py-3 text-[0.9375rem] transition-colors',
                    isActive
                      ? 'bg-[var(--color-sage)]/70 font-medium text-[var(--color-ink)]'
                      : 'text-[var(--color-ink-soft)] hover:bg-[var(--color-mist)]',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-1.5 rounded-[10px] bg-[var(--color-ink)] px-3.5 py-3 text-center text-[0.9375rem] font-medium text-white transition-colors hover:bg-[var(--color-accent)]"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Scrim behind the open sheet. */}
      {menuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-[var(--color-ink)]/15 backdrop-blur-[1px] md:hidden"
        />
      )}
    </>
  );
}
