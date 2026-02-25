import { Navigation } from "@/components/Navigation";
import { AnalyticsTest } from "@/components/AnalyticsTest";
import { HeroSection } from "@/components/HeroSection";
import { StatsComparison } from "@/components/StatsComparison";
import { FeaturesSection } from "@/components/FeaturesSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { PricingSection } from "@/components/PricingSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />

      <ScrollReveal>
        <StatsComparison />
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal>
        <IntegrationsSection />
      </ScrollReveal>

      {/* <ScrollReveal delay={0.3}>
        <PricingSection />
      </ScrollReveal> */}

      <ScrollReveal>
        <CTASection />
      </ScrollReveal>

      <AnalyticsTest />
      <Footer />
    </div>
  );
};

export default Index;
