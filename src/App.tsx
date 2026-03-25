import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import Index from "./pages/Index";
import RegisterInterest from "./pages/RegisterInterest";
import Pricing from "./pages/Pricing";
import CalculatorPage from "./pages/CalculatorPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import Changelog from "./pages/Changelog";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Documentation from "./pages/Documentation";
import HelpCenter from "./pages/HelpCenter";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import { BookDemoProvider } from "@/contexts/BookDemoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://vaakuos.com";
const defaultOgImage = `${siteUrl}/og-image.png`;

let analyticsModulePromise: Promise<typeof import("./lib/analytics")> | null = null;

const loadAnalyticsModule = () => {
  analyticsModulePromise ??= import("./lib/analytics");
  return analyticsModulePromise;
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const initialize = () => {
      void loadAnalyticsModule().then(({ initAnalytics }) => {
        initAnalytics();
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(initialize, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(initialize, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    void loadAnalyticsModule().then(({ trackPageView }) => {
      trackPageView(location.pathname + location.search);
    });
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookDemoProvider>
      <TooltipProvider>
        <Helmet
          defaultTitle="VaakuOS | Recover every abandoned sale"
          titleTemplate="%s | VaakuOS"
        >
          {/* ... existing helmet content ... */}
          <meta
            name="description"
            content="VaakuOS tracks intent and re-engages shoppers at the right moment across every channel to recover abandoned revenue."
          />
          <link rel="canonical" href={siteUrl} />
          <meta name="robots" content="index,follow" />
          <meta name="theme-color" content="#0f172a" />
          <meta property="og:site_name" content="VaakuOS" />
          <meta property="og:title" content="VaakuOS | Recover every abandoned sale" />
          <meta
            property="og:description"
            content="Recover lost revenue with VaakuOS—an intelligent engine that rescues abandoned carts and conversations."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:image" content={defaultOgImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="VaakuOS | Recover every abandoned sale" />
          <meta
            name="twitter:description"
            content="Recover lost revenue with VaakuOS—an intelligent engine that rescues abandoned carts and conversations."
          />
          <meta name="twitter:image" content={defaultOgImage} />
        </Helmet>
        <Toaster />
        <Sonner />
        <SmoothScroll>
          <BrowserRouter>
            <AnalyticsTracker />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/register-interest" element={<RegisterInterest />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/features" element={<Features />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </BookDemoProvider>
  </QueryClientProvider>
);

export default App;
