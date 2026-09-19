import { getSiteMetaData } from 'utils/helpers';

const { siteUrl } = getSiteMetaData();

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
