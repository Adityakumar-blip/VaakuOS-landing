---
name: seo-manager
description: "Run SEO audits and implement fixes for React/Vite or static sites: check metadata, headings, schema, robots/sitemaps, performance, accessibility, and ship changes. Use when asked to improve search visibility, rankings, or lighthouse SEO scores."
---

# SEO Manager

Use this skill whenever the user wants an SEO audit, recommendations, and code/content changes applied to a site in this repo.

## Quick start
- Repo type: Vite + React + Helmet (`react-helmet-async` already wired in `src/main.tsx`).
- Install deps if needed: `npm install`.
- Build to confirm baseline: `npm run build`. Fix build errors before optimizing SEO.
- Preview for audits: `npm run preview -- --host --port 4173` (preferred stable URL: http://localhost:4173).
- Optional Lighthouse CLI: `npx lighthouse http://localhost:4173 --only-categories=seo,performance,accessibility,best-practices --output html --output-path dist/lighthouse-seo.html` (view the HTML report for evidence-backed fixes).
- Use `references/seo-checklist.md` to drive the audit; pull snippets from `references/snippets.md`.

## Audit workflow (do in this order)
1) **Page inventory**: list key routes/components (check `src/pages`, router config). Note target queries/intents if provided.
2) **On-page metadata**: unique `<title>` (35–60 chars) and `<meta name="description">` (70–160 chars) per page; canonical; robots meta; Open Graph; Twitter card; favicon; theme-color; preload hero font/image when helpful.
3) **Content & semantics**: one `<h1>` per page, ordered headings, descriptive alt text, internal links to priority pages, scannable copy with primary keyword in H1 and first 100 words.
4) **Schema**: Organization + WebSite (SearchAction) on home; Article/Product/Event only when relevant; BreadcrumbList for multi-level pages.
5) **Technical discoverability**: valid `robots.txt`, `sitemap.xml` reachable from `/robots.txt`; clean URLs; canonical consistency (https + trailing slash rules); 404/redirects.
6) **Performance for SEO**: compress/resize hero media, lazy-load below-the-fold images, reduce unused CSS/JS, set `loading="lazy"` on non-critical iframes/images, prefer `font-display: swap`.
7) **Accessibility overlap**: labels for form controls, sufficient contrast, focus states—improves SEO signals.
8) **QA**: re-run `npm run build`; spot-check in preview; verify canonical/OG/JSON-LD in rendered DOM (not just source).

## Fix patterns (React + Vite in this repo)
- Wrap pages/components with `<Helmet>` from `react-helmet-async` for per-page metadata. Example:
  ```tsx
  import { Helmet } from "react-helmet-async";

  <Helmet>
    <title>Concise value-led title | Brand</title>
    <meta name="description" content="Specific benefit-focused summary." />
    <link rel="canonical" href={`${process.env.VITE_SITE_URL ?? "https://example.com"}/path`} />
    <meta name="robots" content="index,follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Same as title" />
    <meta property="og:description" content="Same as description" />
    <meta property="og:url" content="https://example.com/path" />
    <meta property="og:image" content="https://example.com/og.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{JSON.stringify(schemaObject)}</script>
  </Helmet>
  ```
  - Prefer absolute URLs; keep `schemaObject` minimal and valid JSON-LD (see references/snippets.md).

- **Default/fallback meta**: keep a sensible base title/description in `App.tsx` (root Helmet) and override per page.
- **Env for canonical**: define `VITE_SITE_URL` in `.env` for absolute canonical/og URLs; fall back to production domain if provided.
- **Robots & sitemap**: place `/public/robots.txt` and `/public/sitemap.xml`; ensure sitemap URL uses the canonical domain.
- **Images**: compress (`pngquant`/`squoosh`), serve webp/avif when available, add `width/height` attributes, and lazy-load non-critical images.
- **Links & navigation**: ensure nav/footer link to priority pages; add contextual internal links from high-traffic sections to money pages.
- **Performance tweaks**: split large bundles via route-based code splitting; defer non-critical scripts; remove unused imports/components surfaced by `npm run build` warnings.

## Deliverables to produce for each request
- Short audit note: current issues + impact.
- Proposed fixes ranked by impact/effort.
- Implement code/content changes (titles, descriptions, structured data, robots/sitemap, alt text, internal links, image optimizations) directly in this repo.
- Verification steps: commands run and what to re-check (Lighthouse scores or manual checks), plus any TODOs that need external confirmation (e.g., final canonical domain).

## References
- Use `references/seo-checklist.md` for a step-by-step check.
- Use `references/snippets.md` for ready-to-paste meta tags and schema examples.
