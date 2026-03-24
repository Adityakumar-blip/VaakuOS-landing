import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO = ({
  title,
  description,
  canonicalPath,
  robots = "index,follow",
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard = "summary_large_image",
  structuredData,
}: SEOProps) => {
  const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://vaakuos.com";
  const defaultOgImage = `${siteUrl}/og-image.png`;
  const fullTitle = title ? `${title} | Vaakuos` : "Vaakuos";
  const canonical = canonicalPath
    ? `${siteUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : siteUrl;
  const finalOgUrl = ogUrl ?? canonical;
  const finalOgImage = ogImage ?? defaultOgImage;

  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {finalOgImage && <meta property="og:image" content={finalOgImage} />}
      {finalOgUrl && <meta property="og:url" content={finalOgUrl} />}
      <meta property="og:type" content={ogType} />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
      {twitterDescription && (
        <meta name="twitter:description" content={twitterDescription || ogDescription} />
      )}
      {twitterImage && <meta name="twitter:image" content={twitterImage || ogImage} />}
      {structuredData &&
        (Array.isArray(structuredData) ? structuredData : [structuredData]).map(
          (schema, idx) => (
            <script key={idx} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )
        )}
    </Helmet>
  );
};
