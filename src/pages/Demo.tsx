import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BookDemoForm } from "@/components/BookDemoForm";
import { FrostedBackground } from "@/components/FrostedBackground";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

const Demo = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO 
        title="Book a Demo"
        description="Schedule a 15-minute product walkthrough with our experts and see how VaakuOS can help you recover abandoned sales and scale your revenue."
        canonicalPath="/demo"
      />
      <Navigation />
      <FrostedBackground />
      
      <main className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2">
              Book a <span className="text-primary">Live Demo</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              See VaakuOS in action. Learn how top brands are using our 
              Revenue Retrieval Engine to scale their e-commerce growth.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto"
        >
          <BookDemoForm isPage={true} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
