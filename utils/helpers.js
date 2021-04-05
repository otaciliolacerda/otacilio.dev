/* eslint-disable import/prefer-default-export */
import SiteConfig from 'config/seo.json';

export function getSiteMetaData() {
  return SiteConfig.siteMetadata;
}
