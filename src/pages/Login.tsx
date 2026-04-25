import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { loadGoogleSDK, initializeGoogleLogin, renderGoogleButton } from "@/lib/googleSdk";
import { authService } from "@/services/auth-service";
import { useRazorpay } from "@/hooks/use-razorpay";
import { PRICING_DATA } from "@/data/pricing-plans";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import { AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"auth" | "payment" | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "/";
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
              title: "Welcome back!",
              description: "You have successfully logged in with Google.",
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
            window.location.href = planId ? `${appUrl}/dashboard` : `${appUrl}`;
          } catch (error: any) {
            toast({
              title: "Google Login failed",
              description: error?.response?.data?.message || "Something went wrong during Google Login.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
            setLoadingStep(null);
          }
        });
        renderGoogleButton("google-auth-button-container");
      } catch (error) {
        console.error("Google SDK load error:", error);
      }
    };

    initGoogle();
  }, [navigate, from, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStep("auth");

    try {
      const result = await authService.login({ email, password, rememberMe });
      
      // Save token for API calls
      if (result.access_token) {
        localStorage.setItem("auth_token", result.access_token);
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
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
      
      // If plan selection from pricing page, go to dashboard, else main site
      const appUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'vaakuos.local' ? 'http://vaakuos.local:8081' : 'https://app.vaakuos.com';
      window.location.href = planId ? `${appUrl}/dashboard` : `${appUrl}`;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingStep(null);
    }
  };

  return (
    <AuthLayout>
      <AnimatePresence>
        {isLoading && planId && (
          <FullScreenLoader 
            message={loadingStep === "auth" ? "Authenticating..." : "Setting up your plan..."}
            subMessage={loadingStep === "auth" ? "Please wait while we log you in" : "Redirecting to our secure payment gateway"}
          />
        )}
      </AnimatePresence>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Enter your email and password to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-slate-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary pr-12 transition-all"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember" className="text-xs font-medium text-slate-600 cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-xs font-bold text-slate-900 hover:text-primary transition-colors"
            >
              Forgot Password
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            <Button 
                type="submit" 
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg text-sm font-bold transition-all transform active:scale-[0.98] shadow-md shadow-primary/10" 
                disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="flex justify-center">
              <div 
                id="google-auth-button-container" 
                className="w-full h-12 overflow-hidden rounded-lg border-slate-200 hover:border-slate-300 transition-colors flex justify-center items-center"
              ></div>
            </div>
          </div>
        </form>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              to={`/signup${planId ? `?planId=${planId}&billingCycle=${billingCycle}` : ""}`}
              className="text-black font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
