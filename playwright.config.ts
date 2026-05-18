import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  globalTimeout: 250000,
  timeout: 60000,

  expect: {
    timeout: 30000
  },

  fullyParallel: true,

  retries: 0,

  reporter: 'html',

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',


  },

  projects: [
    {
      name: 'chromium',

      use: {
         browserName: 'chromium',
         headless: false,
          viewport: null,
          ignoreHTTPSErrors: true,

        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});