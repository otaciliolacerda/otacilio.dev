'use client';

import { ThemeProvider } from 'next-themes';

function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
}

export default Providers;
