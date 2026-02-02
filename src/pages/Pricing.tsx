import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FrostedBackground } from "@/components/FrostedBackground";
import { Button } from "@/components/ui/button";
import { Check, Info, MessageSquare, Bot, UserPlus, Zap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRazorpay } from "@/hooks/use-razorpay";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PlanFeature {
  text: string;
  icon?: any;
  highlight?: string;
  isUPI?: boolean;
}


interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  billing_cycle: string;
  features: any;
  razorpay_plan_id: string;
  is_active: boolean;
}


const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { initiatePurchase, isProcessing } = useRazorpay();

  const { data: apiPlans, isLoading } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/subscriptions/plans`);
      if (!response.ok) throw new Error("Failed to fetch plans");
      return response.json();
    },
  });

  const handlePurchase = async (plan: Plan) => {
    await initiatePurchase(plan);
  };


  const featureIconMap: Record<string, any> = {
    MessageSquare,
    UserPlus,
    Sparkles,
    Zap,
    Bot,
    ShieldCheck,
    Info,
  };

  const displayPlans = useMemo(() => {
    if (!apiPlans) return [];
    return apiPlans
      .filter((p) => p.billing_cycle === billingCycle)
      .map((p) => {
        const features = Array.isArray(p.features)
          ? p.features.map((f: any) => ({
              ...f,
              icon: featureIconMap[f.icon] || Check,
            }))
          : [];

        // Add UPI Autopay feature for paid plans
        if (p.amount > 0 && p.name.toLowerCase() !== "enterprise") {
          features.push({
            text: "UPI Autopay Supported",
            icon: Sparkles,
            highlight: "GPay, PhonePe, Paytm",
            isUPI: true
          });
        }

        return {

          ...p,
          displayPrice: (p.amount / 100).toLocaleString(),
          features,
          recommended: p.name.toLowerCase() === "growth",
          bestFor: p.name.toLowerCase() === "free" ? "Trial & Hobbyists" : 
                   p.name.toLowerCase() === "starter" ? "Small Businesses" :
                   p.name.toLowerCase() === "growth" ? "Scaling D2C Brands" : "Large Corporations",
          cta: p.name.toLowerCase() === "free" ? "Get Started Free" : 
               p.name.toLowerCase() === "enterprise" ? "Contact Sales" : "Get Started"
        };
      });
  }, [apiPlans, billingCycle]);


  const metaRates = [
    { category: "Marketing", definition: "Promotional messages, offers, alerts.", rate: "₹0.78 - ₹0.82" },
    { category: "Utility", definition: "Order updates, shipping, transactions.", rate: "₹0.11 - ₹0.13" },
    { category: "Authentication", definition: "One-Time Passwords (OTP).", rate: "₹0.11 - ₹0.12" },
    { category: "Service", definition: "User-initiated support queries.", rate: "FREE (First 1,000/mo)" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      <FrostedBackground />

      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              The Most Scalable WhatsApp Platform
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Enterprise Performance. <br />
            <span className="text-primary italic">SMB-Friendly Prices.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
            Get <span className="text-foreground font-semibold">"Enterprise-grade"</span> features at 
            <span className="text-foreground font-semibold"> "SMB-friendly"</span> prices. 
            No more paying per agent. No more markup on messages.
          </p>

          <div className="flex justify-center mb-12">
            <Tabs 
              defaultValue="monthly" 
              value={billingCycle} 
              onValueChange={(v) => setBillingCycle(v as "monthly" | "yearly")}
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-full h-12">
                <TabsTrigger 
                  value="monthly" 
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold"
                >
                  Yearly <span className="ml-1.5 text-[10px] bg-primary-foreground text-primary px-2 py-0.5 rounded-full">Save 17%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 items-start min-h-[500px]">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-[600px] rounded-3xl border border-border bg-card animate-pulse" />
            ))
          ) : displayPlans.length > 0 ? (
            displayPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-3xl border ${
                  plan.recommended
                    ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/5 scale-105 z-20"
                    : "border-border bg-background/50 backdrop-blur-sm"
                } transition-all duration-300 hover:shadow-2xl flex flex-col h-full`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 min-h-[32px]">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {plan.name === "Enterprise" ? "Custom" : `₹${plan.displayPrice}`}
                    </span>
                    {plan.name !== "Enterprise" && (
                      <span className="text-muted-foreground text-sm">/{plan.billing_cycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>
                  {plan.billing_cycle === 'yearly' && plan.name !== "Free" && plan.name !== "Enterprise" && (
                    <p className="text-[10px] text-primary font-medium mt-1">
                      Billed annually (Best Value)
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-3 uppercase font-bold tracking-widest leading-none">
                    Best For: {plan.bestFor}
                  </p>
                </div>

                <div className="space-y-3 flex-grow mb-6">
                  {plan.features.map((feature: any, i: number) => (
                    <div key={i} className="flex gap-2 text-xs items-start leading-tight">
                      <div className="mt-0.5 flex-shrink-0">
                        <feature.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{feature.text}</p>
                        {feature.highlight && (
                          <p className="text-[10px] text-primary/80 font-bold">{feature.highlight}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.recommended ? "hero" : "outline"}
                  className={`w-full ${plan.name === 'Free' ? 'h-10 text-sm' : 'h-11 text-md font-bold font-sans'}`}
                  onClick={() => handlePurchase(plan)}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {plan.name !== "Free" && plan.name !== "Enterprise" && (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Secure UPI Payment</p>
                    <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-3" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg" alt="GPay" className="h-3" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-3" />
                    </div>
                  </div>
                )}
              </div>
            ))

          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No plans available for this billing cycle.
            </div>
          )}
        </div>


        <div className="text-center mb-16 -mt-8">
            <p className="text-sm text-muted-foreground italic">
                * Zero Markup applies to the specified monthly message limits. Beyond these limits, a nominal markup fee applies as indicated per plan. 
                <span className="text-primary font-bold"> Enterprise plan includes 100% Unlimited Zero Markup.</span>
            </p>
        </div>

        {/* Competitive Edge Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Vaakuos Advantage</h2>
            <p className="text-muted-foreground">Why disruptive brands choose us over Wati, Interakt, or AiSensy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">Unlimited Agents</h4>
              <p className="text-muted-foreground leading-relaxed">
                Most platforms charge ₹500–₹800 per extra agent. We give you <span className="text-foreground font-semibold">Unlimited Seats</span> in our Growth plan. Let your whole team sell & support.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">0% Markup on Meta</h4>
              <p className="text-muted-foreground leading-relaxed">
                We follow a Transparent Pricing Model. We pass on Meta charges with <span className="text-foreground font-semibold">Zero Markup</span> on the Growth plan. Pay exactly what Meta charges.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">Free Zero-Friction Migration</h4>
              <p className="text-muted-foreground leading-relaxed">
                Moving from another provider? We port your number and help with Green Tick assistance for <span className="text-foreground font-semibold">₹0 Service Fee</span>.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Meta Rates Section */}
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl border border-border p-8 md:p-12 mb-24 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Meta Conversation Rates</h2>
              <p className="text-muted-foreground mb-6">
                Vaakuos provides 0% Markup. You only pay the actual rates determined by Meta based on the conversation category.
              </p>
              <div className="inline-flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                <Info className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Rates for India (approximate)</span>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-4 font-bold">Category</th>
                      <th className="pb-4 font-bold">What is it?</th>
                      <th className="pb-4 font-bold">Estimated Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {metaRates.map((rate) => (
                      <tr key={rate.category} className="group">
                        <td className="py-5 font-semibold text-primary">{rate.category}</td>
                        <td className="py-5 text-muted-foreground text-sm pr-4">{rate.definition}</td>
                        <td className="py-5 font-mono font-bold text-foreground whitespace-nowrap">{rate.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-xs text-muted-foreground text-center">
                * Note: The first 1,000 Service Conversations per month are provided <span className="text-success font-bold">FREE of charge</span> by Meta.
              </p>
            </div>
          </div>
        </div>

        {/* Add-ons & AI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI Smart Reply (GPT-4o)</h3>
                <p className="text-primary font-medium">₹999 /mo</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Enable the most advanced AI agent for your WhatsApp. Includes <span className="font-bold">1,000 AI responses</span> per month using the latest GPT-4o model.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-primary" /> Context-aware customer support
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-primary" /> Multi-lingual understanding
              </li>
            </ul>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">Learn about AI</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
              <h4 className="font-bold mb-1">Custom Bot Dev</h4>
              <p className="text-primary font-bold text-lg mb-2">₹4,999</p>
              <p className="text-xs text-muted-foreground">One-time fee. We build your entire automation flow for you.</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
              <h4 className="font-bold mb-1">CTWA Ads Setup</h4>
              <p className="text-primary font-bold text-lg mb-2">₹1,500/mo</p>
              <p className="text-xs text-muted-foreground">Expert management of Meta ads leading to WhatsApp.</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border sm:col-span-2">
              <h4 className="font-bold mb-1">White-Label Dashboard</h4>
              <p className="text-primary font-bold text-lg mb-2">Starting ₹9,999/mo</p>
              <p className="text-xs text-muted-foreground">For agencies who want to resell Vaakuos under their own brand.</p>
            </div>
          </div>
        </div>

        {/* FAQ/Trust CTA */}
        <div className="text-center bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-black/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Still have questions?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Our team is ready to help you find the perfect plan for your business goals. 
            Join 500+ brands scaling with Vaakuos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button 
                variant="secondary" 
                size="xl" 
                className="font-extrabold w-full sm:w-auto"
                onClick={() => navigate("/register-interest")}
            >
              Start Your Free Trial
            </Button>
            <Button variant="ghost" className="text-primary-foreground hover:bg-white/10 w-full sm:w-auto">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
