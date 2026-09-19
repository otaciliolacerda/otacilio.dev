import { defineConfig, devices } from '@playwright/test';

const localBrowser = process.env.CI ? {} : { channel: 'chrome' };

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1',
    reuseExistingServer: !process.env.CI,
    url: 'http://127.0.0.1:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...localBrowser },
    },
  ],
});
