import Head from 'next/head';
import { useRouter } from 'next/router';

import { getSiteMetaData } from 'utils/helpers';

function Seo({ title, preview, description, type = 'website' }) {
  const router = useRouter();
  const siteMetadata = getSiteMetaData();

  const metaTitle = title || siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const metaPreview = `${siteMetadata.siteUrl}${router.asPath}/${preview || siteMetadata.preview || ''}`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={`${metaPreview}`} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={`${metaPreview}`} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />

      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
}

export default Seo;
