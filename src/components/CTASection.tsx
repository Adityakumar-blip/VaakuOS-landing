import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const benefits = [
  "Set up in under 5 minutes",
  "No coding required",
  "Cancel anytime",
  "24/7 customer support"
];

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-primary italic">Customer Communication?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of businesses already using VaakuOS to automate conversations, 
            boost engagement, and drive sales across messaging platforms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="hero" size="xl" className="group w-full sm:w-auto" onClick={() => navigate("/register-interest")}>
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto" onClick={() => navigate("/contact")}>
              Schedule a Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border/50">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 justify-center text-sm font-medium text-muted-foreground">
                <div className="h-6 w-6 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
