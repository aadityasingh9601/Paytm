import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  // Run tests in files in parallel */
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // Retry on CI only (to handle flakiness)
  retries: process.env.CI ? 2 : 0,
  // maxFailures — save CI resources if suite is badly broken
  // undefined locally = run all tests no matter what
  maxFailures: process.env.CI ? 10 : undefined,
  //If not set, playwright defaults to half the logical CPU cores.
  workers: process.env.CI ? "50%" : undefined,
  reporter: "html",
  use: {
    // Base URL to use in actions like `await page.goto('')`.
    baseURL: "http://localhost:8000",
    trace: "on-first-retry",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: "npm run start:test", // starts app with TEST database
    url: "http://localhost:8000",
    reuseExistingServer: true, // locally reuse if already running, on CI always fresh
    timeout: 30 * 1000, //30 seconds
  },
});
