import { Card } from "@/components/ui/card";
import { Calendar, Workflow, Bot, Zap, BarChart3, Shield } from "lucide-react";
import aiWorkflow from "@/assets/ai-workflow.jpg";
import campaignScheduler from "@/assets/campaign-scheduler.jpg";
import { motion, Variants } from "framer-motion";

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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      } 
    },
  };

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

        {/* Feature grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
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
            </motion.div>
          ))}
        </motion.div>

        {/* Feature showcase */}
        {/* <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Automation</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground">
              Intelligent Workflows That Work For You
            </h3>
            <p className="text-muted-foreground text-lg">
              Build sophisticated automation flows with our visual workflow builder. Trigger actions based on customer behavior, send personalized messages, and create seamless customer journeys.
            </p>
            <img 
              src={aiWorkflow} 
              alt="AI Workflow Builder" 
              className="rounded-xl shadow-md border border-border w-full"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-foreground px-4 py-2 rounded-full">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Smart Scheduling</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground">
              Send Messages at the Perfect Time
            </h3>
            <p className="text-muted-foreground text-lg">
              Our AI analyzes customer behavior to determine optimal send times. Schedule campaigns, manage templates, and track delivery rates all in one intuitive dashboard.
            </p>
            <img 
              src={campaignScheduler} 
              alt="Campaign Scheduler" 
              className="rounded-xl shadow-md border border-border w-full"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};
