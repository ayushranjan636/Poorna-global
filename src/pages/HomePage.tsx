import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Sectors from '../components/Sectors';
import Approach from '../components/Approach';
import SelectedProjects from '../components/SelectedProjects';
import WhyUs from '../components/WhyUs';
import Credibility from '../components/Credibility';
import FaqSection from '../components/FaqSection';
import CTASection from '../components/CTASection';
import { usePageMeta } from '../lib/usePageMeta';

export default function HomePage() {
  usePageMeta({
    title: 'Poorna Global Strategies | Strategy, Partnerships & Delivery',
    description:
      'Poorna Global Strategies works with businesses, governments and multilateral agencies to conceptualise, facilitate and implement projects across renewables, healthcare, trade policy and technology transfer.',
  });

  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
      <Sectors />
      <Approach />
      <SelectedProjects />
      <WhyUs />
      <Credibility />
      <FaqSection />
      <CTASection />
    </>
  );
}
