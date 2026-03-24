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
import { SEO } from "@/components/SEO";

const Index = () => {
  const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://vaakuos.com";
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VaakuOS",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.png`,
    "sameAs": [
      "https://www.linkedin.com/company/vaakuos"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "VaakuOS",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen relative">
      <SEO
        title="Recover every abandoned sale with VaakuOS"
        description="VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations."
        canonicalPath="/"
        structuredData={[orgSchema, websiteSchema]}
      />
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

      {/* <AnalyticsTest /> */}
      <Footer />
    </div>
  );
};

export default Index;
