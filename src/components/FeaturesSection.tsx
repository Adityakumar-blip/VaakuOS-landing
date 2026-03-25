import { Card } from "@/components/ui/card";
import { Calendar, Workflow, Bot, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Automated Sequencer",
    description:
      "Deploy a precisely timed sequence of interactions that follow the shopper's behavior automatically.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Frictionless Conversion",
    description:
      "Send interactive retrieval links with product details designed for one-touch purchase completion.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Bot,
    title: "24/7 Conversion AI",
    description:
      "Real-time assistance for every shopper query to ensure the checkout process is never interrupted.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Calendar,
    title: "Timing Optimization",
    description:
      "Activate retrieval flows when engagement probability is highest for maximum conversion velocity.",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
  },
  {
    icon: BarChart3,
    title: "Revenue Insights",
    description:
      "Comprehensive dashboards tracking every recovered sale and the true ROI of your retrieval efforts.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Shield,
    title: "Smart Sync",
    description:
      "Seamless platform integration ensures retrieval efforts end the second a transaction is verified.",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            A <span className="text-primary italic">Complete Ecosystem</span>
            <br />
            for Conversion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the moment a cart is left behind, VaakuOS activates an 
            intelligent sequence of interactions to bring your customers back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="reveal reveal-up reveal-visible" style={{ transitionDelay: `${index * 0.06}s` }}>
              <Card
                className="p-8 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border bg-card group"
              >
                <div
                  className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
