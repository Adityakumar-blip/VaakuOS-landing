import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FrostedBackground } from "@/components/FrostedBackground";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, CheckCircle2, Bot, Plus, X, ChevronDown, HelpCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRazorpay } from "@/hooks/use-razorpay";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// --- Configuration ---

const ADDONS = [
  {
    id: "ai-copilot",
    name: "AI Copilot",
    shortName: "AI",
    description: "GPT-4o auto-responses",
    price: 999,
    period: "/mo",
    icon: Bot,
    type: "monthly",
    featureText: "AI Copilot Enabled"
  },
  {
    id: "setup-assist",
    name: "Expert Setup",
    shortName: "Setup",
    description: "One-time account setup",
    price: 2999,
    period: "one-time",
    icon: Sparkles,
    type: "onetime",
    featureText: "Priority Expert Setup"
  }
];

const PLANS_DATA = {
  monthly: [
    {
      id: "free-monthly",
      name: "Free",
      description: "Essential tools to start.",
      basePrice: 0,
      baseFeatures: ["1,000 Monthly Messages", "1 User Agent", "Basic Automation", "Community Support"],
      cta: "Get Started Free",
      highlight: false
    },
    {
      id: "pro-monthly",
      name: "Professional",
      description: "For growing businesses.",
      basePrice: 1599,
      baseFeatures: ["10,000 Monthly Messages", "5 User Agents", "No Branding", "Priority Support", "Webhooks"],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      id: "team-monthly",
      name: "Team",
      description: "Advanced collaboration.",
      basePrice: 3999,
      baseFeatures: ["100,000 Monthly Messages", "Unlimited Agents", "Shared Workflows", "Zero Meta Markup", "Dedicated Support"],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      id: "enterprise-monthly",
      name: "Enterprise",
      description: "Custom solutions.",
      basePrice: null, 
      baseFeatures: ["Unlimited Volume", "SSO & Advanced Security", "Custom Contracts", "Dedicated Success Manager"],
      cta: "Contact Sales",
      highlight: false
    }
  ],
  yearly: [
    {
      id: "free-yearly",
      name: "Free",
      description: "Essential tools to start.",
      basePrice: 0,
      baseFeatures: ["1,000 Monthly Messages", "1 User Agent", "Basic Automation", "Community Support"],
      cta: "Get Started Free",
      highlight: false
    },
    {
      id: "pro-yearly",
      name: "Professional",
      description: "For growing businesses.",
      basePrice: 1299,
      baseFeatures: ["10,000 Monthly Messages", "5 User Agents", "No Branding", "Priority Support", "Webhooks"],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      id: "team-yearly",
      name: "Team",
      description: "Advanced collaboration.",
      basePrice: 3199,
      baseFeatures: ["100,000 Monthly Messages", "Unlimited Agents", "Shared Workflows", "Zero Meta Markup", "Dedicated Support"],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      id: "enterprise-yearly",
      name: "Enterprise",
      description: "Custom solutions.",
      basePrice: null,
      baseFeatures: ["Unlimited Volume", "SSO & Advanced Security", "Custom Contracts", "Dedicated Success Manager"],
      cta: "Contact Sales",
      highlight: false
    }
  ]
};

const COMPARISON_CATEGORIES = [
  {
    title: "Messaging & Automation",
    rows: [
      { name: "Monthly Messages", free: "1,000", pro: "10,000", team: "100,000", ent: "Unlimited", help: "Number of conversations you can initiate." },
      { name: "Zero Meta Markup", free: false, pro: false, team: true, ent: true, help: "Pay direct Meta rates with no extra fees." },
      { name: "Broadcasts", free: true, pro: true, team: true, ent: true },
      { name: "Webhooks", free: false, pro: true, team: true, ent: true },
    ]
  },
  {
    title: "Team & Security",
    rows: [
      { name: "User Agents", free: "1", pro: "5", team: "Unlimited", ent: "Unlimited" },
      { name: "Shared Inbox", free: true, pro: true, team: true, ent: true },
      { name: "Role Based Access", free: false, pro: false, team: true, ent: true },
      { name: "SSO (SAML)", free: false, pro: false, team: false, ent: true },
    ]
  },
  {
    title: "Support & Services",
    rows: [
      { name: "Support Level", free: "Community", pro: "Email", team: "Priority", ent: "Dedicated Mgr" },
      { name: "Onboarding Session", free: false, pro: false, team: true, ent: true },
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const { initiatePurchase } = useRazorpay();

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCreatePlan = (basePlan: any, totalAmount: number) => {
    // Pass the calculated total amount or list of products to the backend
    initiatePurchase({ 
        ...basePlan,
        amount: totalAmount * 100 // Convert to paise/cents if needed by razorpay hook
    });
  };

  const currentPlanSet = PLANS_DATA[billingCycle];

  const getCalculatedPrice = (basePrice: number | null) => {
    if (basePrice === null) return null;
    let total = basePrice;
    
    // Add Monthly Addons to the monthly rate
    ADDONS.forEach(addon => {
        if (selectedAddons.includes(addon.id) && addon.type === 'monthly') {
            total += addon.price;
        }
    });
    return total;
  };

  const getOneTimeFee = () => {
      // Calculate one-time fees separately
      let total = 0;
      ADDONS.forEach(addon => {
          if (selectedAddons.includes(addon.id) && addon.type === 'onetime') {
              total += addon.price;
          }
      });
      return total;
  };

  const oneTimeFee = getOneTimeFee();

  // Helper to handle purchase from sticky header
  const handlePurchaseByIndex = (index: number) => {
      const plan = currentPlanSet[index];
      const price = getCalculatedPrice(plan.basePrice) || 0;
      handleCreatePlan(plan, price);
  }

  return (
    <div className="min-h-screen relative font-sans text-foreground">
      <Navigation />
      <FrostedBackground />

      <main className="container mx-auto px-4 pt-32 pb-24 relative z-10 max-w-[1600px]">
        
        {/* --- Header & Toggles --- */}
        <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Plans that scale with you
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Simple pricing. No hidden fees. Cancel anytime.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="inline-flex bg-secondary p-1 rounded-full border border-border mb-8">
               <button
                  onClick={() => setBillingCycle("monthly")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                    billingCycle === "monthly" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
               >
                 Monthly
               </button>
               <button
                  onClick={() => setBillingCycle("yearly")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                    billingCycle === "yearly" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
               >
                 Yearly <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">Save 20%</span>
               </button>
            </div>
        </div>

        {/* --- ADD-ONS SELECTION (Top Placement) --- */}
        <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white/60 backdrop-blur-md border border-border/50 rounded-3xl p-1">
                 <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
                    
                    {/* Platform Label (Visual Anchor) */}
                    <div className="p-6 flex flex-col justify-center items-start md:items-center bg-secondary/20 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Core Platform</span>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                             VaakuOS
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">Included in all plans</p>
                    </div>

                    {/* Add-on 1 */}
                    {ADDONS.map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                            <div 
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id)}
                                className={cn(
                                    "p-6 cursor-pointer transition-all hover:bg-white relative group",
                                    isSelected ? "bg-primary/[0.03]" : ""
                                )}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg transition-colors", isSelected ? "bg-primary text-white" : "bg-secondary text-muted-foreground")}>
                                            <addon.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="font-bold block text-lg">{addon.name}</span>
                                            <span className="text-xs font-bold text-primary p-0.5 border border-primary/20 rounded bg-primary/5">
                                                +{addon.price.toLocaleString()} {addon.period}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected ? "border-primary bg-primary text-white" : "border-border group-hover:border-primary/50"
                                    )}>
                                        {isSelected && <Check className="h-3 w-3" />}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-snug pl-[52px]">
                                    {addon.description}
                                </p>
                            </div>
                        )
                    })}
                 </div>
            </div>
        </div>

        {/* --- Pricing Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-[1400px] mx-auto">
          {currentPlanSet.map((plan, idx) => {
            const calculatedPrice = getCalculatedPrice(plan.basePrice);
            const isEnterprise = plan.basePrice === null;
            
            return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={cn(
                "relative flex flex-col p-6 border backdrop-blur-md transition-all duration-300 rounded-2xl h-full",
                plan.highlight 
                  ? "bg-primary/5 border-primary shadow-xl shadow-primary/5 scale-105 z-10" 
                  : "bg-white/60 border-border hover:border-primary/30 hover:shadow-lg z-0"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-2xl" />
              )}
              {plan.highlight && (
                <div className="absolute top-3 right-3 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px] leading-relaxed">
                    {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1 mb-2">
                  {!isEnterprise ? (
                    <>
                      <span className="text-4xl font-extrabold tracking-tight leading-none">
                        ₹{calculatedPrice?.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground font-medium text-sm mb-1">/mo</span>
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold tracking-tight leading-none">Custom</span>
                  )}
                </div>
                
                {/* One Time Fee Notice */}
                {!isEnterprise && oneTimeFee > 0 && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Plus className="h-3 w-3" />
                         ₹{oneTimeFee.toLocaleString()} one-time setup
                    </div>
                )}
                
                 {/* Billing Cycle Notice */}
                {billingCycle === 'yearly' && !isEnterprise && calculatedPrice! > 0 && (
                   <p className="text-xs text-primary font-medium mt-2">
                     Billed annually (₹{(calculatedPrice! * 12).toLocaleString()}/yr)
                   </p>
                )}
              </div>

              <Button
                size="lg"
                className={cn(
                    "w-full font-bold h-11 rounded-lg mb-8",
                    plan.highlight 
                        ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                        : "bg-white border-2 border-primary/10 text-primary hover:bg-primary/5"
                )}
                onClick={() => handleCreatePlan(plan, calculatedPrice || 0)}
              >
                {plan.cta}
              </Button>

              <div className="space-y-4 flex-grow border-t border-border/50 pt-6">
                 {/* Add-on Features Highlight */}
                 <AnimatePresence>
                    {selectedAddons.length > 0 && !isEnterprise && (
                        <div className="space-y-3 mb-4 pb-4 border-b border-border/40 border-dashed">
                             {ADDONS.map(addon => selectedAddons.includes(addon.id) && (
                                 <motion.div 
                                    key={addon.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex gap-3 text-sm font-semibold text-primary"
                                 >
                                    <div className="mt-0.5 p-0.5 bg-primary/10 rounded-full"><Plus className="h-3 w-3" /></div>
                                    {addon.featureText}
                                 </motion.div>
                             ))}
                        </div>
                    )}
                 </AnimatePresence>

                 {/* Base Features */}
                {plan.baseFeatures.map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm items-start">
                    <div className="mt-0.5 flex-shrink-0 text-primary/60">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )})}
        </div>


        {/* --- Comparison Table --- */}
        <div className="max-w-[1400px] mx-auto mb-20">
            <h2 className="text-3xl font-bold my-10 text-center">Compare all features</h2>
            
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-border/50 shadow-sm relative">
                <TooltipProvider>
                    {/* Desktop Sticky Header */}
                    <div className="hidden md:grid grid-cols-5 gap-4 sticky top-16 z-40 bg-[#FDFBF9] shadow-md border-b border-border/10 py-4 px-2 rounded-t-3xl">
                        <div className="col-span-1 p-2 text-sm font-bold text-muted-foreground uppercase tracking-widest self-end">
                            Features
                        </div>
                        
                        {/* Plan Columns with Buttons */}
                        {currentPlanSet.map((plan, idx) => (
                            <div key={plan.id} className="col-span-1 p-2 text-center flex flex-col items-center justify-end h-full">
                                <span className={cn(
                                    "font-bold text-xl mb-2",
                                    plan.highlight ? "text-primary" : "text-foreground"
                                )}>
                                    {plan.name}
                                </span>
                                {plan.highlight && (
                                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase mb-2">
                                        Popular
                                    </span>
                                )}
                                <Button
                                    size="sm"
                                    onClick={() => handlePurchaseByIndex(idx)}
                                    className={cn(
                                        "w-full max-w-[140px] rounded-lg h-9 font-semibold",
                                        plan.highlight ? "bg-primary text-white" : "bg-white border border-primary/20 text-primary hover:bg-primary/5"
                                    )}
                                >
                                    {plan.price === null ? "Contact" : "Choose"}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="divide-y divide-border/50">
                    {COMPARISON_CATEGORIES.map((category, idx) => (
                        <div key={idx}>
                        {/* Category Header */}
                        <div className="bg-secondary/20 p-4 border-y border-border/20 sticky top-[164px] z-30 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-foreground">
                                {category.title}
                            </h3>
                        </div>
                        
                        {/* Rows */}
                        <div className="divide-y divide-border/10 bg-white/40">
                            {category.rows.map((row, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 hover:bg-secondary/10 transition-colors group">
                                
                                {/* Feature Name */}
                                <div className="col-span-1 font-medium text-foreground text-sm flex items-center gap-2">
                                {row.name}
                                {row.help && (
                                    <Tooltip>
                                        <TooltipTrigger>
                                        <Info className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        <p className="w-48 text-xs">{row.help}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                </div>

                                {/* Values */}
                                <div className="col-span-1 text-center text-sm">
                                <span className="md:hidden text-muted-foreground text-xs mr-2 font-bold uppercase">Free:</span>
                                {renderCell(row.free)}
                                </div>
                                <div className="col-span-1 text-center text-sm">
                                <span className="md:hidden text-muted-foreground text-xs mr-2 font-bold uppercase">Pro:</span>
                                {renderCell(row.pro)}
                                </div>
                                <div className="col-span-1 text-center text-sm font-semibold relative">
                                {/* Desktop Highlight Column Background */}
                                <div className="absolute inset-y-0 -left-2 -right-2 bg-primary/5 hidden md:block -z-10 group-hover:bg-primary/10 transition-colors pointer-events-none" />
                                <span className="md:hidden text-primary text-xs mr-2 font-bold uppercase">Team:</span>
                                {renderCell(row.team)}
                                </div>
                                <div className="col-span-1 text-center text-sm">
                                <span className="md:hidden text-muted-foreground text-xs mr-2 font-bold uppercase">Ent:</span>
                                {renderCell(row.ent)}
                                </div>
                            </div>
                            ))}
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

const renderCell = (value: string | boolean) => {
    if (value === true) return <CheckCircle2 className="h-5 w-5 text-primary mx-auto" />;
    if (value === false) return <span className="text-muted-foreground/20 text-xl font-light">—</span>;
    return <span className="text-foreground/90 font-medium">{value}</span>;
}

export default Pricing;
