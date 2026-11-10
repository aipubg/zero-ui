import { chromium } from "playwright";
import path from "node:path";

const BASE_URL = "http://127.0.0.1:5173/";
const SCREENSHOT_DIR = "F:\\ZERO UI\\screenshots";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runQA() {
  console.log("Starting QA Test Suite with Playwright & Headless Chrome...");

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Load home page
  await page.goto(BASE_URL);
  await page.waitForLoadState("networkidle");
  await sleep(1000);

  // 01-home-1920x1080.png
  await page.setViewportSize({ width: 1920, height: 1080 });
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "01-home-1920x1080.png") });
  console.log("Captured: 01-home-1920x1080.png");

  // 02-home-1366x768.png
  await page.setViewportSize({ width: 1366, height: 768 });
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "02-home-1366x768.png") });
  console.log("Captured: 02-home-1366x768.png");

  // 03-home-2560x1440.png
  await page.setViewportSize({ width: 2560, height: 1440 });
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "03-home-2560x1440.png") });
  console.log("Captured: 03-home-2560x1440.png");

  // Reset to 1920x1080 standard
  await page.setViewportSize({ width: 1920, height: 1080 });
  await sleep(400);

  // 04-navigation-expanded.png
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "04-navigation-expanded.png") });
  console.log("Captured: 04-navigation-expanded.png");

  // 05-navigation-collapsed.png
  const railToggle = await page.$('button[data-nav-toggle="true"]');
  if (railToggle) {
    await railToggle.click();
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "05-navigation-collapsed.png") });
    console.log("Captured: 05-navigation-collapsed.png");
    // Re-expand rail
    await railToggle.click();
    await sleep(300);
  }

  // 06-orbit-selected.png
  const memoryNode = await page.locator('[data-orbit-id="memory"]').first();
  if (memoryNode) {
    await memoryNode.click({ force: true });
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "06-orbit-selected.png") });
    console.log("Captured: 06-orbit-selected.png");
    // Close context panel cleanly
    await page.keyboard.press("Escape");
    await sleep(400);
  }

  // 07-live-operations-expanded.png
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "07-live-operations-expanded.png") });
  console.log("Captured: 07-live-operations-expanded.png");

  // 08-live-operations-collapsed.png
  // Toggle live ops
  const activityBtn = await page.locator('aside[class*="fixed right-6"]').first();
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "08-live-operations-collapsed.png") });
  console.log("Captured: 08-live-operations-collapsed.png");

  // 09-chat-workspace.png
  const coreMonogram = await page.locator('button[title*="ZERO Core"]').first();
  if (coreMonogram) {
    await coreMonogram.click();
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "09-chat-workspace.png") });
    console.log("Captured: 09-chat-workspace.png");
  }

  // 10-agent-workspace.png
  await page.click('button[data-nav-id="agents"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "10-agent-workspace.png") });
  console.log("Captured: 10-agent-workspace.png");

  // 11-models-workspace.png
  await page.click('button[data-nav-id="models"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "11-models-workspace.png") });
  console.log("Captured: 11-models-workspace.png");

  // 12-memory-workspace.png
  await page.click('button[data-nav-id="memory"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "12-memory-workspace.png") });
  console.log("Captured: 12-memory-workspace.png");

  // 13-skills-workspace.png
  await page.click('button[data-nav-id="skills"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "13-skills-workspace.png") });
  console.log("Captured: 13-skills-workspace.png");

  // 14-plugins-workspace.png
  await page.click('button[data-nav-id="plugins"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "14-plugins-workspace.png") });
  console.log("Captured: 14-plugins-workspace.png");

  // 15-computer-workspace.png
  await page.click('button[data-nav-id="computer"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "15-computer-workspace.png") });
  console.log("Captured: 15-computer-workspace.png");

  // 16-settings-appearance.png
  await page.click('button[data-nav-id="labs"]');
  await sleep(600);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "16-settings-appearance.png") });
  console.log("Captured: 16-settings-appearance.png");

  // 17-blue-theme.png
  const cyanThemeBtn = await page.locator('button:has-text("Ethereal Cyan")').first();
  if (cyanThemeBtn) {
    await cyanThemeBtn.click({ timeout: 5000 });
    await sleep(400);
    await page.click('button[data-nav-id="home"]');
    await sleep(700);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "17-blue-theme.png") });
    console.log("Captured: 17-blue-theme.png");
  }

  // 18-purple-theme.png
  await page.click('button[data-nav-id="labs"]');
  await sleep(400);
  const purpleThemeBtn = await page.locator('button:has-text("Cosmic Amethyst")').first();
  if (purpleThemeBtn) {
    await purpleThemeBtn.click();
    await sleep(400);
    await page.click('button[data-nav-id="home"]');
    await sleep(700);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "18-purple-theme.png") });
    console.log("Captured: 18-purple-theme.png");
  }

  // 19-mascot-expression.png
  const mascotEl = await page.locator('div[title*="ZERO Buddy Mascot"]').first();
  if (mascotEl) {
    await mascotEl.click();
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "19-mascot-expression.png") });
    console.log("Captured: 19-mascot-expression.png");
  }

  // 20-reduced-motion.png
  await page.click('button[data-nav-id="labs"]');
  await sleep(400);
  const motionBtn = await page.locator('button:has-text("OFF"), button:has-text("ON")').first();
  if (motionBtn) {
    await motionBtn.click();
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "20-reduced-motion.png") });
    console.log("Captured: 20-reduced-motion.png");
  }

  // Return to canonical Home in Astral Violet
  await page.click('button:has-text("Astral Violet")').catch(() => {});
  await sleep(200);
  await page.click('button[data-nav-id="home"]');
  await sleep(500);

  await browser.close();
  console.log("All 20 QA Screenshots successfully captured!");
}

runQA().catch((err) => {
  console.error("QA error:", err);
  process.exit(1);
});
