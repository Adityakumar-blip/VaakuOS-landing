import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { loadGoogleSDK, initializeGoogleLogin, renderGoogleButton } from "@/lib/googleSdk";
import { authService } from "@/services/auth-service";
import { useRazorpay } from "@/hooks/use-razorpay";
import { PRICING_DATA } from "@/data/pricing-plans";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { AnimatePresence } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    type: "business" as "agency" | "business",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"auth" | "payment" | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");
  const billingCycle = searchParams.get("billingCycle") as "monthly" | "yearly" | null;
  const { toast } = useToast();
  const { initiatePurchase } = useRazorpay();

  const isAuthenticated = localStorage.getItem("is_authenticated") === "true" || !!localStorage.getItem("auth_token");

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (isAuthenticated) {
        const isValid = await authService.checkSession();
        if (isValid) {
          // If there's a plan selection, prioritize handling the purchase first
          if (planId && billingCycle) {
            const plan = PRICING_DATA[billingCycle as "monthly" | "yearly"]?.find(p => p.id === planId);
            if (plan) {
              setLoadingStep("payment");
              setIsLoading(true);
              try {
                await initiatePurchase({
                  id: plan.id,
                  name: plan.name,
                  amount: billingCycle === "monthly" ? plan.amount : plan.discountedMonthlyPrice,
                  currency: plan.currency,
                  billing_cycle: billingCycle
                });
              } catch (error) {
                console.error("Purchase initiation failed:", error);
              } finally {
                setIsLoading(false);
                setLoadingStep(null);
              }
              return;
            }
          }

          const appUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'vaakuos.local' ? 'http://vaakuos.local:8081' : 'https://app.vaakuos.com';
          window.location.href = planId ? `${appUrl}/dashboard` : `${appUrl}`;
        }
      }
    };
    checkAndRedirect();
  }, [isAuthenticated, planId, billingCycle, initiatePurchase]);

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await loadGoogleSDK();
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("VITE_GOOGLE_CLIENT_ID is not defined");
            return;
        }
        initializeGoogleLogin(clientId, async (response: any) => {
          try {
            setIsLoading(true);
            setLoadingStep("auth");
            const user = await authService.googleLogin(response.credential);
            
            // Save token for API calls
            if (user.access_token) {
              localStorage.setItem("auth_token", user.access_token);
            }
            
            toast({
              title: "Welcome!",
              description: "You have successfully signed up with Google.",
            });
            
            if (planId && billingCycle) {
              setLoadingStep("payment");
              const plan = PRICING_DATA[billingCycle].find(p => p.id === planId);
              if (plan) {
                await initiatePurchase({
                  id: plan.id,
                  name: plan.name,
                  amount: billingCycle === "monthly" ? plan.amount : plan.discountedMonthlyPrice,
                  currency: plan.currency,
                  billing_cycle: billingCycle
                });
                setIsLoading(false);
                return;
              }
            }
            
            const appUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'vaakuos.local' ? 'http://vaakuos.local:8081' : 'https://app.vaakuos.com';
            window.location.href = `${appUrl}`; // Redirect to app
          } catch (error: any) {
            toast({
              title: "Google Signup failed",
              description: error?.response?.data?.message || "Something went wrong during Google Signup.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
            setLoadingStep(null);
          }
        });
        renderGoogleButton("google-signup-button");
      } catch (error) {
        console.error("Google SDK load error:", error);
      }
    };

    initGoogle();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStep("auth");

    try {
      const result = await authService.register(formData);
      
      // Save token for API calls
      if (result.access_token) {
        localStorage.setItem("auth_token", result.access_token);
      }
      
      toast({
        title: "Account created!",
        description: "Welcome to VaakuOS. Let's set up your account.",
      });
      
      if (planId && billingCycle) {
        setLoadingStep("payment");
        const plan = PRICING_DATA[billingCycle].find(p => p.id === planId);
        if (plan) {
          await initiatePurchase({
            id: plan.id,
            name: plan.name,
            amount: billingCycle === "monthly" ? plan.amount : plan.discountedMonthlyPrice,
            currency: plan.currency,
            billing_cycle: billingCycle
          });
          setIsLoading(false);
          return;
        }
      }
      
      const appUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'vaakuos.local' ? 'http://vaakuos.local:8081' : 'https://app.vaakuos.com';
      window.location.href = `${appUrl}`;
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error?.response?.data?.message || "Email already exists. Please try another email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingStep(null);
    }
  };

  return (
    <AuthLayout quote="START YOUR JOURNEY">
      <AnimatePresence>
        {isLoading && planId && (
          <FullScreenLoader 
            message={loadingStep === "auth" ? "Creating account..." : "Setting up your plan..."}
            subMessage={loadingStep === "auth" ? "Just a moment while we set up your workspace" : "Redirecting to our secure payment gateway"}
          />
        )}
      </AnimatePresence>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Join thousands of businesses managing their operations better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Company
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                className="h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary pr-12 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-type" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Account Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  type: value as "agency" | "business",
                })
              }
            >
              <SelectTrigger id="account-type" className="h-11 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary transition-all">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg text-sm font-bold transition-all transform active:scale-[0.98] shadow-md shadow-primary/10" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="space-y-3">
            <div id="google-signup-button" className="w-full h-12 flex justify-center overflow-hidden rounded-lg"></div>
          </div>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to={`/login${planId ? `?planId=${planId}&billingCycle=${billingCycle}` : ""}`}
              className="text-black font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
