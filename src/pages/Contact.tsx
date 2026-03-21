import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact VaakuOS"
        description="Talk to VaakuOS about demos, pricing, partnerships, or support—we typically respond within 2 hours."
        canonicalPath="/contact"
      />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left Side: Text and info */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">Let's talk about <span className="text-primary italic">retrieving</span> your revenue.</h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Whether you have a question about features, pricing, or just want to see a live demo of the 'Revenue Retrieval Engine', we're here to help.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email us</h3>
                    <p className="text-muted-foreground">For general inquiries: hello@vaakuos.com</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Chat with us</h3>
                    <p className="text-muted-foreground">Our team typically responds in under 2 hours during business hours.</p>
                    <button className="mt-2 text-secondary font-bold hover:underline flex items-center gap-2">
                      Open Live Chat <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Our Offices</h3>
                    <p className="text-muted-foreground">Delhi. India</p>
                    <p className="text-muted-foreground">Remote-First Team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-card p-8 md:p-12 rounded-[40px] border border-border shadow-sm">
              <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground ml-1">First Name</label>
                    <Input placeholder="John" aria-label="First Name" className="py-6 rounded-xl border-border bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground ml-1">Last Name</label>
                    <Input placeholder="Doe" aria-label="Last Name" className="py-6 rounded-xl border-border bg-muted/30" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">Work Email</label>
                  <Input placeholder="john@company.com" aria-label="Work Email" className="py-6 rounded-xl border-border bg-muted/30" />
                </div>

                {/* <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">How can we help?</label>
                  <select className="w-full px-4 py-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>General Inquiry</option>
                    <option>Book a Demo</option>
                    <option>Support Request</option>
                    <option>Partnership</option>
                  </select>
                </div> */}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">Message</label>
                  <Textarea placeholder="Tell us about your retrieval goals..." aria-label="Message" className="min-h-[150px] rounded-xl border-border bg-muted/30 p-4" />
                </div>

                <Button className="w-full py-8 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-white transition-all transform hover:scale-[1.02]">
                  Send Message
                </Button>

                <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
                  By clicking send, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a> and consent to receiving communication from us.
                </p>
              </form>
            </div>
          </div>
        </div>

        <section className="mt-32 py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto max-w-6xl px-4">
             <div className="grid md:grid-cols-3 gap-12 text-center">
                <div>
                   <h3 className="text-xl font-bold mb-4 italic text-primary">Sales</h3>
                   <p className="text-muted-foreground mb-4">Interested in seeing VaakuOS in action? Book a personalized demo with our commerce experts.</p>
                   <button className="font-bold underline">Talk to Sales</button>
                </div>
                <div className="border-x border-border px-8">
                   <h3 className="text-xl font-bold mb-4 italic text-secondary">Support</h3>
                   <p className="text-muted-foreground mb-4">Already a customer? Our dedicated success team is available 24/7 to help you optimize flows.</p>
                   <button className="font-bold underline">Visit Help Center</button>
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-4 italic text-accent">Partners</h3>
                   <p className="text-muted-foreground mb-4">Building e-commerce tools or agencies? Let's discuss how we can grow together.</p>
                   <button className="font-bold underline">Become a Partner</button>
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
