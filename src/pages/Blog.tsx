import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Why Abandoned Cart Recovery is More Than Just Discount Codes",
      excerpt: "Many brands think a 10% discount is the only way to win back customers. We dive into why trust and timing matter more.",
      category: "Growth",
      date: "Jan 12, 2026",
      readTime: "6 min read",
      author: "Sarah J."
    },
    {
      title: "How AI is Changing the Lifecycle of E-commerce Shoppers",
      excerpt: "Personalization is evolving. Discover how predictive models are anticipating customer needs before they checkout.",
      category: "Product",
      date: "Jan 08, 2026",
      readTime: "8 min read",
      author: "Mark T."
    },
    {
      title: "Case Study: How 'Drip Commerce' Increased Revenue by 24% in 30 Days",
      excerpt: "A deep dive into the specific retrieval flows that turned window shoppers into loyal customers for a top beauty brand.",
      category: "Case Study",
      date: "Jan 03, 2026",
      readTime: "12 min read",
      author: "Elena R."
    },
    {
      title: "The Ethics of Retargeting: Building Trust in a Cookie-less World",
      excerpt: "As privacy regulations tighten, how can brands still engage meaningfully without being intrusive?",
      category: "Insights",
      date: "Dec 22, 2025",
      readTime: "5 min read",
      author: "David L."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">The Retrieval <span className="text-primary">Journal</span>.</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Insights, case studies, and strategies to help you scale your e-commerce revenue with intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
             {/* Featured Post */}
             <div className="md:col-span-2 group cursor-pointer">
                <div className="relative aspect-[21/9] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl overflow-hidden border border-border flex items-center justify-center p-12">
                   <div className="max-w-xl text-center">
                      <Badge className="mb-4 bg-primary text-white">Featured</Badge>
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">Building the Future of Conversion AI: Our Roadmap for 2026</h2>
                      <p className="text-muted-foreground text-lg mb-8 line-clamp-2">We've spent the last six months quiet. Here's what we've been building and how it will redefine the way you recover revenue.</p>
                      <button className="flex items-center gap-2 mx-auto font-bold text-primary group-hover:gap-4 transition-all">
                        Read the Announcement <ArrowRight className="h-5 w-5" />
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <Card key={i} className="p-8 border-border bg-card hover:shadow-xl transition-all group flex flex-col cursor-pointer">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="px-3 py-1 font-bold">{post.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
             <button className="px-8 py-4 bg-transparent border border-border rounded-full font-bold hover:bg-white/5 transition-all">
                Load More Articles
             </button>
          </div>
        </div>

        <section className="mt-32 bg-primary py-24 mx-4 rounded-[40px] text-primary-foreground text-center">
           <div className="max-w-2xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Get conversion insights in your inbox.</h2>
              <p className="opacity-80 mb-8 text-lg">Join 10,000+ marketers who receive our weekly breakdown of what's working in e-commerce.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                   placeholder="Enter your email" 
                   className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                 />
                 <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-opacity-90 transition-all">
                    Subscribe
                 </button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
