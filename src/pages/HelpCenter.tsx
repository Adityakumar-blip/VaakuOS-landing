import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search, LifeBuoy, CreditCard, Settings, User, HelpCircle, MessageSquare } from "lucide-react";

const HelpCenter = () => {
  const commonFAQs = [
    {
      q: "How accurate is the 'Recoverable Revenue' calculation?",
      a: "Our calculator uses industry-standard benchmarks combined with your specific data to provide a projection. Real-world results typically vary within 5-10% of our estimates."
    },
    {
      q: "Can I use VaakuOS with multiple Shopify stores?",
      a: "Yes, our Pro and Enterprise plans support multi-store management from a single dashboard with unified reporting."
    },
    {
      q: "What happens if a customer completes a purchase via a different device?",
      a: "Our Smart Sync technology uses cross-device identity mapping and real-time ledger checks to ensure recovery flows stop immediately regardless of the device used for checkout."
    },
    {
      q: "Are the WhatsApp messages GDPR compliant?",
      a: "Absolutely. We require explicit opt-in for marketing messages, and our system automatically filters recipients based on their regional privacy regulations."
    }
  ];

  const categories = [
    { icon: User, title: "Account & Billing", desc: "Manage your subscription, invoices, and team permissions." },
    { icon: Settings, title: "Configurations", desc: "Setting up triggers, delays, and conversion windows." },
    { icon: CreditCard, title: "Payments", desc: "Handling checkout links and payment processor integrations." },
    { icon: LifeBuoy, title: "Troubleshooting", desc: "Common errors and how to resolve them quickly." }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
               <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary" />
               </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">How can we <span className="text-primary italic">help</span>?</h1>
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search articles, guides, or FAQs..." 
                className="pl-12 py-8 rounded-2xl border-border bg-card shadow-sm text-lg focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {categories.map((cat, i) => (
              <button key={i} className="p-8 rounded-3xl border border-border bg-card hover:border-primary transition-all text-left flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
                  <cat.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {commonFAQs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card/50">
                  <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 p-12 rounded-[40px] bg-foreground text-background flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2 text-white">Still need support?</h2>
              <p className="text-muted-foreground text-lg">Our experts are available via chat and email for direct assistance.</p>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all">
                  Open a Ticket
               </button>
               <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Live Chat
               </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
