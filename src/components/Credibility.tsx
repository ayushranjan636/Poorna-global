import { Container, Eyebrow, Section } from './ui/Layout';
import { Reveal } from './ui/Reveal';
import { useReveal } from './ui/useReveal';

import Infisum from '../assets/Partnerships/Infisum.png';
import SWIndia from '../assets/Partnerships/SWIndia.png';
import SchoolOfSustainability from '../assets/Partnerships/SchoolOfSustainability.png';
import Airoi from '../assets/Partnerships/Airoi.png';

/* ---------------------------------------------------------------------------
 * Credibility
 * Two verified signals, presented plainly:
 *  1. Named institutional partners, with their own logos and websites.
 *  2. Regional press coverage of a pilot project the firm was party to.
 *
 * No testimonials or client logos are shown, because none are substantiated
 * in the firm's existing material.
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
    name: 'School of Sustainability, IIT Madras',
    logo: SchoolOfSustainability,
    note: 'Sustainability research collaboration',
    href: 'https://sos.iitm.ac.in',
  },
  {
    name: 'AIROI, Inc',
    logo: Airoi,
    note: 'Climate tech, carbon and ESG analytics',
    href: 'https://www.airoi.com',
  },
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
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
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
