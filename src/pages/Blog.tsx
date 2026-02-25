import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog-service";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAllPublished(),
  });

  const featuredPost = posts?.[0];
  const regularPosts = posts?.slice(1) || [];

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

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              <p>Error loading blogs. Please try again later.</p>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
                  <Link to={`/blog/${featuredPost.slug}`} className="md:col-span-2 group cursor-pointer">
                    <div className="relative aspect-[21/9] bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl overflow-hidden border border-border flex items-center justify-center p-12">
                      <div className="max-w-xl text-center">
                        <Badge className="mb-4 bg-primary text-white">Featured</Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">{featuredPost.title}</h2>
                        <p className="text-muted-foreground text-lg mb-8 line-clamp-2">
                          {featuredPost.excerpt || featuredPost.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                        </p>
                        <div className="flex items-center gap-2 mx-auto font-bold text-primary group-hover:gap-4 transition-all">
                          Read the Announcement <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {regularPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="p-8 border-border bg-card hover:shadow-xl transition-all group flex flex-col cursor-pointer h-full">
                      <div className="flex items-center justify-between mb-6">
                        <Badge variant="secondary" className="px-3 py-1 font-bold">
                          {post.category?.name || "Growth"}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {/* Assuming content-based read time calculation if not provided */}
                          {Math.ceil(post.content.length / 500)} min read
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                        {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                            {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="h-full w-full object-cover" />}
                          </div>
                          <span className="text-sm font-medium">{post.author?.name || "Admin"}</span>
                        </div>
                        <time className="text-sm text-muted-foreground">
                          {format(new Date(post.created_at), "MMM dd, yyyy")}
                        </time>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {posts?.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-xl">No articles found.</p>
                </div>
              )}

              {posts && posts.length > 10 && (
                <div className="mt-20 text-center">
                   <button className="px-8 py-4 bg-transparent border border-border rounded-full font-bold hover:bg-white/5 transition-all">
                      Load More Articles
                   </button>
                </div>
              )}
            </>
          )}
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

