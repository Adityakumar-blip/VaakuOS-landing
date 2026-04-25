import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BookDemoProvider } from "@/contexts/BookDemoContext";

const Index = lazy(() => import("./pages/Index"));
const RegisterInterest = lazy(() => import("./pages/RegisterInterest"));
const Pricing = lazy(() => import("./pages/Pricing"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Features = lazy(() => import("./pages/Features"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Changelog = lazy(() => import("./pages/Changelog"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Documentation = lazy(() => import("./pages/Documentation"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Community = lazy(() => import("./pages/Community"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Demo = lazy(() => import("./pages/Demo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogQueryLayout = lazy(() => import("./pages/BlogQueryLayout"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((module) => ({
    default: module.Toaster,
  })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((module) => ({
    default: module.Toaster,
  })),
);

const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://vaakuos.com";
const defaultOgImage = `${siteUrl}/og-image.png`;

let analyticsModulePromise: Promise<typeof import("./lib/analytics")> | null =
  null;

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

    const win = window as unknown as {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(initialize, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
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
  <BookDemoProvider>
    <Helmet
      defaultTitle="VaakuOS | Recover every abandoned sale"
      titleTemplate="%s | VaakuOS"
    >
      <meta
        name="description"
        content="VaakuOS tracks intent and re-engages shoppers at the right moment across every channel to recover abandoned revenue."
      />
      <link rel="canonical" href={siteUrl} />
      <meta name="robots" content="index,follow" />
      <meta name="theme-color" content="#0f172a" />
      <meta property="og:site_name" content="VaakuOS" />
      <meta
        property="og:title"
        content="VaakuOS | Recover every abandoned sale"
      />
      <meta
        property="og:description"
        content="Recover lost revenue with VaakuOS—an intelligent engine that rescues abandoned carts and conversations."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={defaultOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="VaakuOS | Recover every abandoned sale"
      />
      <meta
        name="twitter:description"
        content="Recover lost revenue with VaakuOS—an intelligent engine that rescues abandoned carts and conversations."
      />
      <meta name="twitter:image" content={defaultOgImage} />
    </Helmet>
    <SmoothScroll>
      <BrowserRouter>
        <AnalyticsTracker />
        <ScrollToTop />
        <Suspense fallback={null}>
          <Toaster />
          <Sonner />
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
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<BlogQueryLayout />}>
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
            </Route>
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </SmoothScroll>
  </BookDemoProvider>
);

export default App;
