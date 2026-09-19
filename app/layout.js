import '@fontsource-variable/merriweather';
import '@fontsource-variable/open-sans';
import 'styles/main.css';

import Providers from 'app/providers';
import { getSiteMetaData } from 'utils/helpers';

const siteMetadata = getSiteMetaData();
const previewImage = `/assets/${siteMetadata.previewImage.replace(/^\//, '')}`;

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [previewImage],
  },
  twitter: {
    card: 'summary',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.social.twitter,
    images: [previewImage],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

function RootLayout({ children }) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
