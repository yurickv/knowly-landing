import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import SolutionSection from '@/components/sections/SolutionSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import OfferSection from '@/components/sections/OfferSection';
import TrustSection from '@/components/sections/TrustSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <BenefitsSection />
      <OfferSection />
      <TrustSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
