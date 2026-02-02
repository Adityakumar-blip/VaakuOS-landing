import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Book, Code, Zap, Shield, Laptop, Terminal, ChevronRight } from "lucide-react";

const Documentation = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: Zap,
      items: ["Introduction", "Quick Start Guide", "Core Concepts", "Installation"]
    },
    {
      title: "Integrations",
      icon: Laptop,
      items: ["Shopify Native App", "WooCommerce Plugin", "Custom API Setup", "Webhook Listener"]
    },
    {
      title: "The Engine",
      icon: Code,
      items: ["Intent Algorithms", "Retrieval Flows", "A/B Testing API", "Smart Sync Logic"]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      items: ["Data Encryption", "GDPR Compliance", "CCPA Compliance", "Access Tokens"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0 hidden md:block">
              <div className="sticky top-32 space-y-8">
                {categories.map((cat, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{cat.title}</h3>
                    <ul className="space-y-2">
                      {cat.items.map((item, j) => (
                        <li key={j}>
                          <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-2 text-primary font-bold mb-4">
                <Book className="h-5 w-5" />
                <span>Developer Hub</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Everything you need to integrate VaakuOS into your existing e-commerce infrastructure and start retrieving lost revenue.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-16">
                <button className="p-8 rounded-3xl border border-border bg-card hover:border-primary transition-all text-left group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Terminal className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">API Reference</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Explore our comprehensive REST API and build custom implementations.</p>
                </button>
                <button className="p-8 rounded-3xl border border-border bg-card hover:border-secondary transition-all text-left group">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Code className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">SDK Guides</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Ready-to-use libraries for React, Node, Python, and Go.</p>
                </button>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  VaakuOS is an intent-based communication engine designed to solve the $18B problem of abandoned carts. Unlike traditional retargeting, we focus on real-time behavior and multi-channel consistency.
                </p>
                
                <h3 className="text-xl font-bold mb-3">Core Principles</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <div>
                      <strong className="text-foreground">Behavioral Triggers:</strong> We track cursor intent, dwell time, and scroll velocity.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <div>
                      <strong className="text-foreground">Channel Neutrality:</strong> We interact wherever the customer is — WhatsApp, Email, or SMS.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <div>
                      <strong className="text-foreground">Revenue Integrity:</strong> Real-time sync with your transaction ledger to prevent intrusive notifications post-purchase.
                    </div>
                  </li>
                </ul>

                <div className="p-6 rounded-2xl bg-muted/50 border border-border mt-12">
                   <h4 className="font-bold mb-2 flex items-center gap-2">
                     <Zap className="h-4 w-4 text-primary" />
                     Quick Tip
                   </h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">
                     Starting with Shopify? Use our <span className="text-primary font-bold">One-Click Deploy</span> to get up and running in under 5 minutes without touching any code.
                   </p>
                </div>
              </div>
              
              <div className="mt-20 pt-10 border-t border-border flex items-center justify-between">
                <button className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  ← Previous: Introduction
                </button>
                <button className="text-primary font-bold flex items-center gap-2">
                  Next: Setup Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
