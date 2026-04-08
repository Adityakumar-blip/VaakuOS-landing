import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { FrostedBackground } from "@/components/FrostedBackground";
import { supabase } from "@/lib/supabase";
import { trackFormStart, trackFormSubmit, trackEvent } from "@/lib/analytics";

const isLocalPreview = () =>
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const RegisterInterest = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Auto-focus the first field on mount
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500); // Small delay to allow for animations
    return () => clearTimeout(timer);
  }, []);

  const handleFormFocus = () => {
    trackFormStart("Register Interest");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setIsLoading(true);

    try {
      if (!isLocalPreview()) {
        const { error } = await supabase.from("interests").insert([
          {
            name: formData.name,
            email: formData.email,
            companyName: formData.companyName,
          },
        ]);

        if (error) throw error;
      }

      toast.success("Interest registered successfully!");
      setIsSuccess(true);

      // Track successful registration
      trackFormSubmit("Register Interest", {
        "Has Company Name": !!formData.companyName,
      });
      trackEvent("Registration Complete", {
        "Form Name": "Register Interest",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
        <FrostedBackground />
        <div className="text-center z-10 animate-fade-up">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your interest has been registered. We'll be in touch with you shortly.
          </p>
          <p className="text-sm text-muted-foreground">Redirecting you to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      <FrostedBackground />

      <div className="w-full max-w-lg z-10">
        <Button
          variant="ghost"
          className="mb-8 group text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        <Card className="border-border/50 bg-background/40 backdrop-blur-2xl shadow-2xl animate-fade-up">
          <CardHeader className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-2">
              <Send className="w-6 h-6 rotate-12" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">Register Interest</CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Join the exclusive list of businesses transforming their communication with VaakuOS.
              </CardDescription>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit} onFocus={handleFormFocus}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold ml-1">Full Name</Label>
                <Input
                  id="name"
                  ref={nameInputRef}
                  placeholder="e.g. Alex Rivers"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/30 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold ml-1">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/30 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-semibold ml-1">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Acme Global (Optional)"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-background/30 border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-4 pb-8">
              <Button
                type="submit"
                size="xl"
                className="w-full font-bold group bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
                    <span>Registering...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Claim Your Spot
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s" }}>
          By registering, you agree to receive updates about VaakuOS.
        </p>
      </div>
    </div>
  );
};

export default RegisterInterest;
