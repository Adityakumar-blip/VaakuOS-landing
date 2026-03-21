import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRazorpay } from "@/hooks/use-razorpay";


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


export const PricingSection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { initiatePurchase } = useRazorpay();

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


  const displayPlans = useMemo(() => {
    if (!apiPlans) return [];
    return apiPlans
      .filter((p) => p.billing_cycle === billingCycle)
      .map((p) => ({
        ...p,
        displayPrice: (p.amount / 100).toLocaleString(),
        displayFeatures: Array.isArray(p.features) ? p.features.slice(0, 4).map((f: any) => f.text) : [],
        recommended: p.name.toLowerCase() === "growth",
      }));
  }, [apiPlans, billingCycle]);


  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Get enterprise-grade features at an SMB-friendly price. <span className="text-foreground font-semibold">Recover your monthly cost with just 1-2 saved abandoned carts.</span>
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
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-[430px] rounded-2xl border border-border bg-card animate-pulse" />
            ))
          ) : displayPlans.length > 0 ? (
            displayPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
                  plan.recommended
                    ? "border-primary bg-primary/[0.02] shadow-lg lg:scale-105"
                    : "border-border bg-card"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px]">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {plan.name === "Enterprise" ? "Custom" : `₹${plan.displayPrice}`}
                    </span>
                    {plan.name !== "Enterprise" && (
                      <span className="text-muted-foreground text-sm">/{plan.billing_cycle === 'monthly' ? 'mo' : 'yr'}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.displayFeatures.map((feature: string) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.recommended ? "hero" : "outline"}
                  className="w-full mt-auto"
                  onClick={() => handlePurchase(plan)}
                >
                  {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                </Button>

                {plan.name !== "Free" && plan.name !== "Enterprise" && (
                  <div className="mt-4 flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-2.5" loading="lazy" width={48} height={10} />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg" alt="GPay" className="h-2.5" loading="lazy" width={48} height={10} />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-2.5" loading="lazy" width={48} height={10} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))

          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No plans available for this cycle.
            </div>
          )}
        </div>


        <div className="mt-12 text-center">
          <Button variant="link" className="text-primary font-bold group" onClick={() => navigate("/pricing")}>
            View full pricing & Official Provider Rates
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
