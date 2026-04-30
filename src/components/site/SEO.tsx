import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description?: string;
  image?: string;
};

export function SEO({ title, description, image }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
      {image && <meta name="twitter:card" content="summary_large_image" />}
    </Helmet>
  );
}