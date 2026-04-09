import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Target, Sparkles, Layers, Inbox } from "lucide-react";

const stats = [
  {
    strategy: "Omnichannel Strategy",
    captured: "15% - 25%",
    completion: "18% - 35%",
    growth: "10% - 15%",
    icon: Sparkles,
    highlight: true,
    note: "Unified customer intelligence with cross-channel communication for maximum recovery.",
  },
  {
    strategy: "Multi-Channel Strategy",
    captured: "5% - 10%",
    completion: "8% - 15%",
    growth: "3% - 5%",
    icon: Layers,
    note: "Disconnected flows across multiple apps without shared customer context.",
  },
  {
    strategy: "Single-Channel Strategy",
    captured: "1% - 3%",
    completion: "2% - 5%",
    growth: "0.5% - 1%",
    icon: Inbox,
    note: "Isolated communication with no visibility into customer behavior across touchpoints.",
  },
];

export const StatsComparison = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <TrendingUp className="h-3 w-3" /> Recovery Benchmarks
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 leading-tight">
            The Advantage of <span className="text-primary italic">Omnichannel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare benchmarked results across different recovery strategies and
            see how integrated retrieval outperforms fragmented tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 md:p-8 border transition-all duration-300 relative bg-card h-full flex flex-col ${
                stat.highlight
                  ? "border-primary ring-1 ring-primary/20 shadow-lg scale-105"
                  : "border-border shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex flex-col mb-8">
                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${
                    stat.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {stat.strategy}
                </h3>
              </div>

              <div className="space-y-6 flex-grow">
                <MetricRow
                  label="Revenue Captured"
                  value={stat.captured}
                  icon={<Target className="h-4 w-4" />}
                  percentage={stat.captured.split("-")[1].trim().replace("%", "")}
                  highlight={stat.highlight}
                />

                <MetricRow
                  label="Checkout Completion"
                  value={stat.completion}
                  icon={<Zap className="h-4 w-4" />}
                  percentage={parseInt(stat.completion.split("-")[1])}
                  highlight={stat.highlight}
                />

                <div className="pt-6 border-t border-border mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                      Growth Lift
                    </span>
                    <span
                      className={`text-2xl font-black ${
                        stat.highlight ? "text-primary" : "text-slate-900"
                      }`}
                    >
                      {stat.growth}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground leading-relaxed italic">
                {stat.note}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const MetricRow = ({
  label,
  value,
  icon,
  percentage,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  percentage: number | string;
  highlight: boolean;
}) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <span
        className={`font-bold text-sm ${
          highlight ? "text-primary" : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full ${highlight ? "bg-primary" : "bg-slate-400"}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);
