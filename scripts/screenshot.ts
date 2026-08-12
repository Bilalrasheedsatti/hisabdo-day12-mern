import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const screenshotsDir = path.join(process.cwd(), "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const pages = [
  { name: "home-desktop", url: "/", width: 1440, height: 900 },
  { name: "home-mobile", url: "/", width: 390, height: 844 },
  { name: "features", url: "/features", width: 1440, height: 900 },
  { name: "pricing", url: "/pricing", width: 1440, height: 900 },
  { name: "dashboard", url: "/app", width: 1440, height: 900 },
  { name: "dashboard-mobile", url: "/app", width: 390, height: 844 },
  { name: "customers", url: "/app/customers", width: 1440, height: 900 },
  { name: "customer-khata", url: "/app/customers/c-1", width: 1440, height: 900 },
  { name: "login", url: "/auth/login", width: 1440, height: 900 },
  { name: "signup", url: "/auth/signup", width: 1440, height: 900 },
  { name: "transactions", url: "/app/transactions", width: 1440, height: 900 },
  { name: "reports", url: "/app/reports", width: 1440, height: 900 },
  { name: "reminders", url: "/app/reminders", width: 1440, height: 900 },
  { name: "settings", url: "/app/settings", width: 1440, height: 900 },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const page of pages) {
    const pageInstance = await context.newPage();
    await pageInstance.setViewportSize({ width: page.width, height: page.height });
    const targetUrl = `http://localhost:3000${page.url}`;
    console.log(`Capturing: ${targetUrl} (${page.width}x${page.height})`);
    await pageInstance.goto(targetUrl, { waitUntil: "networkidle" });
    await pageInstance.waitForTimeout(500);
    const filePath = path.join(screenshotsDir, `${page.name}.png`);
    await pageInstance.screenshot({ path: filePath, fullPage: true });
    console.log(`  Saved: ${filePath}`);
    await pageInstance.close();
  }

  await browser.close();
  console.log("All screenshots captured!");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
