import MetaImage from '../../../public/images/meta-image.jpg';
export const Meta = ({
  title,
  description,
  absoluteImageUrl,
}: {
  title: string;
  description: string;
  absoluteImageUrl?: string;
}) => {
  const img =
    absoluteImageUrl ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${MetaImage.src}`;
  return (
    <>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:site" content="@highlightrun" />
      <meta name="twitter:creator" content="@highlightrun" />
      <meta name="twitter:image" content={img} key="twimage" />
      <meta name="twitter:title" content={title} key="twtitle" />
      {/* Open Graph */}
      <meta property="og:url" content="highlight.io" key="ogurl" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} key="ogimage" />
      <meta property="og:site_name" content="Highlight" key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </>
  );
};
