import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, Bell, TrendingUp, Zap, Target, ArrowRight } from "lucide-react";

const stats = [
  {
    strategy: "Direct Revenue Recovery",
    captured: "15% – 25%",
    completion: "35% – 50%",
    growth: "8% – 12%",
    icon: TrendingUp,
    note: "High-velocity recovery for growing brands."
  },
  {
    strategy: "Standard Email Flows",
    captured: "2% – 5%",
    completion: "5% – 8%",
    growth: "1% – 2%",
    icon: Mail,
    note: "Passive recovery with low overhead."
  },
  {
    strategy: "System Notifications",
    captured: "4% – 8%",
    completion: "10% – 15%",
    growth: "2% – 4%",
    icon: Bell,
    note: "Basic alerts for local retention."
  }
];

export const StatsComparison = () => {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <TrendingUp className="h-3 w-3" /> 2024 Recovery Benchmarks
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
            Stop Leaving <span className="text-primary italic">25% Revenue</span> on the Table.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Shift your focus from simple clicks to real recovery. See how modern retrieval 
            strategies transform abandoned carts into completed checkouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 md:p-8 border border-border shadow-sm transition-all duration-300 relative bg-card hover:shadow-md h-full flex flex-col"
            >
              <div className="flex flex-col mb-8">
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">{stat.strategy}</h3>
              </div>
              
              <div className="space-y-6 flex-grow">
                <MetricRow 
                  label="Revenue Captured" 
                  value={stat.captured} 
                  icon={<Target className="h-4 w-4" />} 
                  percentage={stat.captured.split('–')[1].trim().replace('%', '')}
                />

                <MetricRow 
                  label="Checkout Completion" 
                  value={stat.completion} 
                  icon={<Zap className="h-4 w-4" />} 
                  percentage={parseInt(stat.completion.split('–')[1])}
                />

                <div className="pt-6 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm font-medium">Store Growth Lift</span>
                    <span className="text-2xl font-black text-slate-900">
                      {stat.growth}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground font-medium italic">
                {stat.note}
              </p>
            </Card>
          ))}
        </div>

        <div className="relative p-10 rounded-[2rem] border border-border bg-muted/30 overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 tracking-tight text-slate-900">The Vaaku Advantage</h3>
              <p className="text-muted-foreground max-w-xl">
                Benchmarked across millions of customer interactions to ensure maximum ROI for modern D2C brands.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto shrink-0">
              <AdvantageItem title="3-5x Higher Opens" />
              <AdvantageItem title="10x Better Conversion" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricRow = ({ label, value, icon, percentage }: any) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-bold text-sm text-slate-900">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000 ease-out bg-primary" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const AdvantageItem = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-background border border-border shadow-sm">
    <div className="h-2 w-2 rounded-full bg-primary" />
    <span className="font-bold text-sm whitespace-nowrap">{title}</span>
  </div>
);

