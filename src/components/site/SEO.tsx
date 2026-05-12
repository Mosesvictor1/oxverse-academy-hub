import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  keywords?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
};

const SITE_URL = "https://oxverse.academy";
const DEFAULT_IMAGE = `${SITE_URL}/oxverseIcon.png`;

export function SEO({
  title,
  description,
  image,
  canonical,
  keywords,
  type = "website",
  jsonLd,
  noIndex,
}: Props) {
  const url =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : SITE_URL);
  const img = image || DEFAULT_IMAGE;
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="OxVerse Academy" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={img} />
      <meta name="twitter:site" content="@0xvrs" />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}