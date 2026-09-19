import { getSiteMetaData } from 'utils/helpers';
import { getBlogPostsSlugs } from 'utils/posts';

const { siteUrl } = getSiteMetaData();

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...getBlogPostsSlugs().map(({ slug }) => ({
      url: `${siteUrl}/blog/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
