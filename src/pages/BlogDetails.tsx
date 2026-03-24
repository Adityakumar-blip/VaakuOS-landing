import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Clock, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog-service";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { SEO } from "@/components/SEO";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBySlug(slug || ""),
    enabled: !!slug,
  });
  const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://vaakuos.com";

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading article...</p>
            </div>
          ) : error || !post ? (
            <div className="text-center py-20 text-red-500">
              <p>
                Error loading article. Article might not exist or there was a
                network error.
              </p>
            </div>
          ) : (
            <>
              <SEO 
                title={post.meta_title || post.title}
                description={post.meta_description || post.excerpt || post.title}
                ogTitle={post.meta_title || post.title}
                ogDescription={post.meta_description || post.excerpt || post.title}
                ogImage={post.featured_image}
                ogUrl={`/blog/${post.slug}`}
                canonicalPath={`/blog/${post.slug}`}
                twitterTitle={post.meta_title || post.title}
                twitterDescription={post.meta_description || post.excerpt || post.title}
                twitterImage={post.featured_image}
                structuredData={{
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": post.title,
                  "description": post.meta_description || post.excerpt || post.title,
                  "image": post.featured_image ? [post.featured_image] : [`${siteUrl}/og-image.png`],
                  "datePublished": post.created_at,
                  "author": {
                    "@type": "Person",
                    "name": post.author?.name || "VaakuOS"
                  },
                  "mainEntityOfPage": `${siteUrl}/blog/${post.slug}`
                }}
              />
              <article>
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-primary/10 text-primary border-none text-sm font-bold px-4 py-1">
                    {post.category?.name || "Growth"}
                  </Badge>
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {Math.ceil(post.content.length / 500)} min read
                  </div> */}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between py-6 border-y border-border">
                  <div className="flex items-center gap-3">
                    {/* <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                      {post.author?.avatar && (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div> */}
                    <div>
                      <p className="font-bold">
                        {post.author?.name || "Admin"}
                      </p>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time className="text-sm">
                      {format(new Date(post.created_at), "MMMM dd, yyyy")}
                    </time>
                  </div>
                </div>
              </header>

              {post.featured_image && (
                <div className="mb-12 rounded-3xl overflow-hidden border border-border">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-lg prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <footer className="mt-20 pt-10 border-t border-border">
                <div className="bg-card p-10 rounded-[32px] border border-border text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Want more insights?
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Join our newsletter to receive the latest strategies for
                    e-commerce growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="flex-1 px-6 py-4 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:opacity-90 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </footer>
            </article>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
