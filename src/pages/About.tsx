import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Users, Target, Rocket, Heart } from "lucide-react";
import { SEO } from "@/components/SEO";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision Focused",
      desc: "We don't believe in spray-and-pray. Every interaction is calculated for maximum impact and relevance."
    },
    {
      icon: Users,
      title: "Customer Obsessed",
      desc: "Our platform is built on the philosophy that if you treat customers with respect, they will return the favor."
    },
    {
      icon: Rocket,
      title: "Always Innovating",
      desc: "The e-commerce landscape changes weekly. Our AI engine evolves daily to stay ahead of the curve."
    },
    {
      icon: Heart,
      title: "Transparency First",
      desc: "No hidden fees, no complex attribution. We show you exactly how much revenue we recover and how."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="About VaakuOS"
        description="Meet the team building VaakuOS—the intent-driven engine helping brands recover abandoned revenue with respectful, timely outreach."
        canonicalPath="/about"
        ogImage="https://vaakuos.com/og-about.jpg"
      />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 text-center mb-24">
          <h1 className="text-4xl md:text-7xl font-bold mb-8">Our mission is to end <span className="text-primary italic">abandonment</span>.</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            VaakuOS was founded with a single goal: to help businesses build better relationships with their customers by being there at the right time, with the right message.
          </p>
        </div>

        <section className="bg-muted/30 py-24 mb-32">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">The VaakuOS Story</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  It started in a small home office where we noticed a recurring problem: brands were losing nearly 70% of their potential sales at the last mile of the checkout.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Existing solutions were intrusive, annoying, and often did more harm than good. We saw an opportunity to use AI not to spam, but to understand intent and offer genuine value.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Brands Trusted</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">$150M+</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Revenue Recovered</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-border flex items-center justify-center p-12">
                   <div className="text-center">
                      <div className="text-6xl mb-4">🚀</div>
                      <p className="text-xl font-bold italic text-foreground">"Building the future of intent-based commerce."</p>
                   </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Values that drive us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our core beliefs shape every line of code we write and every brand we partner with.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-300 flex gap-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* // TODO ~ manifested by end of 2026 */}
        {/* <section className="mt-32 py-24 border-t border-border">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 italic">Recognized by Industry Leaders</h2>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
              
               <div className="text-2xl font-black">Forbes</div>
               <div className="text-2xl font-black">TechCrunch</div>
               <div className="text-2xl font-black">WIRED</div>
               <div className="text-2xl font-black">Economist</div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default About;
