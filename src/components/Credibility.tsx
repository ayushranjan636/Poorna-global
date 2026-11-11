import { Container, Eyebrow, Section } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';

import Infisum from '../assets/Partnerships/Infisum.png';
import SWIndia from '../assets/Partnerships/SWIndia.png';
import Airoi from '../assets/Partnerships/Airoi.png';

/* ---------------------------------------------------------------------------
 * Credibility
 * Three verified signals, presented plainly:
 *  1. Named institutional partners, with their own logos and websites.
 *  2. Academic institutions the firm's research and modelling work draws on.
 *  3. Regional press coverage of a pilot project the firm was party to.
 *
 * No testimonials are shown, because none are substantiated in the firm's
 * existing material. Client and partner names live on the Projects page,
 * drawn from `organisationGroups`.
 * ------------------------------------------------------------------------- */

const partners = [
  {
    name: 'Infisum',
    logo: Infisum,
    note: 'Economic modelling; GTAP member, Seattle',
    href: 'https://infisum.com',
  },
  {
    name: 'SW India',
    logo: SWIndia,
    note: 'Consulting and enterprise delivery',
    href: 'https://www.sw-india.com',
  },
  {
    name: 'AIROI, Inc',
    logo: Airoi,
    note: 'Climate tech, carbon and ESG analytics',
    href: 'https://www.airoi.com',
  },
];

/* Academic institutions. Set as a typographic list rather than a logo wall:
   we do not hold permission to reproduce institutional marks, and the names
   carry more weight than low-resolution crests would. */
const institutions = [
  { name: 'IIT Madras', href: 'https://www.iitm.ac.in' },
  { name: 'IIT Bombay', href: 'https://www.iitb.ac.in' },
  { name: 'IIT Delhi', href: 'https://home.iitd.ac.in' },
  { name: 'Madras School of Economics', href: 'https://www.mse.ac.in' },
];

const clippings = [
  { src: '/media/press-clip-01.jpg', label: 'Regional daily' },
  { src: '/media/press-clip-02.jpg', label: 'Vaartha Prabha' },
  { src: '/media/press-clip-03.jpg', label: 'Eenadu' },
];

export default function Credibility() {
  const head = useReveal<HTMLDivElement>();
  const press = useReveal<HTMLDivElement>(100);

  return (
    <Section aria-labelledby="credibility-heading">
      <Container>
        <div ref={head.ref} style={head.style} className={`${head.className} max-w-2xl`}>
          <Eyebrow>Partnerships & coverage</Eyebrow>
          <h2 id="credibility-heading" className="display-lg mt-6">
            Who we work alongside
          </h2>
          <p className="lead mt-5">
            Our policy and energy work draws on standing collaborations with research and
            technology institutions.
          </p>
        </div>

        {/* Partners */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <Reveal as="li" key={partner.name} delay={index * 60} className="bg-white">
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-5 p-7 transition-colors duration-300 hover:bg-[var(--color-mist)]"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-auto max-w-[140px] self-start object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="mt-auto">
                  <h3 className="text-[0.9375rem] font-medium text-[var(--color-ink)]">
                    {partner.name}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-[var(--color-muted)]">
                    {partner.note}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* Academic & research institutions */}
        <div className="mt-14 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-mist)] p-7 sm:p-9">
          <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-[var(--color-muted)]">
            Academic & research institutions
          </h3>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-ink-soft)]">
            Our modelling, policy and technology-transfer work is carried out with faculty and
            research groups across multiple Indian Institutes of Technology and leading
            economics institutions.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {institutions.map((institution) => (
              <li key={institution.name}>
                <a
                  href={institution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-white px-3.5 py-2 text-[0.9375rem] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                >
                  {institution.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Press coverage */}
        <div
          ref={press.ref}
          style={press.style}
          className={`${press.className} mt-20 border-t border-[var(--color-line-strong)] pt-14`}
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h3 className="display-md max-w-md">In the regional press</h3>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                Telugu dailies covering a pilot project on continuous drinking water and
                electricity supply in the 49th division of the Vijayawada West constituency,
                in which the firm participated as a technical partner alongside the Sujana
                Foundation.
              </p>
            </div>

            <ul className="grid grid-cols-3 gap-4 sm:gap-5">
              {clippings.map((clip) => (
                <li key={clip.src}>
                  <figure>
                    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white">
                      <img
                        src={clip.src}
                        alt={`Newspaper coverage of the pilot project in ${clip.label}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/4] w-full object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-2.5 text-[0.75rem] text-[var(--color-muted)]">
                      {clip.label}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
