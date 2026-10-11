/* ---------------------------------------------------------------------------
 * Site content
 *
 * Single source of truth for copy that appears in more than one place.
 * Every claim here is carried over from the existing site content or from the
 * seven LinkedIn posts supplied by the business — nothing is invented.
 * ------------------------------------------------------------------------- */

export const company = {
  name: 'Poorna',
  /* Registered name, as it should appear in the footer and legal documents. */
  registeredName: 'POORNA GLOBAL STRATEGIES PRIVATE LIMITED',
  legalName: 'Poorna Global Strategies Pvt Ltd',
  shortName: 'PGSPL',
  tagline: 'Strategy, partnerships and delivery across borders.',
  linkedin: 'https://www.linkedin.com/company/poorna-global-strategies',
} as const;

/* --- Services -------------------------------------------------------------
 * Titles and descriptions follow the existing Services page.
 * ------------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  /** One line, homepage only. Deliberately different wording from
   *  `problem` / `value`, which belong to the Services page. */
  teaser: string;
  /** The client problem this service addresses. */
  problem: string;
  /** What the engagement delivers. */
  value: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: 'project-conceptualization',
    teaser:
      'Turning an idea into something an investor or ministry will back.',
    title: 'Project Conceptualization & Management',
    problem:
      'Ambitious projects stall between a promising idea and a proposal an investor or ministry will actually back.',
    value:
      'We take projects from ideation to execution for businesses, governments and multilateral agencies — building the roadmap, feasibility case and risk view needed to make them bankable and scalable.',
    capabilities: [
      'Strategic roadmap development',
      'Feasibility analysis & risk assessment',
      'End-to-end project execution',
      'Impact measurement & reporting',
    ],
  },
  {
    id: 'cross-border',
    teaser:
      'Entering a market without being caught by its regulation.',
    title: 'Cross-Border Transactions & Technology Transfers',
    problem:
      'Entering an unfamiliar market means navigating regulation, counterparties and IP terms simultaneously.',
    value:
      'We support international expansion through cross-border transactions, technology transfers and investment structuring, helping companies enter emerging markets and meet global sustainability standards.',
    capabilities: [
      'Market entry strategy',
      'Regulatory compliance management',
      'IP negotiations & protection',
      'Transaction structuring support',
    ],
  },
  {
    id: 'joint-ventures',
    teaser:
      'Finding the right partner, then structuring it to last.',
    title: 'Joint Ventures & Strategic Partnerships',
    problem:
      'The right partner is rarely the easiest to reach, and poorly structured ventures fail after signing.',
    value:
      'We establish value-driven joint ventures by matching innovators with investors, OEMs and policymakers — then structure them so the commercial logic survives execution.',
    capabilities: [
      'Partner identification & matching',
      'Joint venture structuring',
      'Operational integration',
      'Long-term sustainability planning',
    ],
  },
  {
    id: 'government-policy',
    teaser:
      'Policy built on modelling rather than assertion.',
    title: 'Government & Policy Advisory',
    problem:
      'Policy decisions on energy and industry carry long consequences and need evidence, not assertion.',
    value:
      'We advise national and sub-national governments on clean energy roadmaps, policy design and regulatory reform, backed by modelling tools, global benchmarks and scenario planning.',
    capabilities: [
      'Policy development & reform',
      'Trade policy advisory',
      'Economic modelling & scenarios',
      'Government relations management',
    ],
  },
  {
    id: 'energy-transitions',
    teaser:
      'Clean energy projects, from structuring to offtake.',
    title: 'Global Energy Transitions',
    problem:
      'Clean energy projects sit at the intersection of technology, offtake, certification and finance.',
    value:
      'We advise on solar, BESS, green hydrogen, ammonia and renewable electricity trade — covering project structuring, certification, market intelligence and energy diplomacy across India, the Middle East and Europe.',
    capabilities: [
      'Solar & BESS advisory',
      'Green hydrogen & ammonia',
      'Certification & market intelligence',
      'Energy diplomacy',
    ],
  },
  {
    id: 'investment-facilitation',
    teaser:
      'Introducing credible projects to climate-aligned capital.',
    title: 'Investment Facilitation',
    problem:
      'Climate-aligned capital and credible projects often fail to find each other.',
    value:
      'We connect climate-tech entrepreneurs and clean infrastructure developers with impact investors, sovereign funds and development finance institutions to unlock capital flows.',
    capabilities: [
      'Capital raising & deal structuring',
      'Investor and DFI introductions',
      'Policy-linked investment facilitation',
      'Mergers, acquisitions & advisory',
    ],
  },
];

/* --- Sectors --------------------------------------------------------------- */

export type Sector = {
  id: string;
  title: string;
  /** One line, homepage only. `summary` and `focus` belong to the
   *  Sectors page. */
  teaser: string;
  summary: string;
  focus: string[];
};

export const sectors: Sector[] = [
  {
    id: 'green-energy',
    teaser: 'Hydrogen, solar, storage and the policy around them.',
    title: 'Green Energy',
    summary:
      'We work across the energy value chain in the transition to clean, secure and sustainable systems — bridging innovation, policy and investment.',
    focus: [
      'Green hydrogen & ammonia',
      'Renewable energy strategy',
      'Energy storage & grid modernization',
      'Policy, regulation & energy markets',
      'Sustainable finance & investment facilitation',
    ],
  },
  {
    id: 'business-services',
    teaser: 'Capital, transactions and market entry.',
    title: 'Business Services & Investment Banking',
    summary:
      'For startups seeking capital, governments designing reforms and multinationals exploring new markets, we combine strategy, structure and execution.',
    focus: [
      'Capital raising & deal structuring',
      'Mergers, acquisitions & strategic advisory',
      'Market entry & expansion strategy',
      'Policy-linked investment facilitation',
    ],
  },
  {
    id: 'healthcare',
    teaser: 'Systems, workforce and health policy.',
    title: 'Healthcare & Allied Health Services',
    summary:
      'Across the continuum of care — primary healthcare, telemedicine, diagnostics, pharmaceuticals and allied health ecosystems.',
    focus: [
      'Health systems strengthening',
      'Healthcare investment advisory',
      'Allied health workforce development',
      'Digital health & innovation',
      'Health policy & public health',
    ],
  },
  {
    id: 'trade-policy',
    teaser: 'Trade negotiation, modelling and economic diplomacy.',
    title: 'Global Trade & Economic Policy',
    summary:
      'Advisory in international trade, economic diplomacy and policy design for governments, multilateral institutions and industry.',
    focus: [
      'Trade policy advisory',
      'Global value chain & supply chain strategy',
      'Economic modelling & forecasting',
      'WTO, regional & bilateral trade engagement',
      'Climate-trade nexus & just transition',
    ],
  },
  {
    id: 'technology-transfers',
    teaser: 'Moving industrial capability between markets.',
    title: 'Technology Transfers & Upgradations',
    summary:
      'Facilitating technology transfer, localization and process upgradation to bridge the gap between advanced economies and emerging markets.',
    focus: [
      'International technology transfer',
      'Industry 4.0 & smart manufacturing',
      'MSME modernization & competitiveness',
      'Technology due diligence',
      'Strategic localization',
    ],
  },
  {
    id: 'cross-border-business',
    teaser: 'Joint ventures and foreign direct investment.',
    title: 'Joint Ventures & Cross-Border Business',
    summary:
      'Enabling joint ventures, cross-border investment and market entry by bridging cultural, regulatory and commercial gaps.',
    focus: [
      'Joint venture structuring & execution',
      'Cross-border business advisory',
      'Bilateral & multilateral facilitation',
      'Foreign direct investment enablement',
      'Cultural & regulatory harmonization',
    ],
  },
];

/* --- Approach -------------------------------------------------------------
 * Presented as how we work, not as a certified methodology.
 * ------------------------------------------------------------------------ */

export const approach = [
  {
    step: '01',
    title: 'Understand',
    body: 'We start with your business, objectives and constraints — including the parts that are still unclear.',
  },
  {
    step: '02',
    title: 'Diagnose',
    body: 'We separate the presenting problem from the underlying one, and identify where the real opportunity sits.',
  },
  {
    step: '03',
    title: 'Strategise',
    body: 'We build a practical plan with sequencing, counterparties and funding routes identified, not just a direction.',
  },
  {
    step: '04',
    title: 'Execute',
    body: 'We stay through delivery — introductions, negotiations, structuring and the follow-through these require.',
  },
  {
    step: '05',
    title: 'Evaluate',
    body: 'We review outcomes against what we set out to achieve and adjust where the evidence calls for it.',
  },
];

/* --- Selected projects ----------------------------------------------------
 * Each entry links to the LinkedIn post published by the firm's directors.
 * Titles and summaries are drawn from those posts; images are matched from
 * the firm's own photographs where the subject is a reasonable fit, and left
 * null where no honest match exists.
 * ------------------------------------------------------------------------ */

export type Project = {
  id: number;
  title: string;
  summary: string;
  meta: string;
  /** Path under /public, or null when no photograph can be honestly matched. */
  image: string | null;
  alt: string;
  url: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Electric mobility ecosystem, Indonesia',
    summary:
      'Discussions on the EV landscape with the Asosiasi Ekosistem Mobilitas Listrik and a visit to KALISTA, the net-zero transition arm of Indika Energy, alongside academic colleagues from Kyoto, Kyushu and Aichi-Gakuin universities and BRIN.',
    meta: 'Clean mobility · Indonesia',
    image: '/media/delegation-travel.jpg',
    alt: 'Poorna Global Strategies colleagues travelling to a delegation visit',
    url: 'https://lnkd.in/p/gPsFY2ZQ',
  },
  {
    id: 2,
    title: 'EFTA desk and India–Iceland trade',
    summary:
      'Meeting with Martin Eyjólfsson, Permanent Secretary of Iceland, on the occasion of setting up the EFTA desk — covering geothermal energy, advanced medical technology devices and data centre opportunities.',
    meta: 'Trade & economic policy · Iceland',
    image: '/media/official-meeting.jpg',
    alt: 'Senior representatives meeting at an official engagement',
    url: 'https://lnkd.in/p/gED6hdqK',
  },
  {
    id: 3,
    title: 'Icelandic business delegation, New Delhi',
    summary:
      'An evening at the residence of Amb. Benedikt Höskuldsson with an Icelandic business delegation, Invest Iceland and the Foreign Secretary, marking the establishment of the EFTA desk.',
    meta: 'Economic diplomacy · India',
    image: '/media/working-meeting.jpg',
    alt: 'Business discussion over a working dinner',
    url: 'https://lnkd.in/p/gkGdrJ6y',
  },
  {
    id: 4,
    title: 'ICC Textile Conclave, Coimbatore',
    summary:
      'Meeting the Hon. Minister of Textiles, Tamil Nadu, Shri Vijay Balaji, to invite him to the ICC Textile Conclave held at Coimbatore.',
    meta: 'Industry convening · Tamil Nadu',
    image: '/media/colleagues-chennai.jpg',
    alt: 'Poorna Global Strategies colleagues ahead of an industry engagement',
    url: 'https://lnkd.in/p/gkAHH6_3',
  },
  {
    id: 5,
    title: 'Rotary Club of Madras in Singapore',
    summary:
      'Addressing the Rotary Club of Singapore on behalf of the Rotary Club of Madras, exchanging flags and presenting the "Timeless Legacy" as both clubs approach their hundredth year.',
    meta: 'Institutional relations · Singapore',
    image: null,
    alt: '',
    url: 'https://lnkd.in/p/gVV5db4n',
  },
  {
    id: 6,
    title: 'Indian Peacekeeping Force in Korea, 1953–54',
    summary:
      'A programme with the Chennai Commissioner of GST & Customs and Rathi Jafer, Director of the InKo Centre, telling the little-known story of 6,000 Indian soldiers in the DMZ at the 38th parallel.',
    meta: 'Cultural & bilateral engagement · Chennai',
    image: null,
    alt: '',
    url: 'https://lnkd.in/p/g6Bs95rX',
  },
  {
    id: 7,
    title: 'An evening in Chennai',
    summary:
      'A remembrance of meeting the Maestro after a concert in Chennai — "he was just the way his music was."',
    meta: 'Reflection',
    image: null,
    alt: '',
    url: 'https://lnkd.in/p/gNshfyVz',
  },
];

/* --- Closing invitations --------------------------------------------------
 * Each page closes with its own copy. Previously every page ended with the
 * same block, which made the site feel repetitive and gave a visitor no
 * reason to read past the first one.
 * ------------------------------------------------------------------------ */

export type Invitation = {
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
};

export const invitations: Record<string, Invitation> = {
  home: {
    title: "Let's discuss your next project",
    body: 'Tell us what you are trying to build, enter or reform. If we are the right people to help, we will say so — and if we are not, we will tell you that too.',
    primary: { label: 'Start a conversation', to: '/contact' },
    secondary: { label: 'Review our services', to: '/services' },
  },
  about: {
    title: 'Work directly with the people you just read about',
    body: 'Engagements here are led by the directors and advisers named on this page, not delegated down a pyramid.',
    primary: { label: 'Arrange an introduction', to: '/contact' },
    secondary: { label: 'See our work', to: '/projects' },
  },
  services: {
    title: 'Not sure which practice you need?',
    body: 'Most engagements draw on several. Describe the problem and we will tell you what it actually involves — including the parts you may not have scoped yet.',
    primary: { label: 'Describe your problem', to: '/contact' },
    secondary: { label: 'Browse by sector', to: '/sectors' },
  },
  sectors: {
    title: 'Working in one of these sectors?',
    body: 'Sector knowledge is only useful when paired with the regulatory and commercial path. Tell us where you are trying to get to.',
    primary: { label: 'Talk to a specialist', to: '/contact' },
    secondary: { label: 'See our services', to: '/services' },
  },
  projects: {
    title: 'Your project could be the next entry here',
    body: 'Every engagement on this page began with a conversation about an objective that was not yet fully defined.',
    primary: { label: 'Start that conversation', to: '/contact' },
    secondary: { label: 'About the firm', to: '/about' },
  },
  insights: {
    title: 'Turn a question into an engagement',
    body: 'If something you have read here maps onto a decision you are facing, we are glad to discuss it properly.',
    primary: { label: 'Get in touch', to: '/contact' },
    secondary: { label: 'See our work', to: '/projects' },
  },
};

/* --- Why work with us ----------------------------------------------------
 * Each point is traceable to the team and partnership information already
 * published on the site.
 * ------------------------------------------------------------------------ */

export const strengths = [
  {
    title: 'Senior people do the work',
    body: 'Our directors and advisory group include former ambassadors, a retired senior banker, an IIM Ahmedabad and Siemens veteran, and an economist whose modelling firm sits within GTAP alongside the World Bank and IMF.',
  },
  {
    title: 'Access on both sides of the table',
    body: 'We work across G2G, B2B, B2G and G2B engagements through standing relationships with government bodies, corporate leadership and chambers of trade.',
  },
  {
    title: 'Evidence before recommendation',
    body: 'Policy and energy work is supported by economic modelling, global benchmarks and scenario planning through our collaborator Infisum Modelling, a GTAP member based in Seattle.',
  },
  {
    title: 'We stay through execution',
    body: 'Strategy, structuring and delivery sit with one team, so insight is not lost in the handoff between advising and implementing.',
  },
];
