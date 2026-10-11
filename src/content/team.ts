import Raghunandan from '../assets/Team/Raghunandan.png';
import Rajan from '../assets/Team/Rajan.png';
import Mayilvelnathan from '../assets/Team/Mayilvelnathan.png';
import Badri from '../assets/Team/Badri.png';
import Abhilash from '../assets/Team/Abhilash.png';
import RajeshMehta from '../assets/Team/RajeshMehta.png';
import Sivaraman from '../assets/Team/Sivaraman.png';
import Suryanarayana from '../assets/Team/Suryanarayana.png';
import Soundararajan from '../assets/Team/Soundararajan.png';
import AnilTrigunayat from '../assets/Team/AnilTrigunayat.png';
import EvanL from '../assets/Team/EvanL.png';
import PriyankShah from '../assets/Team/PriyankShah.png';
import Sridhar from '../assets/Team/Sridhar.png';

/* ---------------------------------------------------------------------------
 * Team
 * Names, biographies and LinkedIn profiles carried over unchanged from the
 * existing About page. `focus` is a short label distilled from each person's
 * own biography — no new credentials are introduced.
 * ------------------------------------------------------------------------- */

export type TeamMember = {
  id: string;
  name: string;
  focus: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export const directors: TeamMember[] = [
  {
    id: 'raghunandan-akur-raman',
    name: 'Raghunandan Akur Raman',
    focus: 'Renewables, trade finance & cross-border partnerships',
    bio: 'Strategic adviser and catalyst for Indian and global businesses. Associated with businesses across multiple domains and with chambers of trade, he operates across renewables, trade finance, business development and cross-border partnerships.',
    image: Raghunandan,
    linkedin: 'https://www.linkedin.com/in/raghunandan-akur-raman-979a35b',
  },
  {
    id: 'badri-narayanan-gopalakrishnan',
    name: 'Badri Narayanan Gopalakrishnan',
    focus: 'Economics, modelling & policy',
    bio: 'An economist and strategy leader with a quarter century of global multisectoral experience across academia, industry, startups, nonprofits and policy work with governments and international organisations. His firm, Infisum Modelling, is part of GTAP alongside the World Bank and IMF. He has supported more than 20 countries in formulating policy and has worked with organisations including Amazon, Google and Microsoft.',
    image: Badri,
    linkedin: 'https://www.linkedin.com/in/badrinarayanang',
  },
  {
    id: 'mayilvelnathan-vivekananthan',
    name: 'Dr. Mayilvelnathan Vivekananthan',
    focus: 'Solar, hydrogen & clean energy',
    bio: 'Over 20 years of experience in the clean energy industry. A stakeholder in Cipher Neutron, a Canadian hydrogen technology company working in electrolyser technology, and an accredited consultant to a large green ammonia project of Power Finance Corporation in Oman.',
    image: Mayilvelnathan,
    linkedin: 'https://www.linkedin.com/in/dr-mayilvelnathan-vivekananthan-ph-d-27a70360',
  },
  {
    id: 'rajan-prakash',
    name: 'Rajan Prakash',
    focus: 'Healthcare & life sciences',
    bio: 'A Stanford alumnus with over 20 years of global leadership in healthcare and life sciences, holding 20+ patents in cardiac and digital health. He heads the Healthcare & Life Sciences practice at YASH Technologies, and his career spans leadership roles at CallHealth, AliveCor and Medtronic, where he worked on sensor-based heart failure programmes and remote care.',
    image: Rajan,
  },
];

export const advisors: TeamMember[] = [
  {
    id: 'abhilash-puljal',
    name: 'Abhilash Puljal',
    focus: 'Strategy, government & development',
    bio: 'An experienced strategy adviser with 23+ years delivering sustainable projects for public and private sector clients. His work spans government, international relations, organisational design and economic development across agriculture, renewable energy, defence and digital technologies. Indian Director of the London School of Economics and an Africa specialist.',
    image: Abhilash,
    linkedin: 'https://www.linkedin.com/in/puljal',
  },
  {
    id: 'rajesh-mehta',
    name: 'Rajesh Mehta',
    focus: 'Market entry & business development',
    bio: 'A leading international expert on market entry with over 25 years of cross-functional experience. He has advised organisations including JETRO, METI and Tekes, and contributes columns to The Hindu, Sunday Guardian, Politico and South Asian Herald.',
    image: RajeshMehta,
    linkedin: 'https://www.linkedin.com/in/rajeshmehtaentryindia',
  },
  {
    id: 'sivaraman-swaminathan',
    name: 'Sivaraman Swaminathan',
    focus: 'Economic diplomacy & trade policy',
    bio: 'A retired senior civil servant from the Indian Foreign Service who served in eight countries, including setting up the Indian mission in Iceland (2008–11) and seven years as a senior diplomat in São Paulo, latterly as Consul General of India (2006–08). His expertise covers trade policy, market access and investment promotion in oil and gas, auto components and renewable energy.',
    image: Sivaraman,
    linkedin: 'https://www.linkedin.com/in/sivaraman-swaminathan-5866b84',
  },
  {
    id: 'suryanarayana-rao-k',
    name: 'Suryanarayana Rao K',
    focus: 'Electrical infrastructure & delivery',
    bio: 'An IIM Ahmedabad alumnus and electrical and electronics engineer who spent over 20 years at Siemens in India and Germany. He runs a consulting entity establishing electrical and electronics infrastructure across Asia, with project experience in India, Bangladesh, Vietnam, Cambodia and Myanmar.',
    image: Suryanarayana,
    linkedin: 'https://www.linkedin.com/in/suryanarayana-rao-k-1429572b',
  },
  {
    id: 'soundararajan-ramaswamy',
    name: 'Soundararajan Ramaswamy',
    focus: 'Banking, compliance & insolvency',
    bio: 'A retired senior banker with over 40 years of experience who served Central Bank of India and oversaw an offshore entity in Hong Kong. A qualified insolvency resolution professional and an expert on compliance.',
    image: Soundararajan,
    linkedin: 'https://www.linkedin.com/in/soundararajan-ramaswamy-646a3545',
  },
  {
    id: 'anil-trigunayat',
    name: 'Anil Trigunayat',
    focus: 'Diplomacy & strategic analysis',
    bio: 'A diplomat with over three decades of experience in public diplomacy, strategic analysis and economic engagement. Former Indian Ambassador to Jordan, Libya and Malta, with expertise in conflict management and international relations. He serves as Independent Director at NTPC Ltd and holds positions in international organisations and think tanks.',
    image: AnilTrigunayat,
    linkedin: 'https://www.linkedin.com/in/ambaniltrigunayat',
  },
  {
    id: 'evan-l',
    name: 'Evan L',
    focus: 'Asset management & private equity',
    bio: 'An asset management and private equity professional experienced in product, marketing and distribution for Asian and global markets, providing investment solutions through fixed income, equity and private equity structures. Based in Singapore, he is involved in sourcing funds and private equity investments.',
    image: EvanL,
    linkedin: 'https://www.linkedin.com/in/evan-l-816056166/',
  },
  {
    id: 'priyank-shah',
    name: 'Priyank Shah',
    focus: 'Industrial commercial strategy',
    bio: 'A commercial and strategy leader with nearly two decades of experience across chemicals, paints and coatings, renewables, construction materials, maritime and oil and gas. A former senior executive at AkzoNobel, he has built and scaled global businesses, set up factories and supply chains, and led cross-cultural teams across multiple continents.',
    image: PriyankShah,
    linkedin: 'https://www.linkedin.com/in/priyank-shah-7315b33',
  },
  {
    id: 'prof-dr-s-sridhar',
    name: 'Prof. Dr. S. Sridhar',
    focus: 'Academia, IT & research',
    bio: 'An academic leader and IT expert with over 40 years in education and 30 years in industry and R&D. A PhD from JNU, he has served as Vice Chancellor at major universities and collaborated with Dr. A. P. J. Abdul Kalam. He has managed large-scale IT and R&D projects for international organisations, authored 10 books, published 332 research papers and guided 20 PhD scholars.',
    image: Sridhar,
    linkedin: 'https://www.linkedin.com/in/dr-ssridhar-6a81a5163',
  },
];

/* --- Values — carried over from the existing About page ------------------ */

export const values = [
  {
    title: 'Trust & integrity',
    body: 'We build enduring partnerships rooted in transparency and accountability. Integrity is the foundation of everything we do.',
  },
  {
    title: 'Innovation with a purpose',
    body: 'We champion innovation to solve real problems — from digital transformation to green energy modelling — not for its own sake.',
  },
  {
    title: 'Client success',
    body: "Our clients' objectives set the agenda. We work alongside their teams to anticipate what is needed and deliver solutions that hold up.",
  },
];
