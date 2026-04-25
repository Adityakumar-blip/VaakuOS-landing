import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBookDemo } from "@/contexts/BookDemoContext";
import { BrandMark } from "@/components/BrandMark";
import WhiteLogo from "@/assets/white_full.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { openBookDemo } = useBookDemo();

  const navItems = [
    { label: "Integrations", path: "/integrations" },
    { label: "Pricing", path: "/pricing" },
    { label: "Calculator", path: "/calculator" },
    { label: "Blogs", path: "/blog" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-primary p-[3px] rounded-lg">
              <img src={WhiteLogo} className="h-10 w-10" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              VaakuOS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button variant="hero" size="sm" onClick={openBookDemo}>
                Book Live Demo
              </Button>
            </div>

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-mutedTransition active:scale-95 transition-all"
                    aria-label={
                      isOpen ? "Close navigation menu" : "Open navigation menu"
                    }
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] border-l border-border bg-background/95 backdrop-blur-xl p-0"
                >
                  <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b border-border">
                      <SheetTitle className="text-left flex items-center gap-3">
                        <BrandMark />
                        <span className="font-bold text-xl tracking-tight">
                          VaakuOS
                        </span>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 px-6 py-10 overflow-y-auto">
                      <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                          <div
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setIsOpen(false);
                            }}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 text-lg font-semibold text-foreground transition-all group active:scale-[0.98] cursor-pointer"
                          >
                            {item.label}
                            <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 border-t border-border bg-muted/30">
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          className="w-full h-12 rounded-xl font-bold"
                          onClick={() => {
                            navigate("/login");
                            setIsOpen(false);
                          }}
                        >
                          Sign In
                        </Button>
                        <Button
                          variant="hero"
                          className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                          onClick={() => {
                            openBookDemo();
                            setIsOpen(false);
                          }}
                        >
                          Book Live Demo
                        </Button>
                      </div>
                      <p className="text-center text-xs text-muted-foreground mt-6">
                        Recover every abandoned sale today.
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
