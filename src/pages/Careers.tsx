import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Zap, Coffee, Heart } from "lucide-react";

const Careers = () => {
  const jobs = [
    {
      title: "Senior AI Engineer",
      team: "Engine",
      location: "Remote / Bengaluru",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      team: "Design",
      location: "Remote / Delhi",
      type: "Full-time"
    },
    {
      title: "Data Operations Manager",
      team: "Operations",
      location: "Hybrid (Mumbai)",
      type: "Full-time"
    },
    {
      title: "Frontend Engineer (React)",
      team: "Product",
      location: "Remote",
      type: "Full-time"
    }
  ];

  const perks = [
    { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world. We care about output, not office hours." },
    { icon: Zap, title: "Modern Stack", desc: "We use the latest tools (Vite, React, Rust, Python) to keep things fast." },
    { icon: Coffee, title: "Learning Budget", desc: "Annual allowance for books, courses, and conferences to help you grow." },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health coverage for you and your family, plus mental health support." }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4 text-center mb-24">
          <Badge className="mb-6 bg-primary/10 text-primary border-none text-xs uppercase tracking-widest px-4 py-2">We're Hiring</Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-8">Build the future of <span className="text-secondary italic">commerce</span>.</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a small, high-performance team building the intelligence layer for the next decade of digital retail. Join us in our mission to humanize automated communication.
          </p>
        </div>

        <div className="container mx-auto max-w-6xl px-4 mb-32">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {perks.map((perk, i) => (
                <div key={i} className="p-8 rounded-3xl border border-border bg-card/50">
                   <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <perk.icon className="h-6 w-6 text-primary" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                   <p className="text-muted-foreground leading-relaxed">{perk.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <section className="bg-muted/30 py-24 mb-32 border-y border-border">
          <div className="container mx-auto max-w-5xl px-4">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Open Roles</h2>
                  <p className="text-muted-foreground text-lg">Help us build something that moves the needle for thousands of businesses.</p>
                </div>
                <div className="flex gap-4">
                   <select className="bg-background border border-border px-4 py-2 rounded-lg text-sm">
                      <option>All Departments</option>
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Marketing</option>
                   </select>
                </div>
             </div>

             <div className="space-y-4">
                {jobs.map((job, i) => (
                  <div key={i} className="group p-8 rounded-2xl border border-border bg-card hover:border-primary transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                     <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                           <span className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" />{job.team}</span>
                           <span className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" />{job.location}</span>
                           <span className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-primary" />{job.type}</span>
                        </div>
                     </div>
                     <button className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all whitespace-nowrap">
                        Apply Now <ArrowRight className="h-5 w-5" />
                     </button>
                  </div>
                ))}
             </div>

             <div className="mt-16 text-center">
                <p className="text-muted-foreground">Don't see a role that fits? <button className="text-primary font-bold hover:underline">Connect with us</button> anyway.</p>
             </div>
          </div>
        </section>

        <div className="container mx-auto max-w-4xl px-4 text-center">
           <h2 className="text-3xl font-bold mb-8">Our Culture</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">💻</div>
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">☕</div>
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">🍕</div>
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">📈</div>
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">🎮</div>
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center text-4xl">✈️</div>
           </div>
           <p className="mt-8 text-muted-foreground">We value curiosity, ownership, and deep work. No ego, just great engineering and design.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
