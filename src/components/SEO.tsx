import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
}

export const SEO = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard = "summary_large_image",
}: SEOProps) => {
  const fullTitle = title ? `${title} | Vaakuos` : "Vaakuos";
  
  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Open Graph meta tags */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
      {twitterDescription && (
        <meta name="twitter:description" content={twitterDescription || ogDescription} />
      )}
      {twitterImage && <meta name="twitter:image" content={twitterImage || ogImage} />}
    </Helmet>
  );
};
