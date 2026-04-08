import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroDashboard640 from "@/assets/hero-dashboard-640.jpg";
import heroDashboard1280 from "@/assets/hero-dashboard-1280.jpg";
import heroDashboard from "@/assets/hero-dashboard-optimized.jpg";
import { FrostedBackground } from "@/components/FrostedBackground";
import { useNavigate } from "react-router-dom";
import { useBookDemo } from "@/contexts/BookDemoContext";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { openBookDemo } = useBookDemo();

  return (
    <section className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden">
      <FrostedBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <button
            type="button"
            className="hero-fade-item hero-delay-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-8 cursor-pointer hover:bg-primary/20 transition-colors group"
            onClick={() => navigate("/login")}
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-semibold text-foreground">
              Join the waitlist and get <span className="font-bold">10% off</span>{" "}
              launching on 1st April
            </span>
            <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-0.5 transition-transform" />
          </button>

          <h1 className="hero-fade-item hero-delay-2 text-4xl sm:text-5xl md:text-7xl font-medium text-foreground mb-6 leading-[1.1] tracking-tight">
            The Intelligent Engine to
            <br />
            Recover Every Abandoned Sale.
          </h1>

          <p className="hero-fade-item hero-delay-3 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            VaakuOS tracks intent, re-engages shoppers at the right moment, and
            converts missed purchases across every digital touchpoint.
          </p>

          <div className="hero-fade-item hero-delay-4 flex flex-row items-center justify-center gap-3 px-2 sm:px-0">
            <Button
              variant="hero"
              size="lg"
              className="group flex-1 sm:flex-none text-sm sm:text-base px-6 py-4 h-auto"
              onClick={openBookDemo}
            >
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
          </div>

          <div className="hero-fade-item hero-delay-5 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>

        <div className="hero-fade-item hero-delay-5 relative mt-12 md:mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl transform scale-105" />
          <picture>
            <source media="(max-width: 767px)" srcSet={heroDashboard640} />
            <img
              src={heroDashboard}
              srcSet={`${heroDashboard1280} 1280w, ${heroDashboard} 1600w`}
              sizes="(max-width: 1280px) 80vw, 1200px"
              alt="Vaakuos Omnichannel Dashboard"
              width={1600}
              height={864}
              fetchPriority="high"
              decoding="async"
              className="relative rounded-xl md:rounded-2xl shadow-2xl border border-border w-full"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};
