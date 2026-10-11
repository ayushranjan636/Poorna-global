import { Link } from 'react-router-dom';
import { Container } from '../ui/Layout';
import { company } from '../../content/site';
import Logo from '../ui/Logo';

/* ---------------------------------------------------------------------------
 * Footer
 * Set on the logo's own brand green (--color-brand) so the artwork sits on an
 * exactly matching field with no visible plate. Type is white at graded
 * opacities; the reverse lockup carries the brand.
 * ------------------------------------------------------------------------- */

const columns = [
  {
    heading: 'Firm',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Sectors', to: '/sectors' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'Selected projects', to: '/projects' },
      { label: 'Insights', to: '/blogs' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand)] text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              to="/"
              className="inline-block rounded-[8px] transition-opacity hover:opacity-80"
              aria-label={`${company.legalName} — home`}
            >
              <Logo variant="lockup" tone="light" height={40} />
            </Link>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/70">
              {company.tagline}
            </p>

            {/* Registered company name, set apart for legal clarity. */}
            <p className="mt-4 text-[0.8125rem] font-medium uppercase leading-relaxed tracking-[0.055em] text-white/85">
              {company.registeredName}
            </p>

            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${company.name} on LinkedIn`}
              className="mt-5 inline-grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] border border-white/25 bg-white/5 text-white/80 transition-colors hover:border-white/60 hover:bg-white/15 hover:text-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.2H2.4v12.3Zm7.7-12.3h4.94v1.68h.07c.69-1.24 2.37-2.05 4.1-2.05 3.46 0 4.39 2.1 4.39 5.37v7.3h-5.15v-6.47c0-1.54-.3-3.08-2.17-3.08-1.84 0-2.08 1.35-2.08 2.98v6.57H10.1V9.2Z" />
              </svg>
            </a>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-white/55">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[0.9375rem] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {company.registeredName}. All rights reserved.
          </p>
          <p className="text-sm text-white/60">
            G2G · B2B · B2G · G2B engagements
          </p>
        </div>
      </Container>
    </footer>
  );
}
