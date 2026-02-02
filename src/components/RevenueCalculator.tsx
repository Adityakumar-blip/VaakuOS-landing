import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Users, ShoppingCart, Percent, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const RevenueCalculator = () => {
  const navigate = useNavigate();
  const [traffic, setTraffic] = useState(50000);
  const [aov, setAov] = useState(2500);
  const [addToCartRate, setAddToCartRate] = useState(10);
  const [abandonmentRate, setAbandonmentRate] = useState(70);
  const [recoveryRate, setRecoveryRate] = useState(15);

  const [results, setResults] = useState({
    monthlyAbandonedRev: 0,
    recoveredMonthly: 0,
    recoveredAnnual: 0,
  });

  useEffect(() => {
    const monthlyAbandonedCarts = traffic * (addToCartRate / 100) * (abandonmentRate / 100);
    const monthlyAbandonedRev = monthlyAbandonedCarts * aov;
    const recoveredMonthly = monthlyAbandonedRev * (recoveryRate / 100);
    const recoveredAnnual = recoveredMonthly * 12;

    setResults({
      monthlyAbandonedRev,
      recoveredMonthly,
      recoveredAnnual,
    });
  }, [traffic, aov, addToCartRate, abandonmentRate, recoveryRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <section id="revenue-calculator" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium mb-4 tracking-tight text-foreground">
            Calculate Your Recovery Potential
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            See exactly how much revenue VaakuOS can recover for your business based on your current store metrics.
          </p>
          
          <div className="bg-background/50 backdrop-blur-sm border border-border p-6 rounded-2xl max-w-3xl mx-auto inline-block text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <SparkleIcon size={16} /> What is Recoverable Revenue?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Recoverable revenue is the portion of abandoned cart value that can be recovered by re-engaging high-intent shoppers at the right moment across digital touchpoints.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="border border-border bg-card shadow-lg ring-1 ring-black/5">
              <CardContent className="p-8 space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium flex items-center gap-2 text-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      Monthly Website Traffic
                    </Label>
                    <span className="text-primary font-bold text-lg">{formatNumber(traffic)}</span>
                  </div>
                  <Slider
                    defaultValue={[50000]}
                    value={[traffic]}
                    onValueChange={(val) => setTraffic(val[0])}
                    max={1000000}
                    step={1000}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    <span>1k</span>
                    <span>1M</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium flex items-center gap-2 text-foreground">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Average Order Value (AOV)
                    </Label>
                    <span className="text-primary font-bold text-lg">{formatCurrency(aov)}</span>
                  </div>
                  <Slider
                    defaultValue={[2500]}
                    value={[aov]}
                    onValueChange={(val) => setAov(val[0])}
                    max={25000}
                    step={100}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    <span>₹100</span>
                    <span>₹25,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-medium flex items-center gap-2 text-foreground">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        Add-to-Cart (%)
                      </Label>
                      <span className="text-primary font-bold text-lg">{addToCartRate}%</span>
                    </div>
                    <Slider
                      defaultValue={[10]}
                      value={[addToCartRate]}
                      onValueChange={(val) => setAddToCartRate(val[0])}
                      max={30}
                      step={0.5}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-base font-medium flex items-center gap-2 text-foreground">
                        <Percent className="h-4 w-4 text-primary" />
                        Abandonment (%)
                      </Label>
                      <span className="text-primary font-bold text-lg">{abandonmentRate}%</span>
                    </div>
                    <Slider
                      defaultValue={[70]}
                      value={[abandonmentRate]}
                      onValueChange={(val) => setAbandonmentRate(val[0])}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                </div>

                <div className="space-y-4 p-6 bg-primary/5 rounded-2xl border border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                    <SparkleIcon size={40} className="text-primary" />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                       <Label className="text-base font-semibold text-primary flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        VaakuOS Recovery Rate (%)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[250px] text-xs p-3">
                            Most brands recover 15–30% of abandoned revenue using intent-based follow-ups.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-primary font-bold text-xl">{recoveryRate}%</span>
                  </div>
                  <Slider
                    defaultValue={[15]}
                    value={[recoveryRate]}
                    onValueChange={(val) => setRecoveryRate(val[0])}
                    max={40}
                    step={1}
                    className="py-4 relative z-10"
                  />
                  <p className="text-xs text-muted-foreground italic relative z-10 font-medium">
                    * Industry average with VaakuOS is 15-25% recovery
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-none bg-primary text-primary-foreground shadow-2xl overflow-hidden relative group min-h-[400px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                <TrendingUp size={160} />
              </div>
              
              <CardHeader className="relative z-10 px-8 pt-8 text-center lg:text-left">
                <CardTitle className="text-lg font-medium opacity-80 uppercase tracking-widest">Potential Monthly Recovery</CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 p-8 flex flex-col items-center lg:items-start">
                <div 
                  key={results.recoveredMonthly}
                  className="text-6xl md:text-7xl font-bold mb-4 tracking-tighter animate-in fade-in zoom-in-95 duration-500"
                >
                  {formatCurrency(results.recoveredMonthly)}
                </div>
                <div className="text-xs opacity-80 font-medium mb-6 animate-in slide-in-from-bottom-2 duration-700">
                  Recovered from shoppers who showed intent but didn’t complete checkout.
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm mb-12">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  EXTRA REVENUE PER MONTH
                </div>

                <div className="w-full space-y-6 border-t border-white/20 pt-8 mt-auto">
                  <div className="flex justify-between items-center group/annual">
                    <div className="flex flex-col">
                      <span className="opacity-70 text-[10px] font-bold uppercase tracking-widest">Annual Potential</span>
                      <span className="text-xs opacity-60">Estimated over 12 months</span>
                    </div>
                    <span 
                      key={results.recoveredAnnual}
                      className="text-3xl font-bold animate-in fade-in slide-in-from-right-4 duration-500"
                    >
                      {formatCurrency(results.recoveredAnnual)}
                    </span>
                  </div>
                  <div className="text-[11px] text-center w-full opacity-60 italic bg-white/5 py-2 rounded-lg">
                    That’s approximately {formatNumber(Math.round(results.recoveredMonthly / 100000))} lakh recovered every month.
                  </div>
                  <div className="flex justify-between items-center text-[10px] border-t border-white/10 pt-4 uppercase tracking-tighter opacity-70">
                    <span>Monthly Abandoned Revenue</span>
                    <span className="font-bold">{formatCurrency(results.monthlyAbandonedRev)}</span>
                  </div>
                </div>
                
                <p className="mt-8 text-[10px] text-center w-full opacity-50 italic">
                   * Based on industry benchmarks and conservative recovery assumptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-background p-8 text-center shadow-xl ring-1 ring-primary/5">
              <p className="text-base text-foreground/80 mb-6 font-medium">
                Want to see how VaakuOS can hit these numbers for you?
              </p>
              <Button 
                size="xl"
                className="w-full group bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20"
                onClick={() => navigate("/register-interest")}
              >
                Get Your Personalized Recovery Plan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const SparkleIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
