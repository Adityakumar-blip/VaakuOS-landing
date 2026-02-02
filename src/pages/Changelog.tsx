import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Rocket, Sparkles, Zap, Bug } from "lucide-react";

const Changelog = () => {
  const updates = [
    {
      version: "v2.4.0",
      date: "January 15, 2026",
      title: "AI Intent Engine Refinement",
      type: "Featured",
      icon: Sparkles,
      color: "bg-primary",
      changes: [
        "Major upgrade to the retrieval logic engine for better conversion attribution.",
        "New 'Revenue Retrieval Engine' branding and UI elements.",
        "Improved WhatsApp API integration with enhanced delivery tracking.",
        "Beta release of the Abandoned Cart Revenue Calculator."
      ]
    },
    {
      version: "v2.3.2",
      date: "December 20, 2025",
      title: "Holiday Performance Updates",
      type: "Performance",
      icon: Zap,
      color: "bg-secondary",
      changes: [
        "Optimization for high-volume traffic during holiday sales.",
        "Fixed a sync delay issue with specific WooCommerce versions.",
        "Increased infrastructure capacity by 40% globally."
      ]
    },
    {
      version: "v2.3.0",
      date: "November 28, 2025",
      title: "Multi-Channel Dashboard",
      type: "Release",
      icon: Rocket,
      color: "bg-tertiary",
      changes: [
        "Unified inbox for WhatsApp, Email, and SMS interactions.",
        "New 'Smart Sync' feature to auto-end campaigns upon purchase.",
        "Enhanced security layers and GDPR compliance toolkit."
      ]
    },
    {
      version: "v2.2.5",
      date: "October 12, 2025",
      title: "Bug Fixes & Stability",
      type: "Standard",
      icon: Bug,
      color: "bg-muted-foreground",
      changes: [
        "Resolved an edge case where checkout links would expire early.",
        "Improved UI responsiveness on mobile devices.",
        "Updated API documentation for the new Webhook system."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Changelog</h1>
            <p className="text-muted-foreground text-lg">
              Stay up to date with the latest features, improvements, and fixes to VaakuOS.
            </p>
          </div>

          <div className="relative border-l border-border ml-4 md:ml-0">
            {updates.map((update, idx) => (
              <div key={idx} className="mb-16 relative pl-8 md:pl-12">
                {/* Timeline logic icon */}
                <div className={`absolute -left-6 md:-left-6 top-0 h-12 w-12 rounded-full border-4 border-background ${update.color} flex items-center justify-center text-white z-10`}>
                  <update.icon className="h-5 w-5" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary font-mono">{update.version}</span>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                      {update.type}
                    </Badge>
                  </div>
                  <time className="text-sm text-muted-foreground">{update.date}</time>
                </div>

                <div className="p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold mb-6">{update.title}</h2>
                  <ul className="space-y-4">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20 p-12 bg-muted/30 rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground">Looking for older updates?</p>
            <button className="text-primary font-bold hover:underline mt-2">
              View Archive (2024-2025)
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
