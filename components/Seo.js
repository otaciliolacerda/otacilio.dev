import Head from 'next/head';

import { getSiteMetaData } from 'utils/helpers';

function Seo({ title, description = '', preview = '' }) {
  const siteMetadata = getSiteMetaData();

  const metaTitle = title || siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const metaPreview = preview || siteMetadata.preview;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={metaTitle} />
      <meta name="og:description" property="og:description" content={metaDescription} />
      <meta name="og:image" property="og:image" content={metaPreview} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
}

export default Seo;
