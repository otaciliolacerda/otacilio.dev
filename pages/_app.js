import { ThemeProvider } from 'next-themes';

import 'styles/main.css';

import 'typeface-open-sans';
import 'typeface-merriweather';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
