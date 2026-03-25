import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FrostedBackground } from "@/components/FrostedBackground";
import { Button } from "@/components/ui/button";
import {
  Check,
  CheckCircle2,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SEO } from "@/components/SEO";

// --- Configuration ---

import { PRICING_DATA } from "@/data/pricing-plans";

const FEATURE_METADATA: Record<string, { label: string; type?: "boolean" | "text" }> = {
  api_access: { label: "API Access", type: "boolean" },
  max_agents: { label: "Max Agents" },
  max_contacts: { label: "Max Contacts" },
  max_campaigns: { label: "Max Campaigns" },
  monthly_messages: { label: "Monthly Messages" },
  priority_support: { label: "Priority Support", type: "boolean" },
  broadcast_enabled: { label: "Broadcast Enabled", type: "boolean" },
  markup_per_message: { label: "Markup Per Message" },
  monthly_ai_replies: { label: "Monthly AI Replies" },
};

const COMPARISON_CONFIG = [
  {
    title: "Usage & Limits",
    rows: [
      { key: "monthly_messages", help: "Total monthly WhatsApp messages allowed." },
      { key: "max_contacts", help: "Maximum number of contacts/leads you can store." },
      { key: "max_agents", help: "Number of team members who can access the dashboard." },
      { key: "max_campaigns", help: "Number of active broadcast campaigns allowed." },
      { key: "monthly_ai_replies", help: "Number of AI-powered automated replies per month." },
    ],
  },
  {
    title: "Features & Support",
    rows: [
      { key: "broadcast_enabled", help: "Ability to send mass messages to your contacts." },
      { key: "api_access", help: "Access to developer APIs and webhooks for integration." },
      { key: "priority_support", help: "Faster response times and dedicated support channel." },
      { key: "markup_per_message", help: "Additional cost per message (INR)." },
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();

  const handleGetStarted = (planId: string) => {
    navigate(`/login?planId=${planId}&billingCycle=${billingCycle}`);
  };

  const currentPlans = PRICING_DATA[billingCycle].map((plan) => ({
    ...plan,
    highlight: plan.name === "Growth",
    cta: "Get Started",
    featureMap: plan.features.reduce((acc: any, f: any) => {
      acc[f.code] = f;
      return acc;
    }, {}),
  }));

  return (
    <div className="min-h-screen relative font-sans text-foreground">
      <SEO
        title="Pricing plans that scale with you"
        description="Pick a VaakuOS plan to automate recovery, messaging, and conversions—built for fast-growing teams."
        canonicalPath="/pricing"
      />
      <Navigation />
      <FrostedBackground />

      <main className="container mx-auto px-4 pt-32 pb-24 relative z-10 max-w-[1200px]">
        {/* --- Header & Toggles --- */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Choose the perfect plan for your business. Whether you're just starting out or scaling fast, we've got you covered.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex bg-secondary/50 backdrop-blur-sm p-1.5 rounded-2xl border border-border/50 mb-8 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                billingCycle === "monthly"
                  ? "bg-white text-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/30",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                billingCycle === "yearly"
                  ? "bg-white text-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/30",
              )}
            >
              Yearly{" "}
              <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                -20% Off
              </span>
            </button>
          </div>
        </div>

        {/* --- Pricing Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {currentPlans.map((plan, idx) => {
            const displayPrice = billingCycle === "monthly" ? plan.amount : plan.discountedMonthlyPrice;
            const isGrowth = plan.name === "Growth";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={cn(
                  "relative flex flex-col p-8 border backdrop-blur-xl transition-all duration-500 rounded-[2.5rem] group",
                  isGrowth
                    ? "bg-primary/5 border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/20"
                    : "bg-white/40 border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                )}
              >
                {isGrowth && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-primary px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">
                      ₹{displayPrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground font-semibold text-base">
                      /mo
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-primary font-bold mt-2 animate-pulse">
                      Billed annually (₹{plan.yearlyPrice.toLocaleString()}/yr)
                    </p>
                  )}
                  {billingCycle === "monthly" && (
                    <p className="text-sm text-muted-foreground mt-2">
                       ₹{plan.yearlyPrice.toLocaleString()}/yr if billed yearly
                    </p>
                  )}
                </div>

                <div className="space-y-4 flex-grow border-t border-border/40 pt-8">
                  {plan.features.slice(1, 7).map((feature: any, i: number) => (
                    <div key={i} className="flex gap-4 text-sm items-center">
                      <div className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                        feature.value === false ? "bg-muted text-muted-foreground/30" : "bg-primary/10 text-primary"
                      )}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <span className={cn(
                        "font-medium leading-none",
                        feature.value === false ? "text-muted-foreground/50" : "text-foreground/80"
                      )}>
                        {feature.display_value} {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className={cn(
                    "w-full font-bold h-14 rounded-2xl mt-10 transition-all duration-300",
                    isGrowth
                      ? "bg-primary hover:bg-primary/90 text-white shadow-[0_10px_30px_-10px_rgba(var(--primary),0.5)] hover:-translate-y-1"
                      : "bg-secondary hover:bg-secondary/80 text-foreground hover:-translate-y-1",
                  )}
                  onClick={() => handleGetStarted(plan.id)}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* --- Comparison Table --- */}
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Compare Features</h2>
            <p className="text-muted-foreground">Find the detailed breakdown of what's included in each plan.</p>
          </div>

          <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-border/50 shadow-2xl overflow-hidden">
            <TooltipProvider>
              {/* Desktop Sticky Header */}
              <div className="hidden md:grid grid-cols-4 gap-4 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 py-8 px-8">
                <div className="col-span-1 text-sm font-black text-muted-foreground uppercase tracking-[0.2em] self-center">
                  Core Features
                </div>

                {currentPlans.map((plan, idx) => (
                  <div
                    key={plan.id}
                    className="col-span-1 text-center flex flex-col items-center justify-center"
                  >
                    <span className={cn(
                      "font-black text-xl mb-4",
                      plan.name === "Growth" ? "text-primary" : "text-foreground"
                    )}>
                      {plan.name}
                    </span>
                    <Button
                      size="sm"
                      variant={plan.name === "Growth" ? "default" : "outline"}
                      onClick={() => handleGetStarted(plan.id)}
                      className="w-full max-w-[120px] rounded-xl h-10 font-bold"
                    >
                      Choose
                    </Button>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-border/30">
                {COMPARISON_CONFIG.map((category, idx) => (
                  <div key={idx}>
                    {/* Category Header */}
                    <div className="bg-secondary/30 px-8 py-4 backdrop-blur-sm">
                      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">
                        {category.title}
                      </h3>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-border/10">
                      {category.rows.map((row, rIdx) => {
                        const metadata = FEATURE_METADATA[row.key];
                        return (
                          <div
                            key={rIdx}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-8 py-6 hover:bg-primary/[0.02] transition-colors group"
                          >
                            {/* Feature Name */}
                            <div className="col-span-1 font-bold text-foreground/80 text-sm flex items-center gap-2">
                              {metadata?.label || row.key}
                              {row.help && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-foreground text-background border-none p-3 rounded-xl shadow-2xl">
                                    <p className="max-w-[200px] text-xs leading-relaxed font-medium">{row.help}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>

                            {/* Values */}
                            {currentPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className="col-span-1 text-center text-sm"
                              >
                                <span className="md:hidden text-muted-foreground/50 text-[10px] block font-black uppercase mb-1">
                                  {plan.name}
                                </span>
                                {renderCell(
                                  plan.featureMap?.[row.key]?.display_value ??
                                  plan.featureMap?.[row.key]?.value ??
                                  false
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const renderCell = (value: any) => {
  if (value === true || value === "Included")
    return <CheckCircle2 className="h-6 w-6 text-primary mx-auto" strokeWidth={2.5} />;
  if (value === false || value === "Not Included")
    return (
      <span className="text-muted-foreground/20 text-2xl font-light">—</span>
    );
  if (value === -1 || value === "Unlimited") {
    return <span className="text-primary font-black tracking-tighter text-lg">∞</span>;
  }
  return <span className="text-foreground/90 font-bold">{value}</span>;
};

export default Pricing;
