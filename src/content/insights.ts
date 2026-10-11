import Raghunandan from '../assets/Team/Raghunandan.png';
import Abhilash from '../assets/Team/Abhilash.png';
import Mayilvelnathan from '../assets/Team/Mayilvelnathan.png';

/* ---------------------------------------------------------------------------
 * Insights
 * The three articles already published on the site, authored by named members
 * of the firm. Content is carried over verbatim; the raw HTML strings have
 * been replaced with structured blocks so nothing needs dangerouslySetInnerHTML.
 * No new articles have been invented.
 * ------------------------------------------------------------------------- */

export type Block = { type: 'heading'; text: string } | { type: 'paragraph'; text: string };

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string; image: string };
  body: Block[];
};

const p = (text: string): Block => ({ type: 'paragraph', text });
const h = (text: string): Block => ({ type: 'heading', text });

export const insights: Insight[] = [
  {
    slug: 'partnering-for-impact-unlocking-growth-through-collaboration',
    title: 'Partnering for Impact: Unlocking Growth Through Collaboration',
    excerpt:
      'Businesses today thrive not just through innovation, but through meaningful partnerships. The ability to collaborate across sectors and borders is critical to long-term growth and resilience.',
    category: 'Strategic Partnerships',
    date: 'June 15, 2023',
    readTime: '5 min read',
    author: { name: 'Raghunandan Akur Raman', role: 'Director', image: Raghunandan },
    body: [
      p(
        'Businesses today thrive not just through innovation, but through meaningful partnerships. In an increasingly interconnected and policy-driven world, the ability to collaborate across sectors and borders is critical to long-term growth and resilience.',
      ),
      p(
        'At Poorna, we work with forward-looking organizations to build strategic alliances, form high-impact joint ventures, and engage effectively with government bodies. Our approach helps clients unlock funding, navigate regulations, drive innovation, and build competitive advantage in local and global markets.',
      ),
      p(
        'We support businesses across a wide range of sectors—from technology and infrastructure to energy and public services—by identifying the right partners, structuring collaborations, and driving execution with measurable outcomes. Our strength lies in bridging private enterprise with public policy, creating shared value that benefits all stakeholders.',
      ),
      p(
        'Through extensive market insights and a hands-on advisory model, we enable our clients to not only respond to opportunities but also proactively shape them. We guide organizations through the lifecycle of a partnership—from conceptualization and stakeholder alignment to negotiation, implementation, and long-term value realization.',
      ),
      p(
        'Our team brings deep experience in facilitating public-private dialogues, enabling policy alignment, and securing institutional funding for mission-driven initiatives. Whether you are launching a joint venture, seeking government engagement, or scaling through a strategic partnership, Poorna delivers clarity, structure, and momentum.',
      ),
      p(
        'Whether it is entering new geographies, co-developing technology, or aligning with national development goals, our strategic and government advisory solutions are designed to help you build ecosystems that are agile, scalable, and future-ready.',
      ),
    ],
  },
  {
    slug: 'breaking-borders-navigating-cross-border-transactions',
    title: 'Breaking Borders: Navigating Cross-Border Transactions and Technology Transfers',
    excerpt:
      'Expanding across borders is no longer a luxury—it is a strategic imperative. But it brings a complex array of legal, commercial, technological and cultural challenges.',
    category: 'Global Business',
    date: 'May 28, 2023',
    readTime: '6 min read',
    author: { name: 'Abhilash Puljal', role: 'Mentor & Advisory', image: Abhilash },
    body: [
      p(
        'In an increasingly interconnected world, expanding across borders is no longer a luxury—it is a strategic imperative. As businesses eye global markets for growth, they are faced with a complex array of legal, business, technological, and cultural challenges. These barriers can slow momentum, increase costs, or derail initiatives altogether if not addressed with a clear, expert-guided strategy.',
      ),
      p(
        'At Poorna, we believe that global expansion requires more than ambition. It demands precision, preparation, and a deep understanding of cross-border dynamics.',
      ),
      h('Understanding the regulatory maze'),
      p(
        'Regulations vary widely between jurisdictions and touch every facet of business: from ownership restrictions and labour laws to technology licensing and data privacy. Missteps in compliance can be costly, both commercially and reputationally. Our approach involves helping businesses decode and comply with both domestic and international laws, ensuring that operations remain smooth, legal, and aligned with local expectations.',
      ),
      h('Tackling commercial complexity'),
      p(
        'Cross-border transactions introduce another layer of intricacy. Navigating issues like taxation, currency conversion, and capital movement requires detailed planning. Poorna offers end-to-end structuring support—from tax advisory to managing foreign exchange risk—to ensure profitability across borders is not lost to inefficiencies or surprises.',
      ),
      h('Transferring technology securely and strategically'),
      p(
        'Technology transfer is often a cornerstone of international growth strategies, particularly for companies in high-tech or knowledge-driven sectors. However, legal restrictions, licensing frameworks, and IP protection concerns make this a sensitive area. We support clients in structuring licensing deals, protecting intellectual property in unfamiliar jurisdictions, and ensuring that digital infrastructure is secure and compliant.',
      ),
      h('Bridging cultural and operational gaps'),
      p(
        'Legal and commercial matters may grab the headlines, but cultural misalignment can quietly erode even the most promising cross-border partnerships. From leadership styles to communication preferences, understanding local culture is key. Poorna assists clients in developing localized engagement strategies and building the cultural fluency needed to manage diverse teams and expectations.',
      ),
      h('A proven framework for global growth'),
      p(
        'We bring a structured, pragmatic approach to internationalization. Our framework includes opportunity analysis, partner identification, risk mitigation, deal structuring, and ongoing operational support. Whether launching a joint venture, forming a strategic alliance, or entering a new market, our advisory enables you to move confidently and compliantly.',
      ),
      h('The road ahead'),
      p(
        'Cross-border expansion is not just about reaching new customers. It is about unlocking strategic value, accessing innovation, and positioning your organization as a truly global player. But success requires more than bold moves—it requires informed ones.',
      ),
    ],
  },
  {
    slug: 'vision-to-execution-effective-project-conceptualization',
    title: 'From Vision to Execution: How Effective Project Conceptualization Drives Success',
    excerpt:
      'Behind every successful project lies a well-crafted vision—but what determines its impact is how that vision is translated into action.',
    category: 'Project Management',
    date: 'April 12, 2023',
    readTime: '5 min read',
    author: {
      name: 'Dr. Mayilvelnathan Vivekananthan',
      role: 'Director',
      image: Mayilvelnathan,
    },
    body: [
      p(
        'Behind every successful project lies a well-crafted vision—but what truly determines its impact is how that vision is translated into action. In today\u2019s fast-paced and outcome-driven environment, businesses cannot afford to stumble at the starting line. Project conceptualization, when done right, serves as the foundation for clarity, alignment, and long-term value creation.',
      ),
      p(
        'At Poorna, we believe that the success of any initiative begins well before execution. It starts with asking the right questions, defining the right outcomes, and bringing the right minds together.',
      ),
      h('Shaping the vision with precision'),
      p(
        'Effective project conceptualization is more than an idea on paper—it is the disciplined process of turning ambition into a structured plan. This involves defining clear objectives, outlining key deliverables, identifying stakeholders, and mapping potential risks. A strong conceptual framework ensures that every phase of the project is aligned with strategic business goals.',
      ),
      h('Engaging stakeholders early'),
      p(
        'One of the most common reasons projects fail is misalignment among stakeholders. Early-stage engagement of all relevant parties—from internal teams to external partners and regulators—ensures ownership, accountability, and buy-in. At Poorna, we guide clients in building stakeholder coalitions that are aligned not just by mandate, but by shared vision and measurable impact.',
      ),
      h('Designing for execution'),
      p(
        'A well-conceptualized project anticipates execution. This means integrating timelines, resources, governance structures, and contingencies into the initial design. We help our clients develop execution blueprints that are adaptive yet focused, ensuring that project teams remain resilient in the face of challenges and capable of course correction without losing momentum.',
      ),
      h('The role of advisory in strategic projects'),
      p(
        'Our role is to act as a thought partner in the early stages of project design—challenging assumptions, uncovering blind spots, and bringing cross-sector expertise to the table. From infrastructure and innovation to policy and development, our project conceptualization support ensures that great ideas do not just launch, but land successfully.',
      ),
      h('Conclusion'),
      p(
        'Vision without structure risks becoming a missed opportunity. In contrast, a well-conceptualized project fuels confidence, attracts the right partners, and maximizes return on effort and investment.',
      ),
    ],
  },
];

export const findInsight = (slug?: string) => insights.find((item) => item.slug === slug);
