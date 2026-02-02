import { Navigation } from "@/components/Navigation";
import { RevenueCalculator } from "@/components/RevenueCalculator";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const CalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        <RevenueCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default CalculatorPage;
