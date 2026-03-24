# SEO Checklist

## Setup
- Install deps if missing: `npm install`.
- Build to catch errors: `npm run build`.
- Preview for audits: `npm run preview -- --host --port 4173` (expect http://localhost:4173).
- If canonical domain known, set `VITE_SITE_URL` in `.env` (e.g., `https://vaakuos.com`).

## On-page metadata (per page)
- Title 35–60 chars, contains primary keyword + brand, unique.
- Description 70–160 chars, benefit-led, unique, matches intent.
- Canonical absolute URL, one per page; avoid mixed trailing-slash rules.
- Robots meta defaults to `index,follow` unless intentional noindex.
- Open Graph: `og:title`, `og:description`, `og:type` (website/page), `og:url`, `og:image` (>=1200x630, <=600 KB), `og:site_name`.
- Twitter card: `summary_large_image`; include `twitter:title`, `twitter:description`, `twitter:image`.
- Favicon + `theme-color`; preload key font if largest text CLS.

## Content & semantics
- Single `<h1>`; logical heading order (no skipped levels).
- First 100 words mention target query naturally; avoid keyword stuffing.
- Alt text for all meaningful images; decorative images `alt=""`.
- Internal links to priority pages with descriptive anchor text; avoid orphan pages.
- Clear primary CTA above the fold; breadcrumbs for deep hierarchies.

## Technical discoverability
- `public/robots.txt` allows main paths; references sitemap URL with canonical domain.
- `public/sitemap.xml` present; includes key pages and lastmod where possible.
- Consistent protocol/host; avoid duplicate www/non-www; 404 page exists.
- Pagination (if any): rel="next"/"prev" or view-all; avoid infinite scroll without links.
- Hreflang only if multiple languages; otherwise omit.

## Structured data
- Home: `Organization` + `WebSite` with `SearchAction`.
- Pages: `BreadcrumbList` when depth >1.
- Niche: `Product` (offers/reviews), `Article/BlogPosting`, `Event`, etc., only when accurate. Validate fields.
- JSON-LD must match visible content and absolute URLs; no duplicate types unless necessary.

## Performance signals
- Largest hero media optimized (webp/avif, responsive sizes); `loading="lazy"` for below-the-fold images/iframes.
- Set width/height to prevent CLS; prefer `font-display: swap`.
- Remove unused components/imports flagged by Vite build; consider route-based code splitting.
- Limit third-party scripts; defer/async non-critical ones.

## QA / verification
- Re-run `npm run build` after changes.
- Spot-check pages in preview for title/description/OG/canonical/JSON-LD in rendered DOM.
- If Lighthouse used, store report path (e.g., `dist/lighthouse-seo.html`) and note score deltas.
- Validate structured data: copy rendered JSON-LD into Rich Results Test if available.
