import { chromium } from "playwright";

async function snap() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  page.on("console", msg => console.log("PAGE LOG:", msg.type(), msg.text()));
  page.on("pageerror", err => console.error("PAGE ERROR:", err));

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "screenshots/01-home-1920x1080.png" });
  console.log("Captured screenshots/01-home-1920x1080.png");
  await browser.close();
}

snap().catch(console.error);
