import { ThemeProvider } from 'next-themes';

import '@fontsource-variable/merriweather';
import '@fontsource-variable/open-sans';
import 'styles/main.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
