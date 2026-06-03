import CTASection from '@/components/landing/CTASection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import TrustLogos from '@/components/landing/TrustLogos';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <TrustLogos />
        <HowItWorks />
        <FeatureGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
