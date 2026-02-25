import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AnnouncementBar = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/10 py-2.5 relative overflow-hidden"
    >
      {/* Subtle animated background beam */}
      <motion.div 
        animate={{ 
          x: ["-100%", "100%"],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" 
      />
      
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs md:text-sm font-medium relative z-10">
        <div className="flex items-center gap-1.5 text-primary">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-extrabold">Early access</span>
        </div>
        
        <p className="text-foreground/90 text-center tracking-tight">
          Get Early Access • Save 10% at Launch<span className="font-semibold text-foreground">1st April</span>
        </p>

        <button
          onClick={() => navigate("/register-interest")}
          className="group flex items-center gap-1 text-primary hover:text-primary/80 transition-all font-bold whitespace-nowrap underline-offset-4 hover:underline"
        >
          Get Offer
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
