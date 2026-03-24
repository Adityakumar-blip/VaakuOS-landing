# Snippets

## Helmet meta block
```tsx
<Helmet>
  <title>Page Title | Brand</title>
  <meta name="description" content="Benefit-focused sentence about the page." />
  <link rel="canonical" href="https://example.com/path" />
  <meta name="robots" content="index,follow" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Brand" />
  <meta property="og:title" content="Page Title | Brand" />
  <meta property="og:description" content="Benefit-focused sentence about the page." />
  <meta property="og:url" content="https://example.com/path" />
  <meta property="og:image" content="https://example.com/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title | Brand" />
  <meta name="twitter:description" content="Benefit-focused sentence about the page." />
  <meta name="twitter:image" content="https://example.com/og-image.jpg" />
</Helmet>
```

## robots.txt (public/robots.txt)
```
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

## sitemap.xml (public/sitemap.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add key pages -->
</urlset>
```

## Organization + WebSite schema (home)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": ["https://www.linkedin.com/company/example"],
  "foundingDate": "2024"
}
```
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://example.com",
  "name": "Brand Name",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## BreadcrumbList schema (when depth > 1)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Section",
      "item": "https://example.com/section"
    }
  ]
}
```

## Product schema starter (only if accurate)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": ["https://example.com/product.jpg"],
  "description": "Short benefit-led description",
  "brand": {"@type": "Brand", "name": "Brand"},
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "99",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/product"
  }
}
```
