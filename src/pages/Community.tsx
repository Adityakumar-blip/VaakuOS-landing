import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bug, Lightbulb, MessageCircle, Send, Users, ArrowUpCircle, MessageSquare } from "lucide-react";
import { useState } from "react";

const Community = () => {
  const [activeTab, setActiveTab] = useState<"featured" | "bugs" | "ideas">("featured");

  const suggestionCategories = [
    { id: "bugs", icon: Bug, title: "Report a Bug", color: "text-destructive", bg: "bg-destructive/10" },
    { id: "ideas", icon: Lightbulb, title: "Feature Idea", color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: "improvements", icon: Send, title: "Improvement", color: "text-primary", bg: "bg-primary/10" }
  ];

  const recentDiscussions = [
    {
      type: "Idea",
      title: "Add voice notes to retrieval links?",
      author: "alex_growth",
      votes: 142,
      comments: 24,
      status: "Under Review"
    },
    {
      type: "Bug",
      title: "Delay in Shopify inventory sync for v2.4",
      author: "dev_merchant",
      votes: 38,
      comments: 12,
      status: "Fix in Progress"
    },
    {
      type: "Improvement",
      title: "Dark mode for the main dashboard analytics",
      author: "sarah_p",
      votes: 256,
      comments: 45,
      status: "Planned"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 text-sm font-bold">
              <Users className="h-4 w-4" />
              <span>5,000+ Members</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Built by <span className="text-primary italic">you</span>.</h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              We take everything into account — bugs, feature requests, or minor tweaks. Join our community and help shape the future of VaakuOS.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
             {suggestionCategories.map((cat, i) => (
                <Card key={i} className="p-8 border-border bg-card hover:shadow-xl transition-all group flex flex-col items-center text-center cursor-pointer">
                   <div className={`h-16 w-16 rounded-2xl ${cat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <cat.icon className={`h-8 w-8 ${cat.color}`} />
                   </div>
                   <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                   <p className="text-sm text-muted-foreground mb-6">Share your thoughts on how we can make VaakuOS better.</p>
                   <Button variant="outline" className="rounded-full font-bold">Submit Now</Button>
                </Card>
             ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Discussions Feed */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                 <div className="flex gap-8">
                    <button 
                      onClick={() => setActiveTab("featured")}
                      className={`text-sm font-bold transition-colors relative pb-4 ${activeTab === 'featured' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Featured
                      {activeTab === 'featured' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                    <button 
                      onClick={() => setActiveTab("ideas")}
                      className={`text-sm font-bold transition-colors relative pb-4 ${activeTab === 'ideas' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Top Ideas
                      {activeTab === 'ideas' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                    <button 
                      onClick={() => setActiveTab("bugs")}
                      className={`text-sm font-bold transition-colors relative pb-4 ${activeTab === 'bugs' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      Bug Reports
                      {activeTab === 'bugs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                 </div>
                 <Button size="sm" className="rounded-full bg-primary text-white font-bold">New Discussion</Button>
              </div>

              <div className="space-y-4">
                {recentDiscussions.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors flex items-start gap-6 group cursor-pointer">
                    <div className="flex flex-col items-center gap-1 mt-1">
                       <ArrowUpCircle className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                       <span className="text-xs font-bold text-muted-foreground">{item.votes}</span>
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest">{item.type}</Badge>
                          <span className="text-xs font-bold text-primary italic px-2 py-0.5 bg-primary/5 rounded">{item.status}</span>
                       </div>
                       <h3 className="text-lg font-bold mb-2 group-hover:underline">{item.title}</h3>
                       <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <span>by <strong className="text-foreground">@{item.author}</strong></span>
                          <span className="flex items-center gap-1.5"><MessageSquare className="h-3 w-3" /> {item.comments} comments</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="w-full lg:w-80 space-y-8">
               <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/20">
                  <h3 className="text-xl font-bold mb-4">Board Stats</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Topics</span>
                        <span className="font-bold text-foreground">1,240</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Resolved</span>
                        <span className="font-bold text-foreground">842</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ideas Accepted</span>
                        <span className="font-bold text-foreground">45</span>
                     </div>
                  </div>
               </div>

               <div className="p-8 rounded-3xl bg-primary text-white">
                  <h3 className="text-xl font-bold mb-3">Join us on Discord</h3>
                  <p className="text-sm opacity-80 mb-6 leading-relaxed">Daily chats with our product team and early access to beta features.</p>
                  <Button className="w-full bg-white text-primary font-bold hover:bg-white/90">Join Community</Button>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
