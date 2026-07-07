import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";

const chromePath = fs.existsSync("/opt/pw-browsers/chromium")
  ? "/opt/pw-browsers/chromium"
  : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:5173",
    browserName: "chromium",
    launchOptions: { executablePath: chromePath },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1340, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], viewport: { width: 393, height: 852 } } },
  ],
});
