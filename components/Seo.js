import path from 'path';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getSiteMetaData } from 'utils/helpers';

function Seo({ title, preview, description, metaType = 'website' }) {
  const router = useRouter();
  const siteMetadata = getSiteMetaData();

  const metaTitle = title || siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const previewSrc = path.join(router.asPath, `${preview || siteMetadata.previewImage || ''}`);

  const metaPreview = `${siteMetadata.siteUrl}${previewSrc}`;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content={metaType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaPreview} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata.social.twitter} />
      <meta name="twitter:image" content={metaPreview} />

      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
    </Head>
  );
}

export default Seo;
