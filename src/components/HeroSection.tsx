import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";
import { FrostedBackground } from "@/components/FrostedBackground";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useBookDemo } from "@/contexts/BookDemoContext";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { openBookDemo } = useBookDemo();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden">
      {/* Background decorations */}
      <FrostedBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Announcement Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 cursor-pointer hover:bg-primary/15 transition-colors group"
            onClick={() => navigate("/login")}
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-primary">
              Join the waitlist and get <span className="font-bold">10% off</span> launching on 1st April
            </span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-0.5 transition-transform" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-medium text-foreground mb-6 leading-[1.1] tracking-tight"
          >
            The Intelligent Engine to
            <br />
            Recover Every Abandoned Sale.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            VaakuOS tracks intent, re-engages shoppers at the right moment, and converts missed purchases across every digital touchpoint.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-3 px-2 sm:px-0"
          >
            <Button variant="hero" size="lg" className="group flex-1 sm:flex-none text-sm sm:text-base px-6 py-4 h-auto" onClick={openBookDemo}>
              Book Live Demo
              <ArrowRight className="ml-1.5 h-2 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none text-sm sm:text-base px-6 py-4 h-auto"
              onClick={() => navigate("/calculator")}
            >
              Calculate ROI
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>14-day free trial</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mt-12 md:mt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl transform scale-105" />
          <img
            src={heroDashboard}
            alt="Vaakuos Omnichannel Dashboard"
            width={1600}
            height={900}
            className="relative rounded-xl md:rounded-2xl shadow-2xl border border-border w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};
