import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Puzzle, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const Integrations = () => {
  const categories = [
    {
      name: "E-commerce",
      items: [
        { name: "Shopify", status: "Certified", desc: "Native sync for orders, carts, and customer data." },
        { name: "WooCommerce", status: "Classic", desc: "Powerful plugin for WordPress stores." },
        { name: "BigCommerce", status: "Partner", desc: "Scale your storefront with real-time recovery." },
        { name: "Magento 2", status: "Enterprise", desc: "Robust integration for enterprise merchants." }
      ]
    },
    {
      name: "Automation & CRM",
      items: [
        { name: "Zapier", status: "Unlimited", desc: "Connect with 5000+ apps via webhooks." },
        { name: "HubSpot", status: "Certified", desc: "Sync recovery events to your CRM timeline." },
        { name: "Salesforce", status: "Enterprise", desc: "Full lifecycle management for larger teams." },
        { name: "Klaviyo", status: "Marketing", desc: "Combine AI recovery with email marketing." }
      ]
    },
    {
      name: "Productivity",
      items: [
        { name: "Slack", status: "Real-time", desc: "Get notifications for major recovered sales." },
        { name: "Google Sheets", status: "Export", desc: "Automate your reporting and data analysis." },
        { name: "Notion", status: "Wiki", desc: "Keep your recovery playbooks in sync." },
        { name: "Discord", status: "Community", desc: "Webhook support for team alerts." }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Integrations that fit your stack"
        description="Connect VaakuOS with Shopify, HubSpot, Salesforce, Slack, and more to recover revenue without heavy lift."
        canonicalPath="/integrations"
      />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Puzzle className="h-4 w-4" />
              <span className="text-sm font-medium">Native Integrations</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Works with your <span className="text-primary">tech stack</span>.</h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Connect VaakuOS to the tools you already use. Deploy in minutes with our native connectors and no-code setup.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-20 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search for an integration..." 
              aria-label="Search integrations"
              className="pl-12 py-6 rounded-full border-border bg-card/50"
            />
          </div>

          <div className="space-y-20">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  {cat.name}
                  <div className="h-px flex-1 bg-border" />
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cat.items.map((item, i) => (
                    <Card key={i} className="p-6 border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center font-bold text-xl">
                          {item.name[0]}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                      <div className="flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Connect Now <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-12 rounded-3xl bg-foreground text-background flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Can't find your tool?</h2>
              <p className="text-muted-foreground text-lg">Our universal API allows you to connect anything in minutes.</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold whitespace-nowrap transition-all">
              Request Integration
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Integrations;
