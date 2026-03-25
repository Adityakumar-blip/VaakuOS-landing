import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  message?: string;
  subMessage?: string;
}

export const FullScreenLoader = ({ 
  message = "Setting things up...", 
  subMessage = "Please wait while we process your request" 
}: FullScreenLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl"
    >
      <div className="relative flex flex-col items-center gap-6 p-10 rounded-3xl bg-white shadow-2xl border border-border/50 max-w-sm w-full text-center">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-primary animate-spin" strokeWidth={1.5} />
          <motion.div 
            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
            {message}
          </h3>
          <p className="text-sm text-muted-foreground font-medium px-4">
            {subMessage}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
};
